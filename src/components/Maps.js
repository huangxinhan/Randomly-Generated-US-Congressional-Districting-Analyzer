import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import marylandPrecincts from "../geojson/md_2016_w_ushouse.json"
import nyprecincts from "../geojson/ny_final.json"
import nydistricts from "../geojson/ny_cd.json"
import nystate from "../geojson/ny_state_bound.json"
import pastate from "../geojson/pa_state_bound.json"
import mdstate from "../geojson/md_state_bound.json"
import boxandwhisker from "../geojson/box_and_whisker.PNG"
import newyorkimage from "../geojson/NewYorkPng.PNG"
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
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
  return `${value}%`;
}

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
      current_district: null,
      current_districting1: null,
      current_districting2: null,
      category: null,
      

      //Option page

      checkerA: false,

      checkerB: false,
      //STATS page
      IsExpanded: false,
      // FITER page

      MajorityMinority: 0,
      Compactness: 0,
      PopulationEquality:0,
      Objective: [0,0],


      //Step3, slect options texts

      CompactnessType:'',
      ConstrainType:'',
      //third one is not needed.↓

      

      // step3, corresponding slider values to options
      GraphCompactness:0,
      PopulationFatness:0,
      PolsbyPopper:0,

      TotalPopulation:0,
      VotingAgePopulation:0,
      CitizenVotingAgePopulation:0,

      MajorityMinorityDistricts:0,

      //belows are used to update slider value based on different option selections.

      CompactnessTypeSliderValue:0,
      ConstrainTypeSliderValue:0,
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
        layer.bindPopup( feature.properties.NAMELSAD + "     " +  " Population: 717,820, Incumbent: John Doe, Split Counties: 0, Democratic Voter percentage: 57.4%, Republic Voter Percentage: 32.6%")
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
    
    //page 3 optionbox and slider update functions
    handleCompactnessTypeChange = (event) => {
      this.setState({CompactnessType: event.target.value})

      if(event.target.value === "graph compactness"){
        this.setState({CompactnessTypeSliderValue: this.state.GraphCompactness})
        console.log(this.state.CompactnessTypeSliderValue)
      }
      else if(event.target.value === "population fatness"){
        this.setState({CompactnessTypeSliderValue: this.state.PopulationFatness})
        console.log(this.state.CompactnessTypeSliderValue)
      }
      else if(event.target.value==="Polsby-Popper"){
        this.setState({CompactnessTypeSliderValue: this.state.PolsbyPopper})
        console.log(this.state.CompactnessTypeSliderValue)
      }
      else{
        this.setState({CompactnessTypeSliderValue:0})
      }
      
    }
    handleChangeCompactnessTypeSliderValue = (event,value)=>{
      this.setState({CompactnessTypeSliderValue: value})

      if(this.state.CompactnessType === "graph compactness"){
        this.setState({GraphCompactness: value })
        // console.log(this.state.GraphCompactness)
      }
      else if(this.state.CompactnessType  === "population fatness"){
        this.setState({PopulationFatness: value})
        // console.log(this.state.PopulationFatness)
      }
      else if(this.state.CompactnessType ==="Polsby-Popper"){
        this.setState({PolsbyPopper: value})
        // console.log(this.state.PolsbyPopper)
      }
      else{

      }
    }

    handleConstrainTypeChange = (event) => {
      this.setState({ConstrainType: event.target.value})

      if(event.target.value === "total population"){
        this.setState({ConstrainTypeSliderValue: this.state.TotalPopulation})
        console.log(this.state.ConstrainTypeSliderValue)
      }
      else if(event.target.value === "voting age population (TVAP)"){
        this.setState({ConstrainTypeSliderValue: this.state.VotingAgePopulation})
        console.log(this.state.ConstrainTypeSliderValue)
      }
      else if(event.target.value==="citizen voting age population (CVAP)"){
        this.setState({ConstrainTypeSliderValue: this.state.CitizenVotingAgePopulation})
        console.log(this.state.ConstrainTypeSliderValue)
      }
      else{
        this.setState({ConstrainTypeSliderValue: 0})
      }
      
    }
    handleChangeConstrainTypeSliderValue = (event,value)=>{
      this.setState({ConstrainTypeSliderValue: value})

      if(this.state.ConstrainType === "total population"){
        this.setState({TotalPopulation: value })
        console.log(this.state.TotalPopulation)
        
      }
      else if(this.state.ConstrainType  === "voting age population (TVAP)"){
        this.setState({VotingAgePopulation: value})
        console.log(this.state.VotingAgePopulation)
      }
      else if(this.state.ConstrainType ==="citizen voting age population (CVAP)"){
        this.setState({CitizenVotingAgePopulation: value})
        console.log(this.state.CitizenVotingAgePopulation)
      }
      else{

      }
    }
    
    handleChangeMajorityMinorityDistricts = (event)=>{
      this.setState({MajorityMinorityDistricts:event.target.value})
      console.log(this.state.MajorityMinorityDistricts)
    }


    checkerAchange = (event) =>
    {
      this.setState({checkerA:  event.target.checked});

      if (this.state.checkerA === false && this.state.current_state == "New York"){
        this.showgeoJson(this.searchStateByHideCode("NYPRECINCT"), this.state.Map)
      }
      else if (this.state.checkerA === true && this.state.current_state == "New York"){
        this.hidegeoJson(this.searchStateByHideCode("NYPRECINCT"),this.state.Map)
      }
    }

    checkerBchange = (event) =>
    {
      this.setState({checkerB:  event.target.checked});

      if (this.state.checkerB === false && this.state.current_state == "New York"){
        this.showgeoJson(this.searchStateByHideCode("NYDISTRICT"), this.state.Map)
      }
      else if (this.state.checkerB === true && this.state.current_state == "New York"){
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
      if (direction == "forward" && prev_active_step < 5){
        this.setState({activeStep: prev_active_step + 1})
      }
      else if (direction == "backward" && prev_active_step > 0){
        this.setState({activeStep: prev_active_step - 1})
      }
      else if (direction == "reset"){
        this.setState({activeStep: 0})
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
    handleChangeCompactness=(event)=>{
      const name = event.target.name;
      const value = event.target.value;
    };

    districtSelect = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({current_district: event.target.value})
    }

    districtingSelect1 = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({current_districting1: event.target.value})
    }

    districtingSelect2 = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({current_districting2: event.target.value})
    }

    categorySelect = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({category: event.target.value})
    }

    //This method generates the different steps 
    getStepContent(stepIndex){
      let OptionPage  = "PageDisable";

      if (this.state.OptionPage) {
          OptionPage  = "OptAble"
      };

      let StatsPage  = "PageDisable";

      if (this.state.StatsPage) {
        StatsPage  = "SatAble"
      };

      let FilterPage 

      if (this.state.FilterPage) {
        FilterPage  = "FilAble"
      };

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
          return <div>
                    <h3>Select a Job</h3>
<div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          Job 1
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="accordion body collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      •New York 
        <br></br><br></br><br></br>
        •26 Districtings 
        <br></br><br></br><br></br>
        •Additional Data 
        <br></br><br></br><br></br>
        •100,139 Districtings
        <br></br><br></br><br></br>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
          Select Job
        </label>
        </div>

      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Job 2 
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      •New York 
        <br></br><br></br><br></br>
        •27 Districtings 
        <br></br><br></br><br></br>
        •Additional Data 
        <br></br><br></br><br></br>
        •100,121 Districtings
        <br></br><br></br><br></br>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
          Select Job
        </label>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Job 3 
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      •New York 
        <br></br><br></br><br></br>
        •28 Districtings 
        <br></br><br></br><br></br>
        •Additional Data 
        <br></br><br></br><br></br>
        •101,230 Districtings 
        <br></br><br></br><br></br>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
          Select Job
        </label>
        </div>
      </div>
    </div>
  </div>
</div>

                </div>
        case 2:
          return <div>
            <h2 Set Constraints/>
            <br></br>
            <div className="S2" >
                <div>Select Compactness
                <br></br>
                 <FormControl className="Form1">
                      <InputLabel htmlFor="state-native-helper">Click</InputLabel>
                        <NativeSelect
                          value={this.state.CompactnessType}
                          onChange={this.handleCompactnessTypeChange}
                          inputProps={{
                          name: 'Click To Select A Compactness type',
                          id: 'state-native-helper',}}>
                          <option aria-label="None" value="" />
                          <option value={"graph compactness"}>graph compactness</option>
                          <option value={"population fatness"}>population fatness</option>
                          <option value={"Polsby-Popper"}>Polsby-Popper</option>
                        </NativeSelect>
                      <FormHelperText>Select compactness Type</FormHelperText>
                    </FormControl>
                    <div className = "S1"> 
                    <Typography id="discrete-slider" gutterBottom>
                          
                          </Typography>
                          <Slider 
                            defaultValue={0}
                            value={this.state.CompactnessTypeSliderValue}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={0.1}
                            marks
                            min={0}
                            max={1}
                            onChange={this.handleChangeCompactnessTypeSliderValue}
                          />
                          <h6>current value: {this.state.CompactnessTypeSliderValue}</h6>
                          </div>
                </div>
                <br></br><br></br>
                <div>Population Constraints 
                <br></br>
                <FormControl className="Form1">
                      <InputLabel htmlFor="state-native-helper">Click</InputLabel>
                        <NativeSelect
                          value={this.state.ConstrainType}
                          onChange={this.handleConstrainTypeChange}
                          inputProps={{
                          name: 'Click To Select population constrain type',
                          id: 'state-native-helper',}}>
                          <option aria-label="None" value="" />
                          <option value={"total population"}>total population</option>
                          <option value={"voting age population (TVAP)"}>voting age population (TVAP)</option>
                          <option value={"citizen voting age population (CVAP)"}>citizen voting age population (CVAP)</option>
                        </NativeSelect>
                      <FormHelperText>Select Population constrain Type</FormHelperText>
                    </FormControl>
                    <div className = "S1"> 
                    <Typography id="discrete-slider" gutterBottom>
                      
                      </Typography>
                      <Slider 
                        defaultValue={0}
                        value={this.state.ConstrainTypeSliderValue}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                        onChange={this.handleChangeConstrainTypeSliderValue}
                      />
                      <h6>current value: {this.state.ConstrainTypeSliderValue}%</h6>
                      </div>
                </div>
                <br></br><br></br>
                <div>Majority-Minority Districts
                <br></br>
                <FormControl className="Form1">
                      <InputLabel htmlFor="state-native-helper">Click</InputLabel>
                        <NativeSelect
                          value={this.state.MajorityMinorityDistricts}
                          onChange={this.handleChangeMajorityMinorityDistricts}
                          inputProps={{
                          name: 'Click To Select Majority-Minority Districts',
                          id: 'state-native-helper',}}>
                          <option aria-label="None" value="" />
                          <option value={"0"}>0</option>
                          <option value={"1"}>1</option>
                          <option value={"2"}>2</option>
                          <option value={"3"}>3</option>
                           <option value={"4"}>4</option>
                        </NativeSelect>
                      <FormHelperText>Select Majority-Minority Districts</FormHelperText>
                      
                    </FormControl>
                </div>
                <br></br><br></br>
                <div>Set Protected Incumbents
                  <br></br>
                  <button style ={{fontSize:"15px"}} data-toggle="modal" data-target="#myModal">
                        Select Incumbents
                        
                      </button>
                </div>
              </div>


              <div class="modal" id="myModal">
  <div class="modal-dialog" style={{top:"30%"}}>
    <div class="modal-content">

      
      <div class="modal-header">
        <h4 class="modal-title">Incumbent Protection</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      
      <div class="modal-body">
              <div class="form-check">
              <input
                class="Incumbent-Checkbox"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Tammy Rowe(D1)
              </label>

              <input
                class="Incumbent-Checkbox"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Clifford Kim(D2)
              </label>
              
              

              <input
                class="Incumbent-Checkbox"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Owen Neal(D3)
              </label>

              <br></br>

              <input
                class="Incumbent-Checkbox"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Mabel Logan(D4)
              </label>


              <input
                class="Incumbent-Checkbox"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Nicole Mann(D5)
              </label>


              <input
                class="Incumbent-Checkbox"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Sara Holloway(D6)
              </label>

              <br></br>
              <input
                class="Incumbent-Checkbox"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Edward Carson(D7)
              </label>


              <input
                class="Incumbent-Checkbox"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Doreen Lewis(D8)
              </label>


              <input
                class="Incumbent-Checkbox"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Inez Jimenez(D9)
              </label>

              <br></br>       
              
          </div>
      </div>

      
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Apply</button>
      </div>

    </div>
  </div> 
  </div> 



          </div>


        case 4:
          return           <div className = {FilterPage}>
                <h5>Districtings Remaining: 1,794</h5>
          <div className = "S1"> Set Objective Functions Weight

                            
          <Typography id="discrete-slider" gutterBottom>
          Political Fairness
           </Typography>
           <Slider 
             defaultValue={this.state.MajorityMinority}
             getAriaValueText={valuetext}
             aria-labelledby="discrete-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
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
             step={0.1}
             marks
             min={0}
             max={1}
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
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.handlePChange}
           />
         </div>

         <div className = "S1"> 

          <Typography id="discrete-slider" gutterBottom>
          Deviation from Enacted Plan
           </Typography>
           <Slider 
             defaultValue={this.state.PopulationEquality}
             getAriaValueText={valuetext}
             aria-labelledby="range-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.handlePChange}
           />
         </div>
         <div className = "S1"> 

          <Typography id="discrete-slider" gutterBottom>
          Split Counties
           </Typography>
           <Slider 
             defaultValue={this.state.PopulationEquality}
             getAriaValueText={valuetext}
             aria-labelledby="range-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.handlePChange}
           />
         </div>
         <div className = "S1"> 

          <Typography id="discrete-slider" gutterBottom>
          Deviation from average districting
           </Typography>
           <Slider 
             defaultValue={this.state.PopulationEquality}
             getAriaValueText={valuetext}
             aria-labelledby="range-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.handlePChange}
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
           <div className = "D4"> Political Fairness：   {Number (this.state.MajorityMinority)}
           </div>

           <div className = "D4"> Compactness：   {this.state.Compactness}
           </div>

           <div className = "D4"> Population Equality：   {this.state.PopulationEquality}
           </div>

           <div className = "D4"> Deviation from Enacted Plan：   0
           <div className = "D4"> Split Counties：   0
           </div>
           <div className = "D4">  Deviation from average districting：   0
           </div>
       </div>
   </div>
        case 3:

        return         <div>
          <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
        <h5>Filtered Out By Population Compactness: 27,301</h5>
        <h5>Filtered Out By Majority-Minority: 50,230</h5>
        <h5>Filtered Out By Population Constraint: 18,301</h5>
        <h5>Districtings Remaining: 1,794</h5>
      </div>


        case 5:

          return <div>
<div class="modal fade bd-example-modal-xl" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="myExtraLargeModalLabel">Detailed Data Analysis</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link" href="#districtdata" data-toggle="tab">District Data</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#boxandwhisker" data-toggle="tab">Show Box and Whisker Plot</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#comparedistrictings" data-toggle="tab">Compare Districtings</a>
  </li>
</ul>

<div class="tab-content">
    <div role="tabpanel" class='tab-pane' id="districtdata">
    <FormControl className="Form1">
        <InputLabel htmlFor="state-native-helper">District</InputLabel>
                <NativeSelect
                  value={this.state.current_district}
                  onChange={this.districtSelect}
                  inputProps={{
                  name: 'Click To View Detailed Information About a District',
                  id: 'state-native-helper',}}>
                  <option value={"District 1"}>District 1</option>
                  <option value={"District 2"}>District 2</option>
                  <option value={"District 3"}>District 3</option>
                  <option value={"District 4"}>District 4</option>
                  <option value={"District 5"}>District 5</option>
                  <option value={"District 6"}>District 6</option>
                  <option value={"District 7"}>District 7</option>
                  <option value={"District 8"}>District 8</option>
                  <option value={"District 9"}>District 9</option>
                  <option value={"District 10"}>District 10</option>
                  <option value={"District 11"}>District 11</option>
                  <option value={"District 12"}>District 12</option>
                  <option value={"District 13"}>District 13</option>
                  <option value={"District 14"}>District 14</option>
                  <option value={"District 15"}>District 15</option>
                  <option value={"District 16"}>District 16</option>
                  <option value={"District 17"}>District 17</option>
                  <option value={"District 18"}>District 18</option>
                  <option value={"District 19"}>District 19</option>
                  <option value={"District 20"}>District 20</option>
                  <option value={"District 21"}>District 21</option>
                  <option value={"District 22"}>District 22</option>
                  <option value={"District 23"}>District 23</option>
                  <option value={"District 24"}>District 24</option>
                  <option value={"District 25"}>District 25</option>
                  <option value={"District 26"}>District 26</option>
                  <option value={"District 27"}>District 27</option>
                </NativeSelect>
          <FormHelperText>Click to select a District</FormHelperText>
      </FormControl>
  
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Data Types</th>
      <th scope="col">Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Total Population</th>
      <td>783,827</td>
    </tr>
    <tr>
      <th scope="row">Voting Population</th>
      <td>104,381</td>
    </tr>
    <tr>
      <th scope="row">Objective Function Score</th>
      <td>99.78</td>
    </tr>
    <tr>
      <th scope="row">Incumbents</th>
      <td>John Doe</td>
    </tr>
    <tr>
      <th scope="row">Average Deviation</th>
      <td>24</td>
    </tr>
    <tr>
      <th scope="row">Population Density</th>
      <td>0.35</td>
    </tr>
    <tr>
      <th scope="row">Population Equality</th>
      <td>0.62</td>
    </tr>
    <tr>
      <th scope="row">Political Fairness</th>
      <td>0.48</td>
    </tr>
    <tr>
      <th scope="row">Democratic Voter Percentage</th>
      <td>56.4%</td>
    </tr>
    <tr>
      <th scope="row">Republican Voter Percentage</th>
      <td>43.6%</td>
    </tr>
    <tr>
      <th scope="row">Total Minority Percentage</th>
      <td>12.6%</td>
    </tr>
    <tr>
      <th scope="row">Black Population Percentage</th>
      <td>7.8%</td>
    </tr>
    <tr>
      <th scope="row">Asian Population Percentage</th>
      <td>1.3%</td>
    </tr>
    <tr>
      <th scope="row">Hispanic or Latino Percentage</th>
      <td>3.2%</td>
    </tr>
    <tr>
      <th scope="row">American Indian or Alaska Native Percentage</th>
      <td>0.3%</td>
    </tr>
  </tbody>
