import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [subtractQty, setSubtractQty] = useState(0); // For input field
  const [error, setError] = useState(null); // To handle any errors
  const [successMessage, setSuccessMessage] = useState(""); // To handle success messages

  const handleClick = async () => {
    if (!user) {
      console.warn("User not authenticated.");
      return;
    }

    // Delete workout
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      console.log("Delete Response:", response);
      console.log("Delete JSON:", json);

      if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: json });
        setSuccessMessage("Workout deleted successfully!"); // Success feedback
      } else {
        setError(json.error || "Failed to delete workout");
      }
    } catch (err) {
      setError("Something went wrong!");
      console.error("Error deleting workout:", err);
    }
  };

  const handleUpdateQty = async () => {
    if (!user) {
      console.warn("User not authenticated.");
      return;
    }
  
    if (isNaN(subtractQty) || subtractQty < 0) {
      setError("Please enter a valid quantity.");
      return;
    }
  
    const updatedQty = Math.max(0, workout.load - subtractQty);
    console.log("Updated Quantity:", updatedQty);
  
    try {
      const response = await fetch(`http://localhost:3000/api/workouts/qty/${workout._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ load: updatedQty }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      const json = await response.json();
  
      console.log("Update Response:", response);
      console.log("Update JSON:", json);
  
      if (response.ok) {
        dispatch({ type: 'UPDATE_WORKOUT', payload: json });
        setError(null);
        setSuccessMessage("Quantity updated successfully!");
      } else {
        setError(json.error || "Failed to update quantity");
        console.error("Response not OK:", json.error); // Log error
      }
    } catch (err) {
      setError("Something went wrong!");
      console.error("Error updating quantity:", err);
      console.error("Error details:", err); // Log the error object for debugging
    }
  };
  

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Qty: </strong>{workout.load}</p>
      <p><strong>Expiry Date: </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>

      {/* Input field to subtract quantity */}
      <input
        type="number"
        min="0"
        value={subtractQty}
        onChange={(e) => setSubtractQty(Number(e.target.value))}
        placeholder="Enter number"
      />

      {/* Button to update quantity */}
      <button onClick={handleUpdateQty}>Update Qty</button>

      {/* Error message */}
      {error && <p className="error">{error}</p>}
      
      {/* Success message */}
      {successMessage && <p className="success">{successMessage}</p>}

      {/* Delete button */}
      <span onClick={handleClick} style={{ color: "red", cursor: "pointer" }}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
