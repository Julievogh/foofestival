import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../page.module.css";

const BandPage = ({ slug }) => {
  const [band, setBand] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Current slug:", slug); // Log the current slug for debugging

    const fetchBandData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bands/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch band data");
        }
        const data = await response.json();
        setBand(data);
      } catch (error) {
        console.error("Error fetching band data:", error);
        setError(error.message);
      }
    };

    fetchBandData();
  }, [slug]);

  // Log the band data for debugging
  console.log("Band data:", band);

  if (!band) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{band.name}</h1>
      <div>
        <Image
          src={band.logo.startsWith("https://") ? band.logo : `http://localhost:8080/logos/${band.logo}`}
          alt={band.name}
          width={200}
          height={200}
        />
        <h5>{band.name}</h5>
      </div>
      <p>{band.bio}</p>
    </div>
  );
};

export default BandPage;
