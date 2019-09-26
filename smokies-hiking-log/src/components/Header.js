import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Header extends Component {


  render(){

    return (
      <header>
          <div className="header_img">
            <div className="logo_tag">
                <span><Link to={"/"}><img className="logo" src={ require('./img/logo.png')} alt="app logo"/></Link></span>
                <h3 className="tag_name">800 miles of trails and adventure</h3>
            </div>
            </div>
        </header>
     
    )
  }
}

export default Header;