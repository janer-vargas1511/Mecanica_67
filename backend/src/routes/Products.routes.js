import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

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
