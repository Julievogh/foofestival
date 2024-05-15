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
    <article>
      <div className="flex justify-between p-3">
        <div>
          {ticketType === "Regular" ? (
            <>
              <div className="flex justify-start">
                <p className="text-xl self-center">&bull;</p>
                <div className="p-2">
                  <p><strong>Regular ticket</strong></p>
                  <p>Price including fee:</p>
                  <p>899,-</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-start">
                <p className="text-xl self-center">&bull;</p>
                <div className="p-2">
                  <p className="text-lg"><strong>VIP ticket</strong></p>
                  <p>Price including fee:</p>
                  <p>1399,-</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center">
  <button className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center">+</button>
  <p className="mx-4">0</p>
  <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-400">-</button>
</div>

      </div>

      <div className="border border-blue-500 border-solid border-2">
        <h3>Choose camping area:</h3>
        <button onClick={fetchAvailableSpots}>Fetch Available Spots</button>
        {error && <p>Error: {error}</p>}
        <ul>
          {spots.map((spot, index) => (
            <li key={index}>
              <ul className="flex justify-between">
                {Object.entries(spot).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
                <p>&bull;</p>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Chooseticket;
