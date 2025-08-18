/**
 * @description フォームエラーハンドリングユーティリティのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  createFormError,
  createValidationError,
  getDefaultFormUserMessage,
  getDefaultValidationUserMessage,
  getFormErrorSeverity,
  groupErrorsByField,
  hasFormErrors,
  getFieldErrors,
  logFormError,
  logFormErrors,
} from '../form';
import { ErrorSeverity, ErrorType } from '../../types/errors';

describe('Form Error Handling Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createFormError', () => {
    it('基本的なフォームエラーを作成する', () => {
      const error = createFormError({
        message: '必須項目が入力されていません',
        field: 'name',
        validationRule: 'required',
      });

      expect(error.type).toBe(ErrorType.FORM_ERROR);
      expect(error.message).toBe('必須項目が入力されていません');
      expect(error.field).toBe('name');
      expect(error.validationRule).toBe('required');
      expect(error.severity).toBe(ErrorSeverity.MEDIUM);
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it('カスタムオプションでフォームエラーを作成する', () => {
      const error = createFormError({
        message: 'カスタムエラー',
        severity: ErrorSeverity.HIGH,
        code: 'CUSTOM_ERROR',
        location: 'test.ts',
        details: { reason: 'test' },
        userMessage: 'カスタムメッセージ',
        field: 'custom',
        validationRule: 'custom',
        inputValue: 'test value',
      });

      expect(error.severity).toBe(ErrorSeverity.HIGH);
      expect(error.code).toBe('CUSTOM_ERROR');
      expect(error.location).toBe('test.ts');
      expect(error.details).toEqual({ reason: 'test' });
      expect(error.userMessage).toBe('カスタムメッセージ');
      expect(error.inputValue).toBe('test value');
    });

    it('デフォルトのユーザーメッセージを設定する', () => {
      const error = createFormError({
        message: 'テストエラー',
        field: 'email',
        validationRule: 'required',
      });

      expect(error.userMessage).toBe('メールアドレスを入力してください。');
    });
  });

  describe('createValidationError', () => {
    it('基本的なバリデーションエラーを作成する', () => {
      const error = createValidationError({
        message: 'メールアドレスの形式が正しくありません',
        field: 'email',
        validationRule: 'email',
      });

      expect(error.type).toBe(ErrorType.VALIDATION_ERROR);
      expect(error.message).toBe('メールアドレスの形式が正しくありません');
      expect(error.field).toBe('email');
      expect(error.validationRule).toBe('email');
    });

    it('カスタムオプションでバリデーションエラーを作成する', () => {
      const error = createValidationError({
        message: 'カスタムバリデーションエラー',
        severity: ErrorSeverity.HIGH,
        code: 'CUSTOM_VALIDATION',
        location: 'test.ts',
        details: { reason: 'test' },
        userMessage: 'カスタムバリデーションメッセージ',
        field: 'custom',
        validationRule: 'custom',
        inputValue: 'invalid value',
      });

      expect(error.severity).toBe(ErrorSeverity.HIGH);
      expect(error.code).toBe('CUSTOM_VALIDATION');
      expect(error.userMessage).toBe('カスタムバリデーションメッセージ');
      expect(error.inputValue).toBe('invalid value');
    });
  });

  describe('getDefaultFormUserMessage', () => {
    it('必須項目のデフォルトメッセージを返す', () => {
      expect(getDefaultFormUserMessage('name', 'required')).toBe(
        'お名前を入力してください。'
      );
      expect(getDefaultFormUserMessage('email', 'required')).toBe(
        'メールアドレスを入力してください。'
      );
    });

    it('メールアドレス形式のデフォルトメッセージを返す', () => {
      expect(getDefaultFormUserMessage('email', 'email')).toBe(
        'メールアドレスの形式が正しくありません。'
      );
    });

    it('電話番号形式のデフォルトメッセージを返す', () => {
      expect(getDefaultFormUserMessage('phone', 'phone')).toBe(
        '電話番号の形式が正しくありません。'
      );
    });

    it('郵便番号形式のデフォルトメッセージを返す', () => {
      expect(getDefaultFormUserMessage('postalCode', 'postalCode')).toBe(
        '郵便番号は7桁の数字で入力してください。'
      );
    });

    it('最大文字数エラーのデフォルトメッセージを返す', () => {
      expect(getDefaultFormUserMessage('name', 'maxLength')).toBe(
        'お名前が長すぎます。'
      );
    });

    it('最小文字数エラーのデフォルトメッセージを返す', () => {
      expect(getDefaultFormUserMessage('name', 'minLength')).toBe(
        'お名前が短すぎます。'
      );
    });

    it('パターンエラーのデフォルトメッセージを返す', () => {
      expect(getDefaultFormUserMessage('name', 'pattern')).toBe(
        'お名前の形式が正しくありません。'
      );
    });

    it('フィールド未指定時のデフォルトメッセージを返す', () => {
      expect(getDefaultFormUserMessage()).toBe('入力内容に問題があります。');
    });

    it('未知のフィールドとルールのデフォルトメッセージを返す', () => {
      expect(getDefaultFormUserMessage('unknown', 'unknown')).toBe(
        'unknownの入力内容をご確認ください。'
      );
    });
  });

  describe('getDefaultValidationUserMessage', () => {
    it('メールアドレスバリデーションのデフォルトメッセージを返す', () => {
      expect(getDefaultValidationUserMessage('email', 'email')).toBe(
        'メールアドレスの形式が正しくありません。'
      );
    });

    it('郵便番号バリデーションのデフォルトメッセージを返す', () => {
      expect(getDefaultValidationUserMessage('postalCode', 'postalCode')).toBe(
        '郵便番号は7桁の数字で入力してください。'
      );
    });

    it('電話番号バリデーションのデフォルトメッセージを返す', () => {
      expect(getDefaultValidationUserMessage('phone', 'phone')).toBe(
        '電話番号は正しい形式で入力してください。'
      );
    });

    it('最大文字数バリデーションのデフォルトメッセージを返す', () => {
      expect(getDefaultValidationUserMessage('name', 'maxLength')).toBe(
        'お名前は指定された文字数以内で入力してください。'
      );
    });

    it('最小文字数バリデーションのデフォルトメッセージを返す', () => {
      expect(getDefaultValidationUserMessage('name', 'minLength')).toBe(
        'お名前は指定された文字数以上で入力してください。'
      );
    });

    it('パターンバリデーションのデフォルトメッセージを返す', () => {
      expect(getDefaultValidationUserMessage('name', 'pattern')).toBe(
        'お名前の形式が正しくありません。'
      );
    });

    it('必須バリデーションのデフォルトメッセージを返す', () => {
      expect(getDefaultValidationUserMessage('name', 'required')).toBe(
        'お名前は必須項目です。'
      );
    });

    it('フィールド未指定時のデフォルトメッセージを返す', () => {
      expect(getDefaultValidationUserMessage()).toBe(
        '入力内容の形式が正しくありません。'
      );
    });

    it('未知のフィールドとルールのデフォルトメッセージを返す', () => {
      expect(getDefaultValidationUserMessage('unknown', 'unknown')).toBe(
        'unknownの入力内容をご確認ください。'
      );
    });
  });

  describe('getFormErrorSeverity', () => {
    it('必須項目の重要度を返す', () => {
      expect(getFormErrorSeverity('required')).toBe(ErrorSeverity.MEDIUM);
    });

    it('メールアドレスの重要度を返す', () => {
      expect(getFormErrorSeverity('email')).toBe(ErrorSeverity.MEDIUM);
    });

    it('文字数制限の重要度を返す', () => {
      expect(getFormErrorSeverity('maxLength')).toBe(ErrorSeverity.LOW);
      expect(getFormErrorSeverity('minLength')).toBe(ErrorSeverity.LOW);
    });

    it('未知のルールのデフォルト重要度を返す', () => {
      expect(getFormErrorSeverity('unknown')).toBe(ErrorSeverity.MEDIUM);
    });
  });

  describe('groupErrorsByField', () => {
    it('フィールド別にエラーをグループ化する', () => {
      const errors = [
        createFormError({ message: 'Error 1', field: 'name' }),
        createFormError({ message: 'Error 2', field: 'email' }),
        createFormError({ message: 'Error 3', field: 'email' }),
      ];
      const grouped = groupErrorsByField(errors);

      expect(grouped.name).toHaveLength(1);
      expect(grouped.email).toHaveLength(2);
      expect(grouped.name[0].message).toBe('Error 1');
      expect(grouped.email[0].message).toBe('Error 2');
      expect(grouped.email[1].message).toBe('Error 3');
    });

    it('フィールドが指定されていないエラーをunknownとしてグループ化する', () => {
      const errors = [createFormError({ message: 'Error 1' })];
      const grouped = groupErrorsByField(errors);

      expect(grouped.unknown).toHaveLength(1);
      expect(grouped.unknown[0].message).toBe('Error 1');
    });
  });

  describe('hasFormErrors', () => {
    it('エラーが存在する場合はtrueを返す', () => {
      const errors = [createFormError({ message: 'Error 1', field: 'name' })];
      expect(hasFormErrors(errors)).toBe(true);
    });

    it('エラーが存在しない場合はfalseを返す', () => {
      const errors: any[] = [];
      expect(hasFormErrors(errors)).toBe(false);
    });

    it('特定フィールドのエラーが存在する場合はtrueを返す', () => {
      const errors = [createFormError({ message: 'Error 1', field: 'name' })];
      expect(hasFormErrors(errors, 'name')).toBe(true);
    });

    it('特定フィールドのエラーが存在しない場合はfalseを返す', () => {
      const errors = [createFormError({ message: 'Error 1', field: 'name' })];
      expect(hasFormErrors(errors, 'email')).toBe(false);
    });
  });

  describe('getFieldErrors', () => {
    it('特定フィールドのエラーメッセージを取得する', () => {
      const errors = [
        createFormError({
          message: 'Error 1',
          field: 'name',
          userMessage: 'User Error 1',
        }),
        createFormError({
          message: 'Error 2',
          field: 'name',
          userMessage: 'User Error 2',
        }),
        createFormError({ message: 'Error 3', field: 'email' }),
      ];
      const fieldErrors = getFieldErrors(errors, 'name');

      expect(fieldErrors).toHaveLength(2);
      expect(fieldErrors).toContain('User Error 1');
      expect(fieldErrors).toContain('User Error 2');
    });

    it('フィールドが存在しない場合は空配列を返す', () => {
      const errors = [createFormError({ message: 'Error 1', field: 'name' })];
      const fieldErrors = getFieldErrors(errors, 'email');

      expect(fieldErrors).toHaveLength(0);
    });
  });

  describe('logFormError', () => {
    it('開発環境でエラーをログ出力する', async () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = createFormError({ message: 'Test Error', field: 'name' });

      await logFormError(error, { component: 'TestComponent' });

      expect(consoleSpy).toHaveBeenCalledWith('Form Error:', {
        formField: 'name',
        validationRule: undefined,
        inputValue: undefined,
        error: error,
        context: { component: 'TestComponent' },
      });

      consoleSpy.mockRestore();
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        writable: true,
      });
    });

    it('本番環境ではログ出力しない', async () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = createFormError({ message: 'Test Error', field: 'name' });

      await logFormError(error, { component: 'TestComponent' });

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        writable: true,
      });
    });
  });

  describe('logFormErrors', () => {
    it('開発環境で複数エラーをログ出力する', async () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const errors = [
        createFormError({ message: 'Error 1', field: 'name' }),
        createFormError({ message: 'Error 2', field: 'email' }),
      ];

      await logFormErrors(errors, { component: 'TestComponent' });

      expect(consoleSpy).toHaveBeenCalledWith('Form Errors:', {
        errors: errors,
        context: { component: 'TestComponent' },
      });

      consoleSpy.mockRestore();
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        writable: true,
      });
    });

    it('本番環境ではログ出力しない', async () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const errors = [createFormError({ message: 'Error 1', field: 'name' })];

      await logFormErrors(errors, { component: 'TestComponent' });

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        writable: true,
      });
    });
  });
});
