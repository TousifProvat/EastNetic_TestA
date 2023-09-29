/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }],
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};
