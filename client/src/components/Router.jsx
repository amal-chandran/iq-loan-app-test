import React, { Component } from 'react';
import LayoutMain from './LayoutMain';

import { Router } from '@reach/router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

export default class AppRouter extends Component {
  render() {
    return (
      <>
        <Router>
          <LayoutMain path='/'>
            <Login path='/'></Login>
            <Login path='/login'></Login>
            <Register path='/signup'></Register>
          </LayoutMain>
          <Dashboard path='/dashboard/*'></Dashboard>
        </Router>
      </>
    );
  }
}
