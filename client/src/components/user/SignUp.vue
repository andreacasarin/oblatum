<template>
  <div class="container">
    <div class="mx-auto col-7 pb-3">
      <div v-if="response.length > 0">
        <div class="card mb-5">
          <div class="card-header">
            Messages:
          </div>
          <ul class="card-body">
            <li v-for="item in response" class="list-unstyled">{{ item.message }}</li>
          </ul>
        </div>
      </div>
      <form v-on:submit.prevent="handleSignUp">
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
import auth from '@/utils/auth';
import router from '@/router';

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      response: [],
    };
  },
  methods: {
    handleSignUp() {
      auth.signUp(
        this.name.trim() || null,
        this.surname.trim() || null,
        this.email.trim() || null,
        this.password.trim() || null,
        this.passwordConfirmation.trim() || null,
      ).then((response) => {
        if (response.status === 'success') {
          this.response = response.data;
          router.push({
            name: 'Login',
          });
        } else {
          this.response = response.data;
        }
      });
    },
  },
};
</script>
