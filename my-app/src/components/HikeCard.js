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
        <h3 className="hike__name">{this.props.hike.name}</h3>
          <p>Hike Date: {this.props.hike.date}</p>
          <p>Miles: {this.props.hike.miles}</p>
          <p>Comments: {this.props.hike.comments}</p>
          <div className="card__buttons">
          <button outline color="dark" size="sm"
          onClick={() => {this.props.history.push(`/hikes/${this.props.hike.id}/edit`)}}>Edit</button>
          <button outline color="danger" size="sm" onClick={() => this.props.deleteHike(this.props.hike.id)}>Delete</button></div>
        </div></div>
       </>
    );
  }
}

export default HikeCard;