import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./com.css";


class ConstraintResults extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let ConstraintResults=this.props.constraintsResults;
        return (
            <div>
                <h3>Constraint Results</h3>
                <div class="spinner-border" role="status">
                    {/* <span class="sr-only">Loading...</span> */}
                </div>
                <h5>Filtered Out By graph Compactness: {ConstraintResults.filteredByCompactnessCount}</h5>
                <h5>Filtered Out By Majority-Minority: {ConstraintResults.filteredByMMDCount}</h5>
                <h5>Filtered Out By Population Constraint: {ConstraintResults.filteredByPopConstraintCount}</h5>
                <h5>Filtered Out By Incumbent Protection: {ConstraintResults.filteredByIncumbentCount}</h5>
                <h5>Districtings Remaining: {ConstraintResults.constrainedDistrictings}</h5>
            </div>
        )
    }
}


export default ConstraintResults