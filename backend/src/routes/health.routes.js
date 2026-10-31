import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API de Mecánicas Six-Seven funcionando",
    database:
      mongoose.connection.readyState === 1
        ? "conectada"
        : "desconectada",
  });
});

export default router;
