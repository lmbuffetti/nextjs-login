const nextJestNode = require('next/jest')

const createJestConfigNode = nextJestNode({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfigNode = {
  collectCoverage: true,
  coverageDirectory: 'coverage/coverageNode',
  collectCoverageFrom: [
    '**/src/app/api/**/*.{ts,tsx}',
    '**/src/api/**/*.{ts,tsx}',
  ],
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.node.{ts,tsx}'],
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfigNode(customJestConfigNode)
