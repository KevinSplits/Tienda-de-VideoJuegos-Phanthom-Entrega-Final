import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log("Mongo URI:", uri); // Verifica si la URI está cargada correctamente

    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    // Conexión a MongoDB sin las opciones obsoletas
    await mongoose.connect(uri);

    console.log(">>> DB is connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Detiene la aplicación si hay un error en la conexión
  }
};