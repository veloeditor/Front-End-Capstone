import React, { Component } from 'react'
import HikesManager from "../modules/HikesManager"
import UserManager from "../modules/UserManager"



class Dashboard extends Component {
  
  state = {
    hikes: [],
    totalMiles: 0,
    users: [],
    goalPercentage: 0,
    goal: 0,
}

  logout = () => {
    sessionStorage.clear()
    this.props.history.push("/login")
    }

    userGoalProgress = () => {
      const username = (JSON.parse(sessionStorage.getItem("credentials")))
      UserManager.get(username.id)
        .then((users) => {
          
          const percentage = parseInt(this.state.totalMiles / users.goal * 100)
          console.log(this.state.totalMiles)
          console.log("user", users.goal)
          this.setState({goalPercentage: percentage})
          if (percentage > 100) {
            alert("You beat your goal!  How about setting another?")
            this.props.history.push("/goal")
          }
        })
    }

    totalUserMiles = () => {
      const username = (JSON.parse(sessionStorage.getItem("credentials")))
      HikesManager.getAll(username.id)
        .then((hikes) => {
          const userHikes = hikes.filter(hike => hike.userId === username.id).reduce((totalMiles, hikes) => totalMiles + hikes.miles, 0)
          console.log("userhikes", userHikes)
          this.setState({totalMiles: userHikes}, () => this.userGoalProgress()) 
          return userHikes
        })
    }



    componentDidMount(){
      const username = (JSON.parse(sessionStorage.getItem("credentials")))
      HikesManager.getAll(username.id)
      .then((hikes) => this.setState({hikes}))
      .then(() => this.totalUserMiles())
    
  }

  

  render() {
    const username = (JSON.parse(sessionStorage.getItem("credentials")))


    return (
      <>
      <div className="dashboard_container">
        <div className="dashTop_container">
          <br></br>
          <h3 className="welcome_h3">Welcome, <span>{username.username}</span>!</h3>
          <div> <button className="sign_out" onClick={this.logout}>Logout</button></div> 
          <p>You've hiked <span className="userMiles">{this.state.totalMiles}</span> miles so far. <br></br>
          You're <span className="userPerc">{this.state.goalPercentage}%</span> of your way towards your goal.</p>
          <button className="goal_change" onClick={() => {this.props.history.push("/goal")}}>Change your goal</button>
          
        </div>
        <br></br>
        <div className="addHike_container">
          <div className="dash_bg_image">
            <div className="dash_add_container">
              <button className="add_hike" onClick={() => {this.props.history.push("/hikes/new")}}>Log your hike</button>
            </div></div>   
          </div>

        <br></br>
        <div className="viewLog_container">
          <div className="dash_bg_imageTwo">
              <div className="dash_log_container">
                <button className="hike_log" onClick={() => {this.props.history.push("/hikes")}}>View your hikes</button>
              </div>
         </div>
        </div>
      </div>
      </>
    )
  }
}

export default Dashboard