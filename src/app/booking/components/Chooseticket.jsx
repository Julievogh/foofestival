import React, { useState } from 'react';

export const Chooseticket = () => {
  const [spots, setSpots] = useState([]);
  const [error, setError] = useState(null);

  const fetchAvailableSpots = async () => {
    try {
      const response = await fetch('http://localhost:8080/available-spots');
      if (!response.ok) {
        throw new Error('Failed to fetch available spots');
      }
      const data = await response.json();
      setSpots(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Choose Ticket</h2>
      <button onClick={fetchAvailableSpots}>Fetch Available Spots</button>
      {error && <p>Error: {error}</p>}
      <ul>
  {spots.map((spot, index) => (
    <li key={index}>
      <ul>
        {Object.entries(spot).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>
    </div>
  );
};
