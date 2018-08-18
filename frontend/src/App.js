import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
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
