<template>
  <div>
    <Header />
    <SignUp />
    <Footer />
  </div>
</template>

<script>
import Header from './common/Header';
import Footer from './common/Footer';
import SignUp from './user/SignUp';

export default {
  name: 'Login',
  components: {
    Header,
    Footer,
    SignUp,
  },
  data() {
    return {
    };
  },
};
</script>
