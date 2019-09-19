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

    //what happens when we use the dropdown select. function has been replaced by handleTrailChange below
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    //function that determines what happens when user selects something but also reads the miles for that trail and uses that number for hike miles.
    handleTrailChange = evt => {
        const stateToChange = {};
        const trailMiles = this.state.trails.filter((trail) => trail.id === parseInt(evt.target.value))[0].miles
        console.log(trailMiles)
        stateToChange[evt.target.id] = evt.target.value;
        stateToChange["miles"] = trailMiles
        this.setState(stateToChange);
    };

    //Cancel or back button
    handleCancel = (event) => {
        event.preventDefault()
        this.props.history.push("/hikes");
    }

    /*  Local method for validation, set loadingStatus, create trail object, invoke the TrailsManager post method, and redirect to the full trail list
    */
    constructNewHike = evt => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        evt.preventDefault();
        // if (this.state.name === "" || this.state.length === "") {
        //     window.alert("Please select a trail");
        // } else {
        this.setState({ loadingStatus: true });
        const trail = {
            name: this.state.name,
            userId: parseInt(username.id),
            date: this.state.date,
            miles: parseFloat(this.state.miles),
            trailId: parseInt(this.state.trailId),
            comments: this.state.comments
        };

        // Create the trail and redirect user to trail list
        HikesManager.post(trail)
            .then(() => this.props.history.push("/hikes"));
        // }
    };

    componentDidMount() {
        HikesManager.getAll()
        TrailsManager.getAll()
            .then(trails => {
                this.setState({
                    loadingStatus: false,
                    trails: trails,
                });
            });
        const currentTrail = this.checkCurrentTrail()
        const currentTrailMiles = this.checkCurrentTrailMiles()
        this.setState({ trailId: currentTrail, miles: currentTrailMiles })
    }

    //function that looks at sessionstorage to grab trailId we want to add from the Trails Search page. Else returns 0 to allow a trail to be added from scratch.  
    checkCurrentTrail = () => {
        const currentTrail = sessionStorage.getItem("currentTrailId")
        if (currentTrail) {
            return currentTrail
        }
        return 0
    }

    //this grabs the trail miles from sessionstorage to use for the trail we want to add from the Trails Search page. Else returns 0 to allow a trail to be added from scratch.  
    checkCurrentTrailMiles = () => {
        const currentTrailMiles = sessionStorage.getItem("currentTrailMiles")
        if (currentTrailMiles) {
            return currentTrailMiles
        }
        return 0
    }

    render() {

        return (
            <>
                <div className="add_hike_container">
                    <form>
                        <h3 className="add_hike_h3">Add a Hike:</h3>
                        <div className="formgrid">
                            <label htmlFor="name">Trail Name: </label>
                            <select
                                className="form-control"
                                id="trailId"
                                value={this.state.trailId}
                                onChange={this.handleTrailChange}
                            >
                                <option>Select Trail</option>
                                {this.state.trails.map(trail =>
                                    <option key={trail.id} value={trail.id}>
                                        {trail.name}
                                    </option>
                                )}
                            </select>
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
                            <br></br>
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
                        <div className="form_buttons">
                            <button
                                type="button"
                                className="submit"
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewHike}
                            >Submit</button>

                            <button onClick={() => this.props.history.goBack()}>Back</button>
                        </div>

                    </form>
                </div>
            </>
        )
    }
}

export default NewHikeForm