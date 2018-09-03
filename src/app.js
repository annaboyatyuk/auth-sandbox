import React from 'react';

import Login from './components/auth/login.js';
import Auth from './components/auth/auth.js';
import Testing from './components/test.js';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Login />
        <hr />
        <Auth>
          <div>This should only show if you are a logged in user</div>
        </Auth>
        <Auth capability="update">
          <div>This should only show if you can update</div>
        </Auth>
        <Auth capability="delete">
          <div>This should only show if you can delete</div>
        </Auth>
        <Testing />
      </React.Fragment>
    );
  }
}
