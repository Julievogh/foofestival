// app/components/Map.jsx
import React from "react";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ locations }) => {
  // Define the bounds of the image (southWest and northEast corners)
  const bounds = [
    [0, 0],
    [1000, 1000],
  ]; // Adjust this to the dimensions of your image

  return (
    <MapContainer
      center={[500, 500]} // Center the map at the center of the image
      zoom={-2} // Adjust zoom level as necessary
      style={{ height: "100vh", width: "100%" }}
      crs={CRS.Simple} // Use simple coordinate reference system for image overlay
    >
      <ImageOverlay url="/map.png" bounds={bounds} />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]}>
          <Popup>
            <strong>{location.name}</strong>
            <br />
            {location.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
