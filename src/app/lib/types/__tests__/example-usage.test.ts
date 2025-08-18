/**
 * @description 型定義と定数の使用例のテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { TypeDefinitionExample } from '../example-usage';
import {
  GuestContent,
  DearBlockData,
  InviteType,
  AutofillConfig,
} from '../microcms';

describe('TypeDefinitionExample', () => {
  describe('createGuestContentExample', () => {
    it('正しい構造を持つGuestContentオブジェクトを作成する', () => {
      const result = TypeDefinitionExample.createGuestContentExample();

      expect(result).toHaveProperty('id', 'guest-1');
      expect(result).toHaveProperty('name', 'テスト太郎');
      expect(result).toHaveProperty('kana', 'テストタロウ');
      expect(result).toHaveProperty('dear', 'テスト太郎様');
      expect(result).toHaveProperty('message', 'おめでとうございます！');
      expect(result).toHaveProperty('invite');
      expect(result).toHaveProperty('autofill');
      expect(result).toHaveProperty('family');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
      expect(result).toHaveProperty('publishedAt');
    });

    it('招待種別が正しく設定される', () => {
      const result = TypeDefinitionExample.createGuestContentExample();

      expect(result.invite).toEqual(['挙式', '披露宴']);
      expect(result.invite).toHaveLength(2);
    });

    it('自動入力設定が正しく設定される', () => {
      const result = TypeDefinitionExample.createGuestContentExample();

      expect(result.autofill).toBeDefined();
      if (result.autofill) {
        expect(result.autofill.fieldId).toBe('guest-1');
        expect(result.autofill.name).toBe(true);
        expect(result.autofill.kana).toBe(true);
      }
    });

    it('家族情報が空配列で初期化される', () => {
      const result = TypeDefinitionExample.createGuestContentExample();

      expect(result.family).toEqual([]);
    });

    it('日時情報がISO文字列形式で設定される', () => {
      const result = TypeDefinitionExample.createGuestContentExample();

      expect(result.createdAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      );
      expect(result.updatedAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      );
      expect(result.publishedAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      );
    });
  });

  describe('createDearBlockDataExample', () => {
    it('正しい構造を持つDearBlockDataオブジェクトを作成する', () => {
      const result = TypeDefinitionExample.createDearBlockDataExample();

      expect(result).toHaveProperty('guestName', 'テスト太郎');
      expect(result).toHaveProperty('kana', 'テストタロウ');
      expect(result).toHaveProperty('dear', 'テスト太郎様');
      expect(result).toHaveProperty('message', 'おめでとうございます！');
      expect(result).toHaveProperty('inviteTypes');
      expect(result).toHaveProperty('autofill');
      expect(result).toHaveProperty('familyMembers');
    });

    it('招待種別が正しく設定される', () => {
      const result = TypeDefinitionExample.createDearBlockDataExample();

      expect(result.inviteTypes).toEqual(['挙式', '披露宴']);
      expect(result.inviteTypes).toHaveLength(2);
    });

    it('自動入力設定が正しく設定される', () => {
      const result = TypeDefinitionExample.createDearBlockDataExample();

      expect(result.autofill).toBeDefined();
      if (result.autofill) {
        expect(result.autofill.fieldId).toBe('guest-1');
        expect(result.autofill.name).toBe(true);
        expect(result.autofill.kana).toBe(true);
      }
    });

    it('家族情報が空配列で初期化される', () => {
      const result = TypeDefinitionExample.createDearBlockDataExample();

      expect(result.familyMembers).toEqual([]);
    });
  });

  describe('createInviteTypeExample', () => {
    it('全ての招待種別を含む配列を返す', () => {
      const result = TypeDefinitionExample.createInviteTypeExample();

      expect(result).toEqual(['挙式', '披露宴', '二次会']);
      expect(result).toHaveLength(3);
    });

    it('各招待種別が正しい値を持つ', () => {
      const result = TypeDefinitionExample.createInviteTypeExample();

      expect(result[0]).toBe('挙式');
      expect(result[1]).toBe('披露宴');
      expect(result[2]).toBe('二次会');
    });
  });

  describe('createAutofillConfigExample', () => {
    it('正しい構造を持つAutofillConfigオブジェクトを作成する', () => {
      const result = TypeDefinitionExample.createAutofillConfigExample();

      expect(result).toHaveProperty('fieldId', 'guest-1');
      expect(result).toHaveProperty('name', true);
      expect(result).toHaveProperty('kana', true);
    });

    it('フィールドIDが正しく設定される', () => {
      const result = TypeDefinitionExample.createAutofillConfigExample();

      expect(result.fieldId).toBe('guest-1');
    });

    it('自動入力設定が正しく設定される', () => {
      const result = TypeDefinitionExample.createAutofillConfigExample();

      expect(result.name).toBe(true);
      expect(result.kana).toBe(true);
    });
  });

  describe('型の整合性', () => {
    it('createGuestContentExampleの戻り値がGuestContent型に適合する', () => {
      const result = TypeDefinitionExample.createGuestContentExample();

      // TypeScriptの型チェックを通過することを確認
      const guestContent: GuestContent = result;
      expect(guestContent).toBeDefined();
    });

    it('createDearBlockDataExampleの戻り値がDearBlockData型に適合する', () => {
      const result = TypeDefinitionExample.createDearBlockDataExample();

      // TypeScriptの型チェックを通過することを確認
      const dearBlockData: DearBlockData = result;
      expect(dearBlockData).toBeDefined();
    });

    it('createInviteTypeExampleの戻り値がInviteType[]型に適合する', () => {
      const result = TypeDefinitionExample.createInviteTypeExample();

      // TypeScriptの型チェックを通過することを確認
      const inviteTypes: InviteType[] = result;
      expect(inviteTypes).toBeDefined();
    });

    it('createAutofillConfigExampleの戻り値がAutofillConfig型に適合する', () => {
      const result = TypeDefinitionExample.createAutofillConfigExample();

      // TypeScriptの型チェックを通過することを確認
      const autofillConfig: AutofillConfig = result;
      expect(autofillConfig).toBeDefined();
    });
  });

  describe('createConvertedDataExample', () => {
    it('convertToDearBlockData関数を使用してデータを変換する', () => {
      const result = TypeDefinitionExample.createConvertedDataExample();

      expect(result).toBeDefined();
      expect(result).toHaveProperty('guestName', 'テスト太郎');
      expect(result).toHaveProperty('kana', 'テストタロウ');
      expect(result).toHaveProperty('dear', 'テスト太郎様');
      expect(result).toHaveProperty('message', 'おめでとうございます！');
      expect(result).toHaveProperty('inviteTypes');
      expect(result).toHaveProperty('autofill');
      expect(result).toHaveProperty('familyMembers');
    });

    it('変換されたデータがDearBlockData型に適合する', () => {
      const result = TypeDefinitionExample.createConvertedDataExample();

      // TypeScriptの型チェックを通過することを確認
      const dearBlockData: DearBlockData = result;
      expect(dearBlockData).toBeDefined();
    });

    it('元のGuestContentと変換後のDearBlockDataが一致する', () => {
      const originalData = TypeDefinitionExample.createGuestContentExample();
      const convertedData = TypeDefinitionExample.createConvertedDataExample();

      expect(convertedData.guestName).toBe(originalData.name);
      expect(convertedData.kana).toBe(originalData.kana);
      expect(convertedData.dear).toBe(originalData.dear);
      expect(convertedData.message).toBe(originalData.message);
      expect(convertedData.inviteTypes).toEqual(originalData.invite);
    });
  });

  describe('getConstantsExample', () => {
    it('全ての定数オブジェクトを含むオブジェクトを返す', () => {
      const result = TypeDefinitionExample.getConstantsExample();

      expect(result).toBeDefined();
      expect(result).toHaveProperty('appConfig');
      expect(result).toHaveProperty('breakpoints');
      expect(result).toHaveProperty('sectionIds');
      expect(result).toHaveProperty('rsvpStatus');
      expect(result).toHaveProperty('eventInfo');
      expect(result).toHaveProperty('imagePaths');
      expect(result).toHaveProperty('apiConfig');
      expect(result).toHaveProperty('formConfig');
      expect(result).toHaveProperty('animationConfig');
      expect(result).toHaveProperty('colors');
      expect(result).toHaveProperty('navigationConfig');
      expect(result).toHaveProperty('countdownConfig');
      expect(result).toHaveProperty('galleryConfig');
      expect(result).toHaveProperty('messageConfig');
      expect(result).toHaveProperty('hostConfig');
      expect(result).toHaveProperty('errorMessages');
      expect(result).toHaveProperty('successMessages');
      expect(result).toHaveProperty('validationConfig');
      expect(result).toHaveProperty('performanceConfig');
      expect(result).toHaveProperty('accessibilityConfig');
    });

    it('各定数が正しく定義されている', () => {
      const result = TypeDefinitionExample.getConstantsExample();

      // 重要な定数が存在することを確認
      expect(result.appConfig).toBeDefined();
      expect(result.breakpoints).toBeDefined();
      expect(result.sectionIds).toBeDefined();
      expect(result.rsvpStatus).toBeDefined();
      expect(result.eventInfo).toBeDefined();
      expect(result.imagePaths).toBeDefined();
      expect(result.apiConfig).toBeDefined();
      expect(result.formConfig).toBeDefined();
      expect(result.animationConfig).toBeDefined();
      expect(result.colors).toBeDefined();
    });

    it('設定系の定数が正しく定義されている', () => {
      const result = TypeDefinitionExample.getConstantsExample();

      // 設定系定数の存在確認
      expect(result.navigationConfig).toBeDefined();
      expect(result.countdownConfig).toBeDefined();
      expect(result.galleryConfig).toBeDefined();
      expect(result.messageConfig).toBeDefined();
      expect(result.hostConfig).toBeDefined();
      expect(result.errorMessages).toBeDefined();
      expect(result.successMessages).toBeDefined();
      expect(result.validationConfig).toBeDefined();
      expect(result.performanceConfig).toBeDefined();
      expect(result.accessibilityConfig).toBeDefined();
    });
  });

  describe('データの一貫性', () => {
    it('GuestContentとDearBlockDataの対応するフィールドが一致する', () => {
      const guestContent = TypeDefinitionExample.createGuestContentExample();
      const dearBlockData = TypeDefinitionExample.createDearBlockDataExample();

      expect(guestContent.name).toBe(dearBlockData.guestName);
      expect(guestContent.kana).toBe(dearBlockData.kana);
      expect(guestContent.dear).toBe(dearBlockData.dear);
      expect(guestContent.message).toBe(dearBlockData.message);
      expect(guestContent.invite).toEqual(dearBlockData.inviteTypes);
    });

    it('招待種別の配列が一貫している', () => {
      const inviteTypes = TypeDefinitionExample.createInviteTypeExample();
      const guestContent = TypeDefinitionExample.createGuestContentExample();
      const dearBlockData = TypeDefinitionExample.createDearBlockDataExample();

      expect(inviteTypes).toContain(guestContent.invite[0]);
      expect(inviteTypes).toContain(guestContent.invite[1]);
      expect(inviteTypes).toContain(dearBlockData.inviteTypes[0]);
      expect(inviteTypes).toContain(dearBlockData.inviteTypes[1]);
    });

    it('自動入力設定の一貫性', () => {
      const autofillConfig =
        TypeDefinitionExample.createAutofillConfigExample();
      const guestContent = TypeDefinitionExample.createGuestContentExample();
      const dearBlockData = TypeDefinitionExample.createDearBlockDataExample();

      if (guestContent.autofill && dearBlockData.autofill) {
        expect(guestContent.autofill.fieldId).toBe(autofillConfig.fieldId);
        expect(dearBlockData.autofill.fieldId).toBe(autofillConfig.fieldId);
        expect(guestContent.autofill.name).toBe(autofillConfig.name);
        expect(dearBlockData.autofill.name).toBe(autofillConfig.name);
        expect(guestContent.autofill.kana).toBe(autofillConfig.kana);
        expect(dearBlockData.autofill.kana).toBe(autofillConfig.kana);
      }
    });

    it('変換関数を使用したデータの一貫性', () => {
      const convertedData = TypeDefinitionExample.createConvertedDataExample();
      const directData = TypeDefinitionExample.createDearBlockDataExample();

      // 変換関数を使用したデータと直接作成されたデータの一貫性確認
      expect(convertedData.guestName).toBe(directData.guestName);
      expect(convertedData.kana).toBe(directData.kana);
      expect(convertedData.dear).toBe(directData.dear);
      expect(convertedData.message).toBe(directData.message);
      expect(convertedData.inviteTypes).toEqual(directData.inviteTypes);
    });
  });
});
