import React, { Component } from 'react'




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
          <p><span className="card_item">Hike Date: </span>{this.props.hike.date}</p>
          <p><span className="card_item">Miles: </span>{this.props.hike.trail.miles}</p>
          <p><span className="card_item">Comments: </span>{this.props.hike.comments}</p>
          <p>Link: <a target="_blank" href={this.props.hike.trail.link}>More about this hike</a></p>
          <div className="card__buttons">
          <button className="edit_button"
          onClick={() => {this.props.history.push(`/hikes/${this.props.hike.id}/edit`)}}>Edit</button>
          <button onClick={() => this.props.deleteHike(this.props.hike.id)}>Delete</button></div>
        </div>
        </div>
       </>
    );
  }
}

export default HikeCard;