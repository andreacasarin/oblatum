<template>
  <nav>
    <ul class="list-unstyled">
      <li class="list-unstyled mb-3">
        <router-link :to="{ name: 'Dashboard' }" class="font-weight-bold">
          Dashboard
        </router-link>
      </li>
      <li class="list-unstyled mb-3">
        <router-link :to="{ name: 'createAssets' }" class="font-weight-bold">
          Create asset
        </router-link>
      </li>
      <li class="list-unstyled mb-3">
        <router-link :to="{ name: 'listAssets' }" class="font-weight-bold">
          List asset
        </router-link>
      </li>
      <li class="list-unstyled mb-3">
        <router-link :to="{ name: 'transferAssets' }" class="font-weight-bold">
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
