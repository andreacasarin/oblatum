<template>
    <b-navbar toggleable="md" type="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">
            <img src="../assets/images/logo-white.svg" alt="Logo white" height="60px" width="60px" />Oblatum
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="this.$path.home" v-if="!isHome">REGISTER</b-nav-item>
                <b-nav-item :to="this.$path.login" v-if="isHome">LOGIN</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
module.exports = {
  computed: {
    isHome: () => this.$route.path === '/',
  },
};
</script>