</table>
    </div>
    <div role="tabpanel" class='tab-pane' id="boxandwhisker"> 
      <h3>Minority Popularity Box and Whisker Plot</h3>
      <img src={boxandwhisker} /></div>
    <div role="tabpanel" class='tab-pane' id="comparedistrictings">
    <FormControl className="Form1">
        <InputLabel htmlFor="state-native-helper">District</InputLabel>
                <NativeSelect
                  value={this.state.current_districting1}
                  onChange={this.districtingSelect}
                  inputProps={{
                  name: 'Click To Select a Districting to Compare',
                  id: 'state-native-helper',}}>
                  <option value={"Districting 1"}>Districting 1</option>
                  <option value={"Districting 2"}>Districting 2</option>
                  <option value={"Districting 3"}>Districting 3</option>
                  <option value={"Districting 4"}>Districting 4</option>
                  <option value={"Districting 5"}>Districting 5</option>
                  <option value={"Districting 6"}>Districting 6</option>
                  <option value={"Districting 7"}>Districting 7</option>
                  <option value={"Districting 8"}>Districting 8</option>
                  <option value={"Districting 9"}>Districting 9</option>
                  <option value={"Districting 10"}>Districting 10</option>
                </NativeSelect>
          <FormHelperText>Click to select a Districting To Compare</FormHelperText>
      </FormControl>
      ⠀⠀⠀⠀⠀⠀⠀⠀
      <FormControl className="Form1">
        <InputLabel htmlFor="state-native-helper">District</InputLabel>
                <NativeSelect
                  value={this.state.current_districting2}
                  onChange={this.districtingSelect}
                  inputProps={{
                  name: 'Click to select a Districting To Compare',
                  id: 'state-native-helper',}}>
                  <option value={"Default Districting"}>Default Districting</option>
                  <option value={"Districting 1"}>Districting 1</option>
                  <option value={"Districting 2"}>Districting 2</option>
                  <option value={"Districting 3"}>Districting 3</option>
                  <option value={"Districting 4"}>Districting 4</option>
                  <option value={"Districting 5"}>Districting 5</option>
                  <option value={"Districting 6"}>Districting 6</option>
                  <option value={"Districting 7"}>Districting 7</option>
                  <option value={"Districting 8"}>Districting 8</option>
                  <option value={"Districting 9"}>Districting 9</option>
                  <option value={"Districting 10"}>Districting 10</option>
                </NativeSelect>
          <FormHelperText>Click to select a Districting To Compare</FormHelperText>
      </FormControl>
      <br></br><br></br>
      <img src={newyorkimage} />⠀⠀⠀⠀⠀⠀⠀⠀<img src={newyorkimage} />
      <br></br><br></br>
      <table class="table">

  <tbody>
    <tr>
      <th scope="row"></th>
      <td></td>
      <td>First Districting</td>
      <td>Second Districting</td>
      <td></td>
      <td>Obj. Function Weights</td>
      <td></td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Objective Function Score</td>
      <td>99.73</td>

      <td>92.63</td>
      <td>Max Objective Function Score</td>
      <td>100</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Political Fairness</td>
      <td>48</td>
   
      <td>32</td>
      <td>Political Fairness Weight</td>
      <td>0.3</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Compactness</td>
      <td>27</td>

      <td>17</td>
      <td>Compactness Weight</td>
      <td>0.1</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Population Equality</td>
      <td>23</td>

      <td>12</td>
      <td>Pop. Equality Weight</td>
      <td>0.2</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Enacted Deviation</td>
      <td>63</td>

      <td>32</td>
      <td>Enacted Dev. Weight</td>
      <td>0.1</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Split Counties</td>
      <td>0</td>

      <td>1</td>
      <td>Split Counties Weight</td>
      <td>0.2</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Average Districting Deviation</td>
      <td>52</td>

      <td>32</td>
      <td>Avg. Distr. Dev. Weight</td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
    </div>
