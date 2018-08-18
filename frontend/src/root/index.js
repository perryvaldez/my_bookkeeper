import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../store/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import App from '../app/App';

const store = createStore(rootReducer, devToolsEnhancer());

const root = (
  <Provider store={store}>
    <App />
  </Provider>
);

export default root;
