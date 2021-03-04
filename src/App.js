import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";

class App extends React.Component {
  state = {
    viewport: {
      latitude: 39.8283,
      longitude: -98.5795,
      zoom: 4.25
    }
  };

  render(){
    return(
      <div>
        <ReactMapboxGL
          {...this.state.viewport}
          style={{width: "100vw", height: "100vh"}}
          mapStyle="mapbox://styles/mapbox/light-v9"
          accessToken={'pk.eyJ1Ijoid29ybGRjYWxsaW5nIiwiYSI6ImNrbHV6ZW1mazA0YmMybnFvb3VxcXA0ejQifQ.t_Hw0W0XVxTZcbS4NsrFlw'}
          onViewportChange={viewport => this.setState({ viewport })}
        ></ReactMapboxGL>
      </div>
    )
  }
}

export default App
