import React, {Component} from 'react';

import './App.css';
import Map from "./component/Map";
import SquareAPI from "./API"

class App extends Component {
    constructor() {
        super();
        this.state = {
            venues: [],
            markers: [],
            center: [],
            zoom: 10
        };
    }

    componentDidMount() {
        SquareAPI.search({
            near: "East Lansing, MI",
            query: "tacos",
            limit: 10
        }).then(results => {
            const {venues} = results.response;
            const {center} = results.response.geocode.feature.geometry;
            const markers = venues.map(venue => {
                return {
                    lat: venue.location.lat,
                    lng: venue.location.lng,
                    isOpen: false,
                    isVisible: true
                };
            });
            this.setState({venues, center, markers})
        });
    }

    render() {
        return (
            <Map {...this.state}/>
        );
    }
}

export default App;
