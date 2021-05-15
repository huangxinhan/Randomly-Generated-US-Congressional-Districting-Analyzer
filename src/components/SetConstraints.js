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
          minorityOptions=[0,1,2,3,4];
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
                          <option value={"POPULATIONFATNESS_COMPACTNESS"} disabled={true}>population fatness</option>
                          <option value={"POLSBYPOPPER_COMPACTNESS"}disabled={true}>Polsby-Popper</option>
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
                {/* <br></br> */}
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
                          <option value={"CVAP"}disabled={true}>citizen voting age population (CVAP)</option>
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
                        step={1}
                        marks
                        min={0}
                        max={10}
                        onChange={this.props.handleChangeConstrainTypeSliderValue}
                      />
                      <h6>current value: {this.props.ConstrainTypeSliderValue}%</h6>
                      </div>
                </div>
                {/* <br></br> */}
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
                onClick={this.props.selectIncumbents("Brian Fitzpatrick")}      />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Brian Fitzpatrick(D1)
              </label>

              <input
                class="Incumbent-Checkbox"type="checkbox"value="" id="flexCheckDefault"
                onClick={this.props.selectIncumbents("Brendan Boyle")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Brendan Boyle(D2)
              </label>
              
              
              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                id="flexCheckDefault"onClick={this.props.selectIncumbents("Dwight Evans")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Dwight Evans(D3)
              </label>

              <br></br>

              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                onClick={this.props.selectIncumbents("Madeleine Dean")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Madeleine Dean(D4)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Mary Gay Scanlon")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Mary Gay Scanlon(D5)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Chrissy Houlahan")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Chrissy Houlahan(D6)
              </label>

              <br></br>
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Susan Wild")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Susan Wild(D7)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Matt Cartwright")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Matt Cartwright(D8)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Dan Meuser")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Dan Meuser(D9)
              </label>

              <br></br>       
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Scott Perry")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Scott Perry(D10)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Lloyd Smucker")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Lloyd Smucker(D11)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Fred Keller")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Fred Keller(D12)
              </label>

              <br></br>      
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("John Joyce")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              John Joyce(D13)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Guy Reschenthaler")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Guy Reschenthaler(D14)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Glenn Thompson")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Glenn Thompson(D15)
              </label>

              <br></br>    
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Mike Kelly")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
               Mike Kelly(D16)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Conor Lamb")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Conor Lamb(D17)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Michael Doyle")}
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
                onClick={this.props.selectIncumbents("Lee Zeldin")}      />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Lee Zeldin(D1)
              </label>

              <input
                class="Incumbent-Checkbox"type="checkbox"value="" id="flexCheckDefault"
                onClick={this.props.selectIncumbents("Peter King")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Peter King(D2)
              </label>
              
              
              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                id="flexCheckDefault"onClick={this.props.selectIncumbents("Tom Suozzi")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Tom Suozzi(D3)
              </label>

              

              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                onClick={this.props.selectIncumbents("Kathleen Rice")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Kathleen Rice(D4)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Gregory Meeks")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Gregory Meeks(D5)
              </label>
              <br></br>

              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Grace Meng")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Grace Meng(D6)
              </label>

            
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Nydia Velazquez")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Nydia Velazquez(D7)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Hakeem Jeffries")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Hakeem Jeffries(D8)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Yvette Clarke")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Yvette Clarke(D9)
              </label>

              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Jerrold Nadler")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Jerrold Nadler(D10)
              </label>
              <br></br>    
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Max Rose")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Max Rose(D11)
              </label>

            
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Carolyn Maloney")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Carolyn Maloney(D12)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Adriano Espaillat")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Adriano Espaillat(D13)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Alexandria Ocasio-Cortez")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Alexandria Ocasio-Cortez(D14)
              </label>

              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Jose Serrano")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Jose Serrano(D15)
              </label>
              <br></br>  
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Eliot Engel")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Eliot Engel(D16)
              </label>

            
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Nita Lowey")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Nita Lowey(D17)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Sean Maloney")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Sean Maloney(D18)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Antonio Delgado")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Antonio Delgado(D19)
              </label>

              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Paul Tonko")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Paul Tonko(D20)
              </label>
              <br></br>  
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Elise Stefanik")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Elise Stefanik(D21)
              </label>

            
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Anthony Brindisi")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Anthony Brindisi(D22)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Tom Reed")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Tom Reed(D23)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("John Katko")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              John Katko(D24)
              </label>

              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Joseph Morelle")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Joseph Morelle(D25)
              </label>
              <br></br>  
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Brian Higgins")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Brian Higgins(D26)
              </label>

            
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Christopher Jacobs")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Christopher Jacobs(D27)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("John Winston")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              John Winston(D28)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Henry Franklin")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Henry Franklin(D29)
              </label>

              
              <br></br>     
              
          </div>
        </div>
      



        <div class="modal-body"style={{display:this.props.current_state==="Maryland"?"block":"none"}}>
        <div class="form-check">
              <input
                class="Incumbent-Checkbox" type="checkbox" value="Tammy_Rowe" id="flexCheckDefault" 
                onClick={this.props.selectIncumbents("Andrew Harris")}      />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Andrew Harris(D1)
              </label>

              <input
                class="Incumbent-Checkbox"type="checkbox"value="" id="flexCheckDefault"
                onClick={this.props.selectIncumbents("Dutch Ruppersberger")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Dutch Ruppersberger(D2)
              </label>
              
              
              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                id="flexCheckDefault"onClick={this.props.selectIncumbents("John Sarbanes")}/>
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              John Sarbanes(D3)
              </label>

              <br></br>

              <input
                class="Incumbent-Checkbox"type="checkbox" value=""
                onClick={this.props.selectIncumbents("Anthony Brown")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Anthony Brown(D4)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Steny Hoyer")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Steny Hoyer(D5)
              </label>


              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("David Trone")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              David Trone(D6)
              </label>

              <br></br>
              <input
                class="Incumbent-Checkbox"type="checkbox"
                value=""onClick={this.props.selectIncumbents("Kweisi Mfume")}
                id="flexCheckDefault"
              />
              <label class="Incumbent-Checkbox" for="flexCheckDefault" id="checkbox1" >
              Kweisi Mfume(D7)
              </label>


              <input
                class="Incumbent-Checkbox" type="checkbox"
                value=""onClick={this.props.selectIncumbents("Jamie Raskin")}
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