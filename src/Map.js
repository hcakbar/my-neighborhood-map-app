/* global google */

import React, {Component} from 'react'

import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"

//React Google Map Style Guide: https://tomchentw.github.io/react-google-maps/
const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap defaultZoom={8}
                   zoom={props.zoom}
                   defaultCenter={{lat: -34.397, lng: 150.644}}
                   center={props.center}>
            {props.markers &&
            props.markers.filter(marker => marker.isVisible).map((marker, index, array) => {
                const venueInfo = props.venues.find(venue => venue.id === marker.id);
                return (
                    <Marker
                        key={index}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => props.clickMarker(marker)}
                        animation={array.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}>
                        {marker.isOpen &&
                        venueInfo.bestPhoto && (
                            <InfoWindow>
                                <React.Fragment>
                                    <p>{venueInfo.name}</p>
                                    <img src={`${venueInfo.bestPhoto.prefix}200x200${
                                        venueInfo.bestPhoto.suffix
                                        }`}
                                         alt={venueInfo.name}
                                         aria-label={venueInfo.name}/>
                                </React.Fragment>
                            </InfoWindow>
                        )}
                    </Marker>
                );
            })}
        </GoogleMap>
    ))
);

//React Google Map: https://tomchentw.github.io/react-google-maps/
export default class Map extends Component {
    render() {
        return (
            <MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA2PcpDn2pV1ci4HCKYTAf7SS8knCIOrm4"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`, width: `75%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        );
    }
}