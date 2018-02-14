import axios from 'axios';
import config from '@/utils/config';
import store from '@/store';

export default {
  signUp(name, surname, email, password, passwordConfirmation) {
    try {
      return axios
        .post(
          `${config.baseUrl()}/api/users`,
          { name, surname, email, password, passwordConfirmation },
        )
        .then(() => ({ status: 'success', data: ['User created.'] }))
        .catch(error => ({ status: 'failure', data: error.response.data.errors }));
    } catch (error) {
      return { status: 'failure', data: ['Can\'t create user.'] };
    }
  },
  signIn(email, password) {
    try {
      return axios
        .post(
          `${config.baseUrl()}/api/sessions`,
          { email, password },
        )
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          store.commit('signIn');
          return { status: 'success', data: ['User logged in.'] };
        })
        .catch(error => ({ status: 'failure', data: error.response.data.errors }));
    } catch (error) {
      return { status: 'failure', data: ['Can\'t login user.'] };
    }
  },
  signOut() {
    try {
      localStorage.removeItem('token');
      store.commit('signOut');
      return { status: 'success', data: ['User logged out.'] };
    } catch (error) {
      return { status: 'failure', data: ['Can\'t logout user.'] };
    }
  },
  check() {
    try {
      return axios
        .get(
          `${config.baseUrl()}/api/sessions`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        )
        .then((response) => {
          store.commit('signIn');
          return { status: 'success', data: response };
        })
        .catch((error) => {
          store.commit('signOut');
          return { status: 'failure', data: error.response.data.errors };
        });
    } catch (error) {
      return { status: 'failure', data: ['Can\'t authenticate user'] };
    }
  },
  getInfo() {
    const base64 = localStorage
      .getItem('token')
      .split('.')[1]
      .replace('-', '+')
      .replace('_', '/');
    return JSON.parse(window.atob(base64));
  },
};
