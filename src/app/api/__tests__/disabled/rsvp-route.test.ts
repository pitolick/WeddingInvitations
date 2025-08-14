/**
 * @description RSVP API Routeのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { NextRequest } from 'next/server';
import { POST } from '../route';

// fetchのモック
global.fetch = jest.fn();

// 環境変数のモック
const mockEnv = {
  GOOGLE_APPS_SCRIPT_URL:
    'https://script.google.com/macros/s/test-script-id/exec',
};

// テスト用のRSVPデータ
const mockRsvpData = {
  invitationId: 'test-invitation-123',
  guestName: 'テストゲスト',
  attendance: 'attendance',
  guestCount: 2,
  allergies: ['卵', '乳'],
  message: 'おめでとうございます！',
};

describe('RSVP API Route', () => {
  beforeEach(() => {
    // 環境変数の設定
    process.env.GOOGLE_APPS_SCRIPT_URL = mockEnv.GOOGLE_APPS_SCRIPT_URL;

    // fetchのモックをリセット
    jest.clearAllMocks();
  });

  afterEach(() => {
    // 環境変数をクリア
    delete process.env.GOOGLE_APPS_SCRIPT_URL;
  });

  describe('POST', () => {
    it('正常なRSVPデータを処理して成功レスポンスを返す', async () => {
      // Google Apps Scriptからの成功レスポンスをモック
      const mockResponse = {
        ok: true,
        status: 200,
        text: () =>
          Promise.resolve(
            JSON.stringify({ success: true, message: '保存されました' })
          ),
      };
      global.fetch.mockResolvedValue(mockResponse);

      // リクエストの作成
      const req = new NextRequest('http://localhost:3000/api/rsvp', {
        method: 'POST',
        body: JSON.stringify(mockRsvpData),
      });

      // API呼び出し
      const response = await POST(req);
      const responseData = await response.json();

      // レスポンスの検証
      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toEqual({
        success: true,
        message: '保存されました',
      });
      expect(responseData.responseId).toBeDefined();

      // fetchの呼び出し確認
      expect(global.fetch).toHaveBeenCalledWith(
        mockEnv.GOOGLE_APPS_SCRIPT_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockRsvpData),
        }
      );
    });

    it('環境変数GOOGLE_APPS_SCRIPT_URLが未設定の場合、エラーレスポンスを返す', async () => {
      // 環境変数を未設定にする
      delete process.env.GOOGLE_APPS_SCRIPT_URL;

      const req = new NextRequest('http://localhost:3000/api/rsvp', {
        method: 'POST',
        body: JSON.stringify(mockRsvpData),
      });

      const response = await POST(req);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('MISSING_ENV_VAR');
      expect(responseData.error.userMessage).toBe(
        'システム設定エラーが発生しました'
      );
      expect(responseData.responseId).toBeDefined();
    });

    it('無効なJSONリクエストボディの場合、エラーレスポンスを返す', async () => {
      const req = new NextRequest('http://localhost:3000/api/rsvp', {
        method: 'POST',
        body: 'invalid-json',
      });

      const response = await POST(req);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('INVALID_REQUEST_BODY');
      expect(responseData.error.userMessage).toBe(
        '送信データの形式が正しくありません'
      );
      expect(responseData.responseId).toBeDefined();
    });

    it('Google Apps Scriptからエラーレスポンスが返された場合、エラーレスポンスを返す', async () => {
      // Google Apps Scriptからのエラーレスポンスをモック
      const mockResponse = {
        ok: false,
        status: 500,
        text: () =>
          Promise.resolve(JSON.stringify({ error: 'Internal Server Error' })),
      };
      global.fetch.mockResolvedValue(mockResponse);

      const req = new NextRequest('http://localhost:3000/api/rsvp', {
        method: 'POST',
        body: JSON.stringify(mockRsvpData),
      });

      const response = await POST(req);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('GOOGLE_APPS_SCRIPT_ERROR');
      expect(responseData.error.userMessage).toBe(
        'データの送信に失敗しました。しばらく時間をおいてから再度お試しください。'
      );
      expect(responseData.responseId).toBeDefined();
    });

    it('Google Apps ScriptからJSON以外のレスポンスが返された場合、エラーレスポンスを返す', async () => {
      // Google Apps Scriptからの非JSONレスポンスをモック
      const mockResponse = {
        ok: false,
        status: 400,
        text: () => Promise.resolve('Bad Request'),
      };
      global.fetch.mockResolvedValue(mockResponse);

      const req = new NextRequest('http://localhost:3000/api/rsvp', {
        method: 'POST',
        body: JSON.stringify(mockRsvpData),
      });

      const response = await POST(req);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('GOOGLE_APPS_SCRIPT_ERROR');
      expect(responseData.responseId).toBeDefined();
    });

    it('fetchが失敗した場合、エラーレスポンスを返す', async () => {
      // fetchの失敗をモック
      global.fetch.mockRejectedValue(new Error('Network error'));

      const req = new NextRequest('http://localhost:3000/api/rsvp', {
        method: 'POST',
        body: JSON.stringify(mockRsvpData),
      });

      const response = await POST(req);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('UNEXPECTED_ERROR');
      expect(responseData.error.userMessage).toBe(
        'システムエラーが発生しました。しばらく時間をおいてから再度お試しください。'
      );
      expect(responseData.responseId).toBeDefined();
    });

    it('Google Apps ScriptからJSON解析できないレスポンスが返された場合、成功レスポンスを返す', async () => {
      // Google Apps Scriptからの非JSONレスポンスをモック（成功時）
      const mockResponse = {
        ok: true,
        status: 200,
        text: () => Promise.resolve('Success'),
      };
      global.fetch.mockResolvedValue(mockResponse);

      const req = new NextRequest('http://localhost:3000/api/rsvp', {
        method: 'POST',
        body: JSON.stringify(mockRsvpData),
      });

      const response = await POST(req);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toBe('Success');
      expect(responseData.responseId).toBeDefined();
    });
  });
});
