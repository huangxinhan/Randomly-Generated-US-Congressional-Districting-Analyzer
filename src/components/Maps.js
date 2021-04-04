import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'
import nyprecincts from "../geojson/ny_final.json"
import nydistricts from "../geojson/ny_cd.json"
import testnydistricts from "../geojson/ny_cd.geojson"
import nystate from "../geojson/ny_state_bound.json"
import nycounty from "../geojson/ny_county.json"
import pastate from "../geojson/pa_state_bound.json"
import padistricts from "../geojson/PA_cd.json"
import paprecincts from "../geojson/PA_precincts.json"
import pacounty from "../geojson/pa_county.json"
import mdstate from "../geojson/md_state_bound.json"
import mddistricts from "../geojson/Maryland_cd.json"
import mdprecincts from "../geojson/MD_precincts.json"
import mdcounty from "../geojson/md_county.json"
import mapboxgl from "mapbox-gl"
import L, { layerGroup } from 'leaflet'
import "leaflet/dist/leaflet.css"
import "./com.css";
import Plot from 'react-plotly.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import $ from 'jquery';


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

//components
import StateSelection from "./StateSelection"
import JobSelection from "./JobSelection"
import SetConstraints from "./SetConstraints"
import ConstraintResults from "./ConstraintResults"
import SetMeasures from './SetMeasures'
import AnalyzeDistrictings from "./AnalyzeDistrictings"
import DistrictingSummary from './DistrictingSummary'
import MapFilter from "./MapFilter"

function valuetext(value) {
  return `${value}%`;
}

