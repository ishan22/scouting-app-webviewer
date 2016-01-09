import React from 'react';
import Firebase from 'firebase';

var firebase = new Firebase('https://teamdata.firebaseio.com/teams');


module.exports = Reacts.createClass({

  getInitialState: function(){
    return{
      data_name: '',
      data_number: 0,
      data_id: ''
    }
  },

  render: function(){
    this.update;
    return(
      <div />
    )
  },

  update: function(){
    firebase.once("value", function(snapshot){
       snapshot.forEach(function(childSnapshot){
         this.setState({
           data_name: childSnapshot.val().nick,
           data_number: childSnapshot.val().number,
           data_id: childSnapshot.key()
         })
       });
    });
  }

});
