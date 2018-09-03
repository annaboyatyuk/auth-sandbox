import React from 'react';
import cookie from 'react-cookies';
import { renderIf } from '../../lib/utils.js';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    let token = cookie.load('auth') || '';
    this.state = token && this.decode(token);
    document.addEventListener('login', this.login);
    document.addEventListener('logout', this.logout);
  }

  decode = token => {
    return JSON.parse(atob(token.split('.')[1]));
  };

  login = () => {
    let token = cookie.load('auth');
    let decoded = token && this.decode(token);
    this.setState({ ...this.state, ...decoded });
  };

  logout = () => {
    let id = undefined;
    let capabilities = undefined;
    this.setState({ id, capabilities });
  };

  render() {
    let okToRender =
      this.state.id &&
      (this.props.capability
        ? this.state.capabilities.includes(this.props.capability)
        : true);
    let content = this.props.children;
    return <React.Fragment>{renderIf(okToRender, content)}</React.Fragment>;
  }
}
