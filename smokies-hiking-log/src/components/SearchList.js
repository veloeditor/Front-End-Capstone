import React, { Component } from "react"
import TrailsManager from '../modules/TrailsManager'

//search function that returns the fields which the filter will work - name, difficulty and location
const searchingFor = (term) => {
    return function(search){
        return search.name.toLowerCase().includes(term.toLowerCase()) || search.difficulty.toLowerCase().includes(term.toLowerCase()) || search.feature.toLowerCase().includes(term.toLowerCase()) 
        || search.location.toLowerCase().includes(term.toLowerCase())|| !term;
    }
  }
  

class SearchList extends Component {

    state = {
        trails: [],
        hikes: [],
    }

    componentDidMount(){
        TrailsManager.getAll()
        .then((trails) => {

            this.setState({
                trails: trails,
                term: "",
            })
        })
        this.searchHandler = this.searchHandler.bind(this);
}
 

    //handler function for search field   
    searchHandler(event){
      this.setState({ term : event.target.value })
    }
  
    render() {
      const {term, trails} = this.state;
      return (
          <>
        <section className="trail-content">
            <h1 className="trail_search">Find a new trail to do:</h1>
            <label htmlFor="text" className="search_words">Search by trail name, features (vistas, forest, waterfalls, etc.) difficulty (easy, moderate or hard) or location: </label>
            <form>
            <input type="text" placeholder="Enter search terms here" id="search_field" onChange={this.searchHandler} />
            </form>
            {/* <button className="clear_results"onClick={this.submitAndClear}>Clear Search Field</button> */}
            <button className="back_to_dashboard"onClick={() => {this.props.history.push("/")}}>Back to Dashboard</button>
        </section>
        <div className="trail_container">
          {trails.filter(searchingFor(term)).map( (trail) =>
                <div key={trail.id} className="card">
                    <div key={trail.id} className="card-content">
                        <h3 className="trail_name">{trail.name}</h3>
                        <p className="card_miles"><span>Length: </span>{trail.miles}</p>
                        <p className="comments">{trail.description}</p>
                        <span className="trail_stats">{trail.difficulty} hike | {trail.feature} | {trail.elevationGain}ft. elevation gain | {trail.location}</span>
                        <p><span className="card_item">Trailhead on Google Maps: </span><a target="_blank" rel="noopener" href={trail.trailhead}>Trailhead Location</a></p>
                        <a target="_blank" rel="noopener" href={trail.link}>[More about this hike]</a>
                            <div className="card__buttons">
                                <button className="pick_trail"onClick={() => {
                                  sessionStorage.setItem("currentTrailId", trail.id)
                                  sessionStorage.setItem("currentTrailMiles", trail.miles)
                                  this.props.history.push("/hikes/new")}}>Log this trail</button>
                            </div>
                    </div>
                    </div>
            )}
            </div>
        
        </>
      );
    }
  }

export default SearchList;