import React, { Component } from 'react';

import thinkBig from '../images/think-big.svg';
import startSmall from '../images/start-small.svg';
import scaleFast from '../images/scale-fast.svg';

class Description extends Component {
  render() {
    return (
        <div class="container">
            <div class="row justify-content-center pt-5 pb-5">
                <div class="col">
                    <div class="row justify-content-center">
                        <div class="col text-center">
                            <h1>Think big, start small, scale fast</h1>
                        </div>
                    </div>

                    <div class="row d-flex align-items-center pt-5">
                        <img class="col-md-3 order-md-2"
                            src={thinkBig}
                            alt="Think big"
                            height="100px"
                            width="100px"
                            />
                        <div class="col-md-9 order-md-1 d-flex align-items-center">
                            Oblatum mission is to organize the world’s asset in a transparent and secure way that enables people prosperity and promote financial inclusion.
                        </div>
                    </div>

                    <div class="row d-flex align-items-center pt-5">
                        <img class="col-md-3"
                            src={startSmall}
                            alt="Start small"
                            height="100px"
                            width="100px" />
                        <div class="col-md-9 order-md-1 d-flex align-items-center">
                            We have chosen to start from tracing bicycle. We leverage the Ethereum blockchain to create a digital certificate associated with the bicycle which enhances transparency and prevents the reselling of stolen bicycles.
                        </div>
                    </div>

                    <div class="row d-flex align-items-center pt-5">
                        <img class="col-md-3 order-md-2"
                            src={scaleFast}
                            alt="Scale fast"
                            height="100px"
                            width="100px"/>
                        <div class="col-md-9 order-md-1 d-flex align-items-center">
                            Our solution can be easily applied to different assets and can be complemented with many different services attached to any registered asset. By relaying on the Ethereum blockchain we contribute to the Ethereum community, the most active community in the crypto-world, and we benefit from the open innovation.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Description;
