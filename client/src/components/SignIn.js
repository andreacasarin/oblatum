import React, { Component } from 'react';

class SignIn extends Component {
  render() {
    return (
      <div class="container">
        <div class="mx-auto col-5 pb-3">
          <form>
            <div class="form-group">
              {/* <label class="light-text" for="email">Email address</label> */}
              <input type="email" class="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div class="form-group">
              {/* <label class="light-text" for="password">Password</label> */}
              <input type="password" class="form-control" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" class="btn mx-auto d-block font-weight-bold">Sign me in!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
