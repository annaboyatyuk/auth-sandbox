import React from 'react';
import superagent from 'superagent';
import cookie from 'react-cookies';

import { renderIf } from '../../lib/utils.js';

let loginEvent = new CustomEvent('login');
let logoutEvent = new CustomEvent('logout');

let api = 'http://localhost:3000';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMessage: '',
      token: cookie.load('auth'),
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = async e => {
    e.preventDefault();
    await superagent
      .post(`${api}/login`)
      .auth(this.state.username, this.state.password)
      .then(response => {
        let token = response.text;
        let loginMessage = '';
        this.setState({ token, loginMessage });
        cookie.save('auth', token);
        document.dispatchEvent(loginEvent);
      })
      .catch(error => {
        let loginMessage = `Login Failed -- ${error}`;
        this.setState({ loginMessage });
        console.error(error);
      });
  };

  logout = () => {
    let loginMessage = undefined;
    let token = undefined;
    cookie.remove('auth');
    document.dispatchEvent(logoutEvent);
    this.setState({ token, loginMessage });
  };

  render() {
    let token = this.state.token;
    return (
      <div>
        {renderIf(
          token,
          <a href="#" onClick={this.logout}>
            Log Out
          </a>,
          <div>
            <form onSubmit={this.login}>
              <input
                placeholder="username"
                name="username"
                onChange={this.handleChange}
              />
              <input
                placeholder="password"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
              <input type="submit" value="login" />
            </form>
            {this.state.loginMessage}
          </div>,
        )}
      </div>
    );
  }
}
