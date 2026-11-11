import mongoose from "mongoose";
import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

// Validar existencias antes de generar una cotización
router.post("/validate-stock", async (req, res, next) => {
  try {
    const { items } = req.body;

    // Comprobar que se reciban productos.
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No se recibieron productos para validar.",
      });
    }

    // Validar los identificadores y las cantidades.
    for (const item of items) {
      if (
        !mongoose.isValidObjectId(item.productId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Los datos de los productos no son válidos.",
        });
      }
    }

    // Agrupar cantidades por producto para evitar duplicados.
    const requestedItems = new Map();

    for (const item of items) {
      const currentQuantity =
        requestedItems.get(item.productId) || 0;

      requestedItems.set(
        item.productId,
        currentQuantity + item.quantity
      );
    }

    // Consultar los productos activos en MongoDB.
    const products = await Product.find({
      _id: { $in: [...requestedItems.keys()] },
      active: true,
    }).lean();

    const unavailable = [];

    // Comparar cantidades solicitadas con existencias reales.
    for (const [productId, quantity] of requestedItems) {
      const product = products.find(
        (item) => item._id.toString() === productId
      );

      if (!product) {
        unavailable.push({
          productId,
          message: "El producto ya no está disponible.",
        });

        continue;
      }

      // Stock null significa inventario sin límite definido.
      if (
        product.stock !== null &&
        product.stock !== undefined &&
        quantity > product.stock
      ) {
        unavailable.push({
          productId,
          name: product.name,
          requested: quantity,
          available: product.stock,
        });
      }
    }

    // Si algún producto no tiene existencias suficientes.
    if (unavailable.length > 0) {
      return res.status(409).json({
        success: false,
        valid: false,
        message: "Algunos productos no tienen existencias suficientes.",
        unavailable,
      });
    }

    return res.status(200).json({
      success: true,
      valid: true,
      message: "Las existencias son suficientes.",
    });
  } catch (error) {
    next(error);
  }
});

// Consultar productos publicados
router.get("/", async (req, res, next) => {
  try {
    const { category, featured } = req.query;

    const filters = {
      active: true,
    };

    // Filtrar por categoría
    if (category) {
      const validCategories = [
        "motores",
        "frenos",
        "suspension",
        "iluminacion",
      ];

      if (!validCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          message: "Categoría no válida.",
        });
      }

      filters.category = category;
    }

    // Filtrar productos destacados
    if (featured === "true") {
      filters.featured = true;
    }

    const products = await Product.find(filters)
      .sort({ featured: -1, createdAt: 1 })
      .limit(100)
      .lean();

    return res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
