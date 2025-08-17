/**
 * @description エラーハンドリングユーティリティメインエクスポートのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

describe('Errors Index Exports', () => {
  describe('Basic Export Verification', () => {
    it('exports all functions from api.ts', async () => {
      const exports = await import('../index');

      // APIモジュールからエクスポートされる関数
      expect(typeof exports.createApiError).toBe('function');
      expect(typeof exports.createBaseError).toBe('function');
      expect(typeof exports.createErrorResponse).toBe('function');
      expect(typeof exports.createSuccessResponse).toBe('function');
      expect(typeof exports.generateRequestId).toBe('function');
      expect(typeof exports.getDefaultUserMessage).toBe('function');
      expect(typeof exports.getErrorSeverity).toBe('function');
      expect(typeof exports.handleApiResponse).toBe('function');
      expect(typeof exports.isRetryableError).toBe('function');
      expect(typeof exports.normalizeError).toBe('function');
      expect(typeof exports.safeFetch).toBe('function');
    });

    it('exports all functions from form.ts', async () => {
      const exports = await import('../index');

      // フォームモジュールからエクスポートされる関数
      expect(typeof exports.createFormError).toBe('function');
      expect(typeof exports.createValidationError).toBe('function');
      expect(typeof exports.getDefaultFormUserMessage).toBe('function');
      expect(typeof exports.getDefaultValidationUserMessage).toBe('function');
      expect(typeof exports.getFieldErrors).toBe('function');
      expect(typeof exports.getFormErrorSeverity).toBe('function');
      expect(typeof exports.groupErrorsByField).toBe('function');
      expect(typeof exports.hasFormErrors).toBe('function');
      expect(typeof exports.logFormError).toBe('function');
      expect(typeof exports.logFormErrors).toBe('function');
    });

    it('exports all functions from utils.ts', async () => {
      const exports = await import('../index');

      // ユーティリティモジュールからエクスポートされる関数
      expect(typeof exports.getUserFriendlyMessage).toBe('function');
      expect(typeof exports.logError).toBe('function');
      expect(typeof exports.stringifyError).toBe('function');
    });
  });

  describe('Function Functionality Tests', () => {
    it('createApiError function works correctly', async () => {
      const { createApiError } = await import('../index');

      const error = createApiError({
        message: 'Test API error',
        statusCode: 500,
        endpoint: '/test',
      });

      expect(error.message).toBe('Test API error');
      expect(error.statusCode).toBe(500);
      expect(error.endpoint).toBe('/test');
    });

    it('createFormError function works correctly', async () => {
      const { createFormError } = await import('../index');

      const error = createFormError({
        message: 'Test form error',
        field: 'testField',
      });

      expect(error.message).toBe('Test form error');
      expect(error.field).toBe('testField');
    });

    it('getUserFriendlyMessage function works correctly', async () => {
      const { getUserFriendlyMessage, createApiError } = await import(
        '../index'
      );

      const error = createApiError({
        message: 'Internal server error',
        statusCode: 500,
      });

      const friendlyMessage = getUserFriendlyMessage(error);
      expect(typeof friendlyMessage).toBe('string');
      expect(friendlyMessage.length).toBeGreaterThan(0);
    });

    it('stringifyError function works correctly', async () => {
      const { stringifyError } = await import('../index');

      const error = new Error('Test error');
      const stringified = stringifyError(error);

      expect(typeof stringified).toBe('string');
      expect(stringified).toContain('Test error');
    });
  });

  describe('Module Re-export Verification', () => {
    it('successfully re-exports from all three modules', async () => {
      const exports = await import('../index');

      // 各モジュールから少なくとも1つの関数がエクスポートされていることを確認
      const apiExports = ['createApiError', 'generateRequestId'];
      const formExports = ['createFormError', 'hasFormErrors'];
      const utilsExports = ['getUserFriendlyMessage', 'logError'];

      [...apiExports, ...formExports, ...utilsExports].forEach(exportName => {
        expect(exports).toHaveProperty(exportName);
        expect(typeof exports[exportName]).toBe('function');
      });
    });

    it('exports have correct function names', async () => {
      const exports = await import('../index');

      expect(exports.createApiError.name).toBe('createApiError');
      expect(exports.createFormError.name).toBe('createFormError');
      expect(exports.getUserFriendlyMessage.name).toBe(
        'getUserFriendlyMessage'
      );
      expect(exports.stringifyError.name).toBe('stringifyError');
    });
  });

  describe('Integration Tests', () => {
    it('can chain multiple error utilities together', async () => {
      const { createApiError, getUserFriendlyMessage, stringifyError } =
        await import('../index');

      // APIエラーを作成
      const apiError = createApiError({
        message: 'Database connection failed',
        statusCode: 503,
      });

      // ユーザーフレンドリーメッセージを取得
      const friendlyMessage = getUserFriendlyMessage(apiError);

      // エラーを文字列化
      const stringified = stringifyError(apiError);

      expect(typeof friendlyMessage).toBe('string');
      expect(typeof stringified).toBe('string');
      expect(friendlyMessage.length).toBeGreaterThan(0);
      expect(stringified.length).toBeGreaterThan(0);
    });

    it('can use form and API error utilities together', async () => {
      const { createFormError, createApiError, hasFormErrors } = await import(
        '../index'
      );

      const formError = createFormError({
        message: 'Required field missing',
        field: 'email',
      });

      const apiError = createApiError({
        message: 'Validation failed',
        statusCode: 400,
      });

      // フォームエラーチェック
      expect(hasFormErrors([formError])).toBe(true);
      expect(hasFormErrors([])).toBe(false);

      // エラーオブジェクトの基本検証
      expect(formError.message).toBe('Required field missing');
      expect(formError.field).toBe('email');
      expect(apiError.message).toBe('Validation failed');
      expect(apiError.statusCode).toBe(400);
    });
  });
});
