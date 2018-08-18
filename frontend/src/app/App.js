import React, { PureComponent } from 'react';
import './App.css';

export class App extends PureComponent {
  render = () => {
    return (
      <div id="wrapper">
        <div id="header">
          <header>
            <h1>My Bookkeeper</h1>
          </header>
        </div>
        <div id="content">
          <p>Welcome to my bookkeeper!</p>
        </div>
        <div id="footer">
          <footer>
            <p>This is a footer.</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
