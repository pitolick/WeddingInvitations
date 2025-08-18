/**
 * @description errors/utils.tsのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  createBaseError,
  logError,
  getUserFriendlyMessage,
  isRetryableError,
  stringifyError,
  normalizeError,
} from '../utils';
import { AppError, ErrorSeverity, ErrorType } from '../../types/errors';

describe('errors/utils', () => {
  const mockCreateErrorOptions = {
    message: 'テストエラーメッセージ',
    severity: ErrorSeverity.MEDIUM,
    location: 'TestComponent',
  };

  const mockAppError: AppError = {
    type: ErrorType.UNKNOWN_ERROR,
    message: 'テストエラーメッセージ',
    severity: ErrorSeverity.MEDIUM,
    timestamp: new Date(),
    userMessage: 'テストエラーメッセージ',
    location: 'TestComponent',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // 環境変数をリセット
    Object.defineProperty(process.env, 'NODE_ENV', {
      writable: true,
      value: undefined,
    });
  });

  describe('createBaseError', () => {
    it('基本エラーオブジェクトを正しく作成する', () => {
      const result = createBaseError(mockCreateErrorOptions);

      expect(result).toMatchObject({
        type: ErrorType.UNKNOWN_ERROR,
        message: 'テストエラーメッセージ',
        severity: ErrorSeverity.MEDIUM,
        location: 'TestComponent',
        userMessage: 'テストエラーメッセージ',
      });
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('デフォルト値が正しく設定される', () => {
      const result = createBaseError({
        message: 'テストエラーメッセージ',
      });

      expect(result.severity).toBe(ErrorSeverity.MEDIUM);
      expect(result.userMessage).toBe('テストエラーメッセージ');
    });

    it('カスタム値が正しく設定される', () => {
      const result = createBaseError({
        message: 'テストエラーメッセージ',
        severity: ErrorSeverity.CRITICAL,
        code: 'TEST_001',
        location: 'CustomComponent',
        details: { test: 'detail' },
        userMessage: 'カスタムユーザーメッセージ',
      });

      expect(result).toMatchObject({
        severity: ErrorSeverity.CRITICAL,
        code: 'TEST_001',
        location: 'CustomComponent',
        details: { test: 'detail' },
        userMessage: 'カスタムユーザーメッセージ',
      });
    });
  });

  describe('logError', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('開発環境でエラーログが出力される', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        writable: true,
        value: 'development',
      });

      await logError(mockAppError, { component: 'TestComponent' });

      expect(consoleSpy).toHaveBeenCalledWith('Error occurred:', {
        error: 'テストエラーメッセージ',
        type: ErrorType.UNKNOWN_ERROR,
        severity: ErrorSeverity.MEDIUM,
        location: 'TestComponent',
        context: { component: 'TestComponent' },
      });
    });

    it('本番環境でエラーログが出力されない', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        writable: true,
        value: 'production',
      });

      await logError(mockAppError);

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('コンテキストなしでエラーログが出力される', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        writable: true,
        value: 'development',
      });

      await logError(mockAppError);

      expect(consoleSpy).toHaveBeenCalledWith('Error occurred:', {
        error: 'テストエラーメッセージ',
        type: ErrorType.UNKNOWN_ERROR,
        severity: ErrorSeverity.MEDIUM,
        location: 'TestComponent',
        context: undefined,
      });
    });
  });

  describe('getUserFriendlyMessage', () => {
    it('userMessageが設定されている場合はそれを使用する', () => {
      const errorWithUserMessage: AppError = {
        ...mockAppError,
        userMessage: 'カスタムユーザーメッセージ',
      };

      const result = getUserFriendlyMessage(errorWithUserMessage);

      expect(result).toBe('カスタムユーザーメッセージ');
    });

    it('CRITICAL重要度で適切なメッセージを返す', () => {
      const criticalError: AppError = {
        ...mockAppError,
        severity: ErrorSeverity.CRITICAL,
        userMessage: undefined, // userMessageをクリア
      };

      const result = getUserFriendlyMessage(criticalError);

      expect(result).toBe(
        'システムエラーが発生しました。しばらく時間をおいてから再度お試しください。'
      );
    });

    it('HIGH重要度で適切なメッセージを返す', () => {
      const highError: AppError = {
        ...mockAppError,
        severity: ErrorSeverity.HIGH,
        userMessage: undefined, // userMessageをクリア
      };

      const result = getUserFriendlyMessage(highError);

      expect(result).toBe(
        'エラーが発生しました。ページを再読み込みしてお試しください。'
      );
    });

    it('MEDIUM重要度で適切なメッセージを返す', () => {
      const mediumError: AppError = {
        ...mockAppError,
        severity: ErrorSeverity.MEDIUM,
        userMessage: undefined, // userMessageをクリア
      };

      const result = getUserFriendlyMessage(mediumError);

      expect(result).toBe(
        '処理中にエラーが発生しました。入力内容をご確認ください。'
      );
    });

    it('LOW重要度で適切なメッセージを返す', () => {
      const lowError: AppError = {
        ...mockAppError,
        severity: ErrorSeverity.LOW,
        userMessage: undefined, // userMessageをクリア
      };

      const result = getUserFriendlyMessage(lowError);

      expect(result).toBe('軽微なエラーが発生しました。');
    });

    it('不明な重要度でデフォルトメッセージを返す', () => {
      const unknownError: AppError = {
        ...mockAppError,
        severity: 'UNKNOWN' as ErrorSeverity,
        userMessage: undefined, // userMessageをクリア
      };

      const result = getUserFriendlyMessage(unknownError);

      expect(result).toBe('エラーが発生しました。');
    });
  });

  describe('isRetryableError', () => {
    it('NETWORK_ERRORは再試行可能', () => {
      const networkError: AppError = {
        ...mockAppError,
        type: ErrorType.NETWORK_ERROR,
      };

      const result = isRetryableError(networkError);

      expect(result).toBe(true);
    });

    it('SERVER_ERRORは再試行可能', () => {
      const serverError: AppError = {
        ...mockAppError,
        type: ErrorType.SERVER_ERROR,
      };

      const result = isRetryableError(serverError);

      expect(result).toBe(true);
    });

    it('API_ERRORで5xxエラーは再試行可能', () => {
      const apiError: AppError = {
        ...mockAppError,
        type: ErrorType.API_ERROR,
        statusCode: 500,
      } as any;

      const result = isRetryableError(apiError);

      expect(result).toBe(true);
    });

    it('API_ERRORで4xxエラーは再試行不可', () => {
      const apiError: AppError = {
        ...mockAppError,
        type: ErrorType.API_ERROR,
        statusCode: 400,
      } as any;

      const result = isRetryableError(apiError);

      expect(result).toBe(false);
    });

    it('その他のエラーは再試行不可', () => {
      const otherError: AppError = {
        ...mockAppError,
        type: ErrorType.UNKNOWN_ERROR,
      };

      const result = isRetryableError(otherError);

      expect(result).toBe(false);
    });
  });

  describe('stringifyError', () => {
    it('エラーオブジェクトを正しく文字列化する', () => {
      const result = stringifyError(mockAppError);

      const parsed = JSON.parse(result);
      expect(parsed).toMatchObject({
        type: ErrorType.UNKNOWN_ERROR,
        message: 'テストエラーメッセージ',
        severity: ErrorSeverity.MEDIUM,
        location: 'TestComponent',
        userMessage: 'テストエラーメッセージ',
      });
      expect(parsed.timestamp).toBeDefined();
    });

    it('JSON.stringifyが失敗した場合はフォールバックメッセージを返す', () => {
      // 循環参照を作成してJSON.stringifyを失敗させる
      const circularError: any = { ...mockAppError };
      circularError.circular = circularError;

      // JSON.stringifyをモックしてエラーを発生させる
      const originalStringify = JSON.stringify;
      JSON.stringify = jest.fn().mockImplementation(() => {
        throw new Error('Circular reference');
      });

      const result = stringifyError(circularError);

      expect(result).toBe('Error: テストエラーメッセージ');

      // 元のJSON.stringifyを復元
      JSON.stringify = originalStringify;
    });
  });

  describe('normalizeError', () => {
    it('既にAppErrorの場合はそのまま返す', () => {
      const result = normalizeError(mockAppError);

      expect(result).toBe(mockAppError);
    });

    it('Errorオブジェクトを正規化する', () => {
      const nativeError = new Error('ネイティブエラー');
      const result = normalizeError(nativeError);

      expect(result).toMatchObject({
        type: ErrorType.UNKNOWN_ERROR,
        message: 'ネイティブエラー',
        severity: ErrorSeverity.MEDIUM,
        userMessage: 'エラーが発生しました',
        originalError: nativeError,
      });
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('文字列を正規化する', () => {
      const result = normalizeError('文字列エラー');

      expect(result).toMatchObject({
        type: ErrorType.UNKNOWN_ERROR,
        message: '文字列エラー',
        severity: ErrorSeverity.MEDIUM,
        userMessage: '文字列エラー',
      });
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('その他の値を正規化する', () => {
      const result = normalizeError({ custom: 'error' });

      expect(result).toMatchObject({
        type: ErrorType.UNKNOWN_ERROR,
        message: '不明なエラーが発生しました',
        severity: ErrorSeverity.MEDIUM,
        userMessage: 'エラーが発生しました',
        originalError: { custom: 'error' },
      });
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('nullを正規化する', () => {
      const result = normalizeError(null);

      expect(result).toMatchObject({
        type: ErrorType.UNKNOWN_ERROR,
        message: '不明なエラーが発生しました',
        severity: ErrorSeverity.MEDIUM,
        userMessage: 'エラーが発生しました',
        originalError: null,
      });
    });

    it('undefinedを正規化する', () => {
      const result = normalizeError(undefined);

      expect(result).toMatchObject({
        type: ErrorType.UNKNOWN_ERROR,
        message: '不明なエラーが発生しました',
        severity: ErrorSeverity.MEDIUM,
        userMessage: 'エラーが発生しました',
        originalError: undefined,
      });
    });

    it('AppErrorの条件を満たすオブジェクトを正規化する', () => {
      const appErrorLike = {
        type: ErrorType.API_ERROR,
        message: 'APIエラー',
        severity: ErrorSeverity.HIGH,
        timestamp: new Date(),
        userMessage: 'APIエラーが発生しました',
      };

      const result = normalizeError(appErrorLike);

      expect(result).toBe(appErrorLike);
    });

    it('AppErrorの条件を満たさないオブジェクトを正規化する', () => {
      const notAppError = {
        message: 'メッセージのみ',
        // typeプロパティがない
      };

      const result = normalizeError(notAppError);

      expect(result).toMatchObject({
        type: ErrorType.UNKNOWN_ERROR,
        message: '不明なエラーが発生しました',
        severity: ErrorSeverity.MEDIUM,
        userMessage: 'エラーが発生しました',
        originalError: notAppError,
      });
    });
  });
});
