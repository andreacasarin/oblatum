<template>
  <div>
    <ob-header />
    Welcome to Oblatum {{ name }}, {{ surname }}!
    <ob-footer />
  </div>
</template>

<script>
import Header from './common/Header';
import Footer from './common/Footer';

import { sessionsRead } from '../utils/api';

export default {
  name: 'Dashboard',
  components: {
    'ob-header': Header,
    'ob-footer': Footer,
  },
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  },
  mounted: () => {
    sessionsRead()
      .then((response) => {
        this.data = response.data;
      });
  },
  methods: {
  },
};
</script>
