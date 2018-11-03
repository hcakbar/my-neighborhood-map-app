import React, {Component} from 'react'
import ListItem from "./ListItem";


export default class VenueList extends Component {
    render() {
        return(
            <ol className='venue-list'>
                {this.props.venues && this.props.venues.map((venue, index) => (
                    <ListItem key={index} {...venue} clickSearchList={this.props.clickSearchList}/>
                ))}
            </ol>
        )
    }
}