import React, {Component} from 'react'
import SearchList from "./SearchList";


export default class VenueList extends Component {
    render() {
        return(
            <ol className='venue-list'>
                {this.props.venues && this.props.venues.map((venue, index) => (
                    <SearchList key={index} {...venue} clickSearchList={this.props.clickSearchList}/>
                ))}
            </ol>
        )
    }
}