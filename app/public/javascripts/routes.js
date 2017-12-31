//Template example
const Example = { template: '<div>foo</div>' }

//Components registration
Vue.component('obl-navbar', httpVueLoader('./components/navbar.vue'));
Vue.component('obl-footer', httpVueLoader('./components/footer.vue'));
Vue.component('obl-register-form', httpVueLoader('./components/register-form.vue'));

//Routes
const routes = [
  { path: '/', component: httpVueLoader('./components/home.vue') },
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
