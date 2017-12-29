const vue = new Vue({
  el: '#app',
  data: {
    users: [],
    errors: [],
  },
  methods: {
    getUsers() {
      const url = 'http://localhost:3000/users';
      axios.get(url).then((response) => {
        this.users = response.data;
      }).catch((error) => {
        this.errors = error.data;
      });
    },
  },
});
