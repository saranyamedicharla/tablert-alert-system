// components/MedicineList.js
import React, { useState, useEffect } from 'react'

const MedicineList = () => {
  const [Workouts, setWorkouts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Fetch all medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch('http://localhost:5500/api/Workouts/');
      const data = await response.json();
      setWorkouts(data);
    };
    fetchMedicines();
  }, [])

  // Fetch expiry alerts (medicines that are about to expire)
  useEffect(() => {
    const fetchExpiryAlerts = async () => {
      const response = await fetch('http://localhost:5000/api/Workouts/expiry-alerts');
      const data = await response.json();
      setAlerts(data);
    }
    fetchExpiryAlerts();
  }, [Workouts])

  
  return (
    <div>
      <h1>Medicines</h1>
      <ul>
        {medicines.map((med) => (
          <li key={med._id}>
            {med.name} - Expiry Date: {new Date(med.reps).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <h2>Expiry Alerts</h2>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((med) => (
            <li key={med._id}>
              {med.name} is expiring on {new Date(med.reps).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No medicines are expiring soon!</p>
      )}
    </div>
  )
}

export default MedicineList