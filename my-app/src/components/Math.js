import React, { Component } from 'react';
import HikesManager from "../modules/HikesManager"


class NewHikeForm extends Component {
 totalUserMiles() {

  HikesManager.getAll(username.id)
    .then((hikes) => {
    const userHikes = hikes.filter(hike => hike.userId === username.id).reduce((totalMiles, hikes) => totalMiles + hikes.miles, 0)
    console.log("userhikes", userHikes)
    return userHikes
 })
}
}
export default Math