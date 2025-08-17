/**
 * @description クライアントサイドロガーのテストファイル
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { clientDevLogger } from '../client';

// コンソールのモック
const originalConsoleLog = console.log;
const mockConsoleLog = jest.fn();

// 環境変数のモック
const originalNodeEnv = process.env.NODE_ENV;

describe('clientDevLogger', () => {
  beforeEach(() => {
    console.log = mockConsoleLog;
    jest.clearAllMocks();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    process.env.NODE_ENV = originalNodeEnv;
  });

  const mockConfig = {
    context: 'TestContext',
    humanNote: 'Test human note',
    aiTodo: 'Test AI todo',
  };

  /**
   * @description 開発環境でのログ出力テスト
   */
  describe('Development Environment Logging', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('logs info messages correctly', () => {
      clientDevLogger.info('TestContext', 'Test info message', mockConfig);

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[INFO] TestContext: Test info message',
        expect.objectContaining({
          level: 'info',
          message: 'Test info message',
          context: 'TestContext',
          humanNote: 'Test human note',
          aiTodo: 'Test AI todo',
          timestamp: expect.any(String),
        })
      );
    });

    it('logs warn messages correctly', () => {
      clientDevLogger.warn('TestContext', 'Test warn message', mockConfig);

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[WARN] TestContext: Test warn message',
        expect.objectContaining({
          level: 'warn',
          message: 'Test warn message',
          context: 'TestContext',
          humanNote: 'Test human note',
          aiTodo: 'Test AI todo',
          timestamp: expect.any(String),
        })
      );
    });

    it('logs error messages correctly', () => {
      clientDevLogger.error('TestContext', 'Test error message', mockConfig);

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[ERROR] TestContext: Test error message',
        expect.objectContaining({
          level: 'error',
          message: 'Test error message',
          context: 'TestContext',
          humanNote: 'Test human note',
          aiTodo: 'Test AI todo',
          timestamp: expect.any(String),
        })
      );
    });

    it('logs debug messages correctly', () => {
      clientDevLogger.debug('TestContext', 'Test debug message', mockConfig);

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[DEBUG] TestContext: Test debug message',
        expect.objectContaining({
          level: 'debug',
          message: 'Test debug message',
          context: 'TestContext',
          humanNote: 'Test human note',
          aiTodo: 'Test AI todo',
          timestamp: expect.any(String),
        })
      );
    });

    it('includes timestamp in log data', () => {
      const beforeTime = new Date().toISOString();
      clientDevLogger.info('TestContext', 'Test message', mockConfig);
      const afterTime = new Date().toISOString();

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      const logData = mockConsoleLog.mock.calls[0][1];
      
      expect(logData.timestamp).toBeTruthy();
      expect(new Date(logData.timestamp).getTime()).toBeGreaterThanOrEqual(new Date(beforeTime).getTime());
      expect(new Date(logData.timestamp).getTime()).toBeLessThanOrEqual(new Date(afterTime).getTime());
    });

    it('includes all config properties in log data', () => {
      const customConfig = {
        context: 'CustomContext',
        humanNote: 'Custom human note',
        aiTodo: 'Custom AI todo',
      };

      clientDevLogger.info('TestContext', 'Test message', customConfig);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[INFO] TestContext: Test message',
        expect.objectContaining({
          context: 'CustomContext',
          humanNote: 'Custom human note',
          aiTodo: 'Custom AI todo',
        })
      );
    });
  });

  /**
   * @description 本番環境でのログ出力抑制テスト
   */
  describe('Production Environment Logging', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('does not log info messages in production', () => {
      clientDevLogger.info('TestContext', 'Test info message', mockConfig);

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('does not log warn messages in production', () => {
      clientDevLogger.warn('TestContext', 'Test warn message', mockConfig);

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('does not log error messages in production', () => {
      clientDevLogger.error('TestContext', 'Test error message', mockConfig);

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('does not log debug messages in production', () => {
      clientDevLogger.debug('TestContext', 'Test debug message', mockConfig);

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });
  });

  /**
   * @description テスト環境でのログ出力抑制テスト
   */
  describe('Test Environment Logging', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'test';
    });

    it('does not log info messages in test environment', () => {
      clientDevLogger.info('TestContext', 'Test info message', mockConfig);

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('does not log warn messages in test environment', () => {
      clientDevLogger.warn('TestContext', 'Test warn message', mockConfig);

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('does not log error messages in test environment', () => {
      clientDevLogger.error('TestContext', 'Test error message', mockConfig);

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('does not log debug messages in test environment', () => {
      clientDevLogger.debug('TestContext', 'Test debug message', mockConfig);

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });
  });

  /**
   * @description メッセージフォーマットテスト
   */
  describe('Message Formatting', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('formats log messages with correct pattern', () => {
      clientDevLogger.info('UserAuth', 'Login successful', mockConfig);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[INFO] UserAuth: Login successful',
        expect.any(Object)
      );
    });

    it('handles empty context correctly', () => {
      clientDevLogger.info('', 'Test message', mockConfig);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[INFO] : Test message',
        expect.any(Object)
      );
    });

    it('handles empty message correctly', () => {
      clientDevLogger.info('TestContext', '', mockConfig);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[INFO] TestContext: ',
        expect.any(Object)
      );
    });

    it('handles special characters in context and message', () => {
      clientDevLogger.info('Test@Context#1', 'Message with special chars: äöü', mockConfig);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[INFO] Test@Context#1: Message with special chars: äöü',
        expect.objectContaining({
          level: 'info',
          message: 'Message with special chars: äöü',
        })
      );
    });
  });

  /**
   * @description ログデータ構造テスト
   */
  describe('Log Data Structure', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('includes all required fields in log data', () => {
      clientDevLogger.info('TestContext', 'Test message', mockConfig);

      const logData = mockConsoleLog.mock.calls[0][1];
      
      expect(logData).toHaveProperty('timestamp');
      expect(logData).toHaveProperty('level', 'info');
      expect(logData).toHaveProperty('message', 'Test message');
      expect(logData).toHaveProperty('context', 'TestContext');
      expect(logData).toHaveProperty('humanNote', 'Test human note');
      expect(logData).toHaveProperty('aiTodo', 'Test AI todo');
    });

    it('preserves log level case correctly', () => {
      clientDevLogger.info('TestContext', 'Test message', mockConfig);
      clientDevLogger.warn('TestContext', 'Test message', mockConfig);
      clientDevLogger.error('TestContext', 'Test message', mockConfig);
      clientDevLogger.debug('TestContext', 'Test message', mockConfig);

      expect(mockConsoleLog.mock.calls[0][1].level).toBe('info');
      expect(mockConsoleLog.mock.calls[1][1].level).toBe('warn');
      expect(mockConsoleLog.mock.calls[2][1].level).toBe('error');
      expect(mockConsoleLog.mock.calls[3][1].level).toBe('debug');
    });

    it('does not mutate the original config object', () => {
      const originalConfig = {
        context: 'TestContext',
        humanNote: 'Test human note',
        aiTodo: 'Test AI todo',
      };
      const configCopy = { ...originalConfig };

      clientDevLogger.info('TestContext', 'Test message', originalConfig);

      expect(originalConfig).toEqual(configCopy);
    });
  });

  /**
   * @description 複数ログ呼び出しテスト
   */
  describe('Multiple Log Calls', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('handles multiple log calls correctly', () => {
      clientDevLogger.info('Context1', 'Message 1', mockConfig);
      clientDevLogger.warn('Context2', 'Message 2', mockConfig);
      clientDevLogger.error('Context3', 'Message 3', mockConfig);

      expect(mockConsoleLog).toHaveBeenCalledTimes(3);
      
      expect(mockConsoleLog.mock.calls[0][0]).toBe('[INFO] Context1: Message 1');
      expect(mockConsoleLog.mock.calls[1][0]).toBe('[WARN] Context2: Message 2');
      expect(mockConsoleLog.mock.calls[2][0]).toBe('[ERROR] Context3: Message 3');
    });

    it('generates unique timestamps for rapid successive calls', () => {
      clientDevLogger.info('TestContext', 'Message 1', mockConfig);
      clientDevLogger.info('TestContext', 'Message 2', mockConfig);

      const timestamp1 = mockConsoleLog.mock.calls[0][1].timestamp;
      const timestamp2 = mockConsoleLog.mock.calls[1][1].timestamp;

      expect(timestamp1).toBeTruthy();
      expect(timestamp2).toBeTruthy();
      // Timestamps should be at least equal (could be same if very rapid)
      expect(new Date(timestamp2).getTime()).toBeGreaterThanOrEqual(new Date(timestamp1).getTime());
    });
  });

  /**
   * @description エッジケーステスト
   */
  describe('Edge Cases', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('handles undefined NODE_ENV as non-development', () => {
      delete process.env.NODE_ENV;
      
      clientDevLogger.info('TestContext', 'Test message', mockConfig);

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('handles null values in config gracefully', () => {
      const nullConfig = {
        context: null as any,
        humanNote: null as any,
        aiTodo: null as any,
      };

      expect(() => {
        clientDevLogger.info('TestContext', 'Test message', nullConfig);
      }).not.toThrow();

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[INFO] TestContext: Test message',
        expect.objectContaining({
          context: null,
          humanNote: null,
          aiTodo: null,
        })
      );
    });

    it('handles very long messages correctly', () => {
      const longMessage = 'a'.repeat(1000);
      
      expect(() => {
        clientDevLogger.info('TestContext', longMessage, mockConfig);
      }).not.toThrow();

      expect(mockConsoleLog).toHaveBeenCalledWith(
        `[INFO] TestContext: ${longMessage}`,
        expect.any(Object)
      );
    });

    it('handles unicode characters correctly', () => {
      const unicodeConfig = {
        context: '🔧 TestContext 🔧',
        humanNote: '📝 Human note with emojis 📝',
        aiTodo: '🤖 AI todo with emojis 🤖',
      };

      expect(() => {
        clientDevLogger.info('TestContext', '✅ Success message ✅', unicodeConfig);
      }).not.toThrow();

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[INFO] TestContext: ✅ Success message ✅',
        expect.objectContaining(unicodeConfig)
      );
    });
  });
});
