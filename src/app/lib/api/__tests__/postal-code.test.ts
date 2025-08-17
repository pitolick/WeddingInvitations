/**
 * @description PostalCodeApiClientのテストファイル
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { PostalCodeApiClient, postalCodeApi } from '../postal-code';

// fetch APIのモック
const mockFetch = jest.fn();
global.fetch = mockFetch;

// window.location.originのモック
Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://localhost:3000',
  },
  writable: true,
});

describe('PostalCodeApiClient', () => {
  let client: PostalCodeApiClient;

  beforeEach(() => {
    client = new PostalCodeApiClient();
    mockFetch.mockClear();
  });

  /**
   * @description 郵便番号正規化テスト
   */
  describe('normalizePostalCode', () => {
    it('removes hyphens from postal code', () => {
      expect(client.normalizePostalCode('123-4567')).toBe('1234567');
    });

    it('handles postal code without hyphens', () => {
      expect(client.normalizePostalCode('1234567')).toBe('1234567');
    });

    it('removes multiple hyphens', () => {
      expect(client.normalizePostalCode('1-2-3-4-5-6-7')).toBe('1234567');
    });

    it('handles empty string', () => {
      expect(client.normalizePostalCode('')).toBe('');
    });

    it('handles string with only hyphens', () => {
      expect(client.normalizePostalCode('---')).toBe('');
    });

    it('handles mixed characters with hyphens', () => {
      expect(client.normalizePostalCode('abc-def-123')).toBe('abcdef123');
    });
  });

  /**
   * @description 郵便番号バリデーションテスト
   */
  describe('validatePostalCode', () => {
    it('validates correct 7-digit postal code', () => {
      expect(client.validatePostalCode('1234567')).toBe(true);
    });

    it('validates correct 7-digit postal code with hyphen', () => {
      expect(client.validatePostalCode('123-4567')).toBe(true);
    });

    it('rejects postal code with less than 7 digits', () => {
      expect(client.validatePostalCode('123456')).toBe(false);
      expect(client.validatePostalCode('12345')).toBe(false);
      expect(client.validatePostalCode('1234')).toBe(false);
    });

    it('rejects postal code with more than 7 digits', () => {
      expect(client.validatePostalCode('12345678')).toBe(false);
      expect(client.validatePostalCode('123456789')).toBe(false);
    });

    it('rejects postal code with non-numeric characters', () => {
      expect(client.validatePostalCode('abc-defg')).toBe(false);
      expect(client.validatePostalCode('123-abc4')).toBe(false);
      expect(client.validatePostalCode('abc1234')).toBe(false);
    });

    it('rejects empty string', () => {
      expect(client.validatePostalCode('')).toBe(false);
    });

    it('rejects string with only hyphens', () => {
      expect(client.validatePostalCode('---')).toBe(false);
    });

    it('validates postal code with multiple hyphens', () => {
      expect(client.validatePostalCode('1-2-3-4-5-6-7')).toBe(true);
    });

    it('rejects postal code with spaces', () => {
      expect(client.validatePostalCode('123 4567')).toBe(false);
      expect(client.validatePostalCode(' 1234567')).toBe(false);
      expect(client.validatePostalCode('1234567 ')).toBe(false);
    });
  });

  /**
   * @description 郵便番号検索テスト
   */
  describe('searchByPostalCode', () => {
    it('successfully searches postal code and returns data', async () => {
      const mockResponse = {
        addresses: [
          {
            zip_code: 1500002,
            pref_code: '13',
            pref_name: '東京都',
            pref_kana: 'トウキョウト',
            city_name: '渋谷区',
            city_kana: 'シブヤク',
            town_name: '渋谷',
            town_kana: 'シブヤ',
            address: null,
            dgacode: null,
            pref_roma: null,
            city_code: 13113,
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
        searchtype: 'zipcode',
        limit: 10,
        count: 1,
        page: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client.searchByPostalCode('1500002');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/postal-code?postalCode=1500002'
      );
      expect(result).toEqual(mockResponse);
    });

    it('successfully searches postal code and returns wrapped data', async () => {
      const mockData = {
        addresses: [
          {
            zip_code: 1500002,
            pref_code: '13',
            pref_name: '東京都',
            pref_kana: 'トウキョウト',
            city_name: '渋谷区',
            city_kana: 'シブヤク',
            town_name: '渋谷',
            town_kana: 'シブヤ',
            address: null,
            dgacode: null,
            pref_roma: null,
            city_code: 13113,
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
        searchtype: 'zipcode',
        limit: 10,
        count: 1,
        page: 1,
      };

      const wrappedResponse = {
        data: mockData,
        success: true,
        requestId: 'test-request-id',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => wrappedResponse,
      });

      const result = await client.searchByPostalCode('1500002');

      expect(result).toEqual(mockData);
    });

    it('handles API error responses', async () => {
      const errorResponse = {
        error: 'Invalid postal code',
        message: 'The provided postal code is invalid',
        status: 400,
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => errorResponse,
      });

      await expect(client.searchByPostalCode('invalid')).rejects.toThrow(
        '郵便番号検索エラー: Invalid postal code'
      );
    });

    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(client.searchByPostalCode('1500002')).rejects.toThrow(
        'Network error'
      );
    });

    it('constructs correct URL with postal code parameter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          addresses: [],
          searchtype: 'zipcode',
          limit: 10,
          count: 0,
          page: 1,
        }),
      });

      await client.searchByPostalCode('123-4567');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/postal-code?postalCode=123-4567'
      );
    });

    it('handles empty response data', async () => {
      const emptyResponse = {
        addresses: [],
        searchtype: 'zipcode',
        limit: 10,
        count: 0,
        page: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => emptyResponse,
      });

      const result = await client.searchByPostalCode('9999999');

      expect(result).toEqual(emptyResponse);
    });

    it('handles malformed error response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: null }), // errorがnullの場合
      });

      await expect(client.searchByPostalCode('invalid')).rejects.toThrow(
        '郵便番号検索エラー: null'
      );
    });

    it('handles response without data property', async () => {
      const directResponse = {
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
            address: null,
            dgacode: null,
            pref_roma: null,
            city_code: 13101,
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
        searchtype: 'zipcode',
        limit: 10,
        count: 1,
        page: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => directResponse,
      });

      const result = await client.searchByPostalCode('1000001');

      expect(result).toEqual(directResponse);
    });
  });

  /**
   * @description エッジケーステスト
   */
  describe('Edge Cases', () => {
    it('handles special characters in postal code for normalization', () => {
      expect(client.normalizePostalCode('123@4567')).toBe('123@4567');
      expect(client.normalizePostalCode('123#4567')).toBe('123#4567');
      expect(client.normalizePostalCode('123.4567')).toBe('123.4567');
    });

    it('validates postal code with leading zeros', () => {
      expect(client.validatePostalCode('0123456')).toBe(true);
      expect(client.validatePostalCode('0000000')).toBe(true);
    });

    it('handles very long strings', () => {
      const longString = '1'.repeat(100);
      expect(client.validatePostalCode(longString)).toBe(false);
      expect(client.normalizePostalCode(longString + '-test')).toBe(
        longString + 'test'
      );
    });

    it('handles unicode characters', () => {
      expect(client.validatePostalCode('１２３４５６７')).toBe(false); // 全角数字
      expect(client.normalizePostalCode('123−4567')).toBe('123−4567'); // 全角ハイフン
    });
  });

  /**
   * @description シングルトンインスタンステスト
   */
  describe('Singleton Instance', () => {
    it('exports a singleton instance', () => {
      expect(postalCodeApi).toBeInstanceOf(PostalCodeApiClient);
    });

    it('singleton instance methods work correctly', () => {
      expect(postalCodeApi.normalizePostalCode('123-4567')).toBe('1234567');
      expect(postalCodeApi.validatePostalCode('1234567')).toBe(true);
    });
  });

  /**
   * @description URL構築テスト
   */
  describe('URL Construction', () => {
    it('uses window.location.origin for API calls', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          addresses: [],
          searchtype: 'zipcode',
          limit: 10,
          count: 0,
          page: 1,
        }),
      });

      await client.searchByPostalCode('1234567');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/postal-code?postalCode=1234567'
      );
    });

    it('handles different window.location.origin', async () => {
      // window.location.originを変更
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.com',
        },
        writable: true,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          addresses: [],
          searchtype: 'zipcode',
          limit: 10,
          count: 0,
          page: 1,
        }),
      });

      await client.searchByPostalCode('1234567');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/api/postal-code?postalCode=1234567'
      );

      // 元に戻す
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'http://localhost:3000',
        },
        writable: true,
      });
    });
  });
});
