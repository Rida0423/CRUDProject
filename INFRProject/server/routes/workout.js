var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// Telling my router that I have this model
let Workout = require('../model/workout'); // Make sure this points to your workout model
const workoutController = require('../controllers/workout.js');

/* Get route for the workout list - Read Operation */
router.get('/', async (req, res, next) => {
  try {
    const workoutList = await Workout.find();
    res.render('workout/list', {
      title: 'Workouts',
      workoutList: workoutList
    });
  } catch (err) {
    console.error(err);
    res.render('workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Create Operation --> Get route for displaying the Add Page */
router.get('/add', async (req, res, next) => {
  try {
    res.render('workout/add', {
      title: 'Add Workout'
    });
  } catch (err) {
    console.error(err);
    res.render('workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Create Operation --> Post route for processing the Add Page */
router.post('/add', async (req, res, next) => {
  try {
    let newWorkout = new Workout({
      "Name": req.body.Name,
      "Duration": req.body.Duration,
      "Type": req.body.Type,
      "Description": req.body.Description,
      "CaloriesBurned": req.body.CaloriesBurned
    });

    Workout.create(newWorkout).then(() => {
      res.redirect('/workouts');
    });
  } catch (err) {
    console.error(err);
    res.render('workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const workoutToEdit = await Workout.findById(id);
    res.render('workout/edit', {
      title: 'Edit Workout',
      workout: workoutToEdit
    });
  } catch (err) {
    console.error(err);
    next(err); // passing the error
  }
});

/* Update Operation --> Post route for processing the Edit Page */
router.post('/edit/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let updatedWorkout = new Workout({
      "_id": id,
      "Name": req.body.Name,
      "Duration": req.body.Duration,
      "Type": req.body.Type,
      "Description": req.body.Description,
      "CaloriesBurned": req.body.CaloriesBurned
    });

    Workout.findByIdAndUpdate(id, updatedWorkout).then(() => {
      res.redirect('/workouts');
    });
  } catch (err) {
    console.error(err);
    res.render('workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    Workout.deleteOne({ _id: id }).then(() => {
      res.redirect('/workouts');
    });
  } catch (err) {
    console.error(err);
    res.render('workout/list', {
      error: 'Error on the server'
    });
  }
});

module.exports = router;
