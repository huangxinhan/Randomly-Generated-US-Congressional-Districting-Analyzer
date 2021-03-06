import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import marylandPrecincts from "../geojson/md_2016_w_ushouse.json"
import nyprecincts from "../geojson/ny_final.json"
import mapboxgl from "mapbox-gl"
import L, { layerGroup } from 'leaflet'
import "leaflet/dist/leaflet.css"

let config = {};
config.params = {
  center: [39.8283,-98.5795],
  zoomControl: false,
  zoom: 4.25,
  maxZoom: 19,
  minZoom: 1,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true
};
config.tileLayer = {
  url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.pn',
};

class Maps extends Component{
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      geojson: null,
    };
    this._mapNode = null;
  }

  componentDidMount(){
    var map = L.map('map').setView([37.8, -96], 5)
    map.zoomControl.setPosition('topleft')
    L.tileLayer('https://api.mapbox.com/styles/v1/worldcalling/cklvc0h5648r517o49ebf9d6q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid29ybGRjYWxsaW5nIiwiYSI6ImNrbHZjbjV4cjJvcXYycHBtMmJjaGZ0aHcifQ.68N60kfWy9s3PeNMuqnuQA').addTo(map)

    L.geoJson(nyprecincts, {
      style: function(feature) {
        if (feature.properties){
          return {color: 'red', opacity:0.7}
        }
      },
      onEachFeature: onEachStateFeature
    }).addTo(map);

    function onEachStateFeature(feature, layer) {
      layer.bindPopup(feature.properties.NAMELSAD10)
      layer.on('mouseover', function(e) {
        if (feature.properties){
          this.openPopup();
        }
      })
    }

    
  }

    render(){
        return(
          <div id="map" style={{ width: '100vw', height: '100vh'}}></div>
        )
      }
    }

export default Maps;