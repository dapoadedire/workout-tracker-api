import express from "express";
import { getAllWorkouts, getWorkoutById, createWorkout, deleteWorkout, updateWorkout } from "../controllers/workout.controller.js";
import { requireAuth } from "../middlewares/user.middleware.js";

const router = express.Router();


router.use(requireAuth);

// Get all workouts
router.get("/", getAllWorkouts);

// Get a single workout by ID
router.get("/:id", getWorkoutById);

// Create a workout
router.post("/", createWorkout);

// Delete a workout by ID
router.delete("/:id", deleteWorkout);

// Update a workout by ID (you can add this if needed)
router.patch("/:id", updateWorkout);

export { router as workoutRoutes };
