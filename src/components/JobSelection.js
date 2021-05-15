import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";

class JobSelection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let job1=this.props.mgggPrams;
    //console.log(mgggs);
    //let job1=mgggs[0];
    let states={jobSummaryID: "job1", stateName: "PA", numOfDistrictings: "103201", numOfDistricts: "27", coolingRounds: "3",totalRounds:"150"};
    
    return (
      <div>
        <h3>Select a Job</h3>

        <div class="card bg-light mb-3" style={{ width: "550px", fontSize: "15px", left: "13px" }}>
          <div class="card-body">
            <h5 class="card-title">{job1.stateName} Job1</h5>
            <p class="card-text">•{job1.numOfDistrictings} districtings  •{job1.numOfDistricts} districts   </p>
            <p class="card-text">• Cooling Rounds: {job1.coolingRounds} </p>
            <p class="card-text">•TotalRounds: {job1.totalRounds}   </p>
            <input class="form-check-input" type="radio" value="1" checked={this.props.jobChecked===1?true :false} id="flexCheckDefault 1" onClick={this.props.selectJobs(1)} />
            <label class="form-check-label" for="flexCheckDefault">
              Select Job
                  </label>
          </div>
        </div>

        <div class="card bg-light mb-3" style={{ width: "550px", fontSize: "15px", left: "13px" }}>
          <div class="card-body">
          <h5 class="card-title">{states.stateName} Job2</h5>
            <p class="card-text">•{states.numOfDistrictings} districtings  •{states.numOfDistricts} districts   </p>
            <p class="card-text">• Cooling Rounds: {states.coolingRounds} </p>
            <p class="card-text">•TotalRounds: {states.totalRounds}   </p>
            <input class="form-check-input" type="radio" value="2" id="flexCheckDefault 2" checked={this.props.jobChecked===2?true :false} onClick={this.props.selectJobs(2)}/>
            <label class="form-check-label" for="flexCheckDefault">
              Select Job
                  </label>
          </div>
        </div>

        <div class="card bg-light mb-3" style={{ width: "550px", fontSize: "15px", left: "13px" }}>
          <div class="card-body">
          <h5 class="card-title">{states.stateName} Job3</h5>
            <p class="card-text">•{states.numOfDistrictings} districtings  •{states.numOfDistricts} districts   </p>
            <p class="card-text">• Cooling Rounds: {states.coolingRounds} </p>
            <p class="card-text">•TotalRounds: {states.totalRounds}   </p>
            <input class="form-check-input" type="radio" value="3" id="flexCheckDefault 3" checked={this.props.jobChecked===3?true :false} onClick={this.props.selectJobs(3)}/>
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
