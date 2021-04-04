import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";

class DistrictingSummary extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div class="card" style={{ position: 'absolute', height: '550px', width: '450px', textAlign: 'center', margin: 0, zIndex: 501, left: '1px', top: "413px", visibility: this.props.districtingDataBox }}>
          <div class="card-header" id="headingFilter">
            <h5> Districting Details </h5>
          </div>
          <div>
            <table class="table table-striped" style={{ fontSize: "12px" }}>
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
                  <td>0.3</td>
                  <td>0.2</td>
                </tr>

                <tr>
                  <th scope="row">Split Counties</th>
                  <td>0.4</td>
                  <td>0.2</td>
                </tr>
                <tr>
                  <th scope="row">Deviation From Average Districting</th>
                  <td>0.4</td>
                  <td>0.3</td>
                </tr>
                <tr>
                  <th scope="row">Deviation From Enacted Districting(Area)</th>
                  <td>0.5</td>
                  <td>0.3</td>
                </tr>
                <tr>
                  <th scope="row">Deviation From Enacted Districting(Population)</th>
                  <td>0.2</td>
                  <td>0.4</td>
                </tr>
                <tr>
                  <th scope="row">Compactness(Polsby-Popper)</th>
                  <td>0.3</td>
                  <td>0.1</td>
                </tr>
                <tr>
                  <th scope="row">Compactness(Population Fatness)</th>
                  <td>0.8</td>
                  <td>0.1</td>
                </tr>
                <tr>
                  <th scope="row">Compactness(Graph)</th>
                  <td>0.6</td>
                  <td>0.5</td>
                </tr>
                <tr>
                  <th scope="row">Political Fairness</th>
                  <td>0.2</td>
                  <td>0.6</td>
                </tr>
              </tbody>
            </table>

          Objective Function Score: 99.73⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          <button class="btn btn-danger btn-sm" onClick={this.props.closeDataBox}>Close</button>
          </div>

        </div>
    )
  }
}


export default DistrictingSummary