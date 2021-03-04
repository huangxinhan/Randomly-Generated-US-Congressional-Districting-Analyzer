import React, { useState, Component} from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'


mapboxgl.accessToken='pk.eyJ1Ijoid29ybGRjYWxsaW5nIiwiYSI6ImNrbHU3azhuOTBsOXcyb281eDg4eXpjMTMifQ.1zXi-fgg6Z9l8EK7OcyTKA'

class Maps extends Component{
    constructor(props) {
        super(props)
        this.state = {
            lng: -96,
            lat: 37.8,
            zoom: 3
        }
    }

    componentDidMount(){
        const {lng, lat, zoom} = this.state
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        })
    }

    render() {
        const { lng, lat, zoom } = this.state;
    
        return (
          <div>
            <div ref={el => this.mapContainer = el}/>
          </div>
        );
    }

}

export default Maps;