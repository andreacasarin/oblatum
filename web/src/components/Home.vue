<template>
  <div>
    <ob-header />
      <div class="container">
        <div class="row justify-content-center pb-5">
          <div class="col">
            <div class="row justify-content-center">
              <div class="col text-center">
                <h1>Think big, start small, scale fast</h1>
              </div>
            </div>

            <div class="row d-flex align-items-center pt-5">
              <img class="col-md-3 order-md-2"
              src="../assets/think-big.svg"
              alt="Think big"
              height="100px"
              width="100px"
              />
              <div class="col-md-9 order-md-1 d-flex align-items-center">
                Oblatum mission is to organize the world’s asset
                in a transparent and secure way
                that enables people prosperity and
                promote financial inclusion.
              </div>
            </div>

            <div class="row d-flex align-items-center pt-5">
              <img class="col-md-3"
              src="../assets/start-small.svg"
              alt="Start small"
              height="100px"
              width="100px" />
              <div class="col-md-9 order-md-1 d-flex align-items-center">
                We have chosen to start from tracing bicycle.
                We leverage the Ethereum blockchain
                to create a digital certificate
                associated with the bicycle
                which enhances transparency
                and prevents the reselling of stolen bicycles.
              </div>
            </div>

            <div class="row d-flex align-items-center pt-5">
              <img class="col-md-3 order-md-2"
              src="../assets/scale-fast.svg"
              alt="Scale fast"
              height="100px"
              width="100px"/>
              <div class="col-md-9 order-md-1 d-flex align-items-center">
                Our solution can be easily applied to different assets
                and can be complemented with many different services
                attached to any registered asset.
                By relaying on the Ethereum blockchain
                we contribute to the Ethereum community,
                one of the most active community in the crypto-world,
                and we benefit from the open innovation.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row dark-background pt-5 pb-5">
          <div class="col">
            <div class="row">
              <div class="col text-center light-text">
                <h1>Team</h1>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-4 offset-sm-4 pb-5 pt-5">
                <img
                src="../assets/andrea.jpg"
                class="rounded-circle mx-auto d-block pb-3"
                alt="Andrea Casarin"
                height="200px"
                width="200px" />
                <h5 class="row justify-content-center font-weight-bold">
                  <a href="andreacasarin.com" class="light-text">Andrea Casarin</a>
                </h5>
                <div class="row justify-content-center light-text font-italic">
                  CEO & CTO
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col text-center light-text">
                <h1>Former members</h1>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-4 offset-sm-2 pb-5 pt-5">
                <img
                src="../assets/alessandro.jpg"
                class="rounded-circle mx-auto d-block former pb-3"
                alt="Alessandro Rea"
                height="200px"
                width="200px" />
                <h5 class="row justify-content-center light-text font-weight-bold">
                  Alessandro Rea
                </h5>
                <div class="row justify-content-center light-text font-italic">
                  Founder & CEO
                </div>
              </div>

              <div class="col-sm-4 pb-5 pt-5">
                <img
                src="../assets/ezechiele.jpg"
                class="rounded-circle mx-auto d-block former pb-3"
                alt="Andrea Casarin"
                height="200px"
                width="200px" />
                <h5 class="row justify-content-center light-text font-weight-bold">
                  Ezechiele Tosadori
                </h5>
                <div class="row justify-content-center light-text font-italic">
                  Developer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <ob-footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default {
  name: 'Home',
  components: {
    'ob-header': Header,
    'ob-footer': Footer,
  },
  data() {
    return {
    };
  },
};
</script>
