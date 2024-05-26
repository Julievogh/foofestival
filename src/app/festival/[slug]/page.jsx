// app/festival/[slug]/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./slugpage.module.css";
import Image from "next/image";
import LikeButton from "../../components/LikeButton";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import { fetchBandBySlug, fetchBandsAndSchedule } from "../../../lib/api/bands";
import { getDominantColor } from "../../../lib/api/colorThief";

export default function Page({ params }) {
  const { slug } = params;
  const [bandData, setBandData] = useState(null);
  const [bandSchedule, setBandSchedule] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    async function fetchData() {
      try {
        const bandData = await fetchBandBySlug(slug);
        const { scheduleData } = await fetchBandsAndSchedule();

        const findBandSchedule = (scheduleData, bandName) => {
          const scheduleInfo = [];
          for (const stage in scheduleData) {
            for (const day in scheduleData[stage]) {
              scheduleData[stage][day].forEach((entry) => {
                if (entry.act === bandName) {
                  scheduleInfo.push({
                    day,
                    stage,
                    start: entry.start,
                    end: entry.end,
                  });
                }
              });
            }
          }
          return scheduleInfo;
        };

        const bandSchedule = findBandSchedule(scheduleData, bandData.name);

        // Get the dominant color from the band image
        let dominantColor;
        try {
          dominantColor = await getDominantColor(
            bandData.logo.startsWith("https://")
              ? bandData.logo
              : `https://abyssinian-aeolian-gazelle.glitch.me/logos/${bandData.logo}`
          );
        } catch (error) {
          console.error("Error fetching dominant color:", error);
          dominantColor = [255, 255, 255]; // Default to white
        }
        setBgColor(`rgb(${dominantColor.join(",")})`);

        setBandData(bandData);
        setBandSchedule(bandSchedule);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bandData) return <div>Loading...</div>;

  const paths = [
    { href: "/", label: "Home" },
    { href: "/festival", label: "Festival" },
    { href: `/festival/${slug}`, label: bandData.name },
  ];

  return (
    <main style={{ backgroundColor: bgColor }}>
      <Breadcrumbs paths={paths} />
      <div className={styles.mainBand}>
        <h1>{bandData.name}</h1>
        <div className={styles.imageContainer}>
          <LikeButton slug={bandData.slug} className={styles.likeButton} />
          <Image
            src={
              bandData.logo.startsWith("https://")
                ? bandData.logo
                : `https://abyssinian-aeolian-gazelle.glitch.me/logos/${bandData.logo}`
            }
            alt={bandData.logoCredits}
            width={200}
            height={200}
            onError={(e) => {
              e.target.src = "/path/to/default-image.jpg"; // Fallback image
            }}
          />
        </div>
        <div
          className={styles.infoSection}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <h6>Bio:</h6>
          <p>{bandData.bio}</p>
          <h6>Members:</h6>
          <p>{bandData.members.join(", ")}</p>
          <p>Genre: {bandData.genre}</p>
        </div>
        <div
          className={styles.infoSection}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <h6>When are they playing?</h6>
          {bandSchedule.length > 0 ? (
            bandSchedule.map((entry, index) => (
              <p key={index}>
                {entry.day}, {entry.start} - {entry.end} at {entry.stage}
              </p>
            ))
          ) : (
            <p>No schedule information available.</p>
          )}
        </div>
        <Link href="/stages" className={styles.buttonLink}>
          Schedule
        </Link>
      </div>
    </main>
  );
}
