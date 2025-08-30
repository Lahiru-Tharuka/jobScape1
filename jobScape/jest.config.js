export default {
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest']
  },
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'backend/**/*.js',
    'frontend/src/**/*.jsx',
    'frontend/src/**/*.js',
    '!backend/node_modules/**',
    '!frontend/node_modules/**'
  ]
};
