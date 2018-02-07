import React, { Component } from 'react';

import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import RecoverPassword from './RecoverPassword.js';

class User extends Component {
  render() {
    return (
      <div>
        <SignIn />
        <SignUp />
        <RecoverPassword />
      </div>
    );
  }
}

export default User;
