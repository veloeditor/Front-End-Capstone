import React, { Component } from 'react'
import HikesManager from "../modules/HikesManager"



class Dashboard extends Component {
  
  state = {
    hikes: [],
    totalMiles: 0,
}

  logout = () => {
    sessionStorage.clear()
    this.props.history.push("/login")
    }

    componentDidMount(){
      const username = (JSON.parse(sessionStorage.getItem("credentials")))
      HikesManager.getAll(username.id)
      .then((hikes) => {
          this.setState({
              hikes: hikes,
              miles: hikes.miles,
          })
      })
  }

  
  

  render() {
    const username = (JSON.parse(sessionStorage.getItem("credentials")))

   HikesManager.getAll(username.id)
    .then((hikes) => {
      const userHikes = hikes.filter(hike => hike.userId === username.id).reduce((totalMiles, hikes) => totalMiles + hikes.miles, 0)
      console.log("userhikes", userHikes)
      return userHikes
    })
    
    console.log("outside", username)

    

    return (
      <>
      <div className="dashTop_container">
        <br></br>
        <h3>Welcome, <span>{username.username}</span>!</h3>
        <div> <button outline color="secondary" size="sm" className="sign_out" onClick={this.logout}>Logout</button></div> 
        <p>You've hiked <span>{}</span> miles so far. <br></br>
        You're __% of your way towards your goal.</p>
        <button className="goal_change" onClick={() => {this.props.history.push("/goal")}}>Change your goal</button>
      </div>
      <br></br>
      <div>
        <button className="add_hike" onClick={() => {this.props.history.push("/hikes/new")}}>Log your hike</button>
      </div>
      <br></br>
      <div>
        <button className="hike_log" onClick={() => {this.props.history.push("/hikes")}}>View your hikes</button>
      </div>
      </>
    )
  }
}

export default Dashboard