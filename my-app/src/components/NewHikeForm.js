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
                miles: parseInt(this.state.trail.miles),
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
            console.log(trails[0].miles)
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
            <form>
                <fieldset>
                <h2>Add a Hike:</h2>
                    <div className="formgrid">
                        {/* <label htmlFor="name">Name</label>
                        <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        onKeyUp={this.searchForHike}
                        id="name"
                        placeholder="Search for a trail"
                        /> */}
                         <select
                            className="form-control"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleFieldChange}
                            >
                            {this.state.trails.map(trail =>
                                <option key={trail.id} value={trail.name}>
                                {trail.name}
                                </option>
                            )}
                        </select>
                        <label htmlFor="miles">Miles</label>
                        <input
                        type="number"
                        required
                        onChange={this.handleFieldChange}
                        id="miles"
                    
                        placeholder="Miles"
                        />
                        <label htmlFor="date">Date of Hike</label>
                        <input
                        type="date"
                        required
                        onChange={this.handleFieldChange}
                        id="date"
                        placeholder="date"
                        />
                        <label htmlFor="comments">Comments</label>
                        <input
                        type="text"
                        required
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
                    </div>
                </fieldset>
            </form>
        </>
        )
    }
}

export default NewHikeForm