import React, { Component } from "react"
import HikeCard from './HikeCard'
import HikesManager from '../modules/HikesManager'

class LogList extends Component {
    //define what this component needs to render
    state = {
        hikes: [],
    }

    

componentDidMount(){
    const username = (JSON.parse(sessionStorage.getItem("credentials")))
    HikesManager.getAll(username.id)
    .then((hikes) => {

        this.setState({
            hikes: hikes,
        })
    })
}

deleteHike = id => {
    const username = (JSON.parse(sessionStorage.getItem("credentials")))
    HikesManager.delete(id)
    .then(() => {
    HikesManager.getAll(username.id)
    .then((newHikes) => {
        this.setState({
            hikes: newHikes
        })
    })
    })
}

updateHike = hikeObj => {
    HikesManager.saveEditedTask(hikeObj)
        .then(() => {
            this.componentDidMount()
        })
}

render(){
    const username = (JSON.parse(sessionStorage.getItem("credentials")))
    return(
    <React.Fragment>
            <section className="hike-content">
                <h1 className="hike_name">Hiking Log</h1>
                <hr></hr>
            <button outline color="secondary" size="sm"
                onClick={() => {this.props.history.push("/hikes/new")}}>
                Add a new hike
            </button>
            </section>
            <div className="hike_container">
                {this.state.hikes.filter(hike => hike.userId === username.id)
                .map(hike =>
                <HikeCard
                    key={hike.id}
                    hike={hike}
                    handleCheck={this.handleCheck}
                    deleteHike={this.deleteHike}
                    updateHike={this.updateHike}
                    {...this.props}
                />
                )}
            </div>
        </React.Fragment>
    )
}
}   

export default LogList;