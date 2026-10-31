import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

const emailRule = body("email")
  .trim()
  .isEmail()
  .withMessage("Introduce un correo válido.")
  .normalizeEmail({
    gmail_remove_dots: false,
  });

const passwordRule = body("password")
  .isString()
  .withMessage("La contraseña es obligatoria.")
  .bail()
  .isLength({ min: 10, max: 72 })
  .withMessage("La contraseña debe tener entre 10 y 72 caracteres.");

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está configurado.");
  }

  return jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      subject: user._id.toString(),
      expiresIn: "2h",
    }
  );
}

// Registro de clientes
router.post(
  "/register",
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 2, max: 80 })
      .withMessage("El nombre debe tener entre 2 y 80 caracteres."),
    emailRule,
    passwordRule,
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Ya existe una cuenta con ese correo.",
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.create({
        name,
        email,
        passwordHash,
        role: "customer",
      });

      return res.status(201).json({
        success: true,
        message: "Cuenta creada correctamente.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Ya existe una cuenta con ese correo.",
        });
      }

      next(error);
    }
  }
);

// Inicio de sesión
router.post(
  "/login",
  [
    emailRule,
    body("password")
      .isString()
      .withMessage("La contraseña es obligatoria."),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({ email }).select("+passwordHash");

      if (
        !user ||
        !(await bcrypt.compare(password, user.passwordHash))
      ) {
        return res.status(401).json({
          success: false,
          message: "Correo o contraseña incorrectos.",
        });
      }

      const token = createToken(user);

      return res.json({
        success: true,
        message: "Inicio de sesión correcto.",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Consultar la sesión actual
router.get("/me", authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "La cuenta ya no existe.",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
