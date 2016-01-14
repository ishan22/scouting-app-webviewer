var React = require('react');
var ReactDOM = require('react-dom');

import { TeamView } from 'teamView';
import { TeamList } from 'teamViewList';
import { Router, Route } from 'react-router';

ReactDOM.render(
  <div>
    <Router>
      <Route path="/" component={TeamList} >
        <Route path="team/115" component={TeamView} />
      </Route>
    </Router>
  </div>,
  document.getElementById('app')
);
