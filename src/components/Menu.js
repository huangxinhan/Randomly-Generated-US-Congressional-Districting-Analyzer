import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";


class Menu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            OptionPage: true,
            StatsPage: false,
            FilterPage: false,
        };
       
      }
      hideComponent(name) {
        console.log(name);
        switch (name) {
          case "OptionPage":
            this.setState({ OptionPage: true });
            this.setState({ StatsPage: false });
            this.setState({ FilterPage: false });
            break;
          case "StatsPage":
            this.setState({ StatsPage: true });
            this.setState({ FilterPage: false });
            this.setState({ OptionPage: false });
            break;
          case "FilterPage":
            this.setState({ FilterPage: true });
            this.setState({ StatsPage: false });
            this.setState({ OptionPage: false });
            break;
          
        }
      }

      render() {
        
        return (
            
            <div className="sidenav" style={{ position: 'absolute', textAlign: 'center'}}>
                
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link "href="#"onClick={() => this.hideComponent("OptionPage")}>OPTIONS</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#" onClick={() => this.hideComponent("StatsPage")}>STATS</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#"onClick={() => this.hideComponent("FilterPage")}>FILTER</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>


                <div>
                <div className = "OptionPage" style={{visibility: this.state.OptionPage ? 'visible' : 'hidden' }}>
                    Toggle
                    <div className = "D1"> Display Precints
                    </div>
                </div>
                <div className = "StatsPage"style={{visibility: this.state.StatsPage ? 'visible' : 'hidden' }}>
                    stats
                    <div className = "D1"> Display Stats
                    </div>
                </div>
                <div className = "FilterPage"style={{visibility: this.state.FilterPage ? 'visible' : 'hidden' }}>
                    filter
                    <div className = "D1"> Display filter
                    </div>
                </div>
                


                </div>
            </div>
        );
    }






}

export default Menu;