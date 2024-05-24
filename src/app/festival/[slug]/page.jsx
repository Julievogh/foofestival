// app/festival/[slug]/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./slugpage.module.css";
import Image from "next/image";
import LikeButton from "../../components/LikeButton";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import { fetchBandBySlug, fetchBandsAndSchedule } from "../../../lib/api/bands";

export default function Page({ params }) {
  const { slug } = params;
  const [bandData, setBandData] = useState(null);
  const [bandSchedule, setBandSchedule] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const paths = [
    { href: "/", label: "Home" },
    { href: "/festival", label: "Festival" },
    { href: `/festival/${slug}`, label: bandData.name },
  ];

  return (
    <main>
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
          />
        </div>
        <div>
          <p>Genre: {bandData.genre}</p>
          <p>{bandData.bio}</p>
          <h5>Members:</h5>
          <p>{bandData.members.join(", ")}</p>
        </div>
        <div>
          <p>When are they playing?</p>
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
