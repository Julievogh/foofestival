"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import LikeButton from "../components/LikeButton";
import Breadcrumbs from "../components/Breadcrumbs";
import { Pagination, Select, Input } from "antd";

const { Option } = Select;
const { Search } = Input;

export default function FestivalPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allBands, setAllBands] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortMethod, setSortMethod] = useState("name-asc");
  const [searchQuery, setSearchQuery] = useState("");
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
  const likedBands = JSON.parse(localStorage.getItem("likedBands")) || [];
  const filteredBands = showFavorites
    ? allBands.filter((band) => likedBands.includes(band.slug))
    : allBands.filter((band) =>
        band.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const sortedBands = [...filteredBands].sort((a, b) => {
    if (sortMethod === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortMethod === "name-desc") {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  const bands = sortedBands.slice(indexOfFirstBand, indexOfLastBand);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleFavorites = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
    setCurrentPage(1); // Reset to the first page when toggling
  };

  const handleSortChange = (value) => {
    setSortMethod(value);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <main>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs paths={paths} />
      </div>
      <div className={styles.mainBand}>
        <h1 className="ml-4">BANDS</h1>
        <div className={styles.sortBar}>
          <Select
            defaultValue="name-asc"
            style={{ width: 120 }}
            onChange={handleSortChange}
          >
            <Option value="name-asc">Name A-Z</Option>
            <Option value="name-desc">Name Z-A</Option>
          </Select>
          <p onClick={toggleFavorites} style={{ cursor: "pointer" }}>
            Favorites
          </p>
          <Search
            placeholder="Search bands"
            onChange={handleSearchChange}
            style={{ width: 200 }}
          />
        </div>
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
                    width={200}
                    height={200}
                  />
                  <h5 className={styles.bandName}>{band.name}</h5>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={filteredBands.length}
          pageSize={bandsPerPage}
          onChange={paginate}
        />
      </div>
    </main>
  );
}
