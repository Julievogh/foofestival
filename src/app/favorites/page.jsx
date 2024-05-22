"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import LikeButton from "../components/LikeButton";
import Breadcrumbs from "../components/Breadcrumbs";
import { Pagination } from "antd";
import { fetchBands } from "../../lib/api/bands";

export default function FavoritePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteBands, setFavoriteBands] = useState([]);
  const bandsPerPage = 12;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavoriteBands() {
      if (typeof window !== "undefined") {
        try {
          setLoading(true);
          const likedBands =
            JSON.parse(localStorage.getItem("likedBands")) || [];
          const allBands = await fetchBands();
          const favoriteBandsData = allBands.filter((band) =>
            likedBands.includes(band.slug)
          );
          setFavoriteBands(favoriteBandsData);
        } catch (error) {
          console.error("Error fetching favorite bands:", error);
        } finally {
          setLoading(false);
        }
      }
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
                        : `https://abyssinian-aeolian-gazelle.glitch.me/logos/${band.logo}`
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
