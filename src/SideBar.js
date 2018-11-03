import React, {Component} from 'react'
import VenueList from "./VenueList";

export default class SideBar extends Component {
    state = {
        query: "",
        venues: []
    }
    /* Filter venues search result lists*/
    searchVenuesFilter = () => {
        if (this.state.query.trim() !== "") {
            const venues = this.props.venues.filter(venue =>
                venue.name.toLowerCase().includes(this.state.query.toLowerCase()))
            return venues;
        }
        return this.props.venues
    };
    //Filter query change markers
    updateSearchList = event => {
        this.setState({query: event.target.value});
        const markers = this.props.venues.map(venue => {
            const isMatched = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
            const marker = this.props.markers.find(marker => marker.id === venue.id);
            isMatched === true ? marker.isVisible = true : marker.isVisible = false;
            return marker;
        });
        this.props.updateState({markers})
    };

    render() {
        return (
            <div className='side-bar'>
                <input type={'search'} id={'search'} aria-label='Search Google Maps' placeholder={'Search Google Maps'} onChange={this.updateSearchList}/>
                <VenueList {...this.props}
                           venues={this.searchVenuesFilter()}
                           clickSearchList={this.props.clickSearchList}/>
            </div>
        )
    }
}
