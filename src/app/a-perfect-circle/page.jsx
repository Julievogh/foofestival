"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

const BandDetails = () => {
  const [band, setBandData] = useState(null);

  useEffect(() => {
    const fetchBandData = async () => {
      const response = await fetch("http://localhost:8080/bands/a-perfect-circle");
      const data = await response.json();
      setBandData(data);
    };
  }, []);

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

export default BandDetails;
