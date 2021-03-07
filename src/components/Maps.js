import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import marylandPrecincts from "../geojson/md_2016_w_ushouse.json"
import nyprecincts from "../geojson/ny_final.json"
import nydistricts from "../geojson/ny_cd.json"
import nystate from "../geojson/ny_state_bound.json"
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

    state = {
      Map: null,
      maps: [],
      tileLayer: null,
      geojsonLayer: null,
      geojson: null,
      OptionPage: true,
      StatsPage: false,
      FilterPage: false,
    };


    componentDidMount(){
      this.init();
    }
  
    //initializes the map
    init(){

      var container = L.DomUtil.get('map');
      if(container != null){
      container._leaflet_id = null;
      }
      var map = L.map('map').setView([37.8, -96], 5)
      this.setState({Map: map})
      map.zoomControl.setPosition('topleft')
      L.tileLayer('https://api.mapbox.com/styles/v1/worldcalling/cklvc0h5648r517o49ebf9d6q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid29ybGRjYWxsaW5nIiwiYSI6ImNrbHZjbjV4cjJvcXYycHBtMmJjaGZ0aHcifQ.68N60kfWy9s3PeNMuqnuQA').addTo(map)
  
      var NYStateLayer = L.geoJson(nystate, {
        style: function(feature) {
          if (feature.properties){
            return {color: 'black', fillColor: 'blue', opacity:0.5}
          }
        },
        onEachFeature: onEachStateFeature
      });
  
      function onEachStateFeature(feature, layer){
        layer.bindPopup(feature.properties.NAME)
        layer.on('mouseover', function(e) {
          if (this.feature){
            this.openPopup();
          }
        })
        layer.on('mouseout', function(e) {
          this.closePopup();
        })
      }
  
      //geojson for New York State Congressional Districtings
      var NYdistrictLayer = L.geoJson(nydistricts, {
        style: function(feature) {
          if (feature.properties){
            return {color: 'black', fillColor: getRandomColor(feature), opacity:0.5}
          }
        },
        onEachFeature: onEachDistrictFeature
      });
  
      
  
      function onEachDistrictFeature(feature, layer) {
        layer.bindPopup(feature.properties.NAMELSAD)
        layer.on('mouseover', function(e) {
          if (feature.properties){
            this.openPopup();
          }
        }
        )
        layer.on('mouseout', function(e) {
          this.closePopup();
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
  
      
  
      function onEachPrecinctFeature(feature, layer) {
        layer.bindPopup(feature.properties.NAMELSAD10)
        layer.on('mouseover', function(e) {
          if (feature.properties){
            this.openPopup();
          }
        })
        
        layer.on('mouseout', function(e) {
          this.closePopup();
        })
  
        //adding and removing layer
        layer.on('click', function(e) {
          map.removeLayer(NYprecinctLayer)
          alert('clicked and removed!')
        })
  
      }
      NYStateLayer.hideCode = "NYSTATE";
      NYdistrictLayer.hideCode = "NYDISTRICT"
      NYprecinctLayer.hideCode = "NYPRECINCT"
      map.addLayer(NYStateLayer)
      map.addLayer(NYdistrictLayer)
      map.addLayer(NYprecinctLayer)
      this.setState({maps: [NYStateLayer,NYdistrictLayer,NYprecinctLayer]})
      
      
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

    hidegeoJson(layer,state){
      state.removeLayer(layer)
      alert("layer removed test")
    }

    searchStateByHideCode(hideCode){
      for (var i = 0; i < this.state.maps.length; i++){
        if (this.state.maps[i].hideCode === hideCode){
          return this.state.maps[i]
        }
      }
    }

    hideComponent(name) {
      console.log(name);
      switch (name) {
        case "OptionPage":
          this.setState({ OptionPage: true });
          this.setState({ StatsPage: false });
          this.setState({ FilterPage: false });
          break;
        case "StatsPage":
          this.setState({ StatsPage: true });
          this.setState({ FilterPage: false });
          this.setState({ OptionPage: false });
          break;
        case "FilterPage":
          this.setState({ FilterPage: true });
          this.setState({ StatsPage: false });
          this.setState({ OptionPage: false });
          break;
        
      }
    }



    render(){
        return(
          
          <div id="map" style={{ width: '100vw', height: '100vh'}}>
            <div className="sidenav" style={{ position: 'absolute', textAlign: 'center', zIndex: 500}}>
                
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link "href="#"onClick={() => this.hideComponent("OptionPage")}>OPTIONS</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#" onClick={() => this.hideComponent("StatsPage")}>STATS</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#"onClick={() => this.hideComponent("FilterPage")}>FILTER</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>


                <div>
                <div className = "OptionPage" style={{visibility: this.state.OptionPage ? 'visible' : 'hidden' }}>
                    Toggle
                    <div className = "D1" onClick={()=>this.hidegeoJson(this.searchStateByHideCode("NYPRECINCT"),this.state.Map)}> Hide Precints
                    </div>
                </div>
                <div className = "StatsPage"style={{visibility: this.state.StatsPage ? 'visible' : 'hidden' }}>
                    stats
                    <div className = "D1"> Display Stats
                    </div>
                </div>
                <div className = "FilterPage"style={{visibility: this.state.FilterPage ? 'visible' : 'hidden' }}>
                    filter
                    <div className = "D1"> Display filter
                    </div>
                </div>
                


                </div>
            </div>
          </div>
      
        
        )
      }
    }

export default Maps;