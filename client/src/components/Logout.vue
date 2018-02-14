<template>
  <div>
    <ob-header />
    <ob-signup />
    <ob-footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SignOut from '@/components/user/SignOut';

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
