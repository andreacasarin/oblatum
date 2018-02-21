<template>
  <div>
    <ob-header />
    <div class="container">
      <div class="row">

        <div class="mx-auto col-lg-2 col-md-3 pb-3">
          <ob-dnav />
        </div>

        <div class="mx-auto col-md-9 pb-3">

          <div v-if="response.length > 0">
            <div class="card mb-5">
              <div class="card-header">
                Messages:
              </div>
              <ul class="card-body">
                <li v-for="item in response" v-bind:key="item.id" class="list-unstyled">
                  {{ item.message }}
                </li>
              </ul>
            </div>
          </div>

          <div v-if="show">
            Welcome to Oblatum {{ user.name }} {{ user.surname }}!
          </div>

          <div v-else-if="create">
            <h2 class="pb-5">Create asset</h2>
            <form v-on:submit.prevent="handleCreate">
              <div class="form-group">
                <input
                  v-model="manufacturer"
                  type="text"
                  class="form-control"
                  placeholder="Enter your asset manufacturer" />
              </div>
              <div class="form-group">
                <input
                  v-model="model"
                  type="text"
                  class="form-control"
                  placeholder="Enter your asset model" />
              </div>
              <div class="form-group">
                <input
                  v-model="serial"
                  type="text"
                  class="form-control"
                  placeholder="Enter your asset serial" />
              </div>
              <button
                type="submit"
                class="btn btn-secondary mx-auto d-block mt-5">
                Create asset
              </button>
            </form>
          </div>

          <div v-else-if="list">
            <h2 class="pb-5">List assets</h2>
            <div v-if="assets.length > 0">
              <ul class="list-unstyled">
                <li class="list-unstyled pb-3 d-md-block d-none">
                  <div class="row">
                    <div class="col-md-4 font-weight-bold">Manufacturer</div>
                    <div class="col-md-4 font-weight-bold">Model</div>
                    <div class="col-md-4 font-weight-bold">Serial</div>
                  </div>
                </li>
                <li v-for="item in assets" v-bind:key="item.id" class="list-unstyled pb-3">
                  <div class="row">
                    <div class="col-md-4">{{ item.manufacturer }}</div>
                    <div class="col-md-4">{{ item.model }}</div>
                    <div class="col-md-4">{{ item.serial }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div v-else-if="transfer">
            <h2 class="pb-5">List asset</h2>
          </div>

          <div v-else-if="remove">
            <h2 class="pb-5">List asset</h2>
          </div>
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
import api from '@/utils/api';

export default {
  name: 'Dashboard',
  components: {
    'ob-header': Header,
    'ob-footer': Footer,
    'ob-dnav': DashboardNav,
  },
  props: ['show', 'create', 'list', 'transfer', 'remove'],
  data() {
    return {
      manufacturer: '',
      model: '',
      serial: '',
      response: '',
      assets: [],
    };
  },
  computed: {
    user() {
      return auth.getInfo().data.user;
    },
  },
  created() {
    this.handleRead();
  },
  watch: {
    $route: 'handleRead',
  },
  methods: {
    handleCreate() {
      api.assetCreate(
        this.manufacturer.trim() || null,
        this.model.trim() || null,
        this.serial.trim() || null,
      ).then((response) => {
        if (response.status === 'success') {
          this.response = response.data;
        } else {
          this.response = response.data;
        }
      });
    },
    handleRead() {
      return api.assetRead().then((response) => {
        if (response.status === 'success') {
          this.response = response.data;
          this.assets = this.response.assets;
        } else {
          this.response = response.data;
          this.assets = [];
        }
      });
    },
  },
};
</script>
