
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Discos de Freno Carbón",
    category: "frenos",
    label: "Frenos",
    description: "Máxima disipación de calor para frenado intenso.",
    price: 450000,
    image: "Discos.jpg",
    featured: true,
  },
  {
    name: "Pastillas de Freno",
    category: "frenos",
    label: "Frenos",
    description: "Frenado seguro y eficiente para tu vehículo.",
    price: 180000,
    image: "pastillas.jpg",
  },
  {
    name: "Kit de Embrague",
    category: "motores",
    label: "Motor",
    description: "Componentes para una transmisión eficiente.",
    price: 850000,
    image: "Kit.jpg",
  },
  {
    name: "Terminales de Dirección",
    category: "suspension",
    label: "Suspensión",
    description: "Estabilidad y precisión en la dirección.",
    price: 125000,
    image: "Terminal.jpg",
  },
  {
    name: "Batería Pro-Performance",
    category: "iluminacion",
    label: "Eléctrico",
    description: "Energía confiable para el sistema eléctrico.",
    price: 380000,
    image: "bateria_ODYSSEY.jpg",
  },
  {
    name: "Amortiguador Reforzado",
    category: "suspension",
    label: "Suspensión",
    description: "Mayor estabilidad y comodidad en carretera.",
    price: 520000,
    image: "amortiguador.jpg",
  },
  {
    name: "Bomba de Agua Alto Flujo",
    category: "motores",
    label: "Motor",
    description: "Circulación eficiente del refrigerante.",
    price: 310000,
    image: "Bomba.jpg",
  },
  {
    name: "Kit Aceite Sintético",
    category: "motores",
    label: "Motor",
    description: "Protección y rendimiento para tu motor.",
    price: 210000,
    image: "Kit_aceite.jpg",
  },
  {
    name: "Bujía de Iridio Laser",
    category: "motores",
    label: "Motor",
    description: "Encendido preciso y eficiente.",
    price: 95000,
    image: "bujia.jpg",
  },
  {
    name: "Alternador Inteligente",
    category: "iluminacion",
    label: "Eléctrico",
    description: "Carga confiable para el sistema eléctrico.",
    price: 740000,
    image: "alternador.jpg",
  },
  {
    name: "Iluminación LED Headlight",
    category: "iluminacion",
    label: "Eléctrico",
    description: "Iluminación de alto rendimiento.",
    price: 600000,
    image: "iluminacion.jpg",
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado.");

    let inserted = 0;
    let updated = 0;

    for (const product of products) {
      const result = await Product.updateOne(
        { name: product.name },
        {
          $set: product,
          $setOnInsert: {
            stock: null,
          },
        },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        inserted++;
      } else if (result.modifiedCount > 0) {
        updated++;
      }
    }

    console.log("Migración finalizada.");
    console.log(`Productos registrados: ${inserted}`);
    console.log(`Productos actualizados: ${updated}`);

    const total = await Product.countDocuments();

    console.log(`Total de productos en MongoDB: ${total}`);
  } catch (error) {
    console.error("Error al migrar productos:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
