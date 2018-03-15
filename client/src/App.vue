<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  props: ['apiUrl'],
  data() {
    return {
      user: [],
    };
  },
};
</script>
