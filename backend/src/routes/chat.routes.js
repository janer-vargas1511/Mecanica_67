
import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_INSTRUCTION = `
Eres el asistente virtual de Mecánicas Six-Seven (Mec67),
una empresa dedicada a la venta de repuestos y servicios automotrices.

Tus funciones son:
- Orientar a los clientes sobre repuestos y servicios.
- Resolver preguntas frecuentes.
- Ayudar a los clientes a identificar qué tipo de repuesto necesitan.
- Ofrecer información general sobre mantenimiento automotriz.

Reglas:
- Responde siempre en español.
- Sé amable, claro y profesional.
- Utiliza respuestas concretas y fáciles de entender.
- No inventes precios, existencias ni disponibilidad.
- Si no conoces un dato específico, recomienda contactar al equipo.
- No afirmes que has realizado compras, reservas o pedidos.
`;

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        success: false,
        message: "El servicio de IA no está configurado.",
      });
    }

    if (
      typeof message !== "string" ||
      message.trim().length < 1 ||
      message.length > 2000
    ) {
      return res.status(400).json({
        success: false,
        message: "El mensaje debe tener entre 1 y 2000 caracteres.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message.trim(),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    const reply = response.text;

    if (!reply) {
      return res.status(502).json({
        success: false,
        message: "Gemini no pudo generar una respuesta.",
      });
    }

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("Error en Gemini:", error.message);

    return res.status(500).json({
      success: false,
      message: "No fue posible procesar tu consulta.",
    });
  }
});

export default router;
