// app/map/page.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

const Page = () => {
  const mapRef = useRef(null);
  const markersRef = useRef({
    FoodStalls: [51.523, -0.156],
    Exit: [51.52645, -0.1475],
    Midgard: [51.524, -0.135],
    Vanaheim: [51.5194, -0.143],
    Jotunheim: [51.523, -0.149],
    Toilets: [51.515, -0.144],
  });
  const circleRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      resetMap();
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.L) {
      import("leaflet").then((L) => {
        const map = L.map("map").setView([51.52, -0.145], calculateInitialZoom());
        mapRef.current = map;

        const imageUrl = "/map.png";
        const imageBounds = map.getBounds();
        const imageOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);

        Object.keys(markersRef.current).forEach((spot) => {
          const [lat, lng] = markersRef.current[spot];
          const marker = L.marker([lat, lng]).addTo(map).bindPopup(spot);

          marker.on("click", () => handleSpotClick(spot));
          markersRef.current[spot] = marker;
        });
      });
    }
  }, []);

  const calculateInitialZoom = () => {
    return windowWidth <= 600 ? 14 : 15;
  };

  const resetMap = () => {
    const map = mapRef.current;
    if (map) {
      const zoomLevel = calculateInitialZoom();
      map.setView([51.52, -0.145], zoomLevel);
    }
  };

  const handleSpotClick = (spot) => {
    const map = mapRef.current;
    const marker = markersRef.current[spot];
    if (map && marker) {
      map.setView(marker.getLatLng(), 16);
      marker.openPopup();

      if (spot === "FoodStalls" || spot === "Toilets") {
        if (circleRef.current) {
          map.removeLayer(circleRef.current);
        }
        circleRef.current = L.circle(marker.getLatLng(), {
          color: spot === "FoodStalls" ? "red" : "blue",
          fillColor: spot === "FoodStalls" ? "#f03" : "#03f",
          fillOpacity: 0.5,
          radius: 50,
        }).addTo(map);
      } else {
        if (circleRef.current) {
          map.removeLayer(circleRef.current);
          circleRef.current = null;
        }
      }
    }
  };

  const handleZoomOut = () => {
    resetMap();
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.h1}>Map</h1>
      <div className={styles.buttonContainer}>
        {Object.keys(markersRef.current).map((spot) => (
          <button key={spot} onClick={() => handleSpotClick(spot)} className={styles.button}>
            {spot}
          </button>
        ))}
        <button onClick={handleZoomOut} className={`${styles.button} ${styles.zoomOutButton}`}>
          Zoom Out
        </button>
      </div>
      <div className={styles.mapContainer}>
        <div id="map" className={styles.map}></div>
      </div>
    </div>
  );
};

export default Page;
