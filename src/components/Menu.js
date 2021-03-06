import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./component.css";


class Menu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
        };
       
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
          <a class="nav-link active" aria-current="page" href="#">OPTIONS</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">STAST</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">FILTER</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div className = "OptionPage">
    Toggle
    <div className = "D1"> Display Precints
    </div>
</div>
            </div>
        );
    }






}

export default Menu;