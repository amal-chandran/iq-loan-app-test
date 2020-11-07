import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutDashboard from './../components/LayoutDashboard';
import { Router } from '@reach/router';
import MonitorDash from './Dashboard/MonitorDash';
import LoanDash from './Dashboard/LoanDash';
import UserDash from './Dashboard/UserDash';
export const Dashboard = () => {
  return (
    <LayoutDashboard>
      <Router>
        <MonitorDash path='/' />
        <LoanDash path='/loans' />
        <UserDash path='/users' />
      </Router>
    </LayoutDashboard>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
