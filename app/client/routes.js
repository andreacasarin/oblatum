import Home from './components/home.vue';
import Navbar from './components/navbar.vue';
import RegistrationForm from './components/register-form.vue';
import Footer from './components/footer.vue';

Vue.component('obl-navbar', Navbar);
Vue.component('obl-register-form', RegistrationForm);
Vue.component('obl-footer', Footer);

/*Vue.component('obl-footer', httpVueLoader('./components/footer.vue'));
Vue.component('obl-register-form', httpVueLoader('./components/register-form.vue'));*/

//Routes
const routes = [
  { path: '/', component: Home },
];

//Creation of the route instance
const router = new VueRouter({
  routes: routes 
})


//Creation of the app instance
const app = new Vue({
  el: '#app',
  router: router
})
