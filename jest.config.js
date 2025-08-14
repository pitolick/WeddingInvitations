/* eslint-disable */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Next.jsアプリのパスを指定して、next.config.jsと.envファイルを読み込む
  dir: './',
});

// Jestに渡すカスタム設定
const customJestConfig = {
  // テスト環境の設定
  testEnvironment: 'jsdom',

  // テストファイルのパターン
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)',
    '!**/__tests__/disabled/**/*.(ts|tsx|js)',
    '!**/api/**/*.(ts|tsx|js)', // API Routeテストを一時的に除外
  ],

  // モジュール名マッピング
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vibelogger$': '<rootDir>/src/app/lib/logger/__mocks__/vibelogger.ts',
  },

  // セットアップファイル
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // カバレッジ設定
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/app/layout.tsx',
    '!src/app/page.tsx',
    '!src/app/lib/constants/index.ts',
    '!src/app/lib/types/index.ts',
  ],

  // カバレッジレポート設定
  coverageReporters: ['text', 'lcov', 'html'],

  // テストタイムアウト
  testTimeout: 10000,

  // モジュール設定
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // 変換設定
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },

  // グローバル設定
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

// createJestConfigは非同期関数なので、async/awaitを使用
module.exports = createJestConfig(customJestConfig);
