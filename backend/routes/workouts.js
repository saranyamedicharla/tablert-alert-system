const express = require('express')
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

router.get('/expiry-alerts', async (req, res) => {
  const today = new Date();
  const alertThreshold = 90; // Notify 7 days before expiry
  try {
    const Workouts = await Workout.find({
      reps: { $lt: new Date(today.setDate(today.getDate() + alertThreshold)) },
    });
    res.json(Workouts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expiry alerts', error: err });
  }
})
/// PATCH route to update medicine quantity
router.patch('/qty', async (req, res) => {
  const { load } = req.body
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, { load: load });
    if (!workout) return res.status(404).json({ error: '' });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});






module.exports = router