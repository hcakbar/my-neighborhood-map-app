import React, {Component} from 'react';

import './App.css';
import Map from "./Map";
import SquareAPI from "./squarApi"
import SideBar from "./SideBar";

class App extends Component {
    state = {
        venues: [],
        markers: [],
        center: [],
        zoom: 10,
        updateState: object => {
            this.setState(object);
        }
    };
    /*Invoke search venues update*/
    componentDidMount() {
        SquareAPI.searchVenues({
            near: "San Francisco Bay, CA",
            query: "BART",
            limit: 10
        }).then(results => {
            const {venues} = results.response;
            const {center} = results.response.geocode.feature.geometry;
            const markers = venues.map(venue => {
                return {
                    lat: venue.location.lat,
                    lng: venue.location.lng,
                    isOpen: false,
                    isVisible: true,
                    id: venue.id
                };
            });
            this.setState({venues, center, markers})
            console.log(venues)
        });
    }

    /* Default close all markers */
    closeAllMarkers = () => {
        const markers = this.state.markers.map(marker => {
            marker.isOpen = false;
            return marker;
        })
        this.setState({markers: Object.assign(this.state.markers, markers)})
    }
    /*Get venue details for clicked marker*/
    clickMarker = marker => {
        this.closeAllMarkers();
        marker.isOpen = true;
        this.setState({markers: Object.assign(this.state.markers, marker)});
        //copy property values for matching venue's id
        const venue = this.state.venues.find(venue => venue.id === marker.id);
        //copy venues from response
        SquareAPI.getVenueDetails(marker.id).then(
            response => {
                const newVenue = Object.assign(venue, response.response.venue);
                this.setState({venues: Object.assign(this.state.venues, newVenue)})
            })
    }
    /*Click venue marker handler*/
    clickSearchList = venue => {
        //find corresponding marker
        const marker = this.state.markers.find(marker => marker.id === venue.id);
        this.clickMarker(marker);
    }

    render() {
        return (
            <div className='App'>
                <SideBar {...this.state} clickSearchList={this.clickSearchList}/>
                <Map {...this.state}
                     clickMarker={this.clickMarker}
                />
            </div>
        );
    }
}

export default App;
