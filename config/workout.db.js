import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const connecToMongoDB = () => {
  console.log("Trying to connect to MongoDB...");
  
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.log("MongoDB connection error:");
    console.error(error);
  });

  db.on("connected", () => {
    console.log("Connected to MongoDB successfully!");
  });
};
