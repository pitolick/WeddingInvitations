/**
 * @description VibeCoding Logger設定のテスト
 */

import { logger, devLogger, logUtils } from '../index';

// vibeloggerのモック
jest.mock('vibelogger', () => ({
  createFileLogger: jest.fn(() => ({
    info: jest.fn(),
    logException: jest.fn(),
  })),
}));

describe('Logger Module', () => {
  let originalNodeEnv: string | undefined;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe('logger', () => {
    it('createFileLoggerが正しく呼び出されてloggerが作成される', () => {
      expect(logger).toBeDefined();
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.logException).toBe('function');
    });
  });

  describe('devLogger', () => {
    describe('development環境', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'development';
      });

      it('info: 開発環境でconsole.logが呼び出される', () => {
        devLogger.info('test_operation', 'test message');

        expect(consoleLogSpy).toHaveBeenCalledWith(
          '[INFO] test_operation: test message',
          ''
        );
      });

      it('info: コンテキスト付きでconsole.logが呼び出される', () => {
        const context = { userId: '123', action: 'click' };
        devLogger.info('test_operation', 'test message', context);

        expect(consoleLogSpy).toHaveBeenCalledWith(
          '[INFO] test_operation: test message',
          context
        );
      });

      it('error: 開発環境でconsole.errorが呼び出される', () => {
        devLogger.error('test_operation', 'error message');

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[ERROR] test_operation: error message',
          ''
        );
      });

      it('error: コンテキスト付きでconsole.errorが呼び出される', () => {
        const context = { errorCode: '500', stack: 'error stack' };
        devLogger.error('test_operation', 'error message', context);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[ERROR] test_operation: error message',
          context
        );
      });

      it('warning: 開発環境でconsole.warnが呼び出される', () => {
        devLogger.warning('test_operation', 'warning message');

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          '[WARNING] test_operation: warning message',
          ''
        );
      });

      it('warning: コンテキスト付きでconsole.warnが呼び出される', () => {
        const context = { reason: 'deprecated', version: '1.0.0' };
        devLogger.warning('test_operation', 'warning message', context);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          '[WARNING] test_operation: warning message',
          context
        );
      });
    });

    describe('非development環境', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'production';
      });

      it('info: 非開発環境でconsole.logが呼び出されない', () => {
        devLogger.info('test_operation', 'test message');
        expect(consoleLogSpy).not.toHaveBeenCalled();
      });

      it('error: 非開発環境でconsole.errorが呼び出されない', () => {
        devLogger.error('test_operation', 'error message');
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      it('warning: 非開発環境でconsole.warnが呼び出されない', () => {
        devLogger.warning('test_operation', 'warning message');
        expect(consoleWarnSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('logUtils', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('logUserAction', () => {
      it('ユーザーアクションを正しい形式でログに記録する', async () => {
        const action = 'button_click';
        const details = { buttonId: 'submit', page: 'home' };
        const userId = 'user123';

        await logUtils.logUserAction(action, details, userId);

        expect(logger.info).toHaveBeenCalledWith(
          'user_action',
          action,
          expect.objectContaining({
            context: expect.objectContaining({
              ...details,
              userId,
              timestamp: expect.any(String),
            }),
            humanNote: `User performed action: ${action}`,
            aiTodo: 'Analyze user behavior and interaction patterns',
          })
        );
      });

      it('userIdなしでユーザーアクションをログに記録する', async () => {
        const action = 'page_view';
        const details = { page: 'about', referrer: 'google' };

        await logUtils.logUserAction(action, details);

        expect(logger.info).toHaveBeenCalledWith(
          'user_action',
          action,
          expect.objectContaining({
            context: expect.objectContaining({
              ...details,
              userId: undefined,
              timestamp: expect.any(String),
            }),
          })
        );
      });
    });

    describe('logError', () => {
      it('Errorオブジェクトを正しい形式でログに記録する', async () => {
        const operation = 'api_call';
        const error = new Error('Network error');
        const context = { endpoint: '/api/users', method: 'GET' };

        await logUtils.logError(operation, error, context);

        expect(logger.logException).toHaveBeenCalledWith(
          operation,
          error,
          expect.objectContaining({
            context: expect.objectContaining({
              ...context,
              timestamp: expect.any(String),
            }),
            humanNote: `Error occurred in operation: ${operation}`,
            aiTodo: 'Analyze error patterns and suggest improvements',
          })
        );
      });

      it('文字列エラーを正しい形式でログに記録する', async () => {
        const operation = 'validation';
        const error = 'Invalid input format';

        await logUtils.logError(operation, error);

        expect(logger.logException).toHaveBeenCalledWith(
          operation,
          error,
          expect.objectContaining({
            context: expect.objectContaining({
              timestamp: expect.any(String),
            }),
            humanNote: `Error occurred in operation: ${operation}`,
            aiTodo: 'Analyze error patterns and suggest improvements',
          })
        );
      });
    });

    describe('logApiCall', () => {
      it('API呼び出しを正しい形式でログに記録する', async () => {
        const endpoint = '/api/users';
        const method = 'POST';
        const status = 201;
        const duration = 150;

        await logUtils.logApiCall(endpoint, method, status, duration);

        expect(logger.info).toHaveBeenCalledWith(
          'api_call',
          `${method} ${endpoint}`,
          expect.objectContaining({
            context: expect.objectContaining({
              endpoint,
              method,
              status,
              duration,
              timestamp: expect.any(String),
            }),
            humanNote: `API call completed: ${method} ${endpoint}`,
            aiTodo:
              'Monitor API performance and identify optimization opportunities',
          })
        );
      });

      it('異なるHTTPメソッドとステータスでAPI呼び出しをログに記録する', async () => {
        const endpoint = '/api/posts/123';
        const method = 'DELETE';
        const status = 404;
        const duration = 75;

        await logUtils.logApiCall(endpoint, method, status, duration);

        expect(logger.info).toHaveBeenCalledWith(
          'api_call',
          `${method} ${endpoint}`,
          expect.objectContaining({
            context: expect.objectContaining({
              endpoint,
              method,
              status,
              duration,
            }),
          })
        );
      });
    });
  });

  describe('統合テスト', () => {
    it('すべてのエクスポートが正しく定義されている', () => {
      expect(logger).toBeDefined();
      expect(devLogger).toBeDefined();
      expect(logUtils).toBeDefined();

      expect(typeof devLogger.info).toBe('function');
      expect(typeof devLogger.error).toBe('function');
      expect(typeof devLogger.warning).toBe('function');

      expect(typeof logUtils.logUserAction).toBe('function');
      expect(typeof logUtils.logError).toBe('function');
      expect(typeof logUtils.logApiCall).toBe('function');
    });

    it('タイムスタンプが有効なISO文字列形式である', async () => {
      await logUtils.logUserAction('test', {});

      const call = (logger.info as jest.Mock).mock.calls[0];
      const timestamp = call[2].context.timestamp;

      expect(typeof timestamp).toBe('string');
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });
  });
});
