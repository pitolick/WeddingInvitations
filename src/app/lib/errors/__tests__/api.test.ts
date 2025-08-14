/**
 * @description APIエラーハンドリングユーティリティのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  createApiError,
  getDefaultUserMessage,
  getErrorSeverity,
  createSuccessResponse,
  createErrorResponse,
  handleApiResponse,
  safeFetch,
  generateRequestId,
} from '../api';
import { ErrorSeverity, ErrorType } from '@/app/lib/types/errors';

// fetchのモック
global.fetch = jest.fn();

describe('API Error Handling Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createApiError', () => {
    it('基本的なAPIエラーを作成する', () => {
      const error = createApiError({
        message: 'テストエラー',
        statusCode: 500,
        endpoint: '/api/test',
      });

      expect(error.type).toBe(ErrorType.API_ERROR);
      expect(error.message).toBe('テストエラー');
      expect(error.statusCode).toBe(500);
      expect(error.endpoint).toBe('/api/test');
      expect(error.severity).toBe(ErrorSeverity.MEDIUM);
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it('カスタムオプションでAPIエラーを作成する', () => {
      const error = createApiError({
        message: 'カスタムエラー',
        statusCode: 404,
        severity: ErrorSeverity.HIGH,
        code: 'NOT_FOUND',
        location: 'test.ts',
        details: { reason: 'test' },
        userMessage: 'カスタムメッセージ',
        endpoint: '/api/custom',
        requestId: 'req-123',
        responseData: { error: 'test' },
      });

      expect(error.severity).toBe(ErrorSeverity.HIGH);
      expect(error.code).toBe('NOT_FOUND');
      expect(error.location).toBe('test.ts');
      expect(error.details).toEqual({ reason: 'test' });
      expect(error.userMessage).toBe('カスタムメッセージ');
      expect(error.requestId).toBe('req-123');
      expect(error.responseData).toEqual({ error: 'test' });
    });

    it('デフォルトのユーザーメッセージを設定する', () => {
      const error = createApiError({
        message: 'テストエラー',
        statusCode: 400,
      });

      expect(error.userMessage).toBe(
        'リクエストが正しくありません。入力内容をご確認ください。'
      );
    });
  });

  describe('getDefaultUserMessage', () => {
    it('400エラーのメッセージを返す', () => {
      expect(getDefaultUserMessage(400)).toBe(
        'リクエストが正しくありません。入力内容をご確認ください。'
      );
    });

    it('404エラーのメッセージを返す', () => {
      expect(getDefaultUserMessage(404)).toBe(
        'お探しの情報が見つかりませんでした。'
      );
    });

    it('500エラーのメッセージを返す', () => {
      expect(getDefaultUserMessage(500)).toBe(
        'サーバーエラーが発生しました。しばらく時間をおいてから再度お試しください。'
      );
    });

    it('未知のステータスコードのデフォルトメッセージを返す', () => {
      expect(getDefaultUserMessage(999)).toBe(
        'エラーが発生しました。しばらく時間をおいてから再度お試しください。'
      );
    });
  });

  describe('getErrorSeverity', () => {
    it('500以上のステータスコードでHIGH重要度を返す', () => {
      expect(getErrorSeverity(500)).toBe(ErrorSeverity.HIGH);
      expect(getErrorSeverity(502)).toBe(ErrorSeverity.HIGH);
      expect(getErrorSeverity(503)).toBe(ErrorSeverity.HIGH);
    });

    it('400-499のステータスコードでMEDIUM重要度を返す', () => {
      expect(getErrorSeverity(400)).toBe(ErrorSeverity.MEDIUM);
      expect(getErrorSeverity(404)).toBe(ErrorSeverity.MEDIUM);
      expect(getErrorSeverity(422)).toBe(ErrorSeverity.MEDIUM);
    });

    it('400未満のステータスコードでLOW重要度を返す', () => {
      expect(getErrorSeverity(200)).toBe(ErrorSeverity.LOW);
      expect(getErrorSeverity(300)).toBe(ErrorSeverity.LOW);
    });
  });

  describe('createSuccessResponse', () => {
    it('成功レスポンスを作成する', () => {
      const data = { id: 1, name: 'test' };
      const response = createSuccessResponse(data);

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.responseId).toBeUndefined();
    });

    it('レスポンスID付きの成功レスポンスを作成する', () => {
      const data = { id: 1, name: 'test' };
      const response = createSuccessResponse(data, 'resp-123');

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.responseId).toBe('resp-123');
    });
  });

  describe('createErrorResponse', () => {
    it('エラーレスポンスを作成する', () => {
      const error = createApiError({
        message: 'テストエラー',
        statusCode: 500,
      });
      const response = createErrorResponse(error);

      expect(response.success).toBe(false);
      expect(response.error).toEqual(error);
      expect(response.responseId).toBeUndefined();
    });

    it('レスポンスID付きのエラーレスポンスを作成する', () => {
      const error = createApiError({
        message: 'テストエラー',
        statusCode: 500,
      });
      const response = createErrorResponse(error, 'resp-123');

      expect(response.success).toBe(false);
      expect(response.error).toEqual(error);
      expect(response.responseId).toBe('resp-123');
    });
  });

  describe('handleApiResponse', () => {
    it('成功レスポンスを処理する', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'success' }),
      } as Response;

      const result = await handleApiResponse(
        mockResponse,
        '/api/test',
        'req-123'
      );

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ data: 'success' });
        expect(result.responseId).toBe('req-123');
      }
    });

    it('エラーレスポンスを処理する', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Not Found' }),
      } as Response;

      const result = await handleApiResponse(
        mockResponse,
        '/api/test',
        'req-123'
      );

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.statusCode).toBe(404);
        expect(result.error.endpoint).toBe('/api/test');
        expect(result.error.requestId).toBe('req-123');
        expect(result.responseId).toBe('req-123');
      }
    });

    it('JSON解析エラーを処理する', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: () => Promise.reject(new Error('JSON Parse Error')),
      } as Response;

      const result = await handleApiResponse(
        mockResponse,
        '/api/test',
        'req-123'
      );

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('レスポンスの解析に失敗しました');
        expect(result.error.statusCode).toBe(200);
        expect(result.error.severity).toBe(ErrorSeverity.HIGH);
      }
    });
  });

  describe('safeFetch', () => {
    it('正常なfetchリクエストを実行する', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'success' }),
      } as Response;

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await safeFetch('/api/test', {}, 'req-123');

      expect(global.fetch).toHaveBeenCalledWith('/api/test', {});
      expect(result.success).toBe(true);
    });

    it('ネットワークエラーを処理する', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));

      const result = await safeFetch('/api/test', {}, 'req-123');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Network Error');
        expect(result.error.statusCode).toBe(0);
        expect(result.error.severity).toBe(ErrorSeverity.HIGH);
      }
    });
  });

  describe('generateRequestId', () => {
    it('ユニークなリクエストIDを生成する', () => {
      const id1 = generateRequestId();
      const id2 = generateRequestId();

      expect(id1).toMatch(/^req-\d{8}T\d{6}-[a-z0-9]{6}$/);
      expect(id2).toMatch(/^req-\d{8}T\d{6}-[a-z0-9]{6}$/);
      expect(id1).not.toBe(id2);
    });

    it('リクエストIDの形式が正しい', () => {
      const id = generateRequestId();
      const parts = id.split('-');

      expect(parts[0]).toBe('req');
      expect(parts[1]).toHaveLength(15); // YYYYMMDDTHHMMSS
      expect(parts[2]).toHaveLength(6); // random string
    });
  });
});
