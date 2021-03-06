import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import marylandPrecincts from "../geojson/md_2016_w_ushouse.json"
import nyprecincts from "../geojson/ny_final.json"
import nydistricts from "../geojson/ny_cd.json"
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

    //geojson for New York State Congressional Districtings
    var NYdistrictLayer = L.geoJson(nydistricts, {
      style: function(feature) {
        if (feature.properties){
          return {color: 'black', fillColor: 'blue', opacity:0.5}
        }
      },
      onEachFeature: onEachStateFeature
    });

    map.addLayer(NYdistrictLayer)

    function onEachStateFeature(feature, layer) {
      layer.bindPopup(feature.properties.NAMELSAD)
      layer.on('mouseover', function(e) {
        if (feature.properties){
          this.openPopup();
        }
      })
    }

    //geojson for New York State precincts
    
    var NYprecinctLayer = L.geoJson(nyprecincts, {
      style: function(feature) {
        if (feature.properties){
          return {color: 'black', fillColor: getRandomColor(feature), opacity:0.5}
        }
      },
      onEachFeature: onEachPrecinctFeature
    });

    map.addLayer(NYprecinctLayer)

    function onEachPrecinctFeature(feature, layer) {
      layer.bindPopup(feature.properties.NAMELSAD10)
      layer.on('mouseover', function(e) {
        if (feature.properties){
          this.openPopup();
        }
      })

      //adding and removing layer
      layer.on('click', function(e) {
        map.removeLayer(NYprecinctLayer)
        alert('clicked and removed!')
      })

    }
    
    //Generates a random coloring for each district
    function getRandomColor(feature){
      var precinct_color = new Map()
      var keyString = feature.properties.NAME10 + feature.properties.COUNTY_NAM;
      if(precinct_color.has(keyString)){
        return precinct_color.get(keyString)
      }

      var letters = "0123456789ABCDEF"
      var color = "#"
      for (var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
      }
      precinct_color.set(keyString, color)
      return color 
    }

  }

    render(){
        return(
          <div id="map" style={{ width: '100vw', height: '100vh'}}></div>
        )
      }
    }

export default Maps;