"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

import Breadcrumbs from "../components/Breadcrumbs";
import { Pagination } from "antd";
export default function FestivalPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allBands, setAllBands] = useState([]);
  const bandsPerPage = 12;

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:8080/bands";
      const res = await fetch(url);
      const allBandsData = await res.json();
      setAllBands(allBandsData);
    }
    fetchData();
  }, []);

  const paths = [
    { href: "/", label: "Home" },
    { href: "/festival", label: "Festival" },
  ];

  const indexOfLastBand = currentPage * bandsPerPage;
  const indexOfFirstBand = indexOfLastBand - bandsPerPage;
  const bands = allBands.slice(indexOfFirstBand, indexOfLastBand);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs paths={paths} />
      </div>
      <div className={styles.mainBand}>
        <h1 className="ml-4">BANDS</h1>
        <div className={styles.sortBar}>
          <p>Sort</p>
          <p>Favorites</p>
        </div>
        <ul className={styles.grid}>
          {bands.map((band) => (
            <li className={styles.bandItem} key={band.slug}>
              <Link href={`/festival/${band.slug}`}>
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
        <Pagination defaultCurrent={1} total={allBands.length} pageSize={bandsPerPage} onChange={paginate} />
      </div>
    </main>
  );
}
