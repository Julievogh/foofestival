"use client";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [dayList, setDayList] = useState([]);
  const [selectedStage, setSelectedStage] = useState("All");

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
        const days = Object.keys(formattedData);
        setDayList(days);
        setSelectedDay(days[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

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

  const handlePreviousDay = () => {
    const currentIndex = dayList.indexOf(selectedDay);
    if (currentIndex > 0) {
      setSelectedDay(dayList[currentIndex - 1]);
    }
  };

  const handleNextDay = () => {
    const currentIndex = dayList.indexOf(selectedDay);
    if (currentIndex < dayList.length - 1) {
      setSelectedDay(dayList[currentIndex + 1]);
    }
  };

  const handleStageSelect = (stage) => {
    setSelectedStage(stage);
  };

  return (
    <main>
      <div className={styles.mainBand}>
        <h1 className="ml-4">Schedule</h1>
        <Link href="/festival" className={styles.buttonLink}>
          Bands
        </Link>

        <div className={styles.navigation}>
          <button
            onClick={handlePreviousDay}
            disabled={dayList.indexOf(selectedDay) === 0}
          >
            Previous Day
          </button>
          <span>{selectedDay}</span>
          <button
            onClick={handleNextDay}
            disabled={dayList.indexOf(selectedDay) === dayList.length - 1}
          >
            Next Day
          </button>
        </div>

        <div className={styles.stageButtons}>
          <button onClick={() => handleStageSelect("All")}>All Stages</button>
          <button onClick={() => handleStageSelect("Midgard")}>Midgard</button>
          <button onClick={() => handleStageSelect("Vanaheim")}>
            Vanaheim
          </button>
          <button onClick={() => handleStageSelect("Jotunheim")}>
            Jotunheim
          </button>
        </div>
        <div className={styles.stages}>
          {selectedDay && (
            <div key={selectedDay}>
              <p className="text-lg font-bold">{selectedDay}</p>
              <ul>
                {Object.keys(scheduleData[selectedDay]).map((time) => (
                  <li key={time}>
                    <p className="font-semibold">Headline: {time}</p>
                    {scheduleData[selectedDay][time]
                      .filter(
                        (band) =>
                          selectedStage === "All" ||
                          band.stage === selectedStage
                      )
                      .map((band) => (
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
