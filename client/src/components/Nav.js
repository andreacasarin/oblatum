import React, { Component } from 'react';

import logoWhite from '../images/logo-white.svg';

class Nav extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-md pb-5">
        <div class="navbar-brand light-text">
            <span><img src={logoWhite} alt="Logo white" class="img-fluid mr-1" /></span>
            <span class="font-weight-bold light-text">Oblatum</span>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="main-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link light-text font-weight-bold" href="#sign-up">Sign up</a>
            </li>
            <li class="nav-item">
              <a class="nav-link light-text font-weight-bold" href="#sign-in">Sign in</a>
            </li>
            <li class="nav-item">
              <a class="nav-link light-text font-weight-bold" href="#sign-out">Sign out</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
