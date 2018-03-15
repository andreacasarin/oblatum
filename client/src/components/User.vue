<template>
  <div>
    <ob-header />
    <div class="container">
      <div class="mx-auto col-md-6 pb-3">

        <div v-if="response.length > 0">
          <div class="card mb-5">
            <div class="card-header">
              Messages:
            </div>
            <ul class="card-body">
              <li v-for="item in response" v-bind:key="item.id" class="list-unstyled">
                {{ item.message }}
              </li>
            </ul>
          </div>
        </div>

        <form v-if="signUp" v-on:submit.prevent="handleSignUp">
          <div class="form-group">
            <input
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Enter your name" />
          </div>
          <div class="form-group">
            <input
              v-model="surname"
              type="text"
              class="form-control"
              placeholder="Enter your surname" />
          </div>
          <div class="form-group">
            <input
              v-model="email"
              type="email"
              class="form-control"
              aria-describedby="emailHelp" placeholder="Enter your email" />
            <small id="emailHelp" class="form-text light-text">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter your password" />
          </div>
          <div class="form-group">
            <input
              v-model="passwordConfirmation"
              type="password"
              class="form-control"
              placeholder="Enter your password again" />
          </div>
          <button type="submit" class="btn btn-secondary mx-auto d-block mt-5">Sign me up!</button>
        </form>

        <form v-else-if="signIn" v-on:submit.prevent="handleSignIn">
          <div class="form-group">
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Enter your email" />
          </div>
          <div class="form-group">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter your password" />
          </div>
          <button type="submit" class="btn btn-secondary mx-auto d-block mt-5">Sign me in!</button>
        </form>

        <form v-else-if="signOut" v-on:submit.prevent="handleSignOut">
          <button type="submit" class="btn btn-secondary mx-auto d-block mt-5">Sign me out!</button>
        </form>

      </div>
    </div>
    <ob-footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

import auth from '@/utils/auth';
import router from '@/router';

export default {
  name: 'User',
  components: {
    'ob-header': Header,
    'ob-footer': Footer,
  },
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
  props: ['signIn', 'signOut', 'signUp', 'apiUrl'],
  methods: {
    handleSignIn() {
      auth.signIn(
        this.email.trim() || null,
        this.password.trim() || null,
      ).then((response) => {
        if (response.status === 'success') {
          this.response = response.data;
          router.push({
            name: 'Dashboard',
          });
        } else {
          this.response = response.data;
        }
      });
    },
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
    handleSignOut() {
      const response = auth.signOut();
      if (response.status === 'success') {
        router.push({
          name: 'Home',
        });
      } else {
        this.response = response.data;
      }
    },
  },
};
</script>
