<template>
  <nav class="navbar navbar-expand pb-5">
    <div class="navbar-brand light-text">
        <router-link to="/" class="font-weight-bold light-text">
          <img src="../../assets/logo-white.svg" alt="Logo white" class="img-fluid mr-1" />
          Oblatum <span style="color:#aaa">alpha</span>
        </router-link>
    </div>

    <!-- <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button> -->

    <div class="ml-auto">
      <ul class="navbar-nav">
        <li v-if="!authenticated" class="nav-item">
          <router-link
            :to="{ name: 'Login' }"
            class="nav-link light-text font-weight-bold"
            exact-active-class="active">
            Sign in
          </router-link>
        </li>
        <li v-if="!authenticated" class="nav-item">
          <router-link
            :to="{ name: 'Register' }"
            class="nav-link light-text font-weight-bold"
            exact-active-class="active">
            Sign up
          </router-link>
        </li>
        <li v-if="authenticated" class="nav-item">
          <router-link
            :to="{ name: 'Dashboard' }"
            class="nav-link light-text font-weight-bold"
            exact-active-class="active">
            Dashboard
          </router-link>
        </li>
        <li v-if="authenticated" class="nav-item">
          <router-link
            :to="{ name: 'Logout' }"
            class="nav-link light-text font-weight-bold"
            exact-active-class="active">
            Sign out
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import store from '@/store';

export default {
  name: 'MainNav',
  data() {
    return {
    };
  },
  computed: {
    authenticated() {
      return store.state.authenticated;
    },
  },
};
</script>
