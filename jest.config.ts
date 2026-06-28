import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/' // Исключаем папку с Playwright тестами
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@ui$': '<rootDir>/src/components/ui/index.ts',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@utils-types$': '<rootDir>/src/utils/types.ts',
    '^@components$': '<rootDir>/src/components/index.ts',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages/index.ts'
  },
  collectCoverageFrom: [
    'src/services/slices/**/*.ts',
    '!src/services/slices/**/*.test.ts',
    '!src/services/slices/**/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};

export default config;