import React, { Component } from 'react'

//this is the component that builds the card each hike will use. child of LogList.js.
class HikeCard extends Component {
 
    handleCheck = event => {
        event.preventDefault()
        this.props.updateHike(this.props.hike)
    }
 
    render() {
    return (
       <>
       <div className="card">
        <div className="card-content">
        <h3 className="hike__name">{this.props.hike.trail.name}</h3>
          <p>{this.props.hike.date} | {this.props.hike.trail.miles} miles</p>
          <p className="comments">{this.props.hike.comments}</p>
          <p>Link: <a target="_blank" href={this.props.hike.trail.link}>More about this hike</a></p>
          <div className="card__buttons">
          <button className="edit_button"
          onClick={() => {this.props.history.push(`/hikes/${this.props.hike.id}/edit`)}}>Edit</button>
          <button className="edit_button" onClick={() => this.props.deleteHike(this.props.hike.id)}>Delete</button></div>
        </div>
        </div>
       </>
    );
  }
}

export default HikeCard;