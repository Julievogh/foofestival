import React from "react";
import styles from "../../page.module.css";
import Image from "next/image";
import LikeButton from "../../components/LikeButton.jsx";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";

export default async function Page({ params }) {
  const { slug } = params;

  // Fetch band data
  const bandResponse = await fetch(
    `https://abyssinian-aeolian-gazelle.glitch.me/bands/${slug}`
  );
  if (!bandResponse.ok) {
    throw new Error("Failed to fetch band data");
  }
  const bandData = await bandResponse.json();

  // Fetch schedule data
  const scheduleResponse = await fetch(
    "https://abyssinian-aeolian-gazelle.glitch.me/schedule"
  );
  if (!scheduleResponse.ok) {
    throw new Error("Failed to fetch schedule data");
  }
  const scheduleData = await scheduleResponse.json();

  // Function to find the band's schedule
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

  // Breadcrumb paths
  const paths = [
    { href: "/", label: "Home" },
    { href: "/festival", label: "Festival" },
    { href: `/festival/${slug}`, label: bandData.name },
  ];

  return (
    <main>
      <div>
        <Breadcrumbs paths={paths} />
      </div>
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
