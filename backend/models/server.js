const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the Medicine and Workout models
const Medicine = require('./Medicine'); // Ensure this path is correct
const Workout = require('./Workout'); // Ensure this path is correct

require('./routes/cronJob'); // Import cron job

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust as necessary
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Example route to add a new medicine
app.post('/api/medicines/add', async (req, res) => {
  const { name, expiryDate, userEmail } = req.body;

  try {
    const newMedicine = new Medicine({ name, expiryDate, userEmail });
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(400).json({ error: 'Error adding medicine' });
  }
});

// PATCH route to update workout quantity
app.patch('/api/workouts/qty/:id', async (req, res) => {
  const { load } = req.body; // Get the new load value from the request body
  const { id } = req.params; // Get the workout ID from the request parameters

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(id, { load }, { new: true });

    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(updatedWorkout); // Return the updated workout
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
