import React, { Component } from 'react';
import TrailsManager from '../modules/TrailsManager';
import HikesManager from '../modules/HikesManager';

class NewHikeForm extends Component {
    state = {
        trails: [],
        name: "",
        miles: 0,
        trailId: 0,
        comments: "",
        userId: 0
    };


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleCancel = (event) => {
        event.preventDefault()
        this.props.history.push("/hikes");
    }

    /*  Local method for validation, set loadingStatus, create trail object, invoke the TrailsManager post method, and redirect to the full trail list
    */
    constructNewHike = evt => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        evt.preventDefault();
        if (this.state.name === "" || this.state.length === "") {
            window.alert("Please select a trail");
        } else {
            this.setState({ loadingStatus: true });
            const trail = {
                name: this.state.name,
                userId: parseInt(username.id),
                date: this.state.date,
                miles: parseInt(this.state.miles),
                trailId: parseInt(this.state.trailId),
                comments: this.state.comments
            };

            // Create the trail and redirect user to trail list
            HikesManager.post(trail)
            .then(() => this.props.history.push("/hikes"));
        }
    };

    componentDidMount() {
        TrailsManager.getAll()
        .then(trails => {
            this.setState({
              name: trails.name,    
              trailId: trails.id,
              miles: trails.miles,
              loadingStatus: false,
              trails: trails,
            });
        });
      }

    render(){

        return(
            <>
            <div className="add_hike_container">
            <form>
                <h3 className="add_hike_h3">Add a Hike:</h3>
                    <div className="formgrid">
                    <label htmlFor="name">Trail Name: </label>
                         <select
                            className="form-control"
                            id="trailId"
                            value={this.state.name}
                            onChange={this.handleFieldChange}
                            >
                            {this.state.trails.map(trail =>
                                <option key={trail.id} value={trail.id}>
                                {trail.name}
                                </option>
                            )}
                        </select>
                        <label htmlFor="miles"> Miles: </label>
                        <input
                        type="number"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="miles"
                        
                        placeholder="Miles"
                        />
                        <br></br>
                        <label htmlFor="date"> Date of Hike: </label>
                        <input
                        type="date"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="date"
                        placeholder="date"
                        />
                        <label htmlFor="comments"> Comments: </label>
                        <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="comments"
                        placeholder="Trail Comments"
                        />
                        
                    </div>
                    <div className="alignRight">
                        <button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewHike}
                        >Submit</button>

                        <button outline color="dark" size="sm" type="cancel" onClick={this.handleCancel}>
                                                Back
                            </button>
                    </div>
                   
                </form>
            </div>
        </>
        )
    }
}

export default NewHikeForm