import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <div class="container">
        <div class="mx-auto col-5 pb-3">
          <form>
            <div class="form-group">
              {/* <label class="light-text" for="name">Name</label> */}
              <input type="text" class="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div class="form-group">
              {/* <label class="light-text" for="surname">Surname</label> */}
              <input type="text" class="form-control" id="surname" placeholder="Enter your surname" />
            </div>
            <div class="form-group">
              {/* <label class="light-text" for="email">Email address</label> */}
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" />
              <small id="emailHelp" class="form-text light-text">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              {/* <label class="light-text" for="password">Password</label> */}
              <input type="password" class="form-control" id="password" placeholder="Enter your password" />
            </div>
            <div class="form-group">
              {/* <label class="light-text" for="passwordConfirmation">Password confirmation</label> */}
              <input type="password" class="form-control" id="passwordConfirmation" placeholder="Enter your password again" />
            </div>
            <button type="submit" class="btn mx-auto d-block font-weight-bold">Sign me up!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
