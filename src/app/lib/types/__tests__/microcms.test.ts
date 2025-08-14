/**
 * @description microCMS型定義のテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  InviteType,
  AutofillConfig,
  GuestBase,
  GuestContent,
  GuestContentReference,
  DearBlockData,
  convertToDearBlockData,
} from '../microcms';

describe('microCMS Type Definitions', () => {
  describe('InviteType', () => {
    it('正しい招待種別の値を含む', () => {
      const inviteTypes: InviteType[] = ['挙式', '披露宴', '二次会'];

      expect(inviteTypes).toContain('挙式');
      expect(inviteTypes).toContain('披露宴');
      expect(inviteTypes).toContain('二次会');
      expect(inviteTypes).toHaveLength(3);
    });
  });

  describe('AutofillConfig', () => {
    it('正しい構造を持つAutofillConfigオブジェクトを作成できる', () => {
      const config: AutofillConfig = {
        fieldId: 'guest-1',
        name: true,
        kana: false,
      };

      expect(config.fieldId).toBe('guest-1');
      expect(config.name).toBe(true);
      expect(config.kana).toBe(false);
    });
  });

  describe('GuestBase', () => {
    it('正しい構造を持つGuestBaseオブジェクトを作成できる', () => {
      const guest: GuestBase = {
        name: 'テスト太郎',
        kana: 'テストタロウ',
        dear: 'テスト太郎様',
        message: 'おめでとうございます！' as TrustedHTML,
        invite: ['挙式', '披露宴'],
        autofill: {
          fieldId: 'guest-1',
          name: true,
          kana: true,
        },
      };

      expect(guest.name).toBe('テスト太郎');
      expect(guest.kana).toBe('テストタロウ');
      expect(guest.dear).toBe('テスト太郎様');
      expect(guest.message).toBe('おめでとうございます！');
      expect(guest.invite).toEqual(['挙式', '披露宴']);
      expect(guest.autofill).toBeDefined();
    });

    it('オプショナルフィールドなしでGuestBaseオブジェクトを作成できる', () => {
      const guest: GuestBase = {
        name: 'テスト太郎',
        invite: ['挙式'],
      };

      expect(guest.name).toBe('テスト太郎');
      expect(guest.invite).toEqual(['挙式']);
      expect(guest.kana).toBeUndefined();
      expect(guest.dear).toBeUndefined();
      expect(guest.message).toBeUndefined();
      expect(guest.autofill).toBeUndefined();
    });
  });

  describe('GuestContent', () => {
    it('正しい構造を持つGuestContentオブジェクトを作成できる', () => {
      const guest: GuestContent = {
        id: 'guest-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト太郎',
        kana: 'テストタロウ',
        dear: 'テスト太郎様',
        message: 'おめでとうございます！' as TrustedHTML,
        invite: ['挙式', '披露宴'],
        autofill: {
          fieldId: 'guest-1',
          name: true,
          kana: true,
        },
        family: [],
      };

      expect(guest.id).toBe('guest-1');
      expect(guest.name).toBe('テスト太郎');
      expect(guest.family).toEqual([]);
    });
  });

  describe('GuestContentReference', () => {
    it('正しい構造を持つGuestContentReferenceオブジェクトを作成できる', () => {
      const reference: GuestContentReference = {
        id: 'guest-ref-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト花子',
        invite: ['披露宴'],
        family: [],
      };

      expect(reference.id).toBe('guest-ref-1');
      expect(reference.name).toBe('テスト花子');
      expect(reference.invite).toEqual(['披露宴']);
    });
  });

  describe('DearBlockData', () => {
    it('正しい構造を持つDearBlockDataオブジェクトを作成できる', () => {
      const dearBlock: DearBlockData = {
        guestName: 'テスト太郎',
        kana: 'テストタロウ',
        dear: 'テスト太郎様',
        message: 'おめでとうございます！' as TrustedHTML,
        inviteTypes: ['挙式', '披露宴'],
        autofill: {
          fieldId: 'guest-1',
          name: true,
          kana: true,
        },
        familyMembers: [],
      };

      expect(dearBlock.guestName).toBe('テスト太郎');
      expect(dearBlock.kana).toBe('テストタロウ');
      expect(dearBlock.dear).toBe('テスト太郎様');
      expect(dearBlock.message).toBe('おめでとうございます！');
      expect(dearBlock.inviteTypes).toEqual(['挙式', '披露宴']);
      expect(dearBlock.familyMembers).toEqual([]);
    });
  });

  describe('convertToDearBlockData', () => {
    it('GuestContentをDearBlockDataに正しく変換する', () => {
      const guestContent: GuestContent = {
        id: 'guest-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト太郎',
        kana: 'テストタロウ',
        dear: 'テスト太郎様',
        message: 'おめでとうございます！' as TrustedHTML,
        invite: ['挙式', '披露宴'],
        autofill: {
          fieldId: 'guest-1',
          name: true,
          kana: true,
        },
        family: [],
      };

      const result = convertToDearBlockData(guestContent);

      expect(result.guestName).toBe('テスト太郎');
      expect(result.kana).toBe('テストタロウ');
      expect(result.dear).toBe('テスト太郎様');
      expect(result.message).toBe('おめでとうございます！');
      expect(result.inviteTypes).toEqual(['挙式', '披露宴']);
      expect(result.autofill).toEqual({
        fieldId: 'guest-1',
        name: true,
        kana: true,
      });
      expect(result.familyMembers).toEqual([]);
    });

    it('dearが未設定の場合、名前をdearとして使用する', () => {
      const guestContent: GuestContent = {
        id: 'guest-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト太郎',
        invite: ['挙式'],
        family: [],
      };

      const result = convertToDearBlockData(guestContent);

      expect(result.dear).toBe('テスト太郎');
    });

    it('messageが未設定の場合、空文字をmessageとして使用する', () => {
      const guestContent: GuestContent = {
        id: 'guest-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト太郎',
        invite: ['挙式'],
        family: [],
      };

      const result = convertToDearBlockData(guestContent);

      expect(result.message).toBe('');
    });

    it('家族情報を正しく変換する', () => {
      const familyMember: GuestContentReference = {
        id: 'guest-2',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト花子',
        invite: ['披露宴'],
        family: [],
      };

      const guestContent: GuestContent = {
        id: 'guest-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト太郎',
        invite: ['挙式'],
        family: [familyMember],
      };

      const result = convertToDearBlockData(guestContent);

      expect(result.familyMembers).toHaveLength(1);
      expect(result.familyMembers[0].guestName).toBe('テスト花子');
      expect(result.familyMembers[0].dear).toBe('テスト花子');
      expect(result.familyMembers[0].message).toBe('');
      expect(result.familyMembers[0].inviteTypes).toEqual(['披露宴']);
      expect(result.familyMembers[0].familyMembers).toEqual([]);
    });

    it('複雑な家族構造を正しく変換する', () => {
      const grandChild: GuestContentReference = {
        id: 'guest-3',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト孫',
        invite: ['二次会'],
        family: [],
      };

      const child: GuestContentReference = {
        id: 'guest-2',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト花子',
        invite: ['披露宴'],
        family: [grandChild],
      };

      const guestContent: GuestContent = {
        id: 'guest-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        name: 'テスト太郎',
        invite: ['挙式'],
        family: [child],
      };

      const result = convertToDearBlockData(guestContent);

      expect(result.familyMembers).toHaveLength(1);
      expect(result.familyMembers[0].guestName).toBe('テスト花子');
      expect(result.familyMembers[0].familyMembers).toEqual([]); // ネストした家族情報は空配列
    });
  });
});
