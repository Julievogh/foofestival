"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../page.module.css";

export default function BandPage({ slug }) {
  const [band, setBand] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch(`http://localhost:8080/bands/${slug}`)
        .then((response) => response.json())
        .then((data) => setBand(data))
        .catch((error) => console.error("Error fetching band details:", error));
    }
  }, [slug]);

  if (!band) {
    return <div>Band not found</div>;
  }

  return (
    <main className={styles.mainBand}>
      <div>
        <h1>{band.name}</h1>
        <Image src={`http://localhost:8080/logos/${band.logo}`} alt={band.name} width={200} height={200} />
        <p>{band.bio}</p>
        {/* Render other band details here */}
        <ul></ul>
      </div>
    </main>
  );
}
