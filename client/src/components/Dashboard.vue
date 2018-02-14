<template>
  <div>
    <ob-header />
    <div class="container">
      <div class="mx-auto col-5 pb-3">
        Welcome to Oblatum {{ user.name }} {{ user.surname }}!
      </div>
    </div>
    <ob-footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import auth from '@/utils/auth';

export default {
  name: 'Dashboard',
  components: {
    'ob-header': Header,
    'ob-footer': Footer,
  },
  data() {
    return {
    };
  },
  computed: {
    user() {
      return auth.getInfo().data.user;
    },
  },
};
</script>
