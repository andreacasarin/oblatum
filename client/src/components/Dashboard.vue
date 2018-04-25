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
                    <div class="col-md-3 font-weight-bold">Manufacturer</div>
                    <div class="col-md-3 font-weight-bold">Model</div>
                    <div class="col-md-3 font-weight-bold">Serial</div>
                    <div class="col-md-3 font-weight-bold">Confirmed</div>
                  </div>
                </li>
                <li v-for="item in assets" v-bind:key="item.id" class="list-unstyled pb-3">
                  <div class="row">
                    <div class="col-md-3">{{ item.manufacturer }}</div>
                    <div class="col-md-3">{{ item.model }}</div>
                    <div class="col-md-3">{{ item.serial }}</div>
                    <div v-if="item.confirmed" class="col-md-3"><i class="fa fa-check"></i></div>
                    <div v-else class="col-md-3"><i class="fa fa-spinner fa-spin"></i></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div v-else-if="transfer">
            <h2 class="pb-5">Transfer asset</h2>
            <form v-on:submit.prevent="handleTransfer" autocomplete="off">
              <div class="form-group">
                <label for="asset-select">Select your asset:</label>
                <select v-model="id" class="form-control" id="asset-select">
                  <option v-for="item in assets" v-bind:key="item.id" v-bind:value="item.id">
                    {{ item.manufacturer }} - {{ item.model }} - {{ item.serial }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <input
                  v-model="email"
                  autocomplete="off"
                  type="email"
                  class="form-control"
                  placeholder="Enter new owner's email" />
                <small id="emailHelp" class="form-text light-text">
                  We'll never share this email with anyone else.
                </small>
              </div>

              <p>If the new owner is not in Oblatum yet, you will need to fill those fields:</p>

              <div class="form-group">
                <input
                  v-model="name"
                  autocomplete="off"
                  type="text"
                  class="form-control"
                  placeholder="Enter new owner's name" />
              </div>
              <div class="form-group">
                <input
                  v-model="surname"
                  autocomplete="off"
                  type="text"
                  class="form-control"
                  placeholder="Enter new owner's surname" />
              </div>
              <div class="form-group">
                <input
                  v-model="password"
                  autocomplete="off"
                  type="password"
                  class="form-control"
                  placeholder="Enter new owner's password" />
              </div>
              <div class="form-group">
                <input
                  v-model="passwordConfirmation"
                  autocomplete="off"
                  type="password"
                  class="form-control"
                  placeholder="Enter new owner's password again" />
              </div>

              <button
                type="submit"
                class="btn btn-secondary mx-auto d-block mt-5">
                Transfer asset
              </button>
            </form>
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
      id: '',
      manufacturer: '',
      model: '',
      serial: '',
      name: '',
      surname: '',
      password: '',
      passwordConfirmation: '',
      email: '',
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
    handleTransfer() {
      return api.assetUpdate(
        this.id.trim() || null,
        this.name.trim() || null,
        this.surname.trim() || null,
        this.email.trim() || null,
        this.password.trim() || null,
        this.passwordConfirmation.trim() || null,
      ).then((response) => {
        if (response.status === 'success') {
          this.response = response.data;
        } else {
          this.response = response.data;
        }
      });
    },
  },
};
</script>
