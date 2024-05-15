"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const FavoritesPage = () => {
  const [favoriteBands, setFavoriteBands] = useState([]);

  useEffect(() => {
    try {
      const likedBandsJSON = localStorage.getItem("likedBands");
      console.log("Liked bands JSON:", likedBandsJSON); // Log the retrieved data
      if (likedBandsJSON) {
        const likedBands = JSON.parse(likedBandsJSON).filter((band) => band !== null);
        fetchFavoriteBands(likedBands);
      } else {
        console.log("No favorite bands found in localStorage");
        // Handle case when likedBands data is empty or not set
      }
    } catch (error) {
      console.error("Error parsing likedBands JSON:", error);
      // Handle parsing error gracefully, e.g., display error message to the user
    }
  }, []);

  const fetchFavoriteBands = async (likedBands) => {
    // Fetch band data for liked bands
    const requests = likedBands.map(async (slug) => {
      const response = await fetch(`http://localhost:8080/bands/${slug}`);
      if (response.ok) {
        return response.json();
      }
      return null;
    });
    const favoriteBandsData = await Promise.all(requests);
    const filteredFavoriteBands = favoriteBandsData.filter((band) => band !== null && band.slug);
    setFavoriteBands(filteredFavoriteBands);
  };

  return (
    <main>
      <h1>Favorite Bands</h1>
      <ul>
        {favoriteBands.map((band) => (
          <li key={band.slug}>
            <div>
              <Image
                src={band.logo.startsWith("https://") ? band.logo : `http://localhost:8080/logos/${band.logo}`}
                alt={band.name}
                width={200}
                height={200}
              />
              <h5>{band.name}</h5>
            </div>
            <p>Genre: {band.genre}</p>
            {/* Other band details */}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default FavoritesPage;