</div>

      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>

<FormControl className="Form1">
        <InputLabel htmlFor="state-native-helper">District</InputLabel>
                <NativeSelect
                  value={this.state.category}
                  onChange={this.categorySelect}
                  inputProps={{
                  name: 'Click To Select a Districting to Compare',
                  id: 'state-native-helper',}}>
                  <option value={"1"}>Top 10 Districtings by Objective Function Score</option>
                  <option value={"2"}>Top 10 Districtings by Majority Minority</option>
                  <option value={"3"}>Top 10 Districtings by Closest to the Enacted Districting</option>
                  <option value={"4"}>Top 10 Districting by Area Pair Deviations</option>
                </NativeSelect>
          <FormHelperText>Click to select a category</FormHelperText>
      </FormControl>
            <div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          Districting 1 - Objective Function Score: 99.78
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="accordion body collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 0
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Show Detailed Data</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Districting 2 - Objective Function Score: 99.59
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 0
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success">Show Detailed Data</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Districting 3 - Objective Function Score: 99.33
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 0
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Show Detailed Data</button>

      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingFour">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        Districting 4 - Objective Function Score: 98.45
        </button>
      </h5>
    </div>
    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 0
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success">Show Detailed Data</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingFive">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
        Districting 5 - Objective Function Score: 97.73
        </button>
      </h5>
    </div>
    <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 0
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success">Show Detailed Data</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingSix">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
        Districting 6 - Objective Function Score: 96.59
        </button>
      </h5>
    </div>
    <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 1
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success">Show Detailed Data</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingSeven">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
        Districting 7 - Objective Function Score: 94.34
        </button>
      </h5>
    </div>
    <div id="collapseSeven" class="collapse" aria-labelledby="headingSeven" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 1
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success">Show Detailed Data</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingEight">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
        Districting 8 - Objective Function Score: 93.84
        </button>
      </h5>
    </div>
    <div id="collapseEight" class="collapse" aria-labelledby="headingEight" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 1
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success">Show Detailed Data</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingNine">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
        Districting 9 - Objective Function Score: 92.24
        </button>
      </h5>
    </div>
    <div id="collapseNine" class="collapse" aria-labelledby="headingNine" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 1
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success">Show Detailed Data</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTen">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
        Districting 10 - Objective Function Score: 90.21
        </button>
      </h5>
    </div>
    <div id="collapseTen" class="collapse" aria-labelledby="headingTen" data-parent="#accordion">
      <div class="card-body" style ={{fontSize:"20px"}}>
      Deviation From Average: 80
        <br></br><br></br><br></br>
      Deviation From Enacted: 80
        <br></br><br></br><br></br>
      Population Equality: 80
        <br></br><br></br><br></br>
      Political Fairness: 80
        <br></br><br></br><br></br>
      Split Counties: 1
        <br></br><br></br><br></br>
      <button type="button" class="btn btn-info">Load Districting</button>
      <br></br><br></br><br></br>
      <button type="button" class="btn btn-success">Show Detailed Data</button>
      </div>
    </div>
  </div>
