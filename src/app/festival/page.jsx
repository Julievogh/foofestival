"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";

export default function ResultPage({ searchParams }) {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    function fetchData() {
      fetch(`http://localhost:8080/bands`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(
          (data) => {
            setBands(data);
          },
          (error) => {
            console.error("Error fetching bands:", error);
          }
        );
    }

    fetchData();
  }, []);

  return (
    <>
      <main className={styles.mainBand}>
        <div>
          <h1 className="ml-4">BANDS</h1>
          <div className={styles.sortBar}>
            <p>Sort</p>
            <p>Favorites</p>
          </div>
          <ul className={styles.grid}>
            {bands.map((band, index) => (
              <li key={index} className={styles.bandItem}>
                <div className={styles.imageContainer}>
                  {band.logo.startsWith("https://") ? (
                    <Image src={band.logo} alt={band.name} width={200} height={200} />
                  ) : (
                    <Image src={`http://localhost:8080/logos/${band.logo}`} alt={band.name} width={200} height={200} />
                  )}
                  <h5 className={styles.bandName}>{band.name}</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
