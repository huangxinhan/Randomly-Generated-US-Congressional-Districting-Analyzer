import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { NativeSelect } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

class SetConstraints extends Component {
    constructor(props){
        super(props)
    }

    render(){
      let minorityOptions = [];
        if (this.props.MinorityGroup=="AFRICAN_AMERICAN"){
          minorityOptions=[1,2,3,4];
        }
        else{
          minorityOptions=[0];
        }
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
                          <option value={"GRAPH_COMPACTNESS"}>graph compactness</option>
                          <option value={"POPULATIONFATNESS_COMPACTNESS"}>population fatness</option>
                          <option value={"POLSBYPOPPER_COMPACTNESS"}>Polsby-Popper</option>
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
                          <option aria-label="None" value="">⠀                      ⠀</option>
                          <option value={"TOTAL"}>total population</option>
                          <option value={"VAP"}>voting age population (TVAP)</option>
                          <option value={"CVAP"}>citizen voting age population (CVAP)</option>
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
                      <h6>current value: {this.props.ConstrainTypeSliderValue/10}%</h6>
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
                          <option value={"AFRICAN_AMERICAN"}>African American</option>
                          <option value={"HISPANIC"}>Latino</option>
                          <option value={"ASIAN"}>Asian</option>
                          <option value={"NATIVE_AMERICAN"}>Native American</option>
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
                          {/* <option value={"0"}>0</option>
                          <option value={"1"}>1</option>
                          <option value={"2"}>2</option>
                          <option value={"3"}>3</option>
                           <option value={"4"}>4</option> */}
                           {minorityOptions.map((value, index) => {
                            return <option key={index}>{value}</option>
                          })}
                        </NativeSelect>
                      <FormHelperText>Select Majority-Minority Districts</FormHelperText>
                      </FormControl>
                      <div className = "S1" style={{left: "40px"}}> 
                    <Typography id="discrete-slider" gutterBottom>
                      
                      </Typography>
                 
                    <Slider 
                        defaultValue={0}
                        value={this.props.MajorMinorThres}
                        getAriaValueText={this.props.valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={0.1}
                        marks
                        min={0}
                        max={1}
                        onChange={this.props.handleChangeMajorMinorThres}
                      />
                      <h6>Threshold value: {this.props.MajorMinorThres * 100}%</h6>
                      </div>
                </div>
                <div></div>
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

      
      <div class="modal-body" style={{display:this.props.current_state==="Pennsylvania"?"block":"none"}}>
              <div class="form-check">
              <input
                class="Incumbent-Checkbox" type="checkbox" value="Tammy_Rowe" id="flexCheckDefault" 
                onClick={this.props.selectIncumbents("Brian_Fitzpatrick")}      />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Brian Fitzpatrick(D1)
              </label>

              <input
                class="Incumbent-Checkbox"type="checkbox"value="" id="flexCheckDefault"
                onClick={this.props.selectIncumbents("Brendan_Boyle")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Brendan Boyle(D2)
              </label>
              
              
              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                id="flexCheckDefault"onClick={this.props.selectIncumbents("Dwight_Evans")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Dwight Evans(D3)
              </label>

              <br></br>

              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                onClick={this.props.selectIncumbents("Madeleine_Dean")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Madeleine Dean(D4)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Mary_Gay_Scanlon")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Mary Gay Scanlon(D5)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Chrissy_Houlahan")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Chrissy Houlahan(D6)
              </label>

              <br></br>
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Susan_Wild")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Susan Wild(D7)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Matt_Cartwright")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Matt Cartwright(D8)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Dan_Meuser")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Dan Meuser(D9)
              </label>

              <br></br>       
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Scott_Perry")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Scott Perry(D10)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Lloyd_Smucker")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Lloyd Smucker(D11)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Fred_Keller")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Fred Keller(D12)
              </label>

              <br></br>      
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("John_Joyce")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              John Joyce(D13)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Guy_Reschenthaler")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Guy Reschenthaler(D14)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Glenn_Thompson")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Glenn Thompson(D15)
              </label>

              <br></br>    
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Mike_Kelly")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
               Mike Kelly(D16)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Conor_Lamb")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Conor Lamb(D17)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Michael_Doyle")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Michael Doyle(D18)
              </label>

              <br></br>     
              
          </div>
      </div>




      <div class="modal-body"style={{display:this.props.current_state==="New York"?"block":"none"}}>
      <div class="form-check">
              <input
                class="Incumbent-Checkbox" type="checkbox" value="Tammy_Rowe" id="flexCheckDefault" 
                onClick={this.props.selectIncumbents("Tammy_Rowe")}      />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Tammy Rowe(D1)
              </label>

              <input
                class="Incumbent-Checkbox"type="checkbox"value="" id="flexCheckDefault"
                onClick={this.props.selectIncumbents("Clifford_Kim")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Clifford Kim(D2)
              </label>
              
              
              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                id="flexCheckDefault"onClick={this.props.selectIncumbents("Owen_Neal")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Owen Neal(D3)
              </label>

              <br></br>

              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                onClick={this.props.selectIncumbents("Mabel_Logan")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Mabel Logan(D4)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Nicole_Mann")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Nicole Mann(D5)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Sara_Holloway")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Sara Holloway(D6)
              </label>

              <br></br>
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Edward_Carson")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Edward Carson(D7)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Doreen_Lewis")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Doreen Lewis(D8)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Inez_Jimenez")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Inez Jimenez(D9)
              </label>

              <br></br>       
              
          </div>
        </div>
      



        <div class="modal-body"style={{display:this.props.current_state==="Maryland"?"block":"none"}}>
        <div class="form-check">
              <input
                class="Incumbent-Checkbox" type="checkbox" value="Tammy_Rowe" id="flexCheckDefault" 
                onClick={this.props.selectIncumbents("Tammy_Rowe")}      />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Andrew Harris(D1)
              </label>

              <input
                class="Incumbent-Checkbox"type="checkbox"value="" id="flexCheckDefault"
                onClick={this.props.selectIncumbents("Clifford_Kim")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Dutch Ruppersberger(D2)
              </label>
              
              
              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                id="flexCheckDefault"onClick={this.props.selectIncumbents("Owen_Neal")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              John Sarbanes(D3)
              </label>

              <br></br>

              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                onClick={this.props.selectIncumbents("Mabel_Logan")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Anthony Brown(D4)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Nicole_Mann")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Steny Hoyer(D5)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Sara_Holloway")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              David Trone(D6)
              </label>

              <br></br>
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Edward_Carson")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Kweisi Mfume(D7)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Doreen_Lewis")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Jamie Raskin(D8)
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