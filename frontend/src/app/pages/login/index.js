import React, { PureComponent } from 'react';
import { AuthorizedSection, UnauthorizedSection } from '../../controls/auth';
import { connect } from 'react-redux';
import { callLogin, checkLogin, STATE_LOGGING_IN } from '../../../store/reducers/auth';
import './styles.css';

export class Login extends PureComponent {
  state = {
    username: '',
    password: '',
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.authState.name !== this.props.authState.name && nextProps.authState.name === STATE_LOGGING_IN) {
      nextProps.checkLogin();
    }
  };

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = (e) => {
    console.log('Login button clicked.')
    this.props.callLogin({ username: this.state.username, password: this.state.password });
  };

  render = () => {
    return (
        <React.Fragment>
            <AuthorizedSection>
            <p>Your are now logged in. You may go back to <a href="/">Home</a>.</p>
            <p><a href="/logout">Log out</a></p>
            </AuthorizedSection>
            <UnauthorizedSection>
            <section>
                <h1>Login</h1>

                <p>Please enter your credentials below.</p>

                <form id="login-form">
                  <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" maxLength="20" onChange={this.handleUsername} value={this.state.username} />
                  </div>
                  <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" maxLength="20" onChange={this.handlePassword} value={this.state.password} />
                  </div>
                  <div className="form-row button-row">
                    <input type="button" id="login-button" onClick={this.handleLogin} value="Login" />
                  </div>
                </form>
            </section>
            </UnauthorizedSection>
        </React.Fragment>
    );
  };
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  callLogin: (credentials) => dispatch(callLogin(credentials)),
  checkLogin: () => dispatch(checkLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
