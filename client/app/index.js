import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import App from './components/app/App';
import NotFound from './components/app/NotFound';

import SignIn from './containers/auth/SignIn';
import SignUp from './containers/auth/SignUp';
import Dashboard from './containers/home/Dashboard';

import './styles/styles.scss';

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('app'),
);
