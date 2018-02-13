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
import SignUp from './user/SignUp';

export default {
  name: 'Login',
  components: {
    'ob-header': Header,
    'ob-footer': Footer,
    'ob-signup': SignUp,
  },
  data() {
    return {
    };
  },
};
</script>
