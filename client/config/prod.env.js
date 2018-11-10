'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_HOST: JSON.stringify(process.env.API_HOST || 'http://oblatum.showroom.andreacasarin.com'),
  API_PORT: JSON.stringify(process.env.API_PORT || '80')
}