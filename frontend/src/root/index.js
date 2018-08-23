import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider, intlReducer } from 'react-intl-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducers } from '../store/reducers';
import { authMiddleware } from '../store/middleware/auth';
import App from '../app/App';

const comboReducers = combineReducers({ ...reducers, intl: intlReducer });
const store = createStore(comboReducers, composeWithDevTools(applyMiddleware(authMiddleware)));

const root = (
  <Provider store={store}>
    <IntlProvider locale={navigator.language}>
      <Router>
        <App />
      </Router>
    </IntlProvider>
  </Provider>
);

export default root;
