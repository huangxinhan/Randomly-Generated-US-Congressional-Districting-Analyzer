import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import marylandPrecincts from "../geojson/md_2016_w_ushouse.json"
import nyprecincts from "../geojson/ny_final.json"
import nydistricts from "../geojson/ny_cd.json"
import nystate from "../geojson/ny_state_bound.json"
import pastate from "../geojson/pa_state_bound.json"
import mdstate from "../geojson/md_state_bound.json"
import mapboxgl from "mapbox-gl"
import L, { layerGroup } from 'leaflet'
import "leaflet/dist/leaflet.css"
import "./com.css";

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { NativeSelect } from '@material-ui/core';


class Maps extends Component{
  constructor(props) {
    super(props)
    this.state = {
      current_state: null,
      Map: null,
      maps: [],
      maps_backup: [],
      current_state_layer: null, //the current state layer
      center: [38.0902,-83.7129],
      zoom: 4.5,
      centerNY: [43.2994,-74.2179],
      centerPA: [41.2033, -77.1945],
      centerMD: [39.0458,-76.6413],
      tileLayer: null,
      geojsonLayer: null,
      geojson: null,
      OptionPage: true,
      StatsPage: false,
      FilterPage: false,
      activeStep: 0, //start at step 1, select state
      

      //Option page

      checkerA: false,

      checkerB: false,
      //STATS page
      IsExpanded: false,
      // FITER page

      MajorityMinority: 10,
      Compactness: 0,
      PopulationEquality:0,
      Objective: [0,0],
    }
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

    componentDidMount(){
      this.init();
    }
  
    //initializes the map
    init(){

      var container = L.DomUtil.get('map');
      if(container != null){
      container._leaflet_id = null;
      }
      var map = L.map('map').setView(this.state.center, this.state.zoom)
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

      var PAStateLayer = L.geoJson(pastate, {
        style: function(feature) {
          if (feature.properties){
            return {color: 'black', fillColor: 'blue', opacity: 0.5}
          }
        },
        onEachFeature: onEachStateFeature
      })
  
      var MDStateLayer = L.geoJson(mdstate, {
        style: function(feature) {
          if (feature.properties){
            return {color: 'black', fillColor: 'blue', opacity: 0.5}
          }
        },
        onEachFeature: onEachStateFeature
      })


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
        //layer.on('click', function(e) {
          //map.removeLayer(NYprecinctLayer)
          //alert('clicked and removed!')
        //})
  
      }
      NYStateLayer.hideCode = "NYSTATE";
      NYdistrictLayer.hideCode = "NYDISTRICT"
      NYprecinctLayer.hideCode = "NYPRECINCT"
      PAStateLayer.hideCode = "PASTATE"
      MDStateLayer.hideCode = "MDSTATE"
      //add them to the backup
      //backup is set up like [nystate, nydistrict, nyprecinct, PAstate, PAdistrict, PAprecinct, MDstate, MDdistrict, Mdprecinct]. Load them using the respective index. 
      this.setState({maps_backup: [NYStateLayer, NYdistrictLayer, NYprecinctLayer, PAStateLayer, null, null, MDStateLayer, null, null]})
      this.setState({maps: [NYStateLayer, NYdistrictLayer, NYprecinctLayer, PAStateLayer, null, null, MDStateLayer, null, null]})
      

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
    }

