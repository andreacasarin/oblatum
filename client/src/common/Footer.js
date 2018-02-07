import React, { Component } from 'react';

import logoBlack from './images/logo-black.svg';

class Footer extends Component {
  render() {
    return (
        <div class="container-fluid">
            <div class="row pt-5 pb-5 align-items-center">
                <div class="col-1 pr-0">
                    <img
                    src={logoBlack}
                    alt="Logo black"
                    class="img-fluid"
                    />
                </div>

                <div class="col-2 pl-0">
                    <span class="h1-alike">Oblatum</span>
                </div>

                <div class="col ml-auto col-2">
                    <h5>Contacts</h5>
                    <div class="icon-align pt-2"><i class="fa fa-phone h5-alike mr-2" aria-hidden="true"></i>
                        <a href="tel:+39.327.8562208">+39.327.8562208</a>
                    </div>
                    <div class="icon-align pt-2"><i class="fa fa-envelope h5-alike mr-2" aria-hidden="true"></i>
                      <a href="mailto:support@oblatum.it">support@oblatum.it</a>
                    </div>
                    <div class="pt-5">
                        Oblatum &copy; 2018
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Footer;
