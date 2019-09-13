import React, { Component } from 'react';


class Footer extends Component {

  logout = () => {
    sessionStorage.clear()
    this.props.history.push("/login")
    }

  render(){
    
    return (
    <>
      <div className="footer"> 
      
        {/* <div> <button outline color="secondary" size="sm" className="sign_out" onClick={this.logout}>Logout</button></div>  */}
        {/* <h6>An app by Brian Wilson</h6> */}
        </div>
       </>
    )
  }
}

export default Footer;