    hidegeoJson(layer,state){
      state.removeLayer(layer)
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
    toggleExpanded() {
      this.setState({ IsExpanded: !this.state.IsExpanded });
    }


    setActiveStep(prev_active_step, direction){
      if (direction == "forward" && prev_active_step < 4){
        this.setState({activeStep: prev_active_step + 1})
      }
      if (direction == "backward" && prev_active_step > 0){
        this.setState({activeStep: prev_active_step - 1})
      }
    }

    //this can also handle the zooming of the map and stuff 
    handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({current_state: event.target.value})

      if (this.state.current_state_layer){
        this.state.Map.removeLayer(this.state.current_state_layer);
      }

      if (value === "New York"){
        this.setState({center: this.state.centerNY, zoom: 7, current_state_layer: this.state.maps_backup[0]}, 
          () => {
            this.state.Map.flyTo(this.state.center, this.state.zoom);
            this.state.Map.addLayer(this.state.current_state_layer)
          })  
      }

      else if (value === "Pennsylvania"){
        this.setState({center: this.state.centerPA, zoom: 7, current_state_layer: this.state.maps_backup[3]}, 
          () => {
            this.state.Map.flyTo(this.state.center, this.state.zoom)
            this.state.Map.addLayer(this.state.current_state_layer)
          })
        this.state.Map.flyTo(this.state.center, this.state.zoom)
      }

      else if (value === "Maryland"){
        this.setState({center: this.state.centerMD, zoom: 7, current_state_layer: this.state.maps_backup[6]}, 
          () => {
            this.state.Map.flyTo(this.state.center, this.state.zoom)
            this.state.Map.addLayer(this.state.current_state_layer)
          })
        this.state.Map.flyTo(this.state.center, this.state.zoom)
      }

    };

    getStepContent(stepIndex){
      switch(stepIndex) {
        case 0:
          return <div>
                  <h3>Select a State</h3> 
                    <FormControl className="Form1">
                      <InputLabel htmlFor="state-native-helper">State</InputLabel>
                        <NativeSelect
                          value={this.state.current_state}
                          onChange={this.handleChange}
                          inputProps={{
                          name: 'Click To Select A State',
                          id: 'state-native-helper',}}>
                          <option aria-label="None" value="" />
                          <option value={"New York"}>New York</option>
                          <option value={"Pennsylvania"}>Pennsylvania</option>
                          <option value={"Maryland"}>Maryland</option>
                        </NativeSelect>
                      <FormHelperText>Click to select a state</FormHelperText>
                    </FormControl>

                  
                </div>
        case 1:
          return <div>Step 2</div>
        case 2:
          return <div>Step 3</div>
        case 3:
          return <div>Step 4</div>
        case 4:
          return <div>Step 5</div>
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
              <div className="filternav" style={{ position: 'absolute', textAlign: 'center', zIndex: 500}}>
                <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">

                  <div>
                    <h5>  &nbsp;&nbsp;&nbsp;Current State</h5>
                    <h5>{this.state.current_state}</h5>
                </div>

                  <button class='btn btn-secondary btn-lg' 
                    style={{position: 'absolute', textAlign: 'center', margin: 0, zIndex: 501, left: '30px', top: "250px"}}
                    onClick={()=>{this.state.Map.flyTo(this.state.center, this.state.zoom)}}>Re-Center
                  </button>
                  

                  <div className = {OptionPage} style={{ textAlign:'left', margin: 0, left: '20px', top: '20px'}}>
                    <div className = "D1" > 
                    <br/><br/><br/><br/><br/>
                    <div>
                    Show Precincts                        
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
                    </div>

                    <div className = {OptionPage} style={{ textAlign:'left', margin: 0, left: '20px', top: '70px'}}>
                    <div className = "D1" > 
                    <div>
                    Default Districtings
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
             

                </nav>
              </div>

            </div>

            <div className="sidenav" style={{ position: 'absolute', textAlign: 'center', zIndex: 500}}>
              <Stepper activeStep={this.state.activeStep} alternativeLabel>
                <Step>
                  <StepLabel>
                    State Selection
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    Custom Job Selection
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    Set Custom Constraints
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    Set Custom Measures 
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    Analyze Districtings
                  </StepLabel>
                </Step>
              </Stepper>

              <h3>
               {this.getStepContent(this.state.activeStep)}
              </h3>
              <Button variant="outlined" color="primary" onClick={() => this.setActiveStep(this.state.activeStep, "backward")}> Previous Step</Button>
              <Button variant="outlined" color="primary" onClick={() => this.setActiveStep(this.state.activeStep, "forward")}>Next Step</Button>
            </div>

          </div>
            
      
        
        )
      }
    }

export default Maps;