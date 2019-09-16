import React, { Component } from "react"
import UserManager from "../modules/UserManager"

class Register extends Component {

    // Set initial state
    state = {
        username: "",
        password: "",
        goal: 0
    }

    // Update state whenever an input field is edited
    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleRegister = (event) => {
        event.preventDefault()
        UserManager.getUsername(this.state.username).then(user => {
            if (user.length !== 0) {
                window.alert("Account already exists")
                document.querySelector("#username").value = ""
                document.querySelector("#password").value = ""
                document.querySelector("#goal").value = ""
            } else if (this.state.username.length === 0 || this.state.password.length === 0) {
                window.alert("Please fill out all fields")
            } else {
            const userObject = {
                username: this.state.username,
                password: this.state.password,
                completedMiles: 0,
                goal: parseInt(this.state.goal)
            }
            UserManager.post(userObject).then((object) => {
                sessionStorage.setItem(
                    "credentials",
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    id: object.id,
                    completedMiles: object.completedMiles,
                    goal: object.goal
                })
            )
                this.props.history.push("/");
            })
        }
    })
    }

    handleCancel = (event) => {
        event.preventDefault()
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="login_container">
                <form onSubmit={this.handleRegister}>
                <h2 className="welcome">The Smokies Hiking Log</h2>
                    <h3>Register</h3>
                    <div className="formgrid">
                        <label htmlFor="inputUsername">Username: </label>
                        <input onChange={this.handleFieldChange} type="username"
                            id="username"
                            placeholder="Enter a username"
                            required="" autoFocus="" />
                            <br></br>
                        <label htmlFor="inputPassword">Password: </label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Enter a password"
                            required="" />
                            <br></br>
                        <label htmlFor="inputGoal">Your Goal: </label>
                        <input onChange={this.handleFieldChange} type="integer" min="1" max="800"
                            id="goal"
                            placeholder="Enter a goal in miles"
                            required=""
                            />
                    </div>
                    <div className="reg_buttons">
                    <button type="submit">Submit</button>
            <button type="cancel" onClick={this.handleCancel}>Cancel</button>
            </div>
            </form>
            </div>
        )
    }

}

export default Register