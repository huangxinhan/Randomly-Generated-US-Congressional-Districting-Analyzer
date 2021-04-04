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

class StateSelection extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
            <h3>Select a State</h3> 
            <FormControl className="Form1">
              <InputLabel htmlFor="state-native-helper">State</InputLabel>
                <NativeSelect
                  value={this.props.current_state}
                  onChange={this.props.handleChange}
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
        )
    }
}   


export default StateSelection 