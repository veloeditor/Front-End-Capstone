import React, { Component } from 'react';


class Header extends Component {


  render(){

    return (
      <header>
          <div className="header_img">
            <div className="logo_tag">
                <span><img className="logo" src={ require('./img/logo.png')} alt="Nutshell logo"/></span>
                <h3 className="tag_name">800 miles of trails, endless adventure.</h3>
            </div>
            </div>
        </header>
     
    )
  }
}

export default Header;