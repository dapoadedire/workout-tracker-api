import express from "express";
import { getAllWorkouts, getWorkoutById, createWorkout, deleteWorkout, updateWorkout } from "../controllers/workouts.controller.js";

const routes = express.Router();

// Get all workouts
routes.get("/", getAllWorkouts);

// Get a single workout by ID
routes.get("/:id", getWorkoutById);

// Create a workout
routes.post("/", createWorkout);

// Delete a workout by ID
routes.delete("/:id", deleteWorkout);

// Update a workout by ID (you can add this if needed)
routes.patch("/:id", updateWorkout);

export { routes as workoutRoutes };
