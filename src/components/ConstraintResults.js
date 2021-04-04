import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";


class ConstraintResults extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h3>Constraint Results</h3>
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <h5>Filtered Out By Population Compactness: 27,301</h5>
                <h5>Filtered Out By Majority-Minority: 50,230</h5>
                <h5>Filtered Out By Population Constraint: 18,301</h5>
                <h5>Districtings Remaining: 1,794</h5>
            </div>
        )
    }
}   


export default ConstraintResults