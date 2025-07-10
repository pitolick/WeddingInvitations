/**
 * @description テスト環境の動作確認用サンプルテスト
 * @example
 * ```bash
 * npm test
 * ```
 */

import { devLogger, logUtils } from '../../logger';

describe('Example Test', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const message = 'Hello, World!';
    expect(message).toContain('Hello');
    expect(message.length).toBeGreaterThan(0);
  });

  it('should handle array operations', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
    expect(numbers.reduce((a, b) => a + b, 0)).toBe(15);
  });

  describe('VibeCoding Logger Tests', () => {
    it('should log user action', async () => {
      const action = 'test_action';
      const details = { test: true, value: 42 };

      // ログユーティリティのテスト
      await expect(
        logUtils.logUserAction(action, details, 'test-user')
      ).resolves.not.toThrow();
    });

    it('should log error', async () => {
      const operation = 'test_operation';
      const error = new Error('Test error');
      const context = { test: true };

      // エラーログのテスト
      await expect(
        logUtils.logError(operation, error, context)
      ).resolves.not.toThrow();
    });

    it('should log API call', async () => {
      const endpoint = '/api/test';
      const method = 'GET';
      const status = 200;
      const duration = 150;

      // API呼び出しログのテスト
      await expect(
        logUtils.logApiCall(endpoint, method, status, duration)
      ).resolves.not.toThrow();
    });

    it('should use dev logger in development', () => {
      // devLoggerのテスト
      expect(() => {
        devLogger.info('test', 'Test message', { test: true });
        devLogger.error('test', 'Test error', { test: true });
        devLogger.warning('test', 'Test warning', { test: true });
      }).not.toThrow();
    });
  });
});
