import React from 'react';
import { AuthorizedSection, UnauthorizedSection } from '../../controls/auth';

export const Home = () => (
    <React.Fragment>
      <AuthorizedSection>
        <h2>Welcome to the Application!</h2>
        <p>You are now able to access this page.</p>
      </AuthorizedSection>
      <UnauthorizedSection>
        <p>You need to <a href="/login">log in</a> to access this application.</p>
      </UnauthorizedSection>
    </React.Fragment>
);

export default Home;
