import React, { PureComponent } from 'react';
import BaseLayout from './layouts/baseLayout';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import './App.css';

export class App extends PureComponent {
  render = () => (
    <BaseLayout>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BaseLayout>
  )
}

export default App;
