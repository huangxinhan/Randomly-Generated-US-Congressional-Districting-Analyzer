import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";

//material-ui
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { NativeSelect } from '@material-ui/core';

class StateSelection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>Select a State</h3>
        <FormControl className="Form1">
          <InputLabel htmlFor="state-native-helper">State</InputLabel>
          <NativeSelect
            value={this.props.current_state}
            onChange={this.props.handleChange}
            inputProps={{
              name: 'Click To Select A State',
              id: 'state-native-helper',
            }}>
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