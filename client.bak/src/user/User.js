import React, { Component } from 'react';

import UserSignIn from './UserSignIn.js';
import UserSignUp from './UserSignUp.js';
import UserRecoverPassword from './UserRecoverPassword.js';

class User extends Component {
  render() {
    return (
      <div>
        <UserSignIn />
        <UserSignUp />
        <UserRecoverPassword />
      </div>
    );
  }

}

export default User;
