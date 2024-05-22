// app/components/MapComponent.jsx
import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import("./Map"), {
  ssr: false, // This ensures the map is only rendered on the client side
});

const MapComponent = ({ locations }) => {
  return <Map locations={locations} />;
};

export default MapComponent;
