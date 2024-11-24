var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workout Home' });
});
/* GET workout list page. */
router.get('/workouts', function(req, res, next) {
  res.render('workouts', { title: 'Workouts List' });
});


/* GET workout details page. */
router.get('/workout/:id', function(req, res, next) {
  const workoutId = req.params.id;
  res.render('workout', { title: `Workout ${workoutId} Details` });
});

/* GET create workout page. */
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Create New Workout' });
});

/* GET update workout page. */
router.get('/edit/:id', function(req, res, next) {
  const workoutId = req.params.id;
  res.render('edit', { title: `Edit Workout ${workoutId}` });
});

/* GET delete workout page. */
router.get('/delete/:id', function(req, res, next) {
  const workoutId = req.params.id;
  res.render('delete', { title: `Delete Workout ${workoutId}` });
});

module.exports = router;