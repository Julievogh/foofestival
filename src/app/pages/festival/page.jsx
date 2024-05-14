"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../page.module.css";

export default function ResultPage({ searchParams }) {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/bands`)
      .then((response) => response.json())
      .then((data) => setBands(data));
  }, []);

  return (
    <main className={styles.mainBand}>
      <div>
        <h1 className="ml-4">BANDS</h1>
        <div className={styles.sortBar}>
          <p>Sort</p>
          <p>Favorites</p>
        </div>

        <ul className={styles.grid}>
          {bands.map((band) => (
            <li className={styles.bandItem} key={band.slug}>
              <Link href={`/festival/band/${encodeURIComponent(band.slug)}`}>
                <div className={styles.imageContainer}>
                  <Image
                    src={band.logo.startsWith("https://") ? band.logo : `http://localhost:8080/logos/${band.logo}`}
                    alt={band.name}
                    width={200}
                    height={200}
                  />
                  <h5 className={styles.bandName}>{band.name}</h5>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
