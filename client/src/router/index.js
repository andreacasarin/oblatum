import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import User from '@/components/User';
import Dashboard from '@/components/Dashboard';

import middleware from '@/utils/middleware';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: User,
      props: { signIn: true, signUp: false, signOut: false },
    },
    {
      path: '/logout',
      name: 'Logout',
      component: User,
      props: { signIn: false, signUp: false, signOut: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: User,
      props: { signIn: false, signUp: true, signOut: false },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      beforeEnter: middleware.auth,
      component: Dashboard,
      props: { show: true, create: false, list: false, transfer: false },
    },
    {
      path: '/create-assets',
      name: 'createAssets',
      beforeEnter: middleware.auth,
      component: Dashboard,
      props: { show: false, create: true, list: false, transfer: false },
    },
    {
      path: '/list-assets',
      name: 'listAssets',
      beforeEnter: middleware.auth,
      component: Dashboard,
      props: { show: false, create: false, list: true, transfer: false },
    },
    {
      path: '/transfer-assets',
      name: 'transferAssets',
      beforeEnter: middleware.auth,
      component: Dashboard,
      props: { show: false, create: false, list: false, transfer: true },
    },
  ],
});
