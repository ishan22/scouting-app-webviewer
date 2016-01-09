import React from 'react';
import {Button} from 'react-bootstrap';
import TeamList from 'teamViewList';

module.exports = React.createClass({

  getInitialState: function() {
        return {
            //return data (from firebase)
        };
  },

  render: function() {
    return (
      <div>
        <h3>{this.props.data}</h3>
      </div>
    );
  }

});
