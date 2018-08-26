import React from 'react';
import PropTypes from 'prop-types';
import { STATE_AUTHENTICATED, STATE_LOGGING_OUT } from '../../store/reducers/auth';
import { connect } from 'react-redux';

const isAuthenticated = (stateName) => (
  stateName === STATE_AUTHENTICATED || stateName === STATE_LOGGING_OUT
);

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

const AuthorizedSectionBase = ({ children, authState }) => (
    isAuthenticated(authState.name) ? children : null
);

AuthorizedSectionBase.propTypes = {
    children: PropTypes.node,
    authState: PropTypes.object,
};

export const AuthorizedSection = connect(mapStateToProps)(AuthorizedSectionBase);

const UnauthorizedSectionBase = ({ children, authState }) => (
    !isAuthenticated(authState.name) ? children : null
);

UnauthorizedSectionBase.propTypes = {
    children: PropTypes.node,
};

export const UnauthorizedSection = connect(mapStateToProps)(UnauthorizedSectionBase);
