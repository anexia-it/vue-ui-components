// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
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
  collectCoverageFrom: ["**/components/*.{js,vue}", "!**/node_modules/**"],
  coverageDirectory: "<rootDir>/tests/unit/cov-report",
  reporters: ["default", "jest-junit"]
};

module.exports = config;
