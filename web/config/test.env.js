'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_HOST: JSON.stringify(process.env.API_HOST || 'http://localhost'),
  API_PORT: JSON.stringify(process.env.API_PORT || '80')
})
