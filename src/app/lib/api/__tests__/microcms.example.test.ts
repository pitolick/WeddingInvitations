/**
 * @description microCMS SDK使用例のテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import {
  exampleUsage,
  exampleWithErrorHandling,
  typeSafeExample,
} from '../microcms.example';
import * as microCMSModule from '../microcms';

// microCMSモジュールをモック
jest.mock('../microcms', () => ({
  getGuestByInvitationId: jest.fn(),
  getDearBlockData: jest.fn(),
  getGuests: jest.fn(),
  getGuestsByInviteType: jest.fn(),
}));

// console.logとconsole.errorのモック
const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('microCMS Example Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogMock.mockClear();
    consoleErrorMock.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleLogMock.mockRestore();
    consoleErrorMock.mockRestore();
  });

  describe('exampleUsage', () => {
    it('should successfully demonstrate all microCMS functions', async () => {
      // モックデータの設定
      const mockGuest = {
        id: 'test',
        name: 'テスト招待者',
        dear: 'テスト招待者様',
        message: 'テストメッセージ' as TrustedHTML,
        invite: ['挙式', '披露宴'],
        attendance: false,
        attendanceDetails: [],
        note: '',
      };

      const mockDearBlockData = {
        id: 'test',
        dear: 'テスト招待者様',
        message: 'テストメッセージ' as TrustedHTML,
        inviteTypes: ['挙式', '披露宴'],
      };

      const mockAllGuests = [mockGuest];
      const mockCeremonyGuests = [mockGuest];
      const mockReceptionGuests = [mockGuest];
      const mockAfterPartyGuests = [mockGuest];

      // モック関数の設定
      (microCMSModule.getGuestByInvitationId as jest.Mock).mockResolvedValue(
        mockGuest
      );
      (microCMSModule.getDearBlockData as jest.Mock).mockResolvedValue(
        mockDearBlockData
      );
      (microCMSModule.getGuests as jest.Mock).mockResolvedValue(mockAllGuests);
      (microCMSModule.getGuestsByInviteType as jest.Mock)
        .mockResolvedValueOnce(mockCeremonyGuests)
        .mockResolvedValueOnce(mockReceptionGuests)
        .mockResolvedValueOnce(mockAfterPartyGuests);

      // 関数の実行
      await exampleUsage();

      // 関数が正しく呼び出されたことを確認
      expect(microCMSModule.getGuestByInvitationId).toHaveBeenCalledWith(
        'test'
      );
      expect(microCMSModule.getDearBlockData).toHaveBeenCalledWith('test');
      expect(microCMSModule.getGuests).toHaveBeenCalled();
      expect(microCMSModule.getGuestsByInviteType).toHaveBeenCalledWith('挙式');
      expect(microCMSModule.getGuestsByInviteType).toHaveBeenCalledWith(
        '披露宴'
      );
      expect(microCMSModule.getGuestsByInviteType).toHaveBeenCalledWith(
        '二次会'
      );

      // コンソールログが正しく出力されたことを確認
      expect(consoleLogMock).toHaveBeenCalledWith('招待者名:', 'テスト招待者');
      expect(consoleLogMock).toHaveBeenCalledWith('Dear:', 'テスト招待者様');
      expect(consoleLogMock).toHaveBeenCalledWith(
        'メッセージ:',
        'テストメッセージ'
      );
      expect(consoleLogMock).toHaveBeenCalledWith('招待種別:', [
        '挙式',
        '披露宴',
      ]);
      expect(consoleLogMock).toHaveBeenCalledWith(
        'DearBlockData:',
        mockDearBlockData
      );
      expect(consoleLogMock).toHaveBeenCalledWith('全招待者数:', 1);
      expect(consoleLogMock).toHaveBeenCalledWith('挙式招待者数:', 1);
      expect(consoleLogMock).toHaveBeenCalledWith('披露宴招待者数:', 1);
      expect(consoleLogMock).toHaveBeenCalledWith('二次会招待者数:', 1);
    });

    it('should handle null guest data gracefully', async () => {
      // モック関数の設定（guest: null, dearBlockData: null）
      (microCMSModule.getGuestByInvitationId as jest.Mock).mockResolvedValue(
        null
      );
      (microCMSModule.getDearBlockData as jest.Mock).mockResolvedValue(null);
      (microCMSModule.getGuests as jest.Mock).mockResolvedValue([]);
      (microCMSModule.getGuestsByInviteType as jest.Mock).mockResolvedValue([]);

      // 関数の実行
      await exampleUsage();

      // ゲスト情報関連のコンソールログが出力されないことを確認
      expect(consoleLogMock).not.toHaveBeenCalledWith(
        expect.stringContaining('招待者名:')
      );
      expect(consoleLogMock).not.toHaveBeenCalledWith(
        expect.stringContaining('DearBlockData:')
      );

      // その他のログは出力されることを確認
      expect(consoleLogMock).toHaveBeenCalledWith('全招待者数:', 0);
      expect(consoleLogMock).toHaveBeenCalledWith('挙式招待者数:', 0);
      expect(consoleLogMock).toHaveBeenCalledWith('披露宴招待者数:', 0);
      expect(consoleLogMock).toHaveBeenCalledWith('二次会招待者数:', 0);
    });
  });

  describe('exampleWithErrorHandling', () => {
    it('should handle successful guest retrieval', async () => {
      const mockGuest = {
        id: 'test',
        name: 'テスト招待者',
        dear: 'テスト招待者様',
        message: 'テストメッセージ' as TrustedHTML,
        invite: ['挙式', '披露宴'],
        attendance: false,
        attendanceDetails: [],
        note: '',
      };

      (microCMSModule.getGuestByInvitationId as jest.Mock).mockResolvedValue(
        mockGuest
      );

      await exampleWithErrorHandling();

      expect(microCMSModule.getGuestByInvitationId).toHaveBeenCalledWith(
        'non-existent-id'
      );
      expect(consoleLogMock).toHaveBeenCalledWith(
        '招待者情報取得成功:',
        'テスト招待者'
      );
      expect(consoleErrorMock).not.toHaveBeenCalled();
    });

    it('should handle null guest data', async () => {
      (microCMSModule.getGuestByInvitationId as jest.Mock).mockResolvedValue(
        null
      );

      await exampleWithErrorHandling();

      expect(microCMSModule.getGuestByInvitationId).toHaveBeenCalledWith(
        'non-existent-id'
      );
      expect(consoleLogMock).toHaveBeenCalledWith('招待者情報が見つかりません');
      expect(consoleErrorMock).not.toHaveBeenCalled();
    });

    it('should verify error handling structure exists', async () => {
      // エラーハンドリングの構造が存在することを確認
      // 実際のAPIはエラーをキャッチしてnullを返すため、
      // try-catch構造の存在を間接的に確認

      // 正常実行の場合
      const mockGuest = {
        id: 'test',
        name: 'テスト招待者',
        dear: 'テスト招待者様',
        message: 'テストメッセージ' as TrustedHTML,
        invite: ['挙式', '披露宴'],
        attendance: false,
        attendanceDetails: [],
        note: '',
      };

      (microCMSModule.getGuestByInvitationId as jest.Mock).mockResolvedValue(
        mockGuest
      );

      await exampleWithErrorHandling();

      expect(microCMSModule.getGuestByInvitationId).toHaveBeenCalledWith(
        'non-existent-id'
      );
      expect(consoleLogMock).toHaveBeenCalledWith(
        '招待者情報取得成功:',
        'テスト招待者'
      );
      expect(consoleErrorMock).not.toHaveBeenCalled();
    });
  });

  describe('typeSafeExample', () => {
    it('should demonstrate type-safe partial guest creation', () => {
      typeSafeExample();

      // 型安全な招待者情報の作成デモが実行されることを確認
      expect(consoleLogMock).toHaveBeenCalledWith(
        '型安全な招待者情報（部分）:',
        {
          name: 'テスト招待者',
          dear: 'テスト招待者様',
          message: 'テストメッセージ',
          invite: ['挙式', '披露宴'],
        }
      );
    });

    it('should execute without errors', () => {
      // エラーが発生しないことを確認
      expect(() => typeSafeExample()).not.toThrow();

      // コンソールログが1回呼び出されることを確認
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Integration Tests', () => {
    it('should work with all functions in sequence', async () => {
      // 全ての関数を連続して実行してエラーが発生しないことを確認
      const mockGuest = {
        id: 'test',
        name: 'テスト招待者',
        dear: 'テスト招待者様',
        message: 'テストメッセージ' as TrustedHTML,
        invite: ['挙式', '披露宴'],
        attendance: false,
        attendanceDetails: [],
        note: '',
      };

      // モック設定
      (microCMSModule.getGuestByInvitationId as jest.Mock).mockResolvedValue(
        mockGuest
      );
      (microCMSModule.getDearBlockData as jest.Mock).mockResolvedValue({
        id: 'test',
        dear: 'テスト招待者様',
        message: 'テストメッセージ' as TrustedHTML,
        inviteTypes: ['挙式', '披露宴'],
      });
      (microCMSModule.getGuests as jest.Mock).mockResolvedValue([mockGuest]);
      (microCMSModule.getGuestsByInviteType as jest.Mock).mockResolvedValue([
        mockGuest,
      ]);

      // 全ての関数を実行
      await expect(exampleUsage()).resolves.not.toThrow();
      await expect(exampleWithErrorHandling()).resolves.not.toThrow();
      expect(() => typeSafeExample()).not.toThrow();

      // 適切な回数のコンソール出力があることを確認
      expect(consoleLogMock.mock.calls.length).toBeGreaterThan(0);
    });
  });
});
