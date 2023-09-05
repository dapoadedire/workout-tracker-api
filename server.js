import express from "express";
import dotenv from "dotenv";
import { workoutRoutes } from "./routes/workouts.route.js";
import { connecToMongoDB } from "./config/workout.db.js";
import cors from "cors";



dotenv.config();
connecToMongoDB();



const app = express();
const PORT = process.env.PORT || 3000;

// Cors
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Workout Tracker API!" });
});

// Define your routes here
app.use("/api/workouts", workoutRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
