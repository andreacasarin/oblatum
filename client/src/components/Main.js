import React, { Component } from 'react';

import Description from './Description.js';
import Team from './Team.js';


class Main extends Component {
  render() {
    return (
        <div>
            <section class="light-background">
                <Description />
            </section>

            <section class="dark-background">
                <Team />
            </section>
        </div>
    );
  }
}

export default Main;

