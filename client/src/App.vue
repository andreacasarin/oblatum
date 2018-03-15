<template>
  <div id="app">
    <router-view apiUrl="{apiUrl}" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: [],
    };
  },
};
</script>
