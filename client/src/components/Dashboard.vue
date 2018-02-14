<template>
  <div>
    <ob-header />
    <div class="container">
      <div class="row">

        <div class="mx-auto col-3 pb-3">
          <ob-dnav />
        </div>

        <div v-if="show" class="mx-auto col-9 pb-3">
          Welcome to Oblatum {{ user.name }} {{ user.surname }}!
        </div>

        <div v-else-if="create" class="mx-auto col-9 pb-3">
          Create assets
        </div>

        <div v-else-if="list" class="mx-auto col-9 pb-3">
          List assets
        </div>

        <div v-else-if="transfer" class="mx-auto col-9 pb-3">
          Transfer assets
        </div>

      </div>
    </div>
    <hr />
    <ob-footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import DashboardNav from '@/components/nav/Dashboard';
import auth from '@/utils/auth';

export default {
  name: 'Dashboard',
  components: {
    'ob-header': Header,
    'ob-footer': Footer,
    'ob-dnav': DashboardNav,
  },
  props: ['show', 'create', 'list', 'transfer'],
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
