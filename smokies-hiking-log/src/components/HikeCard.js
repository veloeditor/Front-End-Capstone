import React, { Component } from 'react'
import ReactModal from 'react-modal'

const customStyles = {
  content: {
    top: '46%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    background: 'rgba(0, 0, 0, .8)'
  }
};
ReactModal.setAppElement('#root')

//this is the component that builds the card each hike will use. child of LogList.js.
class HikeCard extends Component {

  state = {
    modalIsOpen: false
  }

  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }


  closeModal() {
    this.setState({ modalIsOpen: false });
  }


  render() {
    return (
      <>
      <div>
            <ReactModal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Modal"
              className=""
            >
              <h2 className="alert_warning">WARNING!</h2>
              <h3 className="delete_msg">Are you sure you want to delete this?</h3>
              <button
                type="button"
                onClick={() => { this.props.deleteHike(this.props.hike.id) }}
                className="edit_button"
              >Delete</button>
              <button
                type="button"
                onClick={ this.closeModal }
                className=""
              >Cancel</button>
            </ReactModal>
          </div>
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
              <button className="edit_button" onClick={this.openModal}>Delete</button></div>
          </div>
        </div>
      </>
    );
  }
}

export default HikeCard;