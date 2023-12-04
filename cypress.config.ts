const { defineConfig } = require('cypress')
const _ = require('lodash')
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin')

module.exports = defineConfig({
  requestTimeout: 480000,
  responseTimeout: 480000,
  pageLoadTimeout: 480000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  retries: 3,
  runMode: 3,
  video: false,

  env: {
    foo: 'bar',
    baz: 'quux',
    API_URL: 'http://localhost:3000',
  },

  e2e: {
    testIsolation: false,
    // supportFile: './cypress/support/index.js',
    setupNodeEvents(on, config) {
      require('./cypress/plugins/index.js')(on, config)
      require('@cypress/code-coverage/task')(on, config)
      getCompareSnapshotsPlugin(on, config)
      return config
    },
  },
})
