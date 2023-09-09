import express from "express";
import dotenv from "dotenv";
import { workoutRoutes } from "./routes/workouts.route.js";
import { userRoutes } from "./routes/user.route.js";
import { connecToMongoDB } from "./config/workout.db.js";
import cors from "cors";
import { record } from "@logdrop/express";

dotenv.config();
connecToMongoDB();

const LOGDROP_API_KEY = process.env.LOGDROP_API_KEY


const app = express();
const PORT = process.env.PORT || 3000;

// log drop

app.use(record(LOGDROP_API_KEY))


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

// Workout routes
app.use("/api/workouts", workoutRoutes);


// User routes
app.use("/api/user", userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
