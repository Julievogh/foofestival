"use client";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState({});
  const [selectedDay, setSelectedDay] = useState("");

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
        setSelectedDay(Object.keys(formattedData)[0]); // Default to the first day
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
      for (const day in data[stage]) {
        if (!formattedData[day]) {
          formattedData[day] = {};
        }
        data[stage][day].forEach((band) => {
          if (!formattedData[day][band.start]) {
            formattedData[day][band.start] = [];
          }
          formattedData[day][band.start].push({
            ...band,
            stage,
          });
        });
      }
    }
    return formattedData;
  }

  return (
    <main>
      <div className={styles.mainBand}>
        <h1 className="ml-4">Schedule</h1>
        <h2>Stages</h2>
        {/* Dropdown menu for selecting a day */}
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className={styles.dayDropdown}
        >
          {Object.keys(scheduleData).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <div className={styles.stages}>
          {selectedDay && (
            <div key={selectedDay}>
              <p className="text-lg font-bold">{selectedDay}</p>
              <ul>
                {Object.keys(scheduleData[selectedDay]).map((time) => (
                  <li key={time}>
                    <p className="font-semibold">Headline: {time}</p>
                    {scheduleData[selectedDay][time].map((band) => (
                      <div key={`${band.stage}-${band.start}-${band.act}`}>
                        {band.act.toLowerCase() !== "break" ? (
                          <Link
                            href={`/festival/${band.act
                              .toLowerCase()
                              .replace(/[^\w\s-]/g, "")
                              .replace(/[-\s]+/g, "-")}`}
                            className={styles.bandLink}
                          >
                            <strong>{band.act}</strong>
                          </Link>
                        ) : (
                          <strong>{band.act}</strong>
                        )}
                        <p>
                          {band.start} - {band.end} ({band.stage})
                        </p>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
