<template>
<!-- main container -->
<b-container fluid>

    <!-- bold big text -->
    <b-row class="justify-content-center">
        <b-col class="text-center main-text text-white">
            Let’s build the future together
        </b-col>
    </b-row>

    <!-- description label -->
    <b-row class="justify-content-center">
        <b-col class="text-center descriptive-text text-white">
            Oblatum enables people to trace, store and insure their most valuable assets.
        </b-col>
    </b-row>

    <!-- Sign up form -->
    <b-row class="justify-content-center">
        <b-col>
            <obl-login-form v-if="isLogin"></obl-login-form>
            <obl-register-form v-if="isHome"></obl-register-form>
            <obl-recover-password-form v-if="isRecover"></obl-recover-password-form>
        </b-col>
    </b-row>

    <!-- What we do section -->
    <b-row id="what-we-do-sec" class="what-we-do-section justify-content-center">
        <b-col>
            <b-row class="justify-content-center">
                <b-col class="text-center what-we-do-title">
                    Think big, start small, scale fast
                </b-col>
            </b-row>
            <!-- Think Big -->
            <b-row class="what-we-do-block d-flex align-items-center">

                <img class="col-md-3 order-md-2 what-we-do-images"
                    :src="this.$path.global + '/images/think-big.svg'"
                    alt="Think big"
                    height="100px"
                    width="100px"
                    />

                <b-col col md="9" class="order-md-1 d-flex align-items-center">
                    Oblatum mission is to organize the world’s asset in a transparent and secure way that enables people prosperity and promote financial inclusion.
                </b-col>


            </b-row>

            <!-- Start small -->
            <b-row class="what-we-do-block d-flex align-items-center">
                <img class="col-md-3 what-we-do-images"
                    :src="this.$path.global + '/images/start-small.svg'"
                    alt="Start small"
                    height="100px"
                    width="100px" />

                <b-col col md="9" class="order-md-1 d-flex align-items-center">
                    We have chosen to start from tracing bicycle. We leverage the Ethereum blockchain to create a digital certificate associated with the bicycle which enhances transparency and prevents the reselling of stolen bicycles.
                </b-col>

            </b-row>

            <!-- Scale fast -->
            <b-row class="what-we-do-block d-flex align-items-center">

                <img class="col-md-3 order-md-2 what-we-do-images"
                    :src="this.$path.global + '/images/scale-fast.svg'"
                    alt="Scale fast"
                    height="100px"
                    width="100px"/>

                <b-col col md="9" class="order-md-1 d-flex align-items-center">
                    Our solution can be easily applied to different assets and can be complemented with many different services attached to any registered asset. By relaying on the Ethereum blockchain we contribute to the Ethereum community, the most active community in the crypto-world, and we benefit from the open innovation.
                </b-col>

            </b-row>
        </b-col>
    </b-row>

    <!-- Team section -->
    <b-row id="team-sec">
        <b-col>

            <b-row>
                <b-col class="text-center team-title text-white">
                    Team
                </b-col>
            </b-row>

            <!-- Team container -->
            <b-row class="team-container">

                <!-- Member A -->
                <b-col col md="4">
                    <b-row>

                        <img
                            :src="this.$path.global + '/images/andrea.jpg'"
                            class="rounded-circle mx-auto d-block"
                            alt="Member photo"
                            height="200px"
                            width="200px" />

                    </b-row>
                    <b-row class="justify-content-center text-white member-name">Andrea Casarin
                    </b-row>
                    <b-row class="justify-content-center text-white"><i>Front-end developer</i>
                    </b-row>
                </b-col>

                <!-- Member B -->
                <b-col col md="4">

                    <b-row>
                        <img
                            :src="this.$path.global + '/images/alessandro.jpg'"
                            class="rounded-circle mx-auto d-block"
                            alt="Member photo"
                            height="200px"
                            width="200px" />
                    </b-row>

                    <b-row class="row justify-content-center text-white member-name">Alessandro Rea</b-row>
                    <b-row class="justify-content-center text-white"><i>Founder & CEO</i>
                    </b-row>
                </b-col>

                <!-- Member C -->
                <b-col col md="4">

                    <b-row>
                        <img
                            :src="this.$path.global + '/images/ezechiele.jpg'"
                            class="rounded-circle mx-auto d-block"
                            alt="Member photo"
                            height="200px"
                            width="200px" />
                    </b-row>

                    <b-row class="row justify-content-center text-white member-name">Ezechiele Tosadori</b-row>

                    <b-row class="justify-content-center text-white"><i>Front-end developer</i>
                    </b-row>

                </b-col>
            </b-row>

        </b-col>
    </b-row>
</b-container>

</template>

<script>
module.exports = {
  computed: {
        isLogin: function() {
            return this.$route.path == this.$path.login;
        },
        isHome: function(){
            return this.$route.path == this.$path.home;
        },
        isRecover: function(){
            return this.$route.path == this.$path.recover;
        }
  }
}
</script>

