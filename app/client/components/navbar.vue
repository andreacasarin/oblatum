<style>
.nav-link{
    color: whitesmoke!important;
    font-weight: bold;
}

.nav-link:hover{
    color: white!important;
}

.navbar-brand{
    color: white!important;
    font-weight: bold;
}
.custom-toggler.navbar-toggler {
    border-color: whitesmoke;
}
.custom-toggler .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
</style>

<template>
    <b-navbar toggleable="md" type="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">
            <img src="../images/logo-white.svg" alt="Logo white" height="60px" width="60px" />Oblatum
        </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav class="ml-auto">
            <b-nav-item>LOGIN</b-nav-item>
        </b-navbar-nav>

    </b-collapse>

    </b-navbar>
</template>

<script>
</script>

