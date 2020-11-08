import React from 'react';
import { connect } from 'react-redux';

export const MonitorDash = () => {
  return (
    <div>
      <div className='t-border-b-1 t-text-2xl t-p-2'>
        Welcome to Dashboard !
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MonitorDash);