</div>
          </div>
      }
    }


    render(){
      let nextStepButton = <Button variant="outlined" color="primary" onClick={() => this.setActiveStep(this.state.activeStep, "forward")}>Next Step</Button>
      if(this.state.activeStep == 5){
        nextStepButton = null
      }
      else {
        nextStepButton = <Button variant="outlined" color="primary" onClick={() => this.setActiveStep(this.state.activeStep, "forward")}>Next Step</Button>
      }
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
              <div className="filternav" style={{ position: 'absolute', textAlign: 'center', zIndex: 499}}>
                <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">

                  <div>
                    <h5>  &nbsp;&nbsp;&nbsp;Current State</h5>
                    <h5>{this.state.current_state}</h5>
                </div>

                  <button class='btn btn-secondary btn-lg' 
                    style={{position: 'absolute', textAlign: 'center', margin: 0, zIndex: 499, left: '30px', top: "250px"}}
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

            <div className="sidenav" style={{ position: 'absolute', textAlign: 'center', zIndex: 501}}>
              <Stepper activeStep={this.state.activeStep} alternativeLabel>
                <Step>
                  <StepLabel>
                    State Selection
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    Job Selection
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    Set  Constraints
                  </StepLabel>
                </Step>
                <Step>
                <StepLabel>
                    Constraint Result
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    Set Measures 
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
              ⠀⠀⠀⠀
              {nextStepButton}
              ⠀⠀⠀⠀
              <button type="button" class="btn btn-danger" onClick={() => this.setActiveStep(this.state.activeStep, "reset")}>Reset</button>
            </div>

          </div>
            
      
        
        )
      }
    }

export default Maps;