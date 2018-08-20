import React, { PureComponent } from 'react';
import BaseLayout from './layouts/baseLayout';
import './App.css';

export class App extends PureComponent {
  render = () => (
    <BaseLayout>
      <p>Hello, World!</p>
      <p>Again</p>
    </BaseLayout>
  )
}

export default App;
