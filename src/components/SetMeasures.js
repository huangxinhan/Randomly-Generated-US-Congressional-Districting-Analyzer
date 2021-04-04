import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";

//material-ui
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

class SetMeasures extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
        <div className = {this.props.FilterPage}>
            <h3>Set Objective Function Weight</h3>
            <br></br>
          <div class='container'>
            <div class='row'>
          <div className = "S2 col-10" style={{textAlign:"left"}}>
          <Typography id="discrete-slider" gutterBottom >
          Political Fairness
           </Typography>
           <Slider 
             defaultValue={this.props.MajorityMinority}
             getAriaValueText={this.props.valuetext}
             aria-labelledby="discrete-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.props.handleMajorChange}
           />
         </div>
         <div class="col-2" style={{fontSize:'20px'}}>
           <br></br>
         {Number (this.props.MajorityMinority)}
         </div>
         </div>
         </div>

         <div class='container'>
            <div class='row'>
          <div className = "S2 col-10" style={{textAlign:"left"}}>
          <Typography id="discrete-slider" gutterBottom>
           Compactness (Polsby-Popper)
           </Typography>
           <Slider 
             defaultValue={this.props.PPCompactness}
             getAriaValueText={this.props.valuetext}
             aria-labelledby="discrete-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.props.handlePPComChange}
           />
          </div>
            <div class="col-2" style={{fontSize:'20px'}}>
              <br></br>
            {this.props.PPCompactness}
            </div>
          </div>
         </div>

         <div class='container'>
            <div class='row'>
          <div className = "S2 col-10" style={{textAlign:"left"}}>
          <Typography id="discrete-slider" gutterBottom>
           Compactness (Population Fatness)
           </Typography>
           <Slider 
             defaultValue={this.props.PopFatCompactness}
             getAriaValueText={this.props.valuetext}
             aria-labelledby="discrete-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.props.handlePopFatComChange}
           />
          </div>
            <div class="col-2" style={{fontSize:'20px'}}>
              <br></br>
            {this.props.PopFatCompactness}
            </div>
          </div>
         </div>

         <div class='container'>
            <div class='row'>
          <div className = "S2 col-10" style={{textAlign:"left"}}>
          <Typography id="discrete-slider" gutterBottom>
           Compactness (Graph Compactness)
           </Typography>
           <Slider 
             defaultValue={this.props.GCompactness}
             getAriaValueText={this.props.valuetext}
             aria-labelledby="discrete-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.props.handleGComChange}
           />
          </div>
            <div class="col-2" style={{fontSize:'20px'}}>
              <br></br>
            {this.props.GCompactness}
            </div>
          </div>
         </div>

         <div class='container'>
            <div class='row'>
          <div className = "S2 col-10" style={{textAlign:"left"}}>
          <Typography id="discrete-slider" gutterBottom>
          Population Equality
           </Typography>
           <Slider 
             defaultValue={this.props.PopulationEquality}
             getAriaValueText={this.props.valuetext}
             aria-labelledby="range-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.props.handlePChange}
           />
           </div>
           <div class="col-2" style={{fontSize:'20px'}}>
             <br></br>
             {this.props.PopulationEquality}
           </div>
         </div>
         </div>

         <div class='container'>
            <div class='row'>
          <div className = "S2 col-10" style={{textAlign:"left"}}>
          <Typography id="discrete-slider" gutterBottom>
          Deviation From Enacted Plan (Area)
           </Typography>
           <Slider 
             defaultValue={this.props.DeviationFromEnacted}
             getAriaValueText={this.props.valuetext}
             aria-labelledby="range-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.props.handleEnactedChange}
           />
           </div>
           <div class="col-2" style={{fontSize:'20px'}}>
             <br></br>
             {this.props.DeviationFromEnacted}
           </div>
         </div>
         </div>

         <div class='container'>
            <div class='row'>
          <div className = "S2 col-10" style={{textAlign:"left"}}>
          <Typography id="discrete-slider" gutterBottom>
          Deviation From Enacted Plan (Population)
           </Typography>
           <Slider 
             defaultValue={this.props.DeviationFromEnactedPopulation}
             getAriaValueText={this.props.valuetext}
             aria-labelledby="range-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.props.handleEnactedPopulationChange}
           />
           </div>
           <div class="col-2" style={{fontSize:'20px'}}>
             <br></br>
             {this.props.DeviationFromEnactedPopulation}
           </div>
         </div>
         </div>


         <div class='container'>
            <div class='row'>
          <div className = "S2 col-10" style={{textAlign:"left"}}>
          <Typography id="discrete-slider" gutterBottom>
          Deviation From Average Districting
           </Typography>
           <Slider 
             defaultValue={this.props.DeviationFromAverage}
             getAriaValueText={this.props.valuetext}
             aria-labelledby="range-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.props.handleAverageChange}
           />
           </div>
           <div class="col-2" style={{fontSize:'20px'}}>
             <br></br>
             {this.props.DeviationFromAverage}
           </div>
         </div>
         </div>

         <div class='container'>
            <div class='row'>
          <div className = "S2 col-10" style={{textAlign:"left"}}>
          <Typography id="discrete-slider" gutterBottom>
          Split Counties
           </Typography>
           <Slider 
             defaultValue={this.props.SplitCounties}
             getAriaValueText={this.props.valuetext}
             aria-labelledby="range-slider"
             valueLabelDisplay="auto"
             step={0.1}
             marks
             min={0}
             max={1}
             onChange={this.props.handleSplitCountyChange}
           />
           </div>
           <div class="col-2" style={{fontSize:'20px'}}>
             <br></br>
             {this.props.SplitCounties}
           </div>
         </div>
         </div>

   </div>
        )
    }
}   


export default SetMeasures