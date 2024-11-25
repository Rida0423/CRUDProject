//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let workoutModel = mongoose.Schema({
    Title: String,
    Duration: String,
    Type: String,
    Description: String,
},
{
    collection:"Workouts"
});
module.exports =mongoose.model('Workout',workoutModel);
