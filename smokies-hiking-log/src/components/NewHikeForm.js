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

    handleTrailChange = evt => {
        const stateToChange = {};
        const trailMiles = this.state.trails.filter((trail) => trail.id == evt.target.value)[0].miles
        console.log(trailMiles)
        stateToChange[evt.target.id] = evt.target.value;
        stateToChange["miles"] = trailMiles
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
              name: trails.name,    
              trailId: trails.id,
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
                        id="comments_form"
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