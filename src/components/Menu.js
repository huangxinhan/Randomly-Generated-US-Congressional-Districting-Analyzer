import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';



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
                <a href="#">Abouft</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
        );
    }






}

export default Menu;