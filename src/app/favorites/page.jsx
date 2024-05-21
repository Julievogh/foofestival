"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import LikeButton from "../components/LikeButton";
import Breadcrumbs from "../components/Breadcrumbs";
import { Pagination } from "antd";

export default function FavoritePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteBands, setFavoriteBands] = useState([]);
  const bandsPerPage = 12;

  useEffect(() => {
    async function fetchFavoriteBands() {
      const likedBands = JSON.parse(localStorage.getItem("likedBands")) || [];
      const url = "http://localhost:8080/bands";
      const res = await fetch(url);
      const allBands = await res.json();
      const favoriteBandsData = allBands.filter((band) =>
        likedBands.includes(band.slug)
      );
      setFavoriteBands(favoriteBandsData);
    }
    fetchFavoriteBands();
  }, []);

  const paths = [
    { href: "/", label: "Home" },
    { href: "/favorites", label: "Favorites" },
  ];

  const indexOfLastBand = currentPage * bandsPerPage;
  const indexOfFirstBand = indexOfLastBand - bandsPerPage;
  const bands = favoriteBands.slice(indexOfFirstBand, indexOfLastBand);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs paths={paths} />
      </div>
      <div className={styles.mainBand}>
        <h1 className="ml-4">FAVORITES</h1>
        <ul className={styles.grid}>
          {bands.map((band) => (
            <li className={styles.bandItem} key={band.slug}>
              <div className={styles.imageContainer}>
                <LikeButton slug={band.slug} className={styles.likeButton} />
                <Link href={`/festival/${band.slug}`}>
                  <Image
                    src={
                      band.logo.startsWith("https://")
                        ? band.logo
                        : `http://localhost:8080/logos/${band.logo}`
                    }
                    alt={band.name}
                    layout="fill" 
                  />
                </Link>
              </div>
              <h5 className={styles.bandName}>{band.name}</h5>
            </li>
          ))}
        </ul>
        <Pagination
          defaultCurrent={1}
          total={favoriteBands.length}
          pageSize={bandsPerPage}
          onChange={paginate}
        />
      </div>
    </main>
  );
}
