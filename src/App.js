import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import Maps from './components/Maps'
import "./App.css";
export default function App() {

  return (
    <div>
      <Maps/>
    </div>

  );
}