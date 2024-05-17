"use client";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:8080/schedule";
      const bandurl = "http://localhost:8080/bands";
      const res = await fetch(url);
      const resband = await fetch(bandurl);
      const data = await res.json();
      const banddata = await resband.json();
      setScheduleData(data);
    }
    fetchData();
  }, []);

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
                      <li key={band.act}>{band.act}</li>
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
