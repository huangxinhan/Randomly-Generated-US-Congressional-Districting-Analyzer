import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import Maps from './components/Maps'
import "./App.css";
export default function App() {

  // useEffect(()=>{
  //   console.log("working");
  //   fetch("http://localhost:8080/api/states")
  //   .then((response)=>response.json())
  //   .then((states)=>{
  //     console.log(states);
  //   });
  // }

  // );
  return (
    <div>
      <Maps/>
    </div>

  );
}