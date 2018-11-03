import React, {Component} from 'react';

import './App.css';
import Map from "./component/Map";
import SquareAPI from "./EXT_API/squarApi"
import SideBar from "./component/SideBar";

class App extends Component {
    constructor() {
        super();
        this.state = {
            venues: [],
            markers: [],
            center: [],
            zoom: 10,
            updateSuperState: obj => {
                this.setState(obj);
            }
        };
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
    handleMarkerClick = marker => {
        this.closeAllMarkers();
        marker.isOpen = true;
        this.setState({markers: Object.assign(this.state.markers, marker)});
        //copy property values for matching venue's id
        const venue = this.state.venues.find(venue => venue.id === marker.id);
        //copy venues from response
        SquareAPI.getVenueDetails(marker.id).then(
            res => {
                const newVenue = Object.assign(venue, res.response.venue);
                this.setState({venues: Object.assign(this.state.venues, newVenue)})
            })
    }
    /*Click venue marker handler*/
    handleListItemClick = venue => {
        //find corresponding marker
        const marker = this.state.markers.find(marker => marker.id === venue.id);
        this.handleMarkerClick(marker);
    }
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

    render() {
        return (
            <div className='App'>
                <SideBar {...this.state} handleListItemClick={this.handleListItemClick} />
                <Map {...this.state}
                     handleMarkerClick={this.handleMarkerClick}
                />
            </div>
        );
    }
}

export default App;
