import React, { Component } from 'react';

class UserRecoverPassword extends Component {
  render() {
    return (
      <div class="container">
        <div class="mx-auto col-5 pb-3">
          <form>
            <div class="form-group">
              {/* <label class="light-text" for="email">Email address</label> */}
              <input type="email" class="form-control" id="email" placeholder="Enter your email" />
            </div>
            <button type="submit" class="btn mx-auto d-block font-weight-bold">Recover my password!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserRecoverPassword;
