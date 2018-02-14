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
      <form v-else v-on:submit.prevent="handleSignIn">
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
import { sessionsCreate } from '../../utils/api';

export default {
  name: 'SignIn',
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
    handleSignIn() {
      sessionsCreate(
        this.email.trim() || null,
        this.password.trim() || null,
      )
        .then((response) => {
          this.success = true;
          this.errors = [];
          this.data = response.data;
          localStorage.setItem('token', response.data.token);
        })
        .catch((error) => {
          this.success = false;
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
