import React, { Component } from "react"
import HikeCard from './HikeCard'
import HikesManager from '../modules/HikesManager'

class LogList extends Component {
    //define what this component needs to render
    state = {
        hikes: [],
    }

    //lifecycle that sets state of all hikes
    componentDidMount() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        HikesManager.getAll(username.id)
            .then((hikes) => {

                this.setState({
                    hikes: hikes,
                })
            })
    }

    //delete hike logic
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

    //update hike logic
    updateHike = hikeObj => {
        HikesManager.saveEditedHike(hikeObj)
            .then(() => {
                this.componentDidMount()
            })
    }

    render() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        return (
            <React.Fragment>
                <section className="hike-content">
                    <h1 className="hiking_log">{username.username}'s Hiking Log</h1>
                    <button id="add_a_hike" onClick={() => {
                        sessionStorage.setItem("currentTrailId", 0)
                        sessionStorage.setItem("currentTrailMiles", 0)
                        this.props.history.push("/hikes/new")
                    }}>Add a new hike</button>
                    <button id="back_to_dashboard" onClick={() => { this.props.history.push("/") }}>Back to Dashboard</button>
                </section>
                <div className="hike_container">
                    {this.state.hikes.filter(hike => hike.userId === username.id)
                        .map(hike =>
                            <HikeCard
                                key={hike.id}
                                hike={hike}
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