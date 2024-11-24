const mongoose = require('mongoose');

// Replace this with your actual MongoDB URI, for example, `mongodb://localhost:27017/workouts`
const dbURI = "mongodb://localhost:27017/workouts"; // Use your actual database name

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error: " + err));

module.exports = mongoose;
