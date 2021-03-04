import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1Ijoid29ybGRjYWxsaW5nIiwiYSI6ImNrbHU3azhuOTBsOXcyb281eDg4eXpjMTMifQ.1zXi-fgg6Z9l8EK7OcyTKA'}
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
      </ReactMapGL>
    </div>
  );
}