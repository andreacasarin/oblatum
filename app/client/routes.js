import Home from './components/home.vue';
import Navbar from './components/navbar.vue';
import RegistrationForm from './components/register-form.vue';
import Footer from './components/footer.vue';
import LoginForm from './components/login-form.vue';
import RecoverPasswordForm from './components/recover-password-form.vue';

Vue.component('obl-navbar', Navbar);
Vue.component('obl-register-form', RegistrationForm);
Vue.component('obl-footer', Footer);
Vue.component('obl-login-form', LoginForm);
Vue.component('obl-recover-password-form', RecoverPasswordForm);

// Paths
var globalPath = "";
Vue.prototype.$path = {
	global: globalPath,
	home: globalPath + '/',
	login: globalPath + '/login',
	recover: globalPath + '/recover'
}

var apiPath = globalPath + '/api';
Vue.prototype.$api = {
  api: apiPath,
  createUser: apiPath + '/users'
}

//Routes
const routes = [
  { path: Vue.prototype.$path.home, component: Home }, 
  { path: Vue.prototype.$path.login, component: Home },
  { path: Vue.prototype.$path.recover, component: Home }
];



//Creation of the route instance
const router = new VueRouter({
  routes: routes 
})


//Creation of the app instance
const app = new Vue({
  el: '#app',
  data: {
    foo: 'foo'
  },
  router: router
})