import React from 'react';
import LayoutMain from './LayoutMain';

import { connect } from 'react-redux';
import { Router } from '@reach/router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import { AbilityContext } from './../helpers/ability.helper';
import { Ability } from '@casl/ability';
import PrivateRoute from './../components/PrivateRoute';
export const AppRouter = ({ rules }) => {
  return (
    <AbilityContext.Provider value={new Ability(rules)}>
      <Router>
        <LayoutMain path='/'>
          <Login path='/'></Login>
          <Login path='/login'></Login>
          <Register path='/signup'></Register>
        </LayoutMain>
        <PrivateRoute
          path='/dashboard/*'
          as={Dashboard}
          authOnly
          action='view'
          subject='Dashboard'
        />
      </Router>
    </AbilityContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  rules: state.auth.rules,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
