import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Header extends Component {

  render(){

    return (
      <header>
            <div>
                <h1>The Smoky Mountain Hiking Log<br /></h1>
                <h3>800 miles of trails, endless adventure.</h3>
            </div>
        </header>
     
    )
  }
}

export default Header;