const Workout = require('../models/workout'); // Assuming you have a workout model defined

// Display all workouts
exports.getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.render('workouts', { title: 'Workouts List', WorkoutList: workouts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Display the form for creating a new workout
exports.createWorkoutForm = (req, res) => {
    res.render('create', { title: 'Create Workout' });
};

// Add a new workout to the database
exports.addWorkout = async (req, res) => {
    const { name, type, duration, description, intensity } = req.body;
    try {
        const newWorkout = new Workout({
            name,
            type,
            duration,
            description,
            intensity
        });
        await newWorkout.save();
        res.redirect('/workouts'); // Redirect to the workouts list
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Display the form for editing an existing workout
exports.editWorkoutForm = async (req, res) => {
    const workoutId = req.params.id;
    try {
        const workout = await Workout.findById(workoutId);
        if (!workout) {
            return res.status(404).send('Workout not found');
        }
        res.render('edit', { title: 'Edit Workout', workout });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Update a workout in the database
exports.updateWorkout = async (req, res) => {
    const workoutId = req.params.id;
    const { name, type, duration, description, intensity } = req.body;
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, {
            name,
            type,
            duration,
            description,
            intensity
        }, { new: true });

        if (!updatedWorkout) {
            return res.status(404).send('Workout not found');
        }

        res.redirect('/workouts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete a workout from the database
exports.deleteWorkout = async (req, res) => {
    const workoutId = req.params.id;
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
        if (!deletedWorkout) {
            return res.status(404).send('Workout not found');
        }
        res.redirect('/workouts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
