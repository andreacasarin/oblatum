import React, { Component } from 'react';
import Nav from './Nav.js';
import User from '../user/User.js';

class Header extends Component {
  render() {
    return (
      <section class="dark-background">
        <Nav />
        <div class="container-fluid">
          <div class="row">
            <div class="col text-center light-text pt-5 pb-5">
              <h1 class="font-weight-bold pb-2">Let’s build the future together</h1>
              <h2 class="h6-alike">Oblatum enables people to trace, store and insure their most valuable assets.</h2>
            </div>
          </div>

          <div class="row pt-5 pb-5">
            <div class="col">
              <User />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;
