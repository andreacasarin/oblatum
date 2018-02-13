<template>
  <div>
    <ob-header />
    <ob-signin />
    <ob-footer />
  </div>
</template>

<script>
import Header from './common/Header';
import Footer from './common/Footer';
import SignIn from './user/SignIn';

export default {
  name: 'Login',
  components: {
    'ob-header': Header,
    'ob-footer': Footer,
    'ob-signin': SignIn,
  },
  data() {
    return {
    };
  },
};
</script>
