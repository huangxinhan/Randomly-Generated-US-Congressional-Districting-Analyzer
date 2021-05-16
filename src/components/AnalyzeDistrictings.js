import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";

//material-ui
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { NativeSelect } from '@material-ui/core';
import Plot from 'react-plotly.js';
import DistrictingSummary from './DistrictingSummary'
class AnalyzeDistrictings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let districts = [];
    if (this.props.current_state=="New York"){
      districts=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
    }
    else if (this.props.current_state=="Pennsylvania"){
      districts=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    }
    else if (this.props.current_state=="Maryland"){
      districts=[1,2,3,4,5,6,7,8];
    }
    let  sortByObjScore=this.props.sortByObjScore
    let sortByMM=this.props.sortByMM   
    let sortByEnacted=this.props.sortByEnacted
    let districtingsSum=this.props.districtingsSum
    let selectedDistricting=this.props.selectedDistricting
    let current_district=this.props.current_district
    console.log(selectedDistricting)

    return (
      
      <div>
        {/* <DistrictingSummary districtingDataBox={this.props.districtingDataBox} closeDataBox={this.props.closeDataBox}
         POPULATIONFATNESS_COMPACTNESS= {this.props.PopFatCompactness} GRAPH_COMPACTNESS= {this.props.GCompactness}
         POPULATION_EQUALITY= {this.props.PopulationEquality} DEVIATION_FROM_ENACTEDAREA= {this.props.DeviationFromEnacted}
         DEVIATION_FROM_ENACTEDPOP={ this.props.DeviationFromEnactedPopulation} SPLIT_COUNTIES= {this.props.SplitCounties}
         selectedDistricting={this.props.selectedDistricting}/> */}

        <div class="modal fade bd-example-modal-xl" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-xl" role="document" id="analysisModal">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="myExtraLargeModalLabel">Detailed Data Analysis</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.props.MapHandler}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ul class="nav nav-tabs">
                  <li class="nav-item" onClick={this.props.MapHandler}>
                    <a class="nav-link" href="#districtingdata" data-toggle="tab">Districting Data</a>
                  </li>
                  <li class="nav-item" onClick={this.props.MapHandler}>
                    <a class="nav-link" href="#districtdata" data-toggle="tab">District Data</a>
                  </li>
                  <li class="nav-item" onClick={this.props.MapHandler}>
                    <a class="nav-link" href="#boxandwhisker" data-toggle="tab">Show Box and Whisker Plot</a>
                  </li>
                  {/* <li class="nav-item" onClick={this.props.MapHandler}>
                    <a class="nav-link" href="#comparedistrictings" data-toggle="tab" >Compare Districtings</a>
                  </li> */}
                </ul>



                <div class="tab-content">
                  <div role="tabpanel" class="tab-pane" id="districtingdata" style={{ fontSize: "20px" }}>
                    <div><br></br></div>
       Objective Function Score: {selectedDistricting.objectiveFunctionScore}
       <div><br></br></div>

                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Objective Function Attributes</th>
                          <th scope="col">Weight</th>
                          <th scope="col">Value</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <th scope="row">Population Equality</th>
                          <td>{this.props.POPULATION_EQUALITY}</td>
                          <td>{selectedDistricting.populationEqualityDifference}</td>
                        </tr>
                        <tr>
                          <th scope="row">Population Percent Difference</th>
                          <td>{this.props.POPULATION_EQUALITY}</td>
                          <td>{selectedDistricting.populationPercentDifference}</td>
                        </tr>
                        <tr>
                          <th scope="row">Population Percent Difference VAP</th>
                          <td>{this.props.POPULATION_EQUALITY}</td>
                          <td>{selectedDistricting.populationPercentDifferenceVAP}</td>
                        </tr>

                        <tr>
                          <th scope="row">Split Counties</th>
                          <td>{this.props.SPLIT_COUNTIES}</td>
                          <td>{selectedDistricting.splitCountyScore}</td>
                        </tr>
                        <tr>
                          <th scope="row">Deviation From Average Districting</th>
                          <td>{this.props.DEVIATION_FROM_AVERAGE}</td>
                          <td>{selectedDistricting.deviationFromAverage}</td>
                        </tr>
                        {/* <tr>
                          <th scope="row">Deviation From Enacted Districting(Area)</th>
                          <td>{this.props.DEVIATION_FROM_ENACTEDAREA}</td>
                          <td>0.3</td>
                        </tr> */}
                        <tr>
                          <th scope="row">Deviation From Enacted Districting(Population)</th>
                          <td>{this.props.DEVIATION_FROM_ENACTEDPOP}</td>
                          <td>{selectedDistricting.deviationFromEnactedPop}</td>
                        </tr>
                        {/* <tr>
                          <th scope="row">Compactness(Polsby-Popper)</th>
                          <td>{this.props.POPULATION_EQUALITY}</td>
                          <td>0.1</td>
                        </tr> */}
                        <tr>
                          <th scope="row">Majority Minority Districts</th>
                          <td>{this.props.MajorityMinorityDistricts}</td>
                          <td>{selectedDistricting.numberOfMajorityMinorityDistricts}</td>
                        </tr>
                        <tr>
                          <th scope="row">Compactness(Graph)</th>
                          <td>{this.props.GRAPH_COMPACTNESS}</td>
                          <td>{selectedDistricting.graphCompactness}</td>
                        </tr>
                        {/* <tr>
                          <th scope="row">Political Fairness</th>
                          <td>{this.props.POLITICAL_FAIRNESS}</td>
                          <td>nothing for now</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>


                  <div role="tabpanel" class='tab-pane' id="districtdata">
                    <FormControl className="Form1">
                      <InputLabel htmlFor="state-native-helper">District</InputLabel>
                      <NativeSelect
                        value={this.props.districtNumber}
                        onChange={this.props.districtSelect}
                        inputProps={{
                          name: 'Click To View Detailed Information About a District',
                          id: 'state-native-helper',
                        }}>
                        {/* <option value={"District 1"}>District 1</option>
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
                        <option value={"District 27"}>District 27</option> */}
                         {districts.map((value, index) => {
                            return <option value ={index}key={index}>District {value}</option>
                          })}
                      </NativeSelect>
                      <FormHelperText>Click to select a District</FormHelperText>
                    </FormControl>

                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Data Types</th>
                          <th scope="col">Values</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Total Population</th>
                          <td>{current_district.totalPopulation}</td>
                        </tr>
                        <tr>
                          <th scope="row">Voting Population</th>
                          <td>{current_district.votingAgePopulation}</td>
                        </tr>
                        <tr>
                          <th scope="row">Objective Function Score</th>
                          <td>{current_district.objectiveFunctionScore}</td>
                        </tr>
                        {/* <tr>
                          <th scope="row">Incumbents</th>
                          <td>John Doe</td>
                        </tr> */}
                        <tr>
                          <th scope="row">Average Deviation</th>
                          <td>{current_district.deviationAverage}</td>
                        </tr>
                        <tr>
                          <th scope="row">Deviation from Enacted</th>
                          <td>{current_district.deviationEnacted}</td>
                        </tr>
                        <tr>
                          <th scope="row">Population Equality</th>
                          <td>{current_district.populationEquality}</td>
                        </tr>
                        {/* <tr>
                          <th scope="row">Political Fairness</th>
                          <td>{current_district.totalPopulation}</td>
                        </tr> */}
                        {/* <tr>
                          <th scope="row">Democratic Voter Percentage</th>
                          <td>56.4%</td>
                        </tr>
                        <tr>
                          <th scope="row">Republican Voter Percentage</th>
                          <td>43.6%</td>
                        </tr> */}
                        <tr>
                          <th scope="row">Total Minority Percentage</th>
                          <td>unknown</td>
                        </tr>
                        <tr>
                          <th scope="row">African American Population Percentage</th>
                          <td>{current_district.africanAmericanPopulation/current_district.totalPopulation}%</td>
                        </tr>
                        <tr>
                          <th scope="row">Asian Population Percentage</th>
                          <td>{current_district.asianPopulation}</td>
                        </tr>
                        <tr>
                          <th scope="row">Hispanic or Latino Percentage</th>
                          <td>{current_district.hispanicPopulation}</td>
                        </tr>
                        {/* <tr>
                          <th scope="row">American Indian or Alaska Native Percentage</th>
                          <td>0.3%</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>

                  <div role="tabpanel" class='tab-pane' id="boxandwhisker">
                    <h3>Minority Popularity Box and Whisker Plot</h3>
                    <Plot
                      data={this.props.BoxAndWhiskerData}
                    />
                  </div>


                  <div role="tabpanel" class='tab-pane' id="comparedistrictings">
                    <FormControl className="Form1">
                      <InputLabel htmlFor="state-native-helper">District</InputLabel>
                      <NativeSelect
                        value={this.props.current_districting1}
                        onChange={this.props.districtingSelect}
                        inputProps={{
                          name: 'Click To Select a Districting to Compare',
                          id: 'state-native-helper',
                        }}>
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
                        value={this.props.current_districting2}
                        onChange={this.props.districtingSelect}
                        inputProps={{
                          name: 'Click to select a Districting To Compare',
                          id: 'state-native-helper',
                        }}>
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
                    <button type="button" class="btn btn-info btn-sm" onClick={this.props.MapHandler2} style={{ position: "absolute", left: "20px" }}>Load Geography</button>⠀

      <br></br><br></br>
                    <br></br><br></br>
                    <br></br><br></br>
                    <br></br><br></br>
                    <br></br>
                    <table class="table table-striped" style={{ fontSize: "14px" }}>

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

        <h3>Analyze Districtings</h3>

        <FormControl className="Form1">
          <InputLabel htmlFor="state-native-helper">Select Districtings to Analyze</InputLabel>
          <NativeSelect
            value={this.props.category}
            onChange={this.props.categorySelect}
            inputProps={{
              name: 'Click To Select a Districting',
              id: 'state-native-helper',
            }}>
            <option aria-label="None" value="" />⠀⠀
            <option value={"1"}>Top 10 Districtings by Objective Function Score</option>
            <option value={"2"}>Top 10 Districtings by Majority Minority</option>
            <option value={"3"}>Top 10 Districtings by Closest to the Enacted Districting</option>
            <option value={"4"}>Top 10 Districting by Area Pair Deviations</option>
          </NativeSelect>
          <FormHelperText>Click to select a category</FormHelperText>
        </FormControl>

        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 1 - Score: {districtingsSum[0].objectiveFunctionScore}  {}
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("1")}> Analyze</button>⠀
                 </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 2 - Score: {districtingsSum[1].objectiveFunctionScore}  {}
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("2")}> Analyze</button>⠀
                 </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 3 - Score: {districtingsSum[2].objectiveFunctionScore}   {} 
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("3")}> Analyze</button>⠀
                 </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 4 - Score: {districtingsSum[3].objectiveFunctionScore}  {}
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("4")}> Analyze</button>⠀
                 </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 5 - Score: {districtingsSum[4].objectiveFunctionScore}  {}
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("5")}> Analyze</button>⠀
                 </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 6 - Score: {districtingsSum[5].objectiveFunctionScore}  {}
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("6")}> Analyze</button>⠀
                 </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 7 - Score: {districtingsSum[6].objectiveFunctionScore}  {}
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("7")}> Analyze</button>⠀
                 </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 8 - Score: {districtingsSum[7].objectiveFunctionScore}  {}
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("8")}> Analyze</button>⠀
                 </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 9 - Score: {districtingsSum[8].objectiveFunctionScore}  {}
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("9")}> Analyze</button>⠀
                 </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style={{ width: "550px", height: "50px", fontSize: "15px", left: "13px", textAlign: "center" }}>
          <div class="card-body align-items-center d-flex justify-content-center">
            <p class="card-text">Districting 10 - Score: {districtingsSum[9].objectiveFunctionScore}  {}
                  <button type="button" class="btn btn-primary btn-sm">Load Districting</button>⠀
                 {/* <button type="button" class="btn btn-success btn-sm" >Show Data</button>⠀ */}
                 <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"onClick={this.props.showDistrictingData("10")}> Analyze</button>⠀
                 </p>
          </div>
        </div>

      </div>
    )
  }
}


export default AnalyzeDistrictings