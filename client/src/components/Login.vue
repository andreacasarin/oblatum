<template>
  <div>
    <ob-header />
    <ob-signin />
    <ob-footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SignIn from '@/components/user/SignIn';

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
