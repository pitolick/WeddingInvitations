/**
 * @description Preview API Routeのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { NextRequest } from 'next/server';
import { GET } from '../route';

// next/headersのモック
jest.mock('next/headers', () => ({
  draftMode: jest.fn(),
  cookies: jest.fn(),
}));

describe('Preview API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('invitationIdが不足している場合、エラーレスポンスを返す', async () => {
      const req = new NextRequest(
        'http://localhost:3000/api/preview?draftKey=test-key'
      );

      const response = await GET(req);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('MISSING_PARAMETERS');
      expect(responseData.error.userMessage).toBe(
        'プレビューに必要なパラメータが不足しています'
      );
    });

    it('draftKeyが不足している場合、エラーレスポンスを返す', async () => {
      const req = new NextRequest(
        'http://localhost:3000/api/preview?invitationId=test-123'
      );

      const response = await GET(req);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('MISSING_PARAMETERS');
      expect(responseData.error.userMessage).toBe(
        'プレビューに必要なパラメータが不足しています'
      );
    });
  });
});
