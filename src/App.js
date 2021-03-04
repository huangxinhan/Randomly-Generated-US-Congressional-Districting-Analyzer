import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import marylandPrecincts from "./geojson/md_2016_w_ushouse.geojson"

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
        >
        <Source
          id="mdprecincts"
          type="geojson"
          data={marylandPrecincts}
        />
        <Layer
          id="MarylandPrecincts"
          type="fill"
          source="mdprecincts"
          paint={{
            
            "fill-color": "#228b22",
            "fill-opacity": 0.4
          }}
        />
        </ReactMapboxGL>
      </div>
    )
  }
}

export default App
