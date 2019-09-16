import React, { Component } from 'react'




class SearchCard extends Component {
 
 
    render() {
    return (
       <>
       <div className="card">
            <div className="card-content">
                <h3 className="trail_name">{this.props.trail.name}</h3>
                <p><span className="card_item">Miles: </span>{this.props.trail.miles}</p>
                <p><span className="card_item">Description: </span>{this.props.trail.description}</p>
                <p><span className="card_item">Difficulty: </span>{this.props.trail.difficulty}</p>
                <p><span className="card_item">Feature: </span>{this.props.trail.feature}</p>
                <p><span className="card_item">Elevation Gain: </span>{this.props.trail.elevationGain}</p>
                <p><span className="card_item">Area of Park: </span>{this.props.trail.location}</p>
                <p><span className="card_item"> Trailhead on Google Maps: </span><a target="_blank" href={this.props.trail.trailhead}>Trailhead Location</a></p>
                <a target="_blank" href={this.props.trail.link}>[More about this hike]</a>
            </div>
        </div>
       </>
    );
  }
}

export default SearchCard;