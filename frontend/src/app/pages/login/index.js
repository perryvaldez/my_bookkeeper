import React, { PureComponent } from 'react';
import { AuthorizedSection, UnauthorizedSection } from '../../controls/auth';
import './styles.css';

export class Login extends PureComponent {
  state = {
    username: '',
    password: '',
  };

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = (e) => {
    console.log('Login button clicked.')
  };

  render = () => {
    return (
        <React.Fragment>
            <AuthorizedSection>
            <p>Your are already logged in.</p>
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

export default Login;
