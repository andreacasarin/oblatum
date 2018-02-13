<template>
  <div class="container">
    <div class="mx-auto col-7 pb-3">
      <div v-if="errors.length > 0" class="error">
        Can't register:
        <ul>
          <li v-for="error in errors">{{ error.message }}</li>
        </ul>
      </div>
      <div v-if="success" class="success">
        Registered, please login.
      </div>
      <form v-else v-on:submit.prevent="onSubmit">
        <div class="form-group">
          <!-- <label class="light-text" for="name">Name</label> -->
          <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter your name" />
        </div>
        <div class="form-group">
          <!-- <label class="light-text" for="surname">Surname</label> -->
          <input type="text" class="form-control" id="surname" v-model="surname" placeholder="Enter your surname" />
        </div>
        <div class="form-group">
          <!-- <label class="light-text" for="email">Email address</label> -->
          <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp" placeholder="Enter your email" />
          <small id="emailHelp" class="form-text light-text">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <!-- <label class="light-text" for="password">Password</label> -->
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter your password" />
        </div>
        <div class="form-group">
          <!-- <label class="light-text" for="passwordConfirmation">Password confirmation</label> -->
          <input type="password" class="form-control" id="passwordConfirmation" v-model="passwordConfirmation" placeholder="Enter your password again" />
        </div>
        <button type="submit" class="btn btn-secondary mx-auto d-block mt-5">Sign me up!</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
            name: this.name.trim() || null,
            surname: this.surname.trim() || null,
            email: this.email.trim() || null,
            password: this.password.trim() || null,
            passwordConfirmation: this.passwordConfirmation.trim() || null,
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
