import React, { useState } from "react";
import { useSearchParams } from "next/navigation";


const Chooseticket = () => {
  const searchParams = useSearchParams();
  const ticketType = searchParams.get("type");

  const [spots, setSpots] = useState([]);
  const [error, setError] = useState(null);

  const fetchAvailableSpots = async () => {
    try {
      const response = await fetch("http://localhost:8080/available-spots");
      if (!response.ok) {
        throw new Error("Failed to fetch available spots");
      }
      const data = await response.json();
      setSpots(data);
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(ticketType);

  return (
    <div>
      {ticketType === "Regular" ? (
        <>
          <h2>Regular Ticket</h2>
          <p>Standard bathing</p>
          <p>Box toilets</p>
        </>
      ) : (
        <>
          <h2>VIP ticket</h2>
          <p>Luxury bathing</p>
          <p>Golden toilets</p>
        </>
      )}

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

export default Chooseticket;