class Maps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_state: "None",
      Map: null,
      Map1: null,
      Map2: null,
      maps: [],
      maps_backup: [],
      current_state_layer: null, //the current state layer
      center: [38.0902, -83.7129],
      zoom: 4.5,
      centerNY: [43.2994, -74.2179],
      centerPA: [41.2033, -77.1945],
      centerMD: [39.0458, -76.6413],
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

      checkerC: false,
      //STATS page
      IsExpanded: false,
      // FITER page

      MajorityMinority: 0,
      Compactness: 0,
      PPCompactness: 0,
      PopFatCompactness: 0,
      GCompactness: 0,
      PopulationEquality: 0,
      DeviationFromEnacted: 0,
      DeviationFromEnactedPopulation: 0,
      SplitCounties: 0,
      DeviationFromAverage: 0,
      Objective: [0, 0],

      //Checkers for job selection
      job1Checked: false,
      job2Checked: false,
      job3Checked: false,

      //Temp geojson data
      comparisonGeojson: nydistricts,

      //Step3, slect options texts
      CompactnessType: '',
      ConstrainType: '',
      //third one is not needed.↓

      //Box and Whisker data
      BoxAndWhiskerData: [
        {
          y: [0, 1, 1, 2, 3, 5],
          type: 'box'
        },
        {
          y: [0, 6, 1, 2, 9, 5],
          type: 'box'
        },
        {
          y: [10, 6, 1, 12, 9, 5],
          type: 'box'
        },
        {
          y: [0, 6, 1, 12, 19, 15],
          type: 'box'
        }, {
          y: [10, 16, 11, 12, 19, 5],
          type: 'box'
        }
      ],

      // step3, corresponding slider values to options
      GraphCompactness: 0,
      PopulationFatness: 0,
      PolsbyPopper: 0,

      TotalPopulation: 0,
      VotingAgePopulation: 0,
      CitizenVotingAgePopulation: 0,

      MajorityMinorityDistricts: null,
      MinorityGroup: null,

      //mapbox gl coordinates are reversed from leaflet
      mapboxglCoordinates: null,
      secondaryMap: "hidden",

      //belows are used to update slider value based on different option selections.

      CompactnessTypeSliderValue: 0,
      ConstrainTypeSliderValue: 0,

      districtingDataBox: "hidden"
    }
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  componentDidMount() {
    this.init();
  }


  //initializes the map
  init() {

    var container = L.DomUtil.get('map');
    if (container != null) {
      container._leaflet_id = null;
    }
    var map = L.map('map').setView(this.state.center, this.state.zoom)
    this.setState({ Map: map })
    map.zoomControl.setPosition('topright')
    L.tileLayer('https://api.mapbox.com/styles/v1/worldcalling/cklvc0h5648r517o49ebf9d6q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid29ybGRjYWxsaW5nIiwiYSI6ImNrbHZjbjV4cjJvcXYycHBtMmJjaGZ0aHcifQ.68N60kfWy9s3PeNMuqnuQA').addTo(map)

    var map1 = L.map('map1').setView(this.state.center, this.state.zoom)
    this.setState({ Map1: map1 })
    map1.zoomControl.setPosition('bottomleft')
    L.tileLayer('https://api.mapbox.com/styles/v1/worldcalling/cklvc0h5648r517o49ebf9d6q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid29ybGRjYWxsaW5nIiwiYSI6ImNrbHZjbjV4cjJvcXYycHBtMmJjaGZ0aHcifQ.68N60kfWy9s3PeNMuqnuQA').addTo(map1)

    var map2 = L.map('map2').setView(this.state.center, this.state.zoom)
    this.setState({ Map2: map2 })
    map2.zoomControl.setPosition('bottomleft')
    L.tileLayer('https://api.mapbox.com/styles/v1/worldcalling/cklvc0h5648r517o49ebf9d6q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid29ybGRjYWxsaW5nIiwiYSI6ImNrbHZjbjV4cjJvcXYycHBtMmJjaGZ0aHcifQ.68N60kfWy9s3PeNMuqnuQA').addTo(map2)

    var NYStateLayer = L.geoJson(nystate, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: 'blue', opacity: 0.5 }
        }
      },
      onEachFeature: onEachStateFeature
    });

    var PAStateLayer = L.geoJson(pastate, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: 'blue', opacity: 0.5 }
        }
      },
      onEachFeature: onEachStateFeature
    })

    var MDStateLayer = L.geoJson(mdstate, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: 'blue', opacity: 0.5 }
        }
      },
      onEachFeature: onEachStateFeature
    })


    function onEachStateFeature(feature, layer) {
      layer.bindPopup(feature.properties.NAME)
      layer.on('mouseover', function (e) {
        if (this.feature) {
          this.openPopup();
        }
      })
      layer.on('mouseout', function (e) {
        this.closePopup();
      })
    }

    //geojson for New York State Congressional Districtings
    var NYdistrictLayer = L.geoJson(nydistricts, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: getRandomColor(feature), opacity: 0.5 }
        }
      },
      onEachFeature: onEachDistrictFeature
    });

    var PAdistrictLayer = L.geoJson(padistricts, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: getRandomColor(feature), opacity: 0.5 }
        }
      },
      onEachFeature: onEachDistrictFeature
    });

    var MDdistrictLayer = L.geoJson(mddistricts, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: getRandomColor(feature), opacity: 0.5 }
        }
      },
      onEachFeature: onEachDistrictFeature
    });



    function onEachDistrictFeature(feature, layer) {
      layer.bindPopup(feature.properties.NAMELSAD + "     " + " Population: 717,820, Incumbent: John Doe, Split Counties: 0, Democratic Voter percentage: 57.4%, Republic Voter Percentage: 32.6%")
      layer.on('mouseover', function (e) {
        if (feature.properties) {
          this.openPopup();
        }
      }
      )
      layer.on('mouseout', function (e) {
        this.closePopup();
      })
    }

    //geojson for New York State precincts

    var NYprecinctLayer = L.geoJson(nyprecincts, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: getRandomColor(feature), opacity: 0.5 }
        }
      },
      onEachFeature: onEachPrecinctFeature
    });

    var MDprecinctLayer = L.geoJson(mdprecincts, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: getRandomColor(feature), opacity: 0.5 }
        }
      },
      onEachFeature: onEachPrecinctFeature
    });

    var PAprecinctLayer = L.geoJson(paprecincts, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: getRandomColor(feature), opacity: 0.5 }
        }
      },
      onEachFeature: onEachPrecinctFeature
    });


    function onEachPrecinctFeature(feature, layer) {
      layer.bindPopup(feature.properties.NAMELSAD10)
      layer.on('mouseover', function (e) {
        if (feature.properties) {
          this.openPopup();
        }
      })

      layer.on('mouseout', function (e) {
        this.closePopup();
      })
    }

    var NYcountyLayer = L.geoJson(nycounty, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: getRandomColor(feature), opacity: 0.5 }
        }
      },
      onEachFeature: onEachCountyFeature
    });

    var MDcountyLayer = L.geoJson(mdcounty, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: getRandomColor(feature), opacity: 0.5 }
        }
      },
      onEachFeature: onEachCountyFeature
    });

    var PAcountyLayer = L.geoJson(pacounty, {
      weight: 1,
      style: function (feature) {
        if (feature.properties) {
          return { color: 'black', fillColor: getRandomColor(feature), opacity: 0.5 }
        }
      },
      onEachFeature: onEachCountyFeature
    });

    function onEachCountyFeature(feature, layer) {
      //layer.bindPopup(feature.properties)
      //layer.on('mouseover', function(e) {
      //if (feature.properties){
      //this.openPopup();
      //}
      //})

      //layer.on('mouseout', function(e) {
      //this.closePopup();
      //})
    }



    NYStateLayer.hideCode = "NYSTATE";
    NYdistrictLayer.hideCode = "NYDISTRICT"
    NYprecinctLayer.hideCode = "NYPRECINCT"
    PAStateLayer.hideCode = "PASTATE"
    MDStateLayer.hideCode = "MDSTATE"
    MDdistrictLayer.hideCode = "MDDISTRICT"
    MDprecinctLayer.hideCode = "MDPRECINCT"
    PAprecinctLayer.hideCode = "PAPRECINCT"
    PAdistrictLayer.hideCode = "PADISTRICT"
    NYcountyLayer.hideCode = "NYCOUNTY"
    MDcountyLayer.hideCode = "MDCOUNTY"
    PAcountyLayer.hideCode = "PACOUNTY"
    //add them to the backup
    //backup is set up like [nystate, nydistrict, nyprecinct, PAstate, PAdistrict, PAprecinct, MDstate, MDdistrict, Mdprecinct, NYcounty, PAcounty, MDcounty]. Load them using the respective index. 
    this.setState({ maps_backup: [NYStateLayer, NYdistrictLayer, NYprecinctLayer, PAStateLayer, PAdistrictLayer, PAprecinctLayer, MDStateLayer, MDdistrictLayer, MDprecinctLayer, NYcountyLayer, PAcountyLayer, MDcountyLayer] })
    this.setState({ maps: [NYStateLayer, NYdistrictLayer, NYprecinctLayer, PAStateLayer, PAdistrictLayer, PAprecinctLayer, MDStateLayer, MDdistrictLayer, MDprecinctLayer, NYcountyLayer, PAcountyLayer, MDcountyLayer] })


    //Generates a random coloring for each district
    function getRandomColor(feature) {
      var precinct_color = new Map()
      var keyString = feature.properties.NAME10 + feature.properties.COUNTY_NAM;
      if (precinct_color.has(keyString)) {
        return precinct_color.get(keyString)
      }

      var letters = "0123456789ABCDEF"
      var color = "#"
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      precinct_color.set(keyString, color)
      return color
    }
  }

  selectJob = (newValue) => {
    if (document.getElementById("flexCheckDefault 1").checked) {
    }
  }

  handleMajorChange = (event, newValue) => {
    this.setState({ MajorityMinority: newValue });
  };

  handlePPComChange = (event, newValue) => {
    this.setState({ PPCompactness: newValue });
  };

  handlePopFatComChange = (event, newValue) => {
    this.setState({ PopFatCompactness: newValue });
  };

  handleGComChange = (event, newValue) => {
    this.setState({ GCompactness: newValue });
  };

  handlePChange = (event, newValue) => {
    this.setState({ PopulationEquality: newValue });
  };

  handleEnactedChange = (event, newValue) => {
    this.setState({ DeviationFromEnacted: newValue })
  }


  handleEnactedPopulationChange = (event, newValue) => {
    this.setState({ DeviationFromEnactedPopulation: newValue })
  }


  handleAverageChange = (event, newValue) => {
    this.setState({ DeviationFromAverage: newValue })
  }

  handleSplitCountyChange = (event, newValue) => {
    this.setState({ SplitCounties: newValue })
  }

  handleObjChange = (event, newValue) => {
    this.setState({ Objective: newValue });
  };

  //page 3 optionbox and slider update functions
  handleCompactnessTypeChange = (event) => {
    this.setState({ CompactnessType: event.target.value })

    if (event.target.value === "graph compactness") {
      this.setState({ CompactnessTypeSliderValue: this.state.GraphCompactness })
      console.log(this.state.CompactnessTypeSliderValue)
    }
    else if (event.target.value === "population fatness") {
      this.setState({ CompactnessTypeSliderValue: this.state.PopulationFatness })
      console.log(this.state.CompactnessTypeSliderValue)
    }
    else if (event.target.value === "Polsby-Popper") {
      this.setState({ CompactnessTypeSliderValue: this.state.PolsbyPopper })
      console.log(this.state.CompactnessTypeSliderValue)
    }
    else {
      this.setState({ CompactnessTypeSliderValue: 0 })
    }

  }
  handleChangeCompactnessTypeSliderValue = (event, value) => {
    this.setState({ CompactnessTypeSliderValue: value })

    if (this.state.CompactnessType === "graph compactness") {
      this.setState({ GraphCompactness: value })
      // console.log(this.state.GraphCompactness)
    }
    else if (this.state.CompactnessType === "population fatness") {
      this.setState({ PopulationFatness: value })
      // console.log(this.state.PopulationFatness)
    }
    else if (this.state.CompactnessType === "Polsby-Popper") {
      this.setState({ PolsbyPopper: value })
      // console.log(this.state.PolsbyPopper)
    }
    else {

    }
  }

  handleConstrainTypeChange = (event) => {
    this.setState({ ConstrainType: event.target.value })

    if (event.target.value === "total population") {
      this.setState({ ConstrainTypeSliderValue: this.state.TotalPopulation })
      console.log(this.state.ConstrainTypeSliderValue)
    }
    else if (event.target.value === "voting age population (TVAP)") {
      this.setState({ ConstrainTypeSliderValue: this.state.VotingAgePopulation })
      console.log(this.state.ConstrainTypeSliderValue)
    }
    else if (event.target.value === "citizen voting age population (CVAP)") {
      this.setState({ ConstrainTypeSliderValue: this.state.CitizenVotingAgePopulation })
      console.log(this.state.ConstrainTypeSliderValue)
    }
    else {
      this.setState({ ConstrainTypeSliderValue: 0 })
    }

  }
  handleChangeConstrainTypeSliderValue = (event, value) => {
    this.setState({ ConstrainTypeSliderValue: value })

    if (this.state.ConstrainType === "total population") {
      this.setState({ TotalPopulation: value })
      console.log(this.state.TotalPopulation)

    }
    else if (this.state.ConstrainType === "voting age population (TVAP)") {
      this.setState({ VotingAgePopulation: value })
      console.log(this.state.VotingAgePopulation)
    }
    else if (this.state.ConstrainType === "citizen voting age population (CVAP)") {
      this.setState({ CitizenVotingAgePopulation: value })
      console.log(this.state.CitizenVotingAgePopulation)
    }
    else {

    }
  }

  handleChangeMajorityMinorityDistricts = (event) => {
    this.setState({ MajorityMinorityDistricts: event.target.value })
    console.log(this.state.MajorityMinorityDistricts)
  }

  handleChangeMinorityGroup = (event) => {
    this.setState({ MinorityGroup: event.target.value })
  }


  checkerAchange = (event) => {
    this.setState({ checkerA: event.target.checked });

    if (this.state.checkerA === false && this.state.current_state == "New York") {
      this.showgeoJson(this.searchStateByHideCode("NYPRECINCT"), this.state.Map)
    }
    else if (this.state.checkerA === true && this.state.current_state == "New York") {
      this.hidegeoJson(this.searchStateByHideCode("NYPRECINCT"), this.state.Map)
    }

    if (this.state.checkerA === false && this.state.current_state == "Maryland") {
      this.showgeoJson(this.searchStateByHideCode("MDPRECINCT"), this.state.Map)
    }
    else if (this.state.checkerA === true && this.state.current_state == "Maryland") {
      this.hidegeoJson(this.searchStateByHideCode("MDPRECINCT"), this.state.Map)
    }

    if (this.state.checkerA === false && this.state.current_state == "Pennsylvania") {
      this.showgeoJson(this.searchStateByHideCode("PAPRECINCT"), this.state.Map)
    }
    else if (this.state.checkerA === true && this.state.current_state == "Pennsylvania") {
      this.hidegeoJson(this.searchStateByHideCode("PAPRECINCT"), this.state.Map)
    }
  }

  checkerBchange = (event) => {
    this.setState({ checkerB: event.target.checked });

    if (this.state.checkerB === false && this.state.current_state == "New York") {
      this.showgeoJson(this.searchStateByHideCode("NYDISTRICT"), this.state.Map)
    }
    else if (this.state.checkerB === true && this.state.current_state == "New York") {
      this.hidegeoJson(this.searchStateByHideCode("NYDISTRICT"), this.state.Map)
    }

    if (this.state.checkerB === false && this.state.current_state == "Pennsylvania") {
      this.showgeoJson(this.searchStateByHideCode("PADISTRICT"), this.state.Map)
    }
    else if (this.state.checkerB === true && this.state.current_state == "Pennsylvania") {
      this.hidegeoJson(this.searchStateByHideCode("PADISTRICT"), this.state.Map)
    }

    if (this.state.checkerB === false && this.state.current_state == "Maryland") {
      this.showgeoJson(this.searchStateByHideCode("MDDISTRICT"), this.state.Map)
    }
    else if (this.state.checkerB === true && this.state.current_state == "Maryland") {
      this.hidegeoJson(this.searchStateByHideCode("MDDISTRICT"), this.state.Map)
    }

  }

  checkerCchange = (event) => {
    this.setState({ checkerC: event.target.checked });
    if (this.state.checkerC === false && this.state.current_state === "New York") {
      this.showgeoJson(this.searchStateByHideCode("NYCOUNTY"), this.state.Map)
    }
    else if (this.state.checkerC === true && this.state.current_state === "New York") {
      this.hidegeoJson(this.searchStateByHideCode("NYCOUNTY"), this.state.Map)
    }
    if (this.state.checkerC === false && this.state.current_state === "Pennsylvania") {
      this.showgeoJson(this.searchStateByHideCode("PACOUNTY"), this.state.Map)
    }
    else if (this.state.checkerC === true && this.state.current_state === "Pennsylvania") {
      this.hidegeoJson(this.searchStateByHideCode("PACOUNTY"), this.state.Map)
    }
    if (this.state.checkerC === false && this.state.current_state === "Maryland") {
      this.showgeoJson(this.searchStateByHideCode("MDCOUNTY"), this.state.Map)
    }
    else if (this.state.checkerC === true && this.state.current_state === "Maryland") {
      this.hidegeoJson(this.searchStateByHideCode("MDCOUNTY"), this.state.Map)
    }
  }

  showgeoJson(layer, state) {
    state.addLayer(layer)
  }

  hidegeoJson(layer, state) {
    state.removeLayer(layer)
  }

  searchStateByHideCode(hideCode) {
    for (var i = 0; i < this.state.maps.length; i++) {
      if (this.state.maps[i] != null && this.state.maps[i].hideCode === hideCode) {
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


  setActiveStep(prev_active_step, direction) {
    if (direction == "forward" && prev_active_step < 5) {
      this.setState({ activeStep: prev_active_step + 1 })
    }
    else if (direction == "backward" && prev_active_step == 4) {
      this.setState({ activeStep: 2 })
    }
    else if (direction == "backward" && prev_active_step > 0) {
      this.setState({ activeStep: prev_active_step - 1 })
    }
    else if (direction == "reset") {
      this.setState({ activeStep: 0 })
    }
  }

  //this can also handle the zooming of the map and stuff 
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ current_state: event.target.value })

    //set mapbox coordinates
    if (value === "New York") {
      this.setState({ mapboxglCoordinates: [-74.2179, 43.2994] })
    }
    //reset the state layers 
    if (this.state.current_state_layer) {
      this.state.Map.removeLayer(this.state.current_state_layer);
    }

    //hides all the geojsons first for precincts
    for (var i = 0; i < this.state.maps.length; i++) {
      this.hidegeoJson(this.state.maps[i], this.state.Map)
    }

    //reset all the buttons
    this.setState({ checkerA: false, checkerB: false, checkerC: false })




    if (value === "New York") {
      this.setState({ center: this.state.centerNY, zoom: 7, current_state_layer: this.state.maps_backup[0] },
        () => {
          this.state.Map.setView(this.state.center, this.state.zoom);
          this.state.Map1.setView(this.state.center, this.state.zoom - 2)
          this.state.Map2.setView(this.state.center, this.state.zoom - 2)
          this.state.Map.addLayer(this.state.current_state_layer)
        })
      //this.state.Map.panTo(this.state.center, this.state.zoom);
    }

    else if (value === "Pennsylvania") {
      this.setState({ center: this.state.centerPA, zoom: 7, current_state_layer: this.state.maps_backup[3] },
        () => {
          this.state.Map.setView(this.state.center, this.state.zoom)
          this.state.Map1.setView(this.state.center, this.state.zoom - 2)
          this.state.Map2.setView(this.state.center, this.state.zoom - 2)
          this.state.Map.addLayer(this.state.current_state_layer)
        })
      //this.state.Map.panTo(this.state.center, this.state.zoom)
    }

    else if (value === "Maryland") {
      this.setState({ center: this.state.centerMD, zoom: 7, current_state_layer: this.state.maps_backup[6] },
        () => {
          this.state.Map.setView(this.state.center, this.state.zoom)
          this.state.Map1.setView(this.state.center, this.state.zoom - 2)
          this.state.Map2.setView(this.state.center, this.state.zoom - 2)
          this.state.Map.addLayer(this.state.current_state_layer)
        })
      //this.state.Map.panTo(this.state.center, this.state.zoom)
    }

  };
  handleChangeCompactness = (event) => {
    const name = event.target.name;
    const value = event.target.value;
  };

  districtSelect = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ current_district: event.target.value })
  }

  districtingSelect1 = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ current_districting1: event.target.value })
  }

  districtingSelect2 = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ current_districting2: event.target.value })
  }

  categorySelect = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ category: event.target.value })
  }


  //methods for the small react-leaflet interface
  getComparisonGeoJSON = (event) => {

  }

  getMapboxCoordinates = () => {
    if (this.state.current_state === "New York") {
      var returnable = [-74.2179, 43.2994];
      return returnable
    }
  }

  //this method unhides a popup that shows districting data
  showDistrictingData = () => {
    this.setState({ districtingDataBox: "visible" })
  }

  //This method generates the different steps 
  getStepContent(stepIndex) {
    let OptionPage = "PageDisable";

    if (this.state.OptionPage) {
      OptionPage = "OptAble"
    };

    let StatsPage = "PageDisable";

    if (this.state.StatsPage) {
      StatsPage = "SatAble"
    };

    let FilterPage

    if (this.state.FilterPage) {
      FilterPage = "FilAble"
    };

    switch (stepIndex) {
      case 0:
        return <StateSelection current_state={this.state.current_state} handleChange={this.handleChange} />
      case 1:
        return <JobSelection selectJob={this.selectJob} />
      case 2:
        return <SetConstraints compactnessType={this.state.compactnessType} handleCompactnessTypeChange={this.handleCompactnessTypeChange}
          CompactnessTypeSliderValue={this.state.CompactnessTypeSliderValue} valuetext={valuetext}
          handleChangeCompactnessTypeSliderValue={this.handleChangeCompactnessTypeSliderValue}
          ConstrainType={this.state.ConstrainType} handleConstrainTypeChange={this.handleConstrainTypeChange} ConstrainTypeSliderValue={this.state.ConstrainTypeSliderValue}
          handleChangeConstrainTypeSliderValue={this.handleChangeConstrainTypeSliderValue}
          MinorityGroup={this.state.MinorityGroup} handleChangeMinorityGroup={this.handleChangeMinorityGroup}
          MajorityMinorityDistricts={this.state.MajorityMinorityDistricts} handleChangeMajorityMinorityDistricts={this.handleChangeMajorityMinorityDistricts} />
      case 3:
        return <ConstraintResults />
      case 4:
        return <SetMeasures FilterPage={FilterPage} MajorityMinority={this.state.MajorityMinority} valuetext={valuetext}
          handleMajorChange={this.handleMajorChange} PPCompactness={this.state.PPCompactness} handlePPComChange={this.handlePPComChange}
          PopFatCompactness={this.state.PopFatCompactness} handlePopFatComChange={this.handlePopFatComChange}
          GCompactness={this.state.GCompactness} handleGComChange={this.handleGComChange}
          PopulationEquality={this.state.PopulationEquality} handlePChange={this.handlePChange}
          DeviationFromEnacted={this.state.DeviationFromEnacted} handleEnactedChange={this.handleEnactedChange}
          DeviationFromEnactedPopulation={this.state.DeviationFromEnactedPopulation} handleEnactedPopulationChange={this.handleEnactedPopulationChange}
          DeviationFromAverage={this.state.DeviationFromAverage} handleAverageChange={this.handleAverageChange}
          SplitCounties={this.state.SplitCounties} handleSplitCountyChange={this.handleSplitCountyChange} />
      case 5:
        return <AnalyzeDistrictings MapHandler={() => this.setState({ secondaryMap: "hidden" })} MapHandler2={() => this.setState({ secondaryMap: "visible" })}
          current_district={this.state.current_district} districtSelect={this.districtSelect}
          BoxAndWhiskerData={this.state.BoxAndWhiskerData} current_districting1={this.state.current_districting1} districtingSelect={this.districtingSelect}
          current_districting2={this.state.current_districting2} districtingSelect={this.districtingSelect}
          category={this.state.category} categorySelect={this.categorySelect} showDistrictingData={this.showDistrictingData} />
    }
  }


  render() {


    let nextStepButton = <Button variant="outlined" color="primary" class="btn btn-primary" onClick={() => this.setActiveStep(this.state.activeStep, "forward")}>Next Step</Button>
    if (this.state.activeStep == 5) {
      nextStepButton = "⠀⠀⠀⠀⠀⠀⠀⠀⠀"
    }
    else {
      nextStepButton = <Button variant="outlined" color="primary" class="btn btn-primary" onClick={() => this.setActiveStep(this.state.activeStep, "forward")}>Next Step</Button>
    }
    let OptionPage = "PageDisable";

    if (this.state.OptionPage) {
      OptionPage = "OptAble"
    };

    let StatsPage = "PageDisable";

    if (this.state.StatsPage) {
      StatsPage = "SatAble"
    };

    let FilterPage = "PageDisable";

    if (this.state.FilterPage) {
      FilterPage = "FilAble"
    };
    return (
      <div>
        <div id="map1" style={{ width: '350px', height: '300px', top: '220px', left: '600px', position: 'absolute', zIndex: 573, visibility: this.state.secondaryMap }}></div>
        <div id="map2" style={{ width: '350px', height: '300px', top: '220px', left: '1000px', position: 'absolute', zIndex: 573, visibility: this.state.secondaryMap }}></div>
        <div id="map" style={{ width: '100vw', height: '100vh' }}>
        </div>
        <DistrictingSummary districtingDataBox={this.state.districtingDataBox} closeDataBox={() => this.setState({ districtingDataBox: "hidden" })}/>
        <MapFilter reCenter={() => { this.state.Map.setView(this.state.center, this.state.zoom) }} current_state={this.state.current_state}
                   OptionPage={OptionPage} checkerA={this.state.checkerA} checkerAchange={this.checkerAchange}
                   checkerB={this.state.checkerB} checkerBchange={this.checkerBchange}
                   checkerC={this.state.checkerC} checkerCchange={this.checkerCchange} />


        <div className="sidenav" style={{ position: 'absolute', textAlign: 'center', zIndex: 501 }}>
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

          <div className="bottomButtons" style={{ position: 'absolute', textAlign: 'center', margin: 0, left: '100px', top: "915px" }}>
            <Button variant="outlined" class="btn btn-primary" color="primary" onClick={() => this.setActiveStep(this.state.activeStep, "backward")}> Previous Step</Button>
              ⠀⠀⠀⠀
                {nextStepButton}
              ⠀⠀⠀⠀
                <button type="button" class="btn btn-danger" onClick={() => this.setActiveStep(this.state.activeStep, "reset")}>Reset</button>
          </div>
        </div>

      </div>



    )
  }
}

export default Maps;