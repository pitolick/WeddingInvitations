/**
 * @description 型定義インデックスファイルのテスト
 */

import * as microcmsTypes from '../microcms';

describe('Types Index Module', () => {
  describe('エクスポートのテスト', () => {
    it('microcmsモジュールの型が正しくエクスポートされている', () => {
      // microcmsモジュールから関数をインポートできることを確認
      expect(typeof microcmsTypes.convertToDearBlockData).toBe('function');
    });

    it('すべてのmicrocms型定義がre-exportされている', () => {
      // 型の存在確認のため、テスト用のオブジェクトを作成
      const testAutofillConfig: microcmsTypes.AutofillConfig = {
        fieldId: 'test',
        name: true,
        kana: false,
      };

      const testGuestBase: microcmsTypes.GuestBase = {
        name: 'テスト太郎',
        kana: 'てすとたろう',
        autofill: testAutofillConfig,
        dear: 'テスト太郎様',
        message: 'テストメッセージ' as TrustedHTML,
        invite: ['挙式', '披露宴'],
      };

      const testDearBlockData: microcmsTypes.DearBlockData = {
        guestName: 'テスト太郎',
        kana: 'てすとたろう',
        dear: 'テスト太郎様',
        message: 'テストメッセージ' as TrustedHTML,
        inviteTypes: ['挙式', '披露宴'],
        autofill: testAutofillConfig,
        familyMembers: [],
      };

      // 型が正しく定義されていることを確認
      expect(testAutofillConfig.fieldId).toBe('test');
      expect(testGuestBase.name).toBe('テスト太郎');
      expect(testDearBlockData.guestName).toBe('テスト太郎');
    });

    it('InviteType型が正しく定義されている', () => {
      const validInviteTypes: microcmsTypes.InviteType[] = [
        '挙式',
        '披露宴',
        '二次会',
      ];

      expect(validInviteTypes).toHaveLength(3);
      expect(validInviteTypes).toContain('挙式');
      expect(validInviteTypes).toContain('披露宴');
      expect(validInviteTypes).toContain('二次会');
    });
  });

  describe('convertToDearBlockData関数のテスト', () => {
    const mockGuestContent: microcmsTypes.GuestContent = {
      id: 'test-id',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      publishedAt: '2023-01-01T00:00:00.000Z',
      revisedAt: '2023-01-01T00:00:00.000Z',
      name: 'テスト太郎',
      kana: 'てすとたろう',
      dear: 'テスト太郎様',
      message: 'テストメッセージ' as TrustedHTML,
      invite: ['挙式', '披露宴'],
      autofill: {
        fieldId: 'test-field',
        name: true,
        kana: true,
      },
      family: [
        {
          id: 'family-1',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          revisedAt: '2023-01-01T00:00:00.000Z',
          name: 'テスト花子',
          kana: 'てすとはなこ',
          dear: 'テスト花子様',
          message: '家族メッセージ' as TrustedHTML,
          invite: ['披露宴'],
          family: [],
        },
      ],
    };

    it('正常なGuestContentをDearBlockDataに変換する', () => {
      const result = microcmsTypes.convertToDearBlockData(mockGuestContent);

      expect(result).toEqual({
        guestName: 'テスト太郎',
        kana: 'てすとたろう',
        dear: 'テスト太郎様',
        message: 'テストメッセージ',
        inviteTypes: ['挙式', '披露宴'],
        autofill: {
          fieldId: 'test-field',
          name: true,
          kana: true,
        },
        familyMembers: [
          {
            guestName: 'テスト花子',
            kana: 'てすとはなこ',
            dear: 'テスト花子様',
            message: '家族メッセージ',
            inviteTypes: ['披露宴'],
            autofill: undefined,
            familyMembers: [],
          },
        ],
      });
    });

    it('dearが未設定の場合はnameを使用する', () => {
      const guestWithoutDear = {
        ...mockGuestContent,
        dear: undefined,
      };

      const result = microcmsTypes.convertToDearBlockData(guestWithoutDear);
      expect(result.dear).toBe('テスト太郎');
    });

    it('messageが未設定の場合は空文字を使用する', () => {
      const guestWithoutMessage = {
        ...mockGuestContent,
        message: undefined,
      };

      const result = microcmsTypes.convertToDearBlockData(guestWithoutMessage);
      expect(result.message).toBe('');
    });

    it('家族メンバーのdearが未設定の場合はnameを使用する', () => {
      const guestWithFamilyWithoutDear = {
        ...mockGuestContent,
        family: [
          {
            ...mockGuestContent.family[0],
            dear: undefined,
          },
        ],
      };

      const result = microcmsTypes.convertToDearBlockData(
        guestWithFamilyWithoutDear
      );
      expect(result.familyMembers[0].dear).toBe('テスト花子');
    });

    it('家族メンバーのmessageが未設定の場合は空文字を使用する', () => {
      const guestWithFamilyWithoutMessage = {
        ...mockGuestContent,
        family: [
          {
            ...mockGuestContent.family[0],
            message: undefined,
          },
        ],
      };

      const result = microcmsTypes.convertToDearBlockData(
        guestWithFamilyWithoutMessage
      );
      expect(result.familyMembers[0].message).toBe('');
    });

    it('空の家族配列を処理する', () => {
      const guestWithoutFamily = {
        ...mockGuestContent,
        family: [],
      };

      const result = microcmsTypes.convertToDearBlockData(guestWithoutFamily);
      expect(result.familyMembers).toEqual([]);
    });
  });
});
