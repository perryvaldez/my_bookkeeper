import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  callGetCurrentUser,
  checkGetCurrentUser,
  STATE_AUTH_STARTUP, 
  STATE_CHECKING_AUTH,
} from '../../store/reducers/auth';
import './baseLayout.css';

export class BaseLayout extends PureComponent {
  componentDidMount = () => {
    console.log('baseLayout: componentDidMount: Current State: ', this.props.authState.name);
    if (this.props.authState.name === STATE_AUTH_STARTUP) {
      this.props.callGetCurrentUser();
    }
  };

  componentWillReceiveProps = (nextProps) => {
    console.log('baseLayout: componentWillReceiveProps: Current State: ', nextProps.authState.name);
    if (nextProps.authState.name !== this.props.authState.name && nextProps.authState.name === STATE_CHECKING_AUTH) {
      nextProps.checkGetCurrentUser();
    }
  };

  render = () => {
    const { children } = this.props;

    return (
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
  };
}

BaseLayout.propTypes = {
    content: PropTypes.node,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
  locale: state.intl.locale,
});

const mapDispatchToProps = (dispatch) => ({
  callGetCurrentUser: () => dispatch(callGetCurrentUser()),
  checkGetCurrentUser: () => dispatch(checkGetCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
