import React from 'react';
import { Redirect } from '@reach/router';

import { connect } from 'react-redux';
import { AbilityContext } from '../helpers/ability.helper';
import { useAbility } from '@casl/react';

export const PrivateRoute = ({
  as: Component,
  action,
  subject,
  isAuthenticated,
  authOnly,
  ...props
}) => {
  const ability = useAbility(AbilityContext);

  return isAuthenticated && (authOnly || ability.can(action, subject)) ? (
    <Component {...props} />
  ) : (
    <Redirect to='/' />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
