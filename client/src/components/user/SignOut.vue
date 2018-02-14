<template>
  <div class="container">
    <div class="mx-auto col-7 pb-3">
      <div class="success">
        Logging out...
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/utils/auth';
import router from '@/router';

export default {
  name: 'SignOut',
  data() {
    return {
    };
  },
  mounted: () => {
    if (auth.signOut()) {
      router.push({
        name: 'Home',
      });
    }
  },
};
</script>
