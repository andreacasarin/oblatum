const vm = new Vue({
  el: '#app',
  data: {
    users: []
  },
  methods: {
    getUsers() {
      let url = 'http://localhost:3000/users';
      axios.get(url).then((response) => {
        this.users = response.data;
      }).catch( error => { console.log(error); });
    }
  }
});