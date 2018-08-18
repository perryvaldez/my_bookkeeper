import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider, intlReducer } from 'react-intl-redux'
import { createStore, combineReducers } from 'redux';
import { rootReducer } from '../store/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../app/App';

const reducers = combineReducers({ ...rootReducer, intl: intlReducer });
const store = createStore(reducers, devToolsEnhancer());

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
