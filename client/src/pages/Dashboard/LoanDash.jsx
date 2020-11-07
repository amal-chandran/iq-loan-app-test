import React, { Component } from 'react';
import { connect } from 'react-redux';

export const LoanDash = () => {
  return <div>LoansDash</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoanDash);
