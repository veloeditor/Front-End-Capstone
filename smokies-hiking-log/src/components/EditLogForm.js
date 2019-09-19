import React, { Component } from "react"
import HikesManager from "../modules/HikesManager"

// import "./OwnerForm.css"

class HikeEditForm extends Component {
  //set the initial state
  state = {
    name: "",
    date: "",
    miles: 0,
    comments: "",
    trail: {},
    trailId: 0,
    loadingStatus: true,
    trailName: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleCancel = (event) => {
    event.preventDefault()
    this.props.history.push("/hikes");
  }

  updateExistingHike = evt => {
    evt.preventDefault()
    this.setState({ loadingStatus: true });
    const editedHike = {
      id: this.props.match.params.hikeId,
      name: this.state.name,
      miles: parseFloat(this.state.miles),
      date: this.state.date,
      userId: this.state.userId,
      comments: this.state.comments,
    };

    HikesManager.update(editedHike)
      .then(() => this.props.history.push("/hikes"))
  }

  componentDidMount() {
    HikesManager.get(this.props.match.params.hikeId)
      .then(hike => {
        this.setState({
          name: hike.name,
          miles: parseFloat(hike.miles),
          date: hike.date,
          loadingStatus: false,
          userId: hike.userId,
          comments: hike.comments,
          trailId: hike.trailId,
          trail: hike.trail,
          trailName: hike.trail.name,
        });
      });
  }

  render() {
    return (
      <>
        <div className="trail_form_container">
          <form>
            <h3 className="add_hike_h3">Edit your hike:</h3>

            <div className="formgrid">
              <h3 className="edit_hike">{this.state.trailName}</h3>
              <label htmlFor="miles">Miles: </label>
              <input
                type="number"
                required
                onChange={this.handleFieldChange}
                id="miles"
                size="5"

                placeholder="Miles"
                value={this.state.miles}
              />
              <br></br>
              <label htmlFor="date">Hike Date: </label>
              <input
                type="date"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="date"
                value={this.state.date}
              />
              <br></br>
              <label htmlFor="comments">Comments: </label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="comments"
                size="40"

                value={this.state.comments}
              />
            </div>
            <div className="form_buttons">
              <button
                type="button" disabled={this.state.loadingStatus}
                onClick={this.updateExistingHike}
                className="submit"
              >Submit</button>
              <button type="cancel" onClick={this.handleCancel}>Back</button>
            </div>

          </form>
        </div>
      </>
    );
  }
}

export default HikeEditForm