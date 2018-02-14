<template>
  <div class="container">
    <div class="mx-auto col-5 pb-3">
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
      <form v-on:submit.prevent="handleSignIn">
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
import auth from '@/utils/auth';
import router from '@/router';

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      response: [],
    };
  },
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
          console.log(response);
          this.response = response.data;
        }
      });
    },
  },
};
</script>
