import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  callGetCurrentUser, 
  okGetCurrentUser,
  failGetCurrentUser,
  STATE_AUTH_STARTUP, 
  STATE_CHECKING_AUTH, 
} from '../../store/reducers/auth';
import './baseLayout.css';

export class BaseLayout extends PureComponent {
  componentDidMount = () => {
    if (this.props.authState.name === STATE_AUTH_STARTUP) {
      this.props.callGetCurrentUser();
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.authState.name === STATE_CHECKING_AUTH) {
      // TODO
      this.props.okGetCurrentUser();
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
  okGetCurrentUser: () => dispatch(okGetCurrentUser()),
  failGetCurrentUser: () => dispatch(failGetCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
