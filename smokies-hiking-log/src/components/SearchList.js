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
            <h1 className="trail_search">Smoky Mountain Hikes</h1>
            <label htmlFor="text" className="search_words">Search by trail name, difficulty (easy, moderate or hard) or park location: </label>
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
                        <p><span className="card_item">Miles: </span>{trail.miles}</p>
                        <p><span className="card_item">Description: </span>{trail.description}</p>
                        <p><span className="card_item">Difficulty: </span>{trail.difficulty}</p>
                        <p><span className="card_item">Feature: </span>{trail.feature}</p>
                        <p><span className="card_item">Elevation Gain: </span>{trail.elevationGain}</p>
                        <p><span className="card_item">Area of Park: </span>{trail.location}</p>
                        <p><span className="card_item">Trailhead on Google Maps: </span><a target="_blank" href={trail.trailhead}>Trailhead Location</a></p>
                        <a target="_blank" href={trail.link}>[More about this hike]</a>
                    </div>
                    </div>
            )}
            </div>
        
        </>
      );
    }
  }

export default SearchList;