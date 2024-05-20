"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import LikeButton from "../components/LikeButton";
import Breadcrumbs from "../components/Breadcrumbs";
import { Pagination, Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

export default function FestivalPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allBands, setAllBands] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMethod, setSortMethod] = useState("none");
  const bandsPerPage = 12;
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const bandsUrl = "http://localhost:8080/bands";
      const scheduleUrl = "http://localhost:8080/schedule";

      const [bandsRes, scheduleRes] = await Promise.all([
        fetch(bandsUrl),
        fetch(scheduleUrl),
      ]);

      const bandsData = await bandsRes.json();
      const scheduleData = await scheduleRes.json();

      setAllBands(bandsData);
      setScheduleData(scheduleData);
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
    if (sortMethod === "stage") {
      return a.stage.localeCompare(b.stage);
    } else {
      return 0; // No sorting
    }
  });

  const bands = sortedBands.slice(indexOfFirstBand, indexOfLastBand);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleFavorites = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
    setCurrentPage(1); // Reset to the first page when toggling
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const getStageForBand = (bandName) => {
    for (const stage in scheduleData) {
      for (const day in scheduleData[stage]) {
        const acts = scheduleData[stage][day];
        for (const act of acts) {
          if (act === bandName) {
            return stage;
          }
        }
      }
    }
    return null; // If no stage found
  };

  return (
    <main>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs paths={paths} />
      </div>
      <div className={styles.mainBand}>
        <h1 className="ml-4">BANDS</h1>
        <div className={styles.sortBar}>
          <p onClick={toggleFavorites} style={{ cursor: "pointer" }}>
            Favorites
          </p>
          <Search
            placeholder="Search bands"
            onChange={handleSearchChange}
            style={{ width: 200 }}
          />
          <Select
            defaultValue="none"
            onChange={(value) => setSortMethod(value)}
            style={{ width: 200, marginLeft: "1rem" }}
          >
            <Option value="none">No Sort</Option>
            <Option value="Midgard">Midgard</Option>
            <Option value="Vanaheim">Vanaheim</Option>
            <Option value="Jotunheim">Jotunheim</Option>
          </Select>
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
                  <p>{getStageForBand(band.name)}</p> {/* Display stage info */}
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
