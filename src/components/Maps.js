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
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import "./com.css";
import Switch from '@material-ui/core/Switch';

let config = {};
config.params = {
  center: [39.8283,-98.5795],
  centerNY: [43.2994,-74.2179],
  centerMD: [],
  centerPA: [],
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

function valuetext(value) {
  return `${value}%`;
}

class Maps extends Component{

    state = {
      Map: null,
      maps: [],
      maps_backup: [],
      center: [39.8283,-98.5795],
      centerNY: [43.2994,-74.2179],
      centerMD: [],
      centerPA: [],
      tileLayer: null,
      geojsonLayer: null,
      geojson: null,
      OptionPage: true,
      StatsPage: false,
      FilterPage: false,

      //Option page

      checkerA: false,

      checkerB: false,

      // FITER page

      MajorityMinority: 10,
      Compactness: 0,
      PopulationEquality:0,
      Objective: [0,0],
    };


    componentDidMount(){
      this.init();
    }
  
    //initializes the map
    init(){

      var container = L.DomUtil.get('map');
      if(container != null){
      container._leaflet_id = null;
      }
      var map = L.map('map').setView(this.state.centerNY, 7)
      this.setState({Map: map})
      map.zoomControl.setPosition('bottomleft')
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
      //map.addLayer(NYdistrictLayer)
      //map.addLayer(NYprecinctLayer)
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

    handleMajorChange = (event, newValue) => {

      this.setState({MajorityMinority :  newValue });


    };

    handleComChange = (event , newValue) => {

      this.setState({Compactness:  newValue });


    };
 
    handlePChange = (event , newValue) => {

      

      this.setState({PopulationEquality:  newValue});

      


    };

    handleObjChange = (event , newValue) => {

      this.setState({Objective: newValue});

      


    };

    checkerAchange = (event) =>
    {
      this.setState({checkerA:  event.target.checked});

      //this.hidegeoJson(this.searchStateByHideCode("NYPRECINCT"),this.state.Map)
      if (this.state.checkerA === false){
        this.showgeoJson(this.searchStateByHideCode("NYPRECINCT"), this.state.Map)
      }
      else if (this.state.checkerA === true){
        this.hidegeoJson(this.searchStateByHideCode("NYPRECINCT"),this.state.Map)
      }
    }

    checkerBchange = (event) =>
    {
      this.setState({checkerB:  event.target.checked});

      if (this.state.checkerB === false){
        this.showgeoJson(this.searchStateByHideCode("NYDISTRICT"), this.state.Map)
      }
      else if (this.state.checkerB === true){
        this.hidegeoJson(this.searchStateByHideCode("NYDISTRICT"), this.state.Map)
      }

    }

    showgeoJson(layer,state){
      state.addLayer(layer)
      //alert("Precinct Data loaded!")
    }

    hidegeoJson(layer,state){
      state.removeLayer(layer)
      //alert("Precinct Data unloaded!")
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
      let OptionPage  = "PageDisable";

      if (this.state.OptionPage) {
          OptionPage  = "OptAble"
      };

      let StatsPage  = "PageDisable";

      if (this.state.StatsPage) {
        StatsPage  = "SatAble"
      };

      let FilterPage  = "PageDisable";

      if (this.state.FilterPage) {
        FilterPage  = "FilAble"
      };
        return(
          <div>

          <div id="map" style={{ width: '100vw', height: '100vh'}}> 
            <button class='btn btn-secondary btn-lg' 
            style={{position: 'absolute', zIndex: 500}}
            onClick={()=>{this.state.Map.flyTo(this.state.centerNY, 7)}}>Re-Center</button>
          </div>
          <div className="sidenav" style={{ position: 'absolute', textAlign: 'center', zIndex: 500}}>
                
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="nav-item col-md-4">
                        <a class="nav-link "href="#"onClick={() => this.hideComponent("OptionPage")}>OPTIONS</a>
                        </div>
                        <div class="nav-item col-md-4">
                        <a class="nav-link" href="#" onClick={() => this.hideComponent("StatsPage")}>STATS</a>
                        </div>
                        <div class="nav-item col-md-4">
                        <a class="nav-link" href="#"onClick={() => this.hideComponent("FilterPage")}>FILTER</a>
                        </div>
                </nav>


                <div>
                <div className = {OptionPage}>
                    Toggle
                    <div className = "D1" style={{ textAlign:'left'}}> 
                    <div>
                    SHOW PRECINCTS                            
                    <div></div>
                    OFF
                      <Switch
                        checked={this.state.checkedA}
                        onChange={this.checkerAchange}
                        color="primary"
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                      ON
                    </div>
                    
                    </div>

                    <div className = "D1" > 
                    <div>
                    SHOW DEFAULT DISTRICTING          
                    <div></div>
                    OFF
                      <Switch
                        checked={this.state.checkedB}
                        onChange={this.checkerBchange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                      ON
                    </div>
                    
                    </div>
                </div>
                <div className = {StatsPage} >
                    <div className = "D2"> Display Stats
                    </div>
                </div>
                <div className = {FilterPage} >
                
                   <div className = "S1"> 

                   <Typography id="discrete-slider" gutterBottom>
                    Majority Minority
                    </Typography>
                    <Slider 
                      defaultValue={this.state.MajorityMinority}
                      getAriaValueText={valuetext}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={0}
                      max={100}
                      onChange={this.handleMajorChange}
                    />
                  </div>

                  <div className = "S1"> 

                   <Typography id="discrete-slider" gutterBottom>
                    Compactness
                    </Typography>
                    <Slider 
                      defaultValue={this.state.Compactness}
                      getAriaValueText={valuetext}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={10}
                      onChange={this.handleComChange}
                    />
                  </div>

                  <div className = "S1"> 

                   <Typography id="discrete-slider" gutterBottom>
                   Population Equality
                    </Typography>
                    <Slider 
                      defaultValue={this.state.PopulationEquality}
                      getAriaValueText={valuetext}
                      aria-labelledby="range-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={10}
                      onChange={this.handlePChange}
                    />
                  </div>

                  <div className = "S1"> 

                   <Typography id="discrete-slider" gutterBottom>
                   Objective Function Score Range
                    </Typography>
                    <Slider 
                      defaultValue={this.state.Objective}
                      getAriaValueText={valuetext}
                      aria-labelledby="range-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={20}
                      onChange={this.handleObjChange}
                    />
                  </div>

                  <hr  style={{
                    color: '"#3719e4"',
                    backgroundColor: '"#3719e4"',
                    height: 3,
                    borderColor : '"#3719e4"'
                  }}/>

                    <div className = "D3"> Filter Summary
                    </div>
                    <div className = "D4"> Majority Minority：   {Number (this.state.MajorityMinority)}
                    </div>

                    <div className = "D4"> Compactness：   {this.state.Compactness}
                    </div>

                    <div className = "D4"> Population Equality：   {this.state.PopulationEquality}
                    </div>

                    <div className = "D4"> Objective Function Score Range：   {this.state.Objective[0]} - {this.state.Objective[1]}
                    </div>


                </div>
                


                </div>
            </div>

          </div>
            
      
        
        )
      }
    }

export default Maps;