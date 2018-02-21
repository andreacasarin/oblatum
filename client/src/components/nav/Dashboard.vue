<template>
  <nav>
    <ul class="nav">
      <li class="nav-item">
        <router-link :to="{ name: 'createAssets' }" class="nav-link font-weight-bold">
          Create asset
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'listAssets' }" class="nav-link font-weight-bold">
          List asset
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'transferAssets' }" class="nav-link font-weight-bold">
          Transfer asset
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'DashboardNav',
  data() {
    return {
    };
  },
};
</script>
