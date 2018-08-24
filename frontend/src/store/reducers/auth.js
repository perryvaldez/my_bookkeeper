export const STATE_AUTH_STARTUP = 'AUTH_STARTUP';
export const STATE_CHECKING_AUTH = 'CHECKING_AUTH';
export const STATE_UNAUTHENTICATED = 'UNAUTHENTICATED';
export const STATE_AUTHENTICATED = 'AUTHENTICATED';
export const STATE_LOGGING_IN = 'LOGGING_IN';
export const STATE_LOGGING_OUT = 'LOGGING_OUT';

export const ACTION_CALL_GET_CURRENT_USER = 'CALL_GET_CURRENT_USER';
export const ACTION_CHECK_GET_CURRENT_USER = 'CHECK_GET_CURRENT_USER';
export const ACTION_OK_GET_CURRENT_USER = 'OK_GET_CURRENT_USER';
export const ACTION_FAIL_GET_CURRENT_USER = 'FAIL_GET_CURRENT_USER';
export const ACTION_CALL_LOGIN = 'CALL_LOGIN';
export const ACTION_CHECK_LOGIN = 'CHECK_LOGIN';
export const ACTION_OK_LOGIN = 'OK_LOGIN';
export const ACTION_FAIL_LOGIN = 'FAIL_LOGIN';
export const ACTION_CALL_LOGOUT = 'CALL_LOGOUT';
export const ACTION_DONE_LOGOUT = 'DONE_LOGOUT';

// States
const initialState = {
    name: STATE_AUTH_STARTUP,
    promiseApiCall: Promise.resolve(null),
    user: null,
    credentials: null,
};

// Action Creators
export const callGetCurrentUser = () => ({
    type: ACTION_CALL_GET_CURRENT_USER,
});

export const checkGetCurrentUser = () => ({
    type: ACTION_CHECK_GET_CURRENT_USER,
});

export const okGetCurrentUser = (user) => ({
    type: ACTION_OK_GET_CURRENT_USER,
    user
});

export const failGetCurrentUser = () => ({
    type: ACTION_FAIL_GET_CURRENT_USER,
});

export const callLogin = (credentials) => ({
    type: ACTION_CALL_LOGIN,
    credentials,
});

export const checkLogin = () => ({
    type: ACTION_CHECK_LOGIN,
});

export const okLogin = (user) => ({
    type: ACTION_OK_LOGIN,
    user
});

export const failLogin = () => ({
    type: ACTION_FAIL_LOGIN,
});

export const callLogout = () => ({
    type: ACTION_CALL_LOGOUT,
});

export const doneLogout = () => ({
    type: ACTION_DONE_LOGOUT,
});

// Reducer
const decisionTree = {
  [STATE_AUTH_STARTUP]: {
      [ACTION_CALL_GET_CURRENT_USER]: (state) => ({ ...state, name: STATE_CHECKING_AUTH }),
  },
  [STATE_CHECKING_AUTH]: {
      [ACTION_CHECK_GET_CURRENT_USER]: (state) => state,     
      [ACTION_OK_GET_CURRENT_USER]: (state, action) => ({ ...state, name: STATE_AUTHENTICATED, user: action.user }),     
      [ACTION_FAIL_GET_CURRENT_USER]: (state) => ({ ...state, name: STATE_UNAUTHENTICATED }),     
  },
  [STATE_UNAUTHENTICATED]: {
      [ACTION_CALL_LOGIN]: (state, action) => ({ ...state, name: STATE_LOGGING_IN, credentials: action.credentials }),
  },
  [STATE_LOGGING_IN]: {
      [ACTION_CHECK_LOGIN] : (state) => state,
      [ACTION_OK_LOGIN]: (state, action) => ({ ...state, name: STATE_AUTHENTICATED, user: action.user }),
      [ACTION_FAIL_LOGIN]: (state) => ({ ...state, name: STATE_UNAUTHENTICATED }),
  },
  [STATE_AUTHENTICATED]: {
      [ACTION_CALL_LOGOUT]: (state) => ({ ...state, name: STATE_LOGGING_OUT }),
  },
  [STATE_LOGGING_OUT]: {
      [ACTION_DONE_LOGOUT]: (state) => ({ ...state, name: STATE_UNAUTHENTICATED }),
  },
}

export const authReducer = (state = initialState, action) => {
    if (decisionTree[state.name] && decisionTree[state.name][action.type]) {
      return (decisionTree[state.name][action.type])(state, action);
    }

    return state;
};
