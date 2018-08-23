import { getJSON, awaitJSON } from '../../lib/utils';

import { 
    STATE_AUTH_STARTUP,
    STATE_CHECKING_AUTH,
    ACTION_CALL_GET_CURRENT_USER,
    ACTION_CHECK_GET_CURRENT_USER,
    okGetCurrentUser,
    failGetCurrentUser,
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

        default:
            nextAction = next(action);
            console.log('authMiddleware: Next state: ', getState().authReducer.name);
            return nextAction;  // Pass to next middleware
    }
};
