import React, { PureComponent } from 'react';
import { AuthorizedSection, UnauthorizedSection } from '../../controls/auth';
import { connect } from 'react-redux';
import { callLogout, doneLogout, STATE_LOGGING_OUT } from '../../../store/reducers/auth';

export class Logout extends PureComponent {
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.authState.name !== this.props.authState.name && nextProps.authState.name === STATE_LOGGING_OUT) {
      nextProps.doneLogout();
    }
  };

  handleLogout = () => {
    this.props.callLogout();
  };

  render = () => (
    <React.Fragment>
      <AuthorizedSection>
        <section>
          <h1>Log Out</h1>
          <p>You are about to log out.</p>
          <form id="logout-form">
            <div className="form-row button-row">
              <input type="button" id="logout-button" onClick={this.handleLogout} value="Log out" />
            </div>
          </form>
        </section>
      </AuthorizedSection>    
      <UnauthorizedSection>
        <p>You have been logged out. <a href="/">Home</a></p>
      </UnauthorizedSection>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  callLogout: () => dispatch(callLogout()),
  doneLogout: () => dispatch(doneLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
