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

class SetConstraints extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
<div>
            <h3>Set Constraints</h3>
            <div className="S2" style={{ textAlign: 'left'}} >
                <div>⠀⠀⠀⠀Select Compactness
                <br></br>
                 <FormControl className="Form1" style={{left: "55px"}}>
                      <InputLabel htmlFor="state-native-helper">Click</InputLabel>
                        <NativeSelect
                          value={this.props.CompactnessType}
                          onChange={this.props.handleCompactnessTypeChange}
                          inputProps={{
                          name: 'Click To Select A Compactness type',
                          id: 'state-native-helper',}}>
                          <option aria-label="None" value="">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</option>
                          <option value={"graph compactness"}>graph compactness</option>
                          <option value={"population fatness"}>population fatness</option>
                          <option value={"Polsby-Popper"}>Polsby-Popper</option>
                        </NativeSelect>
                      <FormHelperText>Select compactness Type</FormHelperText>
                    </FormControl>
                    <div className = "S1" style={{left: "40px"}}> 
                    <Typography id="discrete-slider" gutterBottom>
                          
                          </Typography>
                          <Slider 
                            defaultValue={0}
                            value={this.props.CompactnessTypeSliderValue}
                            getAriaValueText={this.props.valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={0.1}
                            marks
                            min={0}
                            max={1}
                            onChange={this.props.handleChangeCompactnessTypeSliderValue}
                          />
                          <h6>current value: {this.props.CompactnessTypeSliderValue}</h6>
                          </div>
                </div>
                <br></br>
                <div>⠀⠀⠀⠀Population Constraints 
                <br></br>
                <FormControl className="Form1" style={{left: "55px"}}>
                      <InputLabel htmlFor="state-native-helper">Click</InputLabel>
                        <NativeSelect
                          value={this.props.ConstrainType}
                          onChange={this.props.handleConstrainTypeChange}
                          inputProps={{
                          name: 'Click To Select population constrain type',
                          id: 'state-native-helper',}}>
                          <option aria-label="None" value="">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</option>
                          <option value={"total population"}>total population</option>
                          <option value={"voting age population (TVAP)"}>voting age population (TVAP)</option>
                          <option value={"citizen voting age population (CVAP)"}>citizen voting age population (CVAP)</option>
                        </NativeSelect>
                      <FormHelperText>Select Population constrain Type</FormHelperText>
                    </FormControl>
                    <div className = "S1" style={{left: "40px"}}> 
                    <Typography id="discrete-slider" gutterBottom>
                      
                      </Typography>
                      <Slider 
                        defaultValue={0}
                        value={this.props.ConstrainTypeSliderValue}
                        getAriaValueText={this.props.valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                        onChange={this.props.handleChangeConstrainTypeSliderValue}
                      />
                      <h6>current value: {this.props.ConstrainTypeSliderValue}%</h6>
                      </div>
                </div>
                <br></br>
                <div>⠀⠀⠀⠀Majority-Minority Districts
                <br></br>
                <FormControl className="Form1" style={{left: "55px"}}>
                      <InputLabel htmlFor="state-native-helper">Click</InputLabel>
                        <NativeSelect
                          value={this.props.MinorityGroup}
                          onChange={this.props.handleChangeMinorityGroup}
                          inputProps={{
                          name: 'Click To Select a Minority Group',
                          id: 'state-native-helper',}}>
                          <option aria-label="None" value="">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</option>
                          <option value={"African American"}>African American</option>
                          <option value={"Latino"}>Latino</option>
                          <option value={"Asian"}>Asian</option>
                          <option value={"Native American"}>Native American</option>
                        </NativeSelect>
                      <FormHelperText>Select Minority Group</FormHelperText>
                    </FormControl>
                  <br></br>
                <FormControl className="Form1" style={{left: "55px"}}>
                      <InputLabel htmlFor="state-native-helper">Click</InputLabel>
                        <NativeSelect
                          value={this.props.MajorityMinorityDistricts}
                          onChange={this.props.handleChangeMajorityMinorityDistricts}
                          inputProps={{
                          name: 'Click To Select Majority-Minority Districts',
                          id: 'state-native-helper',}}>
                          <option aria-label="None" value="">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</option>
                          <option value={"0"}>0</option>
                          <option value={"1"}>1</option>
                          <option value={"2"}>2</option>
                          <option value={"3"}>3</option>
                           <option value={"4"}>4</option>
                        </NativeSelect>
                      <FormHelperText>Select Majority-Minority Districts</FormHelperText>
                      
                    </FormControl>
                </div>
                <br></br>
                <div>⠀⠀⠀⠀Set Protected Incumbents
                  <br></br>
                  <button style ={{position:"absolute", fontSize:"15px", left:"53px"}} data-toggle="modal" data-target="#myModal">
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
        <button type="button" class="btn btn-success" data-dismiss="modal">Apply</button>
      </div>

    </div>
  </div> 
  </div> 



          </div>
        )
    }
}   


export default SetConstraints