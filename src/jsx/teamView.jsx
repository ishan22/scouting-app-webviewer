import React from 'react';
import {Button} from 'react-bootstrap';

var Firebase = require("firebase");

var firebaseRef = new Firebase("https://teamdata.firebaseio.com/");
var teambase;
var matchbase;

module.exports = React.createClass({

  getInitialState: function() {
    return {
        location: "locationboi",
        name: "teamname",
        nick: "nickname",
        number: "number",
        website: "website"
    };
  },

  render: function() {
    return (
      <div>
        <h3>Team {this.props.params.id}</h3>
        <h5>{this.state.location}</h5>
        <h5>{this.state.name}</h5>
        <h5>{this.state.nick}</h5>
        <h5>{this.state.number}</h5>
        <h5>{this.state.website}</h5>
      </div>
    );
  },

  componentDidMount(){
      teambase = firebaseRef.child(`teams/frc${this.props.params.id}`);
      matchbase = firebaseRef.child(`/matches`);
      matchbase.orderByChild("team").equalTo(this.props.params.id).once("value", function(dataSnapshot){
          console.log(dataSnapshot.val());
      });
      teambase.on("value", function(dataSnapshot) {
        var data = dataSnapshot.val();
        this.setState({
            location: data.location,
            name: data.name,
            nick: data.nick,
            number: data.number,
            website: data.website
        });
      }.bind(this));
  }



});
