module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Setup files
  setupFilesAfterEnv: ['./jest-setup.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-reanimated)'
  ],

  testEnvironment: 'node',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Cache configuration
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',

  // Coverage
  collectCoverage: true,
   collectCoverageFrom: [
     'src/**/*.{js,jsx,ts,tsx}',
     '!src/**/*.d.ts',
     '!src/**/index.{js,jsx,ts,tsx}', // ignore index files
     '!src/**/*.stories.{js,jsx,ts,tsx}', // ignore storybook files
     '!src/**/types.ts', // ignore type files
     '!src/constants/**', // ignore constants
     '!src/assets/**', // ignore assets
     '!src/navigation/**', // ignore navigation
   ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/'
  ]
};