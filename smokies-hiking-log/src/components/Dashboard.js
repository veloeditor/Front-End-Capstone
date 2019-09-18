import React, { Component } from 'react'
import HikesManager from "../modules/HikesManager"
import UserManager from "../modules/UserManager"
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ReactModal from 'react-modal'
import { Link } from "react-router-dom";

const customStyles = {
  content: {
      top: '46%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',   
  },
  overlay: {
    background: 'rgba(0, 0, 0, .8)'
  }
};
ReactModal.setAppElement('#root')

class Dashboard extends Component {
  
  state = {
    hikes: [],
    totalMiles: 0,
    users: [],
    goalPercentage: 0,
    goal: 0,
    alert: null,
}

  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }


  closeModal() {
    this.setState({ modalIsOpen: false });
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
        if (percentage >= 100) {
          this.openModal()
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

    const percentage = this.state.goalPercentage;
 

    return (
      <>
        <div className="dashTop_container">
          <div>
          <ReactModal
                      isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      style={customStyles}
                      contentLabel="Modal"
                      className="Modal"
                  >
                    <span><Link to={"/"}><img className="checkmark" src={ require('./img/checkbox.png')} alt="checkmark"/></Link></span>
                      <h2 className="goal_congrats">Congratulations, you SMASHED your goal!</h2>
                      <p> Set a new goal:</p>
                      <button
                          type="button"
                          onClick={() => {this.props.history.push("/goal")}}
                          className=""
                      >Change Goal</button>
                  </ReactModal>
                </div>
          <div className="dash_topo_img">
            <h3 className="welcome_h3">Welcome, <span>{username.username}</span>!</h3>
            <div> <button className="sign_out" onClick={this.logout}>Logout</button></div> 
            <p>You've hiked <span className="userMiles">{parseInt(this.state.totalMiles)}</span> miles so far. <br></br>
            You're <span className="userPerc">{this.state.goalPercentage}%</span> of your way towards your goal.</p>
            <CircularProgressbar className="progressBar" value={percentage} text={`${percentage}%`} strokeWidth={14} styles={buildStyles({
            textColor: 'black',
            pathColor: '#a8ba36',
            trailColor: 'darkred',
        })}/>
            <br></br>
            <button className="goal_change" onClick={() => {this.props.history.push("/goal")}}>Change your goal</button>
          </div>
        </div>
        <br></br>
        <div className="dash_content_Container">
          <div className="addHike_container">
              <div className="dash_bg_image">
                <div className="dash_add_container">
                  {/* <button className="add_hike" onClick={() => {this.props.history.push("/hikes/new")}}>Log your hike</button> */}
                  <button className="hike_log" onClick={() => {this.props.history.push("/hikes")}}>Your Hiking Log</button>
                </div>
              </div>   
            </div>
          <br></br>
          <div className="viewLog_container">
              <div className="dash_bg_imageTwo">
                  <div className="dash_log_container">
                    
                    <button className="view_trails" onClick={() => {this.props.history.push("/trails")}}>Trails of the Smokies</button>
                  </div>
              </div>
          </div>
          <br></br>
        </div>
    
      </>
    )
  }
}

export default Dashboard