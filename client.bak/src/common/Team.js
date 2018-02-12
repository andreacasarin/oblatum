import React, { Component } from 'react';

import andreaCasarin from './images/andrea.jpg';
import alessandroRea from './images/alessandro.jpg';

class Team extends Component {
  render() {
    return (
        <div class="container">
            <div class="row dark-background pt-5 pb-5">
                <div class="col">
                    <div class="row">
                        <div class="col text-center light-text">
                            <h1>Team</h1>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <img
                                src={alessandroRea}
                                class="rounded-circle mx-auto d-block pb-3"
                                alt="Alessandro Rea"
                                height="200px"
                                width="200px" />
                            <h5 class="row justify-content-center light-text font-weight-bold">Alessandro Rea</h5>
                            <div class="row justify-content-center light-text font-italic">Founder & CEO</div>
                        </div>

                        <div class="col-md-6">
                            <img
                                src={andreaCasarin}
                                class="rounded-circle mx-auto d-block pb-3"
                                alt="Andrea Casarin"
                                height="200px"
                                width="200px" />
                            <h5 class="row justify-content-center light-text font-weight-bold">Andrea Casarin</h5>
                            <div class="row justify-content-center light-text font-italic">Main developer</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Team;
