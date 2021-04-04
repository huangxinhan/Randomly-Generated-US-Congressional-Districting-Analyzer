import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";


class JobSelection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>Select a Job</h3>

        <div class="card bg-light mb-3" style={{ width: "550px", fontSize: "15px", left: "13px" }}>
          <div class="card-body">
            <h5 class="card-title">Job 1</h5>
            <p class="card-text">•New York   •100,139 districtings    •27 districts</p>
            <p class="card-text">•Additional Parameters</p>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault 1" onClick={this.props.selectJob} />
            <label class="form-check-label" for="flexCheckDefault">
              Select Job
                  </label>
          </div>
        </div>

        <div class="card bg-light mb-3" style={{ width: "550px", fontSize: "15px", left: "13px" }}>
          <div class="card-body">
            <h5 class="card-title">Job 2</h5>
            <p class="card-text">•New York   •100,139 districtings    •27 districts</p>
            <p class="card-text">•Additional Parameters</p>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault 2" />
            <label class="form-check-label" for="flexCheckDefault">
              Select Job
                  </label>
          </div>
        </div>

        <div class="card bg-light mb-3" style={{ width: "550px", fontSize: "15px", left: "13px" }}>
          <div class="card-body">
            <h5 class="card-title">Job 3</h5>
            <p class="card-text">•New York   •100,139 districtings    •27 districts</p>
            <p class="card-text">•Additional Parameters</p>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault 3" />
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