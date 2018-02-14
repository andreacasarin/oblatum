<template>
  <div class="container">
    <div class="mx-auto col-7 pb-3">
      <div class="success">
        Logged out.
      </div>
    </div>
  </div>
</template>

<script>
import { sessionsDestroy } from '../../utils/api';

export default {
  name: 'SignOut',
  data() {
    return {
      success: false,
    };
  },
  mounted: () => {
    this.success = sessionsDestroy();
  },
};
</script>
