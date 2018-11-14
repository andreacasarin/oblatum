'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: JSON.stringify(process.env.API_HOST || 'http://localhost'),
  API_PORT: JSON.stringify(process.env.API_PORT || '80')
})
