"use client";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:8080/schedule";
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();

        const formattedData = formatScheduleData(data);
        setScheduleData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Function to format schedule data
  function formatScheduleData(data) {
    const formattedData = {};
    for (const stage in data) {
      formattedData[stage] = {};
      for (const day in data[stage]) {
        formattedData[stage][day] = data[stage][day].map((band) => ({
          ...band,
          originalAct: band.act,
          formattedAct: band.act
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[-\s]+/g, "-"),
        }));
      }
    }
    return formattedData;
  }

  return (
    <main>
      <div className={styles.mainBand}>
        <h1 className="ml-4">Schedule</h1>
        <h2>Stages</h2>
        <div className={styles.stages}>
          {Object.keys(scheduleData).map((stage) => (
            <div key={stage}>
              <h3>{stage}</h3>
              {Object.keys(scheduleData[stage]).map((day) => (
                <div key={day}>
                  <p className="text-lg font-bold">{day}</p>
                  <ul>
                    {scheduleData[stage][day].map((band) => (
                      <li key={band.formattedAct}>
                        {band.formattedAct.toLowerCase() !== "break" ? (
                          <Link
                            href={`/festival/${band.formattedAct}`}
                            className={styles.bandLink}
                          >
                            <strong>{band.originalAct}</strong>
                          </Link>
                        ) : (
                          <strong>{band.originalAct}</strong>
                        )}
                        <p>
                          {band.start} - {band.end}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
