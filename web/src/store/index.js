import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false,
    user: {},
  },
  mutations: {
    signIn(state) {
      state.authenticated = true;
      state.user = {};
    },
    signOut(state) {
      state.authenticated = false;
      state.user = {};
    },
  },
});

export default store;
