import React, { Component } from 'react'

//this is the component that builds the card each hike will use. child of LogList.js.
class HikeCard extends Component {

  render() {
    return (
      <>
        <div className="card">
          <div className="card-content">
            <h3 className="hike__name">{this.props.hike.trail.name}</h3>
            <p>{this.props.hike.date} | {this.props.hike.miles} miles</p>
            <p className="comments">{this.props.hike.comments}</p>
            <p>Link: <a target="_blank" rel="noopener noreferrer" href={this.props.hike.trail.link}>More about this hike</a></p>
            <div className="card__buttons">
              <button className="edit_button"
                onClick={() => { 
                  sessionStorage.setItem("currentTrailId", this.props.hike.trail.name)
                  this.props.history.push(`/hikes/${this.props.hike.id}/edit`) }}>Edit</button>
              <button className="edit_button" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.props.deleteHike(this.props.hike.id)}}>Delete</button></div>
          </div>
        </div>
      </>
    );
  }
}

export default HikeCard;