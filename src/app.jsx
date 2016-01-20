var React = require('react');
var ReactDOM = require('react-dom');

import { TeamView } from 'teamView';
import { TeamsList, ListComponent } from 'teamViewList';
import { Router, Route } from 'react-router';

ReactDOM.render(
    <Router>
      <Route path="/#" component={TeamsList} />
      <Route path="team/:id" component={TeamsList} />
    </Router>,
  document.getElementById('app')
);
