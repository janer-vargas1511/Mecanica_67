import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

async function createAdmin() {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error(
        "Configura ADMIN_EMAIL y ADMIN_PASSWORD en el archivo .env."
      );
    }

    if (process.env.ADMIN_PASSWORD.length < 10 ||
        process.env.ADMIN_PASSWORD.length > 72) {
      throw new Error(
        "La contraseña administrativa debe tener entre 10 y 72 caracteres."
      );
    }

    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      existingUser.role = "admin";
      await existingUser.save();

      console.log("La cuenta existente ahora tiene rol de administrador.");
      return;
    }

    const passwordHash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      12
    );

    await User.create({
      name: "Administrador",
      email,
      passwordHash,
      role: "admin",
    });

    console.log("Cuenta administrativa creada correctamente.");
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin().catch((error) => {
  console.error("No se pudo crear el administrador:", error.message);
  process.exitCode = 1;
});
