import React from 'react';
import { connect } from 'react-redux';
import LayoutDashboard from './../components/LayoutDashboard';
import { Router } from '@reach/router';
import MonitorDash from './Dashboard/MonitorDash';
import LoanDash from './Dashboard/LoanDash';
import UserDash from './Dashboard/UserDash';
import PrivateRoute from './../components/PrivateRoute';

export const Dashboard = () => {
  return (
    <LayoutDashboard>
      <Router>
        <MonitorDash path='/' />
        <PrivateRoute
          as={LoanDash}
          action='list'
          subject='Loans'
          path='/loans'
        />
        <PrivateRoute
          as={UserDash}
          action='list'
          subject='Users'
          path='/users'
        />
      </Router>
    </LayoutDashboard>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
