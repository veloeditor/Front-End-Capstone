import React, { Component } from "react"
import SearchCard from './SearchCard'
import TrailsManager from '../modules/TrailsManager'

  
const searchingFor = (term) => {
    return function(x){
        return x.name.toLowerCase().includes(term.toLowerCase()) || x.difficulty.toLowerCase().includes(term.toLowerCase()) || x.location.toLowerCase().includes(term.toLowerCase())|| !term;
    }
  }
  

class SearchList extends Component {

state = {
    trails: [],
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


      
      
    searchHandler(event){
      this.setState({ term : event.target.value })
      console.log(event.target.value);
    }
  
    render() {
      const {term, trails} = this.state;
      return (
          <>
        <section className="trail-content">
            <h1 className="trail_search">Find a new trail to do:</h1>
            <label htmlFor="text" className="search_words">Search by trail name, difficulty (easy, moderate or hard) or location: </label>
            <form>
            <input type="text" placeholder="Enter search terms here" id="search_field" onChange={this.searchHandler} value={term}/>
            </form>
            <button className="back_to_dashboard"onClick={() => {this.props.history.push("/")}}>Back to Dashboard</button>
        </section>
        <div className="trail_container">
          {trails.filter(searchingFor(term)).map( (trail) =>
                <div className="card">
                    <div key={trail.id} className="card-content">
                        <h3 className="trail_name">{trail.name}</h3>
                        <p className="card_miles"><span>Length: </span>{trail.miles}</p>
                        <p id="comments" className="card_item">{trail.description}</p>
                        <span className="trail_stats">{trail.difficulty} hike | {trail.feature} | {trail.elevationGain}ft. elevation gain | {trail.location}</span>
                        <p><span className="card_item">Trailhead on Google Maps: </span><a target="_blank" href={trail.trailhead}>Trailhead Location</a></p>
                        <a target="_blank" href={trail.link}>[More about this hike]</a>
                            <div className="card__buttons">
                                {/* <button className="pick_trail"onClick={() => {this.props.history.push("/")}}>Log this trail</button> */}
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