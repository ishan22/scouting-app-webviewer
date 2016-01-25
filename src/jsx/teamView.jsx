import React from 'react';
import {Button} from 'react-bootstrap';

var Firebase = require("firebase");

var firebaseRef = new Firebase("https://teamdata.firebaseio.com/");
var teambase;
var matchbase = firebaseRef.child("/matches");

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
        <h5><a href={this.state.website}>{this.state.website}</a></h5>
      </div>
    );
  },

  componentDidMount(){
      teambase = firebaseRef.child(`teams/frc${this.props.params.id}`);
      matchbase.orderByChild("team").equalTo(parseInt(this.props.params.id)).on("child_added", function(dataSnapshot){
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
