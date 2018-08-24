import React from 'react';
import { AuthorizedSection, UnauthorizedSection } from '../../controls/auth';

export const Home = () => (
    <React.Fragment>
      <AuthorizedSection>
        <section>
          <h1>Welcome to the Application!</h1>
          <p>You are now able to access this page.</p>
        </section>
      </AuthorizedSection>
      <UnauthorizedSection>
        <p>You need to <a href="/login">log in</a> to access this application.</p>
      </UnauthorizedSection>
    </React.Fragment>
);

export default Home;
