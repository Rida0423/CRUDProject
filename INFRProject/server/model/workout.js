const mongoose = require("mongoose");

let workoutModel = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'Workout Name is required'],
      trim: true  // Trim whitespace
    },
    Duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute']  // Ensure duration is positive
    },
    Type: {
      type: String,
      required: [true, 'Type of workout is required'],
      enum: ['Cardio', 'Strength Training', 'Flexibility', 'HIIT'], // Restrict values
      trim: true
    },
    Description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true  // Trim whitespace
    },
    CaloriesBurned: {
      type: Number,
      required: [true, 'Calories burned is required'],
      min: [0, 'Calories burned cannot be negative'],  // Ensure calories is non-negative
      default: 0  // Default to 0 if not provided
    }
  },
  {
    collection: "Workouts", // Explicitly name the collection
    timestamps: true  // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the Workout model
module.exports = mongoose.model("Workout", workoutModel);
