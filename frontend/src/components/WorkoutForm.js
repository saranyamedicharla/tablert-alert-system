import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState(''); // load (qty)
  const [reps, setReps] = useState(''); // reps (expiry date)
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]); // Ensure it's an array

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!user) {
      setError('You must be logged in');
      return;
    }

    // Prepare workout data to be sent
    const workout = { title, load, reps };

    // Send the POST request to the server
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    // Handle the response based on the status code
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []); // Ensure emptyFields is an array
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]); // Clear the empty fields
      dispatch({ type: 'CREATE_WORKOUT', payload: json }); // Dispatch the newly created workout
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>

      {/* Title field */}
      <label>Tablet Name:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields?.includes('title') ? 'error' : ''} // Optional chaining
      />

      {/* Load (Qty) field */}
      <label>Qty:</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields?.includes('load') ? 'error' : ''} // Optional chaining
      />

      {/* Expiry Date field */}
      <label>Expiry Date:</label>
      <input 
        type="date"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields?.includes('reps') ? 'error' : ''} // Optional chaining
      />

      {/* Submit button */}
      <button>Add Product</button>

      {/* Error message */}
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
