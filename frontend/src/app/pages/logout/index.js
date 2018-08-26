import React, { PureComponent } from 'react';
import { AuthorizedSection, UnauthorizedSection } from '../../controls/auth';

export class Logout extends PureComponent {
  handleLogout = () => {};

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
        <p>You have been logged out.</p>
      </UnauthorizedSection>
    </React.Fragment>
  );
}

export default Logout;
