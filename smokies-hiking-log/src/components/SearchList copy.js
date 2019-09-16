import React, { Component } from "react"
import SearchCard from './SearchCard'
import TrailsManager from '../modules/TrailsManager'

class SearchList extends Component {
    //define what this component needs to render
    state = {
        trails: [],
    }


componentDidMount(){
    TrailsManager.getAll()
    .then((trails) => {

        this.setState({
            trails: trails,
        })
    })
}


render(){

    let filteredTrails = this.props.trails
    return(
    <React.Fragment>
            <section className="trail-content">
                <h1 className="trail_search">Smoky Mountain Hikes</h1>
            <button className="back_to_dashboard"
                onClick={() => {this.props.history.push("/")}}>Back to Dashboard</button>
            </section>
            <div className="search_field">
                <label htmlFor="text">Search for a trail, feature or location: </label>
                <form>
                    <input type="text">
                        {/* onChange={this.searchHandler} */}
                    </input>
                </form>

            </div>
            <div className="trail_container">
                {this.state.trails.map(trail =>
                <SearchCard
                    key={trail.id}
                    trail={trail}
                    {...this.props}
                />
                )}
            </div>
        </React.Fragment>
    )
}
}   

export default SearchList;