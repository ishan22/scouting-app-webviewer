import {EventEmitter} from 'events';
import assign from 'object-assign';
import { Table } from 'react-bootstrap';
import TeamView from 'teamView';
import { Router, Route, Link } from 'react-router';

var React = require('react');
var ReactDOM = require('react-dom');
var Firebase = require('firebase');

var firebaseRef = new Firebase("https://teamdata.firebaseio.com/teams/");

var ListComponent = React.createClass({

  render: function() {
    var createItem = function(item) {
      return <tr key={item.nick}>
        <td><Link to={`/team/${item.number}`}>{item.nick}</Link></td>
        <td>{item.number}</td>
      </tr>
    };
    return <tbody>{this.props.items.map(createItem)}</tbody>;
  },

  handleClick: function(event){
    console.log("" + this.props.items.number);
  }

});

var TeamList = React.createClass({

  getInitialState: function() {
    return {items: [], teamViewOpen: false};
  },

  render: function() {
    return (
      <div>
        <h3>Team List</h3>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Team #</th>
              </tr>
            </thead>
            <ListComponent items={this.state.items} />
        </Table>
      </div>
    );
  },

  componentWillMount: function() {
    firebaseRef.on("child_added", function(dataSnapshot) {
      this.state.items.push(dataSnapshot.val());
      this.setState({
        items: this.state.items
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.firebaseRef.off();
  }

});

ReactDOM.render(
    <Router>
      <Route path="*" component={TeamList} />
      <Route path="team/:id" component={TeamView} />
    </Router>,
  document.getElementById('app'));
