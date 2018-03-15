export default {
  baseUrl() {
    // return 'http://localhost';
    return `${process.env.API_HOST}:${process.env.API_PORT}`;
  },
};
