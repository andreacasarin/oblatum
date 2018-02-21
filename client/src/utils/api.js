import axios from 'axios';
import config from '@/utils/config';

export default {
  assetCreate(manufacturer, model, serial) {
    try {
      return axios
        .post(
          `${config.baseUrl()}/api/assets`,
          { manufacturer, model, serial },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        )
        .then(() => ({ status: 'success', data: [{ message: 'Asset created.' }] }))
        .catch(error => ({ status: 'failure', data: error.response.data.errors }));
    } catch (error) {
      return { status: 'failure', data: ['Can\'t create asset.'] };
    }
  },
  assetRead() {
    try {
      return axios
        .get(
          `${config.baseUrl()}/api/assets`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        )
        .then(response => ({ status: 'success', data: response.data }))
        .catch(error => ({ status: 'failure', data: error.response.data.errors }));
    } catch (error) {
      return { status: 'failure', data: ['Can\'t read assets.'] };
    }
  },
};
