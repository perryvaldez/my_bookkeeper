import React, { PureComponent } from 'react';
import BaseLayout from './layouts/baseLayout';
import { AuthorizedSection, UnauthorizedSection } from './controls/auth';
import './App.css';

export class App extends PureComponent {
  render = () => (
    <BaseLayout>
      <p>Hello, World!</p>
      <p>Again</p>
      <AuthorizedSection>
        <p>You are authorized on this page.</p>
      </AuthorizedSection>
      <UnauthorizedSection>
        <p>You are NOT authorized on this page.</p>
      </UnauthorizedSection>
    </BaseLayout>
  )
}

export default App;
