/**
 * @description microCMS APIクライアントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  getGuestByInvitationId,
  getDearBlockData,
  getGuests,
} from '../microcms';
import { GuestContent, DearBlockData } from '../../types/microcms';

// microcms-js-sdkのモック
jest.mock('microcms-js-sdk', () => ({
  createClient: jest.fn(() => ({
    get: jest.fn(),
    getList: jest.fn(),
  })),
}));

// convertToDearBlockDataのモック
jest.mock('../../types/microcms', () => ({
  ...jest.requireActual('../../types/microcms'),
  convertToDearBlockData: jest.fn(),
}));

describe('microCMS API Client', () => {
  let mockClient: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // モッククライアントを作成
    mockClient = {
      get: jest.fn(),
      getList: jest.fn(),
    };

    // モックされたcreateClientを取得
    const { createClient } = jest.requireMock('microcms-js-sdk');
    createClient.mockReturnValue(mockClient);
  });

  describe('getGuestByInvitationId', () => {
    const mockGuestContent: GuestContent = {
      id: 'test-id',
      name: 'テストゲスト',
      email: 'test@example.com',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      publishedAt: '2024-01-01T00:00:00.000Z',
      // 他の必要なフィールドを追加
    } as GuestContent;

    it('招待者情報を正常に取得する', async () => {
      mockClient.get.mockResolvedValue(mockGuestContent);

      const result = await getGuestByInvitationId('test-id');

      expect(mockClient.get).toHaveBeenCalledWith({
        endpoint: 'guests',
        contentId: 'test-id',
        queries: undefined,
      });
      expect(result).toEqual(mockGuestContent);
    });

    it('ドラフトキー付きで招待者情報を取得する', async () => {
      mockClient.get.mockResolvedValue(mockGuestContent);

      const result = await getGuestByInvitationId('test-id', 'draft-key');

      expect(mockClient.get).toHaveBeenCalledWith({
        endpoint: 'guests',
        contentId: 'test-id',
        queries: { draftKey: 'draft-key' },
      });
      expect(result).toEqual(mockGuestContent);
    });

    it('APIエラーが発生した場合はnullを返す', async () => {
      mockClient.get.mockRejectedValue(new Error('API Error'));

      const result = await getGuestByInvitationId('test-id');

      expect(result).toBeNull();
    });

    it('存在しないIDの場合はnullを返す', async () => {
      mockClient.get.mockResolvedValue(null);

      const result = await getGuestByInvitationId('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('getDearBlockData', () => {
    const mockGuestContent: GuestContent = {
      id: 'test-id',
      name: 'テストゲスト',
      email: 'test@example.com',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      publishedAt: '2024-01-01T00:00:00.000Z',
      // 他の必要なフィールドを追加
    } as GuestContent;

    const mockDearBlockData: DearBlockData = {
      id: 'test-id',
      name: 'テストゲスト',
      // 他の必要なフィールドを追加
    } as DearBlockData;

    it('DearBlockDataを正常に取得する', async () => {
      mockClient.get.mockResolvedValue(mockGuestContent);
      const { convertToDearBlockData } = jest.requireMock(
        '../../types/microcms'
      );
      convertToDearBlockData.mockReturnValue(mockDearBlockData);

      const result = await getDearBlockData('test-id');

      expect(result).toEqual(mockDearBlockData);
    });

    it('ドラフトキー付きでDearBlockDataを取得する', async () => {
      mockClient.get.mockResolvedValue(mockGuestContent);
      const { convertToDearBlockData } = jest.requireMock(
        '../../types/microcms'
      );
      convertToDearBlockData.mockReturnValue(mockDearBlockData);

      const result = await getDearBlockData('test-id', 'draft-key');

      expect(result).toEqual(mockDearBlockData);
    });

    it('招待者情報が取得できない場合はnullを返す', async () => {
      mockClient.get.mockResolvedValue(null);

      const result = await getDearBlockData('test-id');

      expect(result).toBeNull();
    });

    it('APIエラーが発生した場合はnullを返す', async () => {
      mockClient.get.mockRejectedValue(new Error('API Error'));

      const result = await getDearBlockData('test-id');

      expect(result).toBeNull();
    });
  });

  describe('getGuests', () => {
    const mockGuests: GuestContent[] = [
      {
        id: 'guest-1',
        name: 'ゲスト1',
        email: 'guest1@example.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 'guest-2',
        name: 'ゲスト2',
        email: 'guest2@example.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
      },
    ] as GuestContent[];

    it('フィルターなしで全ての招待者を取得する', async () => {
      mockClient.getList.mockResolvedValue({
        contents: mockGuests,
        totalCount: 2,
        limit: 10,
        offset: 0,
      });

      const result = await getGuests();

      expect(mockClient.getList).toHaveBeenCalledWith({
        endpoint: 'guests',
        queries: undefined,
      });
      expect(result).toEqual(mockGuests);
    });

    it('フィルター付きで招待者を取得する', async () => {
      const filters = { invite: '挙式' };
      mockClient.getList.mockResolvedValue({
        contents: mockGuests,
        totalCount: 2,
        limit: 10,
        offset: 0,
      });

      const result = await getGuests(filters);

      expect(mockClient.getList).toHaveBeenCalledWith({
        endpoint: 'guests',
        queries: filters,
      });
      expect(result).toEqual(mockGuests);
    });

    it('APIエラーが発生した場合は空配列を返す', async () => {
      mockClient.getList.mockRejectedValue(new Error('API Error'));

      const result = await getGuests();

      expect(result).toEqual([]);
    });

    it('招待者が存在しない場合は空配列を返す', async () => {
      mockClient.getList.mockResolvedValue({
        contents: [],
        totalCount: 0,
        limit: 10,
        offset: 0,
      });

      const result = await getGuests();

      expect(result).toEqual([]);
    });
  });

  describe('エラーハンドリング', () => {
    it('ネットワークエラーを適切に処理する', async () => {
      mockClient.get.mockRejectedValue(new Error('Network Error'));

      const result = await getGuestByInvitationId('test-id');

      expect(result).toBeNull();
    });

    it('認証エラーを適切に処理する', async () => {
      mockClient.get.mockRejectedValue(new Error('Unauthorized'));

      const result = await getGuestByInvitationId('test-id');

      expect(result).toBeNull();
    });

    it('タイムアウトエラーを適切に処理する', async () => {
      mockClient.get.mockRejectedValue(new Error('Timeout'));

      const result = await getGuestByInvitationId('test-id');

      expect(result).toBeNull();
    });
  });
});
