//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let workoutModel = mongoose.Schema({
    Name: String,
    Duration: Number,
    Type: String,
    Description: String,
    CaloriesBurned: Number
},
{
    collection:"Workouts"
});
module.exports =mongoose.model('Workout',workoutModel);
