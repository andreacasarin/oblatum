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
import SignUp from '@/components/user/SignUp';

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
