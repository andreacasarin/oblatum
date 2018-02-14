<template>
  <div>
    <ob-header />
    <ob-signup />
    <ob-footer />
  </div>
</template>

<script>
import Header from './common/Header';
import Footer from './common/Footer';
import SignOut from './user/SignOut';

export default {
  name: 'Login',
  components: {
    'ob-header': Header,
    'ob-footer': Footer,
    'ob-signup': SignOut,
  },
  data() {
    return {
    };
  },
};
</script>
