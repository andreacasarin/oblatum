<template>
  <div class="container">
    <div class="mx-auto col-5 pb-3">
      <div v-if="errors.length > 0" class="error">
        Can't login:
        <ul>
          <li v-for="error in errors">{{ error.message }}</li>
        </ul>
      </div>
      <div v-if="success" class="success">
        Logged in.
      </div>
      <form v-else v-on:submit.prevent="onSubmit">
        <div class="form-group">
          <!-- <label class="light-text" for="email">Email address</label> -->
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <!-- <label class="light-text" for="password">Password</label> -->
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter your password" />
        </div>
        <button type="submit" class="btn btn-secondary mx-auto d-block mt-5">Sign me in!</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignIp',
  data() {
    return {
      email: '',
      password: '',
      success: false,
      errors: [],
      data: [],
    };
  },
  methods: {
    onSubmit() {
      axios
        .post(
          'http://localhost/api/users',
          {
            email: this.email.trim() || null,
            password: this.password.trim() || null,
          },
        )
        .then((response) => {
          this.success = true;
          this.errors = [];
          this.data = response.data;
        })
        .catch((error) => {
          this.success = false;
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
