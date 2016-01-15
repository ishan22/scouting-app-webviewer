import React from 'react';
import {Button} from 'react-bootstrap';
module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <h3>Team {this.props.params.id}</h3>
      </div>
    );
  },

  componentDidMount() {
   const id = this.props.params.id
  }

});
