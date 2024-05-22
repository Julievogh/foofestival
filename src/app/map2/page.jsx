"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const Page = () => {
  const mapRef = useRef(null);
  const markersRef = useRef({
    foodStall: [51.52, -0.145],
    stage1: [51.525, -0.142],
    stage2: [51.52, -0.147],
    toilets: [51.523, -0.149],
  });
  const circleRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.L) {
      import("leaflet").then((L) => {
        const map = L.map("map").setView([51.52, -0.145], 15);
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

  const handleSpotClick = (spot) => {
    const map = mapRef.current;
    const marker = markersRef.current[spot];
    if (map && marker) {
      map.setView(marker.getLatLng(), 16);
      marker.openPopup();

      if (spot === "foodStall") {
        if (circleRef.current) {
          map.removeLayer(circleRef.current);
        }
        circleRef.current = L.circle(marker.getLatLng(), {
          color: "red",
          fillColor: "#f03",
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

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "600px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div id="map" style={{ width: "800px", height: "600px" }}></div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {Object.keys(markersRef.current).map((spot) => (
          <button key={spot} onClick={() => handleSpotClick(spot)}>
            {spot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Page;
