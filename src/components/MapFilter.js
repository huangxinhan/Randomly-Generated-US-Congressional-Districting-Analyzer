import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";

//material-ui
import Switch from '@material-ui/core/Switch';

class MapFilter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div id="accordion filter" style={{ position: 'absolute', textAlign: 'center', margin: 0, zIndex: 501, left: '15px', top: "15px" }}>
          <div class="card">
            <div class="card-header" id="headingFilter">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter">
                  Expand Map Filter
        </button>
              </h5>
            </div>

            <div id="collapseFilter" class="accordion body collapse" aria-labelledby="headingFilter" data-parent="#accordion filter">
              <div className="filternav" >
                <nav class="navbar navbar-expand-lg navbar-light bg-light rounded" >

                  <div>
                    <h5>  &nbsp;&nbsp;&nbsp;Current State: {this.props.current_state}</h5>
                    <h5>  &nbsp;&nbsp;&nbsp;⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</h5>
                  </div>


                  <button class='btn btn-secondary btn-sm'
                    style={{ position: 'absolute', textAlign: 'center', margin: 0, left: '140px', top: "276px" }}
                    onClick={this.props.reCenter}>Re-Center
</button>


                  <div className={this.props.OptionPage} style={{ textAlign: 'left', margin: 0, left: '120px', top: '1px', zIndex: 521 }}>
                    <div className="D1" >
                      <br /><br /><br /><br /><br />
                      <div>
                        Show Precincts
  <div></div>
  OFF
    <Switch
                          checked={this.props.checkerA}
                          onChange={this.props.checkerAchange}
                          color="primary"
                          name="checkedA"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
    ON
  </div>
                    </div>
                  </div>

                  <div className={this.props.OptionPage} style={{ textAlign: 'left', margin: 0, left: '120px', top: '58px' }}>
                    <div className="D1" >
                      <br /><br /><br /><br /><br />
                      <div>
                        Show Counties
  <div></div>
  OFF
    <Switch
                          checked={this.props.checkerC}
                          onChange={this.props.checkerCchange}
                          color="primary"
                          name="checkedC"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
    ON
  </div>
                    </div>
                  </div>

                  <div className={this.props.OptionPage} style={{ textAlign: 'left', margin: 0, left: '120px', top: '70px', zIndex: 521 }}>
                    <div className="D1" >
                      <div>
                        Default Districting
  <div></div>
  OFF
    <Switch
                          checked={this.props.checkerB}
                          onChange={this.props.checkerBchange}
                          color="primary"
                          name="checkedB"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
    ON
  </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
    )
  }
}


export default MapFilter