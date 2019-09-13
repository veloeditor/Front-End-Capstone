import React, { Component } from "react"
import HikesManager from "../modules/HikesManager"
import TrailsManager from '../modules/TrailsManager';

// import "./OwnerForm.css"

class HikeEditForm extends Component {
    //set the initial state
    state = {
        name: "",
        date: "",
        miles: 0,
        comments: "",
        trails: [],
        trailId: 0,
        loadingStatus: true,
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
          });
      });
    }

    render() {
      return (
        <>
        <div className="task_form_container">
        <form>
        <h3 className="add_hike_h3">Edit your hike:</h3>
          <fieldset>
            <div className="formgrid">
              <label htmlFor="name">Hike Name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="name"
                value={this.state.name}
              />
              <label htmlFor="miles">Miles</label>
                        <input
                        type="number"
                        required
                        onChange={this.handleFieldChange}
                        id="miles"
                    
                        placeholder="Miles"
                        value={this.state.miles}
                        />

            <label htmlFor="date">Hike Date</label>  
              <input
                type="date"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="date"
                value={this.state.date}
              />
              <label htmlFor="comments">Comments</label>
                        <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="comments"
                        value={this.state.comments}
                        />
            </div>
            <div className="alignRight">
            <button outline color="dark" size="sm"
                type="button" disabled={this.state.loadingStatus}
                onClick={this.updateExistingHike}
                className=""
              >Submit</button>
              <button outline color="dark" size="sm" type="cancel" onClick={this.handleCancel}>Back</button>
            </div>
          </fieldset>
        </form>
        </div>
        </>
      );
    }
}

export default HikeEditForm