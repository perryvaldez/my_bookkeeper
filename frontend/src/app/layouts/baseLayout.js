import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './baseLayout.css';

export const BaseLayout = ({ children }) => (
  <div id="wrapper">
    <div id="header">
      <header>
        <h1>My Bookkeeper</h1>
      </header>
    </div>
    <div id="content">
      {children}
    </div>
    <div id="footer">
      <footer>
        <p>My Bookkeeper &mdash; A useful accounting software.</p>
      </footer>
    </div>
  </div>
);

BaseLayout.propTypes = {
    content: PropTypes.node,
};

export default BaseLayout;
