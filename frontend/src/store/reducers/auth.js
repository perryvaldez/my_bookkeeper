export const STATE_AUTH_STARTUP = 'AUTH_STARTUP';
export const STATE_CHECKING_AUTH = 'CHECKING_AUTH';
export const STATE_UNAUTHENTICATED = 'UNAUTHENTICATED';
export const STATE_AUTHENTICATED = 'AUTHENTICATED';
export const STATE_LOGGING_IN = 'LOGGING_IN';
export const STATE_LOGGING_OUT = 'LOGGING_OUT';

export const ACTION_CALL_GET_CURRENT_USER = 'CALL_GET_CURRENT_USER';
export const ACTION_OK_GET_CURRENT_USER = 'OK_GET_CURRENT_USER';
export const ACTION_FAIL_GET_CURRENT_USER = 'FAIL_GET_CURRENT_USER';
export const ACTION_CALL_LOGIN = 'CALL_LOGIN';
export const ACTION_OK_LOGIN = 'OK_LOGIN';
export const ACTION_FAIL_LOGIN = 'FAIL_LOGIN';
export const ACTION_CALL_LOGOUT = 'CALL_LOGOUT';
export const ACTION_DONE_LOGOUT = 'DONE_LOGOUT';

// States
const initialState = {
    name: STATE_AUTH_STARTUP,
};

// Action Creators
export const callGetCurrentUser = () => ({
    type: ACTION_CALL_GET_CURRENT_USER,
});

export const okGetCurrentUser = () => ({
    type: ACTION_OK_GET_CURRENT_USER,
});

export const failGetCurrentUser = () => ({
    type: ACTION_FAIL_GET_CURRENT_USER,
});

export const callLogin = () => ({
    type: ACTION_CALL_LOGIN,
});

export const okLogin = () => ({
    type: ACTION_OK_LOGIN,
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
  STATE_AUTH_STARTUP: {
      ACTION_CALL_GET_CURRENT_USER: (state) => ({ ...state, name: STATE_CHECKING_AUTH }),
  },
  STATE_CHECKING_AUTH: {
      ACTION_OK_GET_CURRENT_USER: (state) => ({ ...state, name: STATE_AUTHENTICATED }),     
      ACTION_FAIL_GET_CURRENT_USER: (state) => ({ ...state, name: STATE_UNAUTHENTICATED }),     
  },
  STATE_UNAUTHENTICATED: {
      ACTION_CALL_LOGIN: (state) => ({ ...state, name: STATE_LOGGING_IN }),
  },
  STATE_LOGGING_IN: {
      ACTION_OK_LOGIN: (state) => ({ ...state, name: STATE_AUTHENTICATED }),
      ACTION_FAIL_LOGIN: (state) => ({ ...state, name: STATE_UNAUTHENTICATED }),
  },
  STATE_AUTHENTICATED: {
      ACTION_CALL_LOGOUT: (state) => ({ ...state, name: STATE_LOGGING_OUT }),
  },
  STATE_LOGGING_OUT: {
      ACTION_DONE_LOGOUT: (state) => ({ ...state, name: STATE_UNAUTHENTICATED }),
  },
}

export const authReducer = (state = initialState, action) => {
    if (decisionTree[state.name] && decisionTree[state.name][action.type]) {
      return (decisionTree[state.name][action.type])(state);
    }

    return state;
};