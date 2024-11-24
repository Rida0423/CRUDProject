const express = require('express');
const router = express.Router();
const Workout = require('../models/workout'); // Import the Workout model

// Get all workouts (Read operation)
router.get('/', async (req, res, next) => {
  try {
    const workouts = await Workout.find(); // Fetch all workouts from the database
    res.render('workout/list', { 
      title: 'Workout List', 
      workouts: workouts 
    });
  } catch (err) {
    console.error(err);
    next(err);  // Pass error to the next middleware
  }
});

// Get the Add workout form (Create operation)
router.get('/add', (req, res) => {
  res.render('workout/add', {
    title: 'Add Workout'
  });
});

// Add a new workout (Create operation)
router.post('/add', async (req, res, next) => {
  try {
    // Create a new workout based on the form data
    const newWorkout = new Workout({
      Name: req.body.Name,
      Duration: req.body.Duration,
      Type: req.body.Type,
      Description: req.body.Description,
      CaloriesBurned: req.body.CaloriesBurned
    });

    // Save the new workout to the database
    await newWorkout.save();
    res.redirect('/workouts');  // Redirect to the workout list page after saving
  } catch (err) {
    console.error(err);
    res.render('workout/add', { 
      title: 'Add Workout', 
      error: 'Error while saving the workout' 
    });
  }
});

// Edit an existing workout (Update operation) --> Get route
router.get('/edit/:id', async (req, res, next) => {
  try {
    const workoutToEdit = await Workout.findById(req.params.id);  // Find workout by ID
    if (!workoutToEdit) {
      return res.status(404).send('Workout not found');  // Handle case where workout is not found
    }
    res.render('workout/edit', {
      title: 'Edit Workout',
      workout: workoutToEdit
    });
  } catch (err) {
    console.error(err);
    next(err);  // Pass error to the next middleware
  }
});

// Process the update of a workout (Update operation) --> Post route
router.post('/edit/:id', async (req, res, next) => {
  try {
    const updatedWorkout = {
      Name: req.body.Name,
      Duration: req.body.Duration,
      Type: req.body.Type,
      Description: req.body.Description,
      CaloriesBurned: req.body.CaloriesBurned
    };

    // Find the workout by ID and update it
    await Workout.findByIdAndUpdate(req.params.id, updatedWorkout);
    res.redirect('/workouts');  // Redirect to the workout list page after update
  } catch (err) {
    console.error(err);
    res.render('workout/edit', { 
      title: 'Edit Workout', 
      error: 'Error while updating the workout' 
    });
  }
});

// Delete a workout (Delete operation)
router.get('/delete/:id', async (req, res, next) => {
  try {
    // Find the workout by ID and delete it
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/workouts');  // Redirect to the workout list page after deletion
  } catch (err) {
    console.error(err);
    next(err);  // Pass error to the next middleware
  }
});

module.exports = router;
