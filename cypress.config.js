const { defineConfig } = require('cypress')
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')
const codeCoverage = require('@cypress/code-coverage/task')

module.exports = defineConfig({
  requestTimeout: 480000,
  responseTimeout: 480000,
  pageLoadTimeout: 480000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  retries: 3,
  video: false,

  env: {
    foo: 'bar',
    baz: 'quux',
    API_URL: 'https://nextjs-login-bay.vercel.app',
  },

  e2e: {
    baseUrl: 'https://nextjs-login-bay.vercel.app',
    testIsolation: false,
    setupNodeEvents(on, config) {
      require('./cypress/plugins/index.js')(on, config)
      codeCoverage(on, config)
      addMatchImageSnapshotPlugin(on, config)
      return config
    },
    supportFile: 'cypress/support/e2e.ts',
  },
})
