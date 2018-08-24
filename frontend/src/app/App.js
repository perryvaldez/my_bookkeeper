import React, { PureComponent } from 'react';
import BaseLayout from './layouts/baseLayout';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import './App.css';

export class App extends PureComponent {
  render = () => (
    <BaseLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BaseLayout>
  )
}

export default App;
