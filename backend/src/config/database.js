import mongoose from "mongoose";

export async function connectDatabase() {
  const connection = await mongoose.connect(process.env.MONGO_URI);

  console.log(
    `MongoDB conectado: ${connection.connection.name}`
  );
}
