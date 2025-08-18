/**
 * @description Postal Code API Routeのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '../route';

// fetchのモック
global.fetch = jest.fn();

// テスト用の郵便番号データ
const mockPostalCode = '1000001';
const mockZipcloudResponse = {
  status: 200,
  results: [
    {
      zipcode: '1000001',
      prefcode: '13',
      address1: '東京都',
      address2: '千代田区',
      address3: '千代田',
      kana1: 'トウキョウト',
      kana2: 'チヨダク',
      kana3: 'チヨダ',
    },
  ],
};

const mockFormattedResponse = {
  addresses: [
    {
      zip_code: 1000001,
      pref_code: '13',
      pref_name: '東京都',
      pref_kana: 'トウキョウト',
      city_name: '千代田区',
      city_kana: 'チヨダク',
      town_name: '千代田',
      town_kana: 'チヨダ',
      address: '東京都千代田区千代田',
      dgacode: null,
      pref_roma: null,
      city_code: 0,
      city_roma: null,
      town_roma: null,
      biz_name: null,
      biz_kana: null,
      biz_roma: null,
      block_name: null,
      other_name: null,
      longitude: null,
      latitude: null,
    },
  ],
  searchtype: 'postal_code',
  limit: 1,
  count: 1,
  page: 1,
};

describe('Postal Code API Route', () => {
  beforeEach(() => {
    // fetchのモックをリセット
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('正常な郵便番号で住所検索が成功する', async () => {
      // Zipcloud APIからの成功レスポンスをモック
      const mockResponse = {
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockZipcloudResponse),
      };
      global.fetch.mockResolvedValue(mockResponse);

      // リクエストの作成
      const req = new NextRequest(
        `http://localhost:3000/api/postal-code?postalCode=${mockPostalCode}`
      );

      // API呼び出し
      const response = await GET(req);
      const responseData = await response.json();

      // レスポンスの検証
      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toEqual(mockFormattedResponse);

      // fetchの呼び出し確認
      expect(global.fetch).toHaveBeenCalledWith(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${mockPostalCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });

    it('郵便番号が指定されていない場合、エラーレスポンスを返す', async () => {
      const req = new NextRequest('http://localhost:3000/api/postal-code');

      const response = await GET(req);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('MISSING_POSTAL_CODE');
      expect(responseData.error.userMessage).toBe('郵便番号を入力してください');
    });

    it('無効な郵便番号形式の場合、エラーレスポンスを返す', async () => {
      const req = new NextRequest(
        'http://localhost:3000/api/postal-code?postalCode=invalid'
      );

      const response = await GET(req);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('INVALID_POSTAL_CODE_FORMAT');
      expect(responseData.error.userMessage).toBe(
        '郵便番号は7桁の数字で入力してください'
      );
    });

    it('Zipcloud APIからエラーレスポンスが返された場合、エラーレスポンスを返す', async () => {
      // Zipcloud APIからのエラーレスポンスをモック
      const mockResponse = {
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Internal Server Error' }),
      };
      global.fetch.mockResolvedValue(mockResponse);

      const req = new NextRequest(
        `http://localhost:3000/api/postal-code?postalCode=${mockPostalCode}`
      );

      const response = await GET(req);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('ZIPCLOUD_API_ERROR');
      expect(responseData.error.userMessage).toBe(
        '郵便番号検索サービスが一時的に利用できません。しばらく時間をおいてから再度お試しください。'
      );
    });

    it('住所が見つからない場合、エラーレスポンスを返す', async () => {
      // 住所が見つからないレスポンスをモック
      const mockResponse = {
        ok: true,
        status: 200,
        json: () => Promise.resolve({ status: 200, results: null }),
      };
      global.fetch.mockResolvedValue(mockResponse);

      const req = new NextRequest(
        `http://localhost:3000/api/postal-code?postalCode=${mockPostalCode}`
      );

      const response = await GET(req);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('NO_RESULTS_FOUND');
      expect(responseData.error.userMessage).toBe(
        '該当する住所が見つかりませんでした。郵便番号をご確認ください。'
      );
    });

    it('fetchが失敗した場合、エラーレスポンスを返す', async () => {
      // fetchの失敗をモック
      global.fetch.mockRejectedValue(new Error('Network error'));

      const req = new NextRequest(
        `http://localhost:3000/api/postal-code?postalCode=${mockPostalCode}`
      );

      const response = await GET(req);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('POSTAL_CODE_SEARCH_ERROR');
      expect(responseData.error.userMessage).toBe(
        '郵便番号検索中にエラーが発生しました。しばらく時間をおいてから再度お試しください。'
      );
    });
  });

  describe('POST', () => {
    it('POSTメソッドはサポートされていないため、エラーレスポンスを返す', async () => {
      const req = new NextRequest('http://localhost:3000/api/postal-code', {
        method: 'POST',
        body: JSON.stringify({ postalCode: mockPostalCode }),
      });

      const response = await POST(req);
      const responseData = await response.json();

      expect(response.status).toBe(501);
      expect(responseData.error).toBe(
        '住所からの郵便番号検索は現在サポートされていません'
      );
      expect(responseData.message).toBe(
        'zipcloud APIでは住所からの郵便番号検索機能が提供されていません'
      );
    });
  });
});
