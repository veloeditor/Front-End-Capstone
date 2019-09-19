import React, { Component } from "react"
import UserManager from "../modules/UserManager"
// import "./OwnerForm.css"

class HikeEditForm extends Component {
  //set the initial state
  state = {
    goal: 0,
    userId: 0,
  };

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleCancel = (event) => {
    event.preventDefault()
    this.props.history.push("/");
  }

  updateExistingGoal = evt => {
    evt.preventDefault()
    this.setState({ loadingStatus: true });
    const editedGoal = {
      goal: parseInt(this.state.goal)
    };
    console.log("edited goal", editedGoal)
    UserManager.update(this.state.userId, editedGoal)
      .then(() => this.props.history.push("/"))
  }

  componentDidMount() {
    const username = (JSON.parse(sessionStorage.getItem("credentials")))
    UserManager.get(username.id)
      .then(users => {
        console.log(users)
        this.setState({
          userId: users.id,
          goal: users.goal,
        });
      });
  }


  render() {
    return (
      <>
        <div className="goal_edit_container">
          <h3 className="goal_h3">Enter a new goal:</h3>
          <form>
            <div className="formgrid">
              <label htmlFor="goal">Your new goal: </label>
              <br></br>
              <input
                type="number"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="goal"
                value={this.state.goal}
              />
            </div>
            <div className="alignRight">
              <button
                type="button" disabled={this.state.loadingStatus}
                onClick={this.updateExistingGoal}
                className=""
              >Submit</button>
              <button type="cancel" onClick={this.handleCancel}>
                Cancel
            </button>
            </div>

          </form>
        </div>
      </>
    );
  }
}

export default HikeEditForm