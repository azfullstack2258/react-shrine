import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import App from './components/app/App';
import NotFound from './components/app/NotFound';
import apolloClient from './config/createApolloClient';

import SignIn from './containers/auth/SignIn';
import SignUp from './containers/auth/SignUp';
import Dashboard from './containers/home/Dashboard';

import './styles/styles.scss';

render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Router>
  </ApolloProvider>,
  document.getElementById('app'),
);
