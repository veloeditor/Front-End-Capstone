import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import Header from "./Header.js"

// import "./Kennel.css"

class Hiking extends Component {
  render() {
    return (
      <>
        <Header />
        <ApplicationViews />
      </>
    )
  }
}

export default Hiking