
import { Router } from "express";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact.js";

const router = Router();

router.post(
  "/",
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 2, max: 80 })
      .withMessage("El nombre debe tener entre 2 y 80 caracteres."),

    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Introduce un correo válido."),

    body("subject")
      .isString()
      .trim()
      .isLength({ min: 3, max: 120 })
      .withMessage("El asunto debe tener entre 3 y 120 caracteres."),

    body("message")
      .isString()
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage("El mensaje debe tener entre 10 y 2000 caracteres."),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, email, subject, message } = req.body;

      const contact = await Contact.create({
        name,
        email,
        subject,
        message,
      });

      return res.status(201).json({
        success: true,
        message: "Tu mensaje fue enviado correctamente.",
        contactId: contact._id,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
