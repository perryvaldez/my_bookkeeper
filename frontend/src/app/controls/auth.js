import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

const AuthorizedSectionBase = ({ children, authState }) => (
    authState.name === 'AUTHENTICATED' ? children : null
);

AuthorizedSectionBase.propTypes = {
    children: PropTypes.node,
    authState: PropTypes.object,
};

export const AuthorizedSection = connect(mapStateToProps)(AuthorizedSectionBase);

const UnauthorizedSectionBase = ({ children, authState }) => (
    authState.name === 'UNAUTHENTICATED' ? children : null
);

UnauthorizedSectionBase.propTypes = {
    children: PropTypes.node,
};

export const UnauthorizedSection = connect(mapStateToProps)(UnauthorizedSectionBase);
