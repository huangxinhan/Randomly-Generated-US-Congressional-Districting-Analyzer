import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
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

class JobSelection extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h3>Select a Job</h3>
                
                <div class="card bg-light mb-3" style={{width: "550px", fontSize: "15px", left: "13px"}}>
                <div class="card-body">
                <h5 class="card-title">Job 1</h5>
                <p class="card-text">•New York   •100,139 districtings    •27 districts</p>
                <p class="card-text">•Additional Parameters</p>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault 1" onClick={this.props.selectJob}/>
                  <label class="form-check-label" for="flexCheckDefault">
                    Select Job
                  </label>
                </div>
                </div>

                <div class="card bg-light mb-3" style={{width: "550px", fontSize: "15px", left: "13px"}}>
                <div class="card-body">
                <h5 class="card-title">Job 2</h5>
                <p class="card-text">•New York   •100,139 districtings    •27 districts</p>
                <p class="card-text">•Additional Parameters</p>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault 2"/>
                  <label class="form-check-label" for="flexCheckDefault">
                    Select Job
                  </label>
                </div>
                </div>
                
                <div class="card bg-light mb-3" style={{width: "550px", fontSize: "15px", left: "13px"}}>
                <div class="card-body">
                <h5 class="card-title">Job 3</h5>
                <p class="card-text">•New York   •100,139 districtings    •27 districts</p>
                <p class="card-text">•Additional Parameters</p>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault 3"/>
                  <label class="form-check-label" for="flexCheckDefault">
                    Select Job
                  </label>
                </div>
                </div>
    
            </div>
        )
    }
}   


export default JobSelection