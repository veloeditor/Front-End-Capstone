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
        loadingStatus: true,
    };

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
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
            </div>
          </fieldset>
        </form>
        </div>
        </>
      );
    }
}

export default HikeEditForm