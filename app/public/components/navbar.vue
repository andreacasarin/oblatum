<style src="./stylesheets/navbar.css"></style>

<template>
    <b-navbar toggleable="md" type="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">
            <img src="./images/logo-white.svg" alt="Logo white" height="60px" width="60px" />Oblatum
        </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav class="ml-auto">
            <b-nav-item to="login">LOGIN</b-nav-item>
        </b-navbar-nav>

    </b-collapse>

    </b-navbar>
</template>

<script>
module.exports = {
    methods:{
        scroll: function(){
            alert("clicked");
        }
    }
}
</script>

