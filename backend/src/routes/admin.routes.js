
import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.js";
import Contact from "../models/Contact.js";
import Product from "../models/Product.js";

const router = Router();

// Todas las rutas de este archivo requieren autenticación
// y permisos de administrador.
router.use(authenticateToken, requireAdmin);

router.get("/dashboard", (req, res) => {
  res.json({
    success: true,
    message: "Bienvenido al panel administrativo de Mecánicas Six-Seven.",
    administrator: req.user.email,
    role: req.user.role,
  });
});


// Consultar mensajes recibidos
router.get("/contacts", async (req, res, next) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      total: contacts.length,
      contacts,
    });
  } catch (error) {
    next(error);
  }
});

// Actualizar el estado de un mensaje
router.patch(
  "/contacts/:id/status",
  async (req, res, next) => {
    try {
      const { status } = req.body;

      if (!["new", "read", "resolved"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Estado de mensaje no válido.",
        });
      }

      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Mensaje no encontrado.",
        });
      }

      res.json({
        success: true,
        message: "Estado actualizado.",
        contact,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ==========================================
// GESTIÓN DE PRODUCTOS
// ==========================================

// Consultar todos los productos (incluidos los inactivos)
router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
});

// Crear un producto
router.post("/products", async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      category,
      label,
      image,
      stock,
      featured,
      active,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      label,
      image,
      stock,
      featured,
      active,
    });

    res.status(201).json({
      success: true,
      message: "Producto creado correctamente.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

// Actualizar un producto
router.put("/products/:id", async (req, res, next) => {
  try {
    const allowedFields = [
      "name",
      "description",
      "price",
      "category",
      "label",
      "image",
      "stock",
      "featured",
      "active",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No se proporcionaron datos para actualizar.",
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado.",
      });
    }

    res.json({
      success: true,
      message: "Producto actualizado correctamente.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

// Desactivar un producto
router.delete("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado.",
      });
    }

    res.json({
      success: true,
      message: "Producto desactivado correctamente.",
      product,
    });
  } catch (error) {
    next(error);
  }
});


export default router;
