<template>
  <div>
    <Header />
    <SignIn />
    <Footer />
  </div>
</template>

<script>
import Header from './common/Header';
import Footer from './common/Footer';
import SignIn from './user/SignIn';

export default {
  name: 'Login',
  components: {
    Header,
    Footer,
    SignIn,
  },
  data() {
    return {
    };
  },
};
</script>
