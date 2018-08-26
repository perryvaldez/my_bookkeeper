import { getJSON, postJSON, awaitJSON } from '../../lib/utils';

import { 
    STATE_AUTH_STARTUP,
    STATE_CHECKING_AUTH,
    STATE_UNAUTHENTICATED,
    STATE_LOGGING_IN,
    STATE_AUTHENTICATED,
    STATE_LOGGING_OUT,
    ACTION_CALL_GET_CURRENT_USER,
    ACTION_CHECK_GET_CURRENT_USER,
    ACTION_CALL_LOGIN,
    ACTION_CHECK_LOGIN,
    ACTION_CALL_LOGOUT,
    okGetCurrentUser,
    failGetCurrentUser,
    okLogin,
    failLogin,
    ACTION_DONE_LOGOUT,
    doneLogout,
 } from '../reducers/auth';

export const authMiddleware = ({ getState }) => (next) => (action) => {
    const authState = getState().authReducer;
    if (!authState) {
        return next(action);
    }

    console.log('authMiddleware: action: ', action.type);
    console.log('authMiddleware: current state: ', authState.name);

    let nextAction;
    switch (action.type) {
        case ACTION_CALL_GET_CURRENT_USER:
            if (authState.name === STATE_AUTH_STARTUP) {
                console.log('authMiddleware: Requesting current user...');
                authState.promiseApiCall = getJSON('/appusers/me');
            }
            nextAction = next(action);
            console.log('authMiddleware: Next state: ', getState().authReducer.name);
            return nextAction;  // Pass to next middleware

        case ACTION_CHECK_GET_CURRENT_USER:
            if (authState.name === STATE_CHECKING_AUTH) {
                console.log('authMiddleware: Examining current user...');
                awaitJSON(authState.promiseApiCall)
                    .then((user) => {
                        console.log('authMiddleware: Examining current user: Success.', user);
                        return okGetCurrentUser(user);
                    })
                    .catch((err) => {
                        console.log('authMiddleware: Examining current user: Fail.', err);
                        return failGetCurrentUser();
                    })
                    .then((newAction) => {
                        nextAction = next(newAction);
                        console.log('authMiddleware: Next state: ', getState().authReducer.name);
                        return nextAction;  // Pass to next middleware
                    })
                    ;
            }
            nextAction = next(action);
            console.log('authMiddleware: Next state: ', getState().authReducer.name);
            return nextAction;  // Pass to next middleware

        case ACTION_CALL_LOGIN:
            if (authState.name === STATE_UNAUTHENTICATED) {
                console.log('authMiddleware: Requesting login...');
                authState.promiseApiCall = postJSON('/appusers/login', action.credentials);
            }
            nextAction = next(action);
            console.log('authMiddleware: Next state: ', getState().authReducer.name);
            return nextAction;  // Pass to next middleware

        case ACTION_CHECK_LOGIN:
            if (authState.name === STATE_LOGGING_IN) {
                console.log('authMiddleware: Examining login request');
                awaitJSON(authState.promiseApiCall)
                    .then((user) => {
                        console.log('authMiddleware: Examining login request: Success.', user);
                        return getJSON('/appusers/me');
                    })
                    .then(awaitJSON)
                    .then(okLogin)
                    .catch((err) => {
                        console.log('authMiddleware: Examining login request: Fail.', err);
                        return failLogin();
                    })
                    .then((newAction) => {
                        nextAction = next(newAction);
                        console.log('authMiddleware: Next state: ', getState().authReducer.name);
                        return nextAction;  // Pass to next middleware
                    })
                    ;
            }
            nextAction = next(action);
            console.log('authMiddleware: Next state: ', getState().authReducer.name);
            return nextAction;  // Pass to next middleware

        case ACTION_CALL_LOGOUT:
            if (authState.name === STATE_AUTHENTICATED) {
                console.log('authMiddleware: Requesting logout...');
                authState.promiseApiCall = postJSON('/appusers/logout');
            }
            nextAction = next(action);
            console.log('authMiddleware: Next state: ', getState().authReducer.name);
            return nextAction;  // Pass to next middleware

        case ACTION_DONE_LOGOUT:
            if (authState.name === STATE_LOGGING_OUT) {
                console.log('authMiddleware: Examining logout request');
                awaitJSON(authState.promiseApiCall)
                    .then(() => {
                        console.log('authMiddleware: Examining logout request: Success.');
                        return doneLogout();
                    })
                    .catch((err) => {
                        console.log('authMiddleware: Examining login request: Fail.', err);
                        return doneLogout(); 
                    })
                    .then((newAction) => {
                        nextAction = next(newAction);
                        console.log('authMiddleware: Next state: ', getState().authReducer.name);
                        return nextAction;  // Pass to next middleware
                    })
                    ;
            }
            nextAction = next(action);
            console.log('authMiddleware: Next state: ', getState().authReducer.name);
            return nextAction;  // Pass to next middleware

        default:
            nextAction = next(action);
            console.log('authMiddleware: Next state: ', getState().authReducer.name);
            return nextAction;  // Pass to next middleware
    }
};
