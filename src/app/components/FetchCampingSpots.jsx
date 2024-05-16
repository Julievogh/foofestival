import React, { useState, useEffect } from "react";

const FetchCampingSpots = ({ children }) => {
  const [spots, setSpots] = useState([]);
  const [error, setError] = useState(null);

  const fetchCampingSpots = async () => {
    try {
      const response = await fetch("http://localhost:8080/available-spots");
      if (!response.ok) {
        throw new Error("Failed to fetch available spots");
      }
      const data = await response.json();
      // Filtrer spots med available=0 fra
      const filteredSpots = data.filter(spot => spot.available !== 0);
      setSpots(filteredSpots);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCampingSpots();
  }, []);

  return children({ spots, error });
};

export default FetchCampingSpots;
