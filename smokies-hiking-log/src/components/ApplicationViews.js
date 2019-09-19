import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "../auth/Login"
import Register from "../auth/Register"
import LogList from './LogList'
import SearchList from './SearchList'
import NewHikeForm from './NewHikeForm'
import EditLogForm from './EditLogForm'
import GoalForm from './GoalForm'
import Footer from './Footer'
import Dashboard from "./Dashboard"

class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null
  render() {
    return (
      <React.Fragment>
        <Route exact path="/login" render={props => {
          if (this.isAuthenticated()) {
            return <Redirect to="/" />
          }
          return <Login {...props} />
        }} />
        <Route exact path="/register" render={props => {
          if (this.isAuthenticated()) {
            return <Redirect to="/" />
          }
          return <Register {...props} />
        }} />
        <Route exact path="/" render={props => {
          if (this.isAuthenticated()) {
            return (
              <Dashboard {...props} />
            )
          }
          return <Redirect to="/login" />
        }} />
        <Route exact path="/hikes" render={(props) => {
          if (this.isAuthenticated()) {
            return <LogList {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/trails" render={(props) => {
          if (this.isAuthenticated()) {
            return <SearchList {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/hikes/new" render={(props) => {
          return <NewHikeForm {...props} />
        }} />
        <Route path="/hikes/:hikeId(\d+)/edit" render={props => {
          return <EditLogForm {...props} />
        }} />
        <Route path="/goal" render={props => {
          return <GoalForm {...props} />
        }} />
        <Route path="/footer" render={props => {
          return <Footer {...props} />
        }} />

      </React.Fragment>
    );
  }
}

export default ApplicationViews
