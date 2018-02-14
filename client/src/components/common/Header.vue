<template>
  <div class="dark-background mb-5">
    <ob-nav />
    <div class="container-fluid">
      <div class="row">
        <div class="col text-center light-text pt-5 pb-5">
          <h1 class="font-weight-bold pb-2">Let’s build the future together</h1>
          <h2 class="h6-alike">Oblatum enables people to trace, store and insure their most valuable assets.</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/common/Nav';

export default {
  name: 'Header',
  components: {
    'ob-nav': Nav,
  },
  data() {
    return {
    };
  },
};
</script>
