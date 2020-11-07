import React, { Component } from 'react';
import { connect } from 'react-redux';

export const MonitorDash = () => {
  return <div>MonitorDash</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MonitorDash);
