import React from 'react';

import Auth from './auth/auth.js';

export default class Testing extends React.Component {
  render() {
    return (
      <Auth capability="delete">
        <div>DELETEABLE!</div>
      </Auth>
    );
  }
}
