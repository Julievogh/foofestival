"use client";
import React, { useEffect, useState } from "react";
import styles from "./stages.module.css";
import Link from "next/link";
import { fetchBandsAndSchedule } from "../../lib/api/bands";
import Image from "next/image";

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [dayList, setDayList] = useState([]);
  const [selectedStage, setSelectedStage] = useState("All");

  useEffect(() => {
    async function fetchData() {
      try {
        const { bandsData, scheduleData } = await fetchBandsAndSchedule();
        const formattedData = formatScheduleData(scheduleData);
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

        <div className={styles.imageStages}>
          <div
            className={styles.imageContainer}
            onClick={() => handleStageSelect("Jotunheim")}
          >
            <p>Jotunheim</p>
            <Image src="/stage3.png" alt="Jotunheim" width={200} height={200} />
          </div>
          <div
            className={styles.imageContainer}
            onClick={() => handleStageSelect("Vanaheim")}
          >
            <p>Vanaheim</p>
            <Image src="/stage2.png" alt="Vanaheim" width={200} height={200} />
          </div>
          <div
            className={styles.imageContainer}
            onClick={() => handleStageSelect("Midgard")}
          >
            <p>Midgard</p>
            <Image src="/stage1.png" alt="Midgard" width={200} height={200} />
          </div>
        </div>

        <div className={styles.stageButtons}>
          <button onClick={() => handleStageSelect("All")}>All Stages</button>
        </div>

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
        <div className={styles.scheduleContainer}>
          {selectedDay && (
            <div key={selectedDay} className={styles.scheduleDay}>
              <h2>{selectedDay}</h2>
              <ul className={styles.scheduleList}>
                {Object.keys(scheduleData[selectedDay]).map((time) => (
                  <li key={time} className={styles.scheduleItem}>
                    <p className="font-semibold">Time: {time}</p>
                    {scheduleData[selectedDay][time]
                      .filter(
                        (band) =>
                          selectedStage === "All" ||
                          band.stage === selectedStage
                      )
                      .map((band, index) => (
                        <div
                          key={`${band.stage}-${band.start}-${band.act}`}
                          className={styles.bandItem}
                        >
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
