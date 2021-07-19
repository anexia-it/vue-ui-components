// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/components/**/*.spec.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  verbose: true,
  transform: {
    ".*\\.(vue)$": "vue-jest",
    ".*\\.(js)$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["**/components/**/*.vue", "!**/node_modules/**"],
  coverageDirectory: "<rootDir>/tests/unit/cov-report",
  reporters: ["default", "jest-junit"],
  automock: false,
  setupFiles: ["./tests/setup-jest.js"]
};

module.exports = config;
