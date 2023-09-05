import { WorkoutModel } from "../models/workout.model.js";

export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await WorkoutModel.findById(id);
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await WorkoutModel.create({ title, reps, load });
    res.status(201).json({
      message: "Workout created successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkout = await WorkoutModel.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};   

export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;

  try {
    // const updatedWorkout = await WorkoutModel.findByIdAndUpdate(
    //   id,
    //   { title, reps, load },
    //   { new: true }
    // );
    const updatedWorkout = await WorkoutModel.findByIdAndUpdate(
     { _id: id },
     ...req.body,
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
