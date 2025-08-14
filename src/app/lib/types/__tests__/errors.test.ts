/**
 * @description エラー型定義のテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  ErrorType,
  ErrorSeverity,
  BaseError,
  ApiError,
  FormError,
  NetworkError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ServerError,
  UnknownError,
  AppError,
  ErrorResponse,
  SuccessResponse,
  ApiResponse,
  CreateErrorOptions,
  CreateApiErrorOptions,
  CreateFormErrorOptions,
} from '../errors';

describe('Error Type Definitions', () => {
  describe('ErrorType', () => {
    it('正しいエラータイプの値を含む', () => {
      const errorTypes = Object.values(ErrorType);

      expect(errorTypes).toContain(ErrorType.API_ERROR);
      expect(errorTypes).toContain(ErrorType.FORM_ERROR);
      expect(errorTypes).toContain(ErrorType.VALIDATION_ERROR);
      expect(errorTypes).toContain(ErrorType.NETWORK_ERROR);
      expect(errorTypes).toContain(ErrorType.AUTHENTICATION_ERROR);
      expect(errorTypes).toContain(ErrorType.AUTHORIZATION_ERROR);
      expect(errorTypes).toContain(ErrorType.NOT_FOUND_ERROR);
      expect(errorTypes).toContain(ErrorType.SERVER_ERROR);
      expect(errorTypes).toContain(ErrorType.UNKNOWN_ERROR);
    });
  });

  describe('ErrorSeverity', () => {
    it('正しい重要度の値を含む', () => {
      const severities = Object.values(ErrorSeverity);

      expect(severities).toContain(ErrorSeverity.LOW);
      expect(severities).toContain(ErrorSeverity.MEDIUM);
      expect(severities).toContain(ErrorSeverity.HIGH);
      expect(severities).toContain(ErrorSeverity.CRITICAL);
    });
  });

  describe('BaseError', () => {
    it('正しい構造を持つBaseErrorオブジェクトを作成できる', () => {
      const error: BaseError = {
        type: ErrorType.UNKNOWN_ERROR,
        message: 'テストエラー',
        severity: ErrorSeverity.MEDIUM,
        code: 'TEST_ERROR',
        location: 'test.ts',
        details: { reason: 'test' },
        timestamp: new Date(),
        userMessage: 'テスト用エラーメッセージ',
      };

      expect(error.type).toBe(ErrorType.UNKNOWN_ERROR);
      expect(error.message).toBe('テストエラー');
      expect(error.severity).toBe(ErrorSeverity.MEDIUM);
      expect(error.code).toBe('TEST_ERROR');
      expect(error.location).toBe('test.ts');
      expect(error.details).toEqual({ reason: 'test' });
      expect(error.timestamp).toBeInstanceOf(Date);
      expect(error.userMessage).toBe('テスト用エラーメッセージ');
    });

    it('オプショナルフィールドなしでBaseErrorオブジェクトを作成できる', () => {
      const error: BaseError = {
        type: ErrorType.UNKNOWN_ERROR,
        message: 'テストエラー',
        severity: ErrorSeverity.MEDIUM,
        timestamp: new Date(),
      };

      expect(error.type).toBe(ErrorType.UNKNOWN_ERROR);
      expect(error.message).toBe('テストエラー');
      expect(error.severity).toBe(ErrorSeverity.MEDIUM);
      expect(error.timestamp).toBeInstanceOf(Date);
      expect(error.code).toBeUndefined();
      expect(error.location).toBeUndefined();
      expect(error.details).toBeUndefined();
      expect(error.userMessage).toBeUndefined();
    });
  });

  describe('ApiError', () => {
    it('正しい構造を持つApiErrorオブジェクトを作成できる', () => {
      const error: ApiError = {
        type: ErrorType.API_ERROR,
        message: 'APIエラー',
        severity: ErrorSeverity.HIGH,
        timestamp: new Date(),
        statusCode: 500,
        endpoint: '/api/test',
        requestId: 'req-123',
        responseData: { error: 'Internal Server Error' },
      };

      expect(error.type).toBe(ErrorType.API_ERROR);
      expect(error.statusCode).toBe(500);
      expect(error.endpoint).toBe('/api/test');
      expect(error.requestId).toBe('req-123');
      expect(error.responseData).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('FormError', () => {
    it('正しい構造を持つFormErrorオブジェクトを作成できる', () => {
      const error: FormError = {
        type: ErrorType.FORM_ERROR,
        message: 'フォームエラー',
        severity: ErrorSeverity.MEDIUM,
        timestamp: new Date(),
        field: 'email',
        validationRule: 'required',
        inputValue: 'invalid-email',
      };

      expect(error.type).toBe(ErrorType.FORM_ERROR);
      expect(error.field).toBe('email');
      expect(error.validationRule).toBe('required');
      expect(error.inputValue).toBe('invalid-email');
    });

    it('VALIDATION_ERRORタイプのFormErrorを作成できる', () => {
      const error: FormError = {
        type: ErrorType.VALIDATION_ERROR,
        message: 'バリデーションエラー',
        severity: ErrorSeverity.MEDIUM,
        timestamp: new Date(),
        field: 'password',
        validationRule: 'minLength',
        inputValue: '123',
      };

      expect(error.type).toBe(ErrorType.VALIDATION_ERROR);
      expect(error.field).toBe('password');
      expect(error.validationRule).toBe('minLength');
    });
  });

  describe('NetworkError', () => {
    it('正しい構造を持つNetworkErrorオブジェクトを作成できる', () => {
      const error: NetworkError = {
        type: ErrorType.NETWORK_ERROR,
        message: 'ネットワークエラー',
        severity: ErrorSeverity.HIGH,
        timestamp: new Date(),
        url: 'https://api.example.com',
        networkErrorType: 'timeout',
      };

      expect(error.type).toBe(ErrorType.NETWORK_ERROR);
      expect(error.url).toBe('https://api.example.com');
      expect(error.networkErrorType).toBe('timeout');
    });
  });

  describe('AuthenticationError', () => {
    it('正しい構造を持つAuthenticationErrorオブジェクトを作成できる', () => {
      const error: AuthenticationError = {
        type: ErrorType.AUTHENTICATION_ERROR,
        message: '認証エラー',
        severity: ErrorSeverity.HIGH,
        timestamp: new Date(),
        authMethod: 'jwt',
        token: 'expired-token',
      };

      expect(error.type).toBe(ErrorType.AUTHENTICATION_ERROR);
      expect(error.authMethod).toBe('jwt');
      expect(error.token).toBe('expired-token');
    });
  });

  describe('AuthorizationError', () => {
    it('正しい構造を持つAuthorizationErrorオブジェクトを作成できる', () => {
      const error: AuthorizationError = {
        type: ErrorType.AUTHORIZATION_ERROR,
        message: '認可エラー',
        severity: ErrorSeverity.HIGH,
        timestamp: new Date(),
        requiredPermission: 'admin',
        currentPermission: 'user',
      };

      expect(error.type).toBe(ErrorType.AUTHORIZATION_ERROR);
      expect(error.requiredPermission).toBe('admin');
      expect(error.currentPermission).toBe('user');
    });
  });

  describe('NotFoundError', () => {
    it('正しい構造を持つNotFoundErrorオブジェクトを作成できる', () => {
      const error: NotFoundError = {
        type: ErrorType.NOT_FOUND_ERROR,
        message: 'リソースが見つかりません',
        severity: ErrorSeverity.MEDIUM,
        timestamp: new Date(),
        resource: 'user',
        resourceId: '123',
      };

      expect(error.type).toBe(ErrorType.NOT_FOUND_ERROR);
      expect(error.resource).toBe('user');
      expect(error.resourceId).toBe('123');
    });
  });

  describe('ServerError', () => {
    it('正しい構造を持つServerErrorオブジェクトを作成できる', () => {
      const error: ServerError = {
        type: ErrorType.SERVER_ERROR,
        message: 'サーバーエラー',
        severity: ErrorSeverity.CRITICAL,
        timestamp: new Date(),
        serverErrorCode: 'E500',
        serverLogId: 'log-123',
      };

      expect(error.type).toBe(ErrorType.SERVER_ERROR);
      expect(error.serverErrorCode).toBe('E500');
      expect(error.serverLogId).toBe('log-123');
    });
  });

  describe('UnknownError', () => {
    it('正しい構造を持つUnknownErrorオブジェクトを作成できる', () => {
      const originalError = new Error('Original error');
      const error: UnknownError = {
        type: ErrorType.UNKNOWN_ERROR,
        message: '未知のエラー',
        severity: ErrorSeverity.MEDIUM,
        timestamp: new Date(),
        originalError,
      };

      expect(error.type).toBe(ErrorType.UNKNOWN_ERROR);
      expect(error.originalError).toBe(originalError);
    });
  });

  describe('AppError', () => {
    it('異なるエラータイプをAppErrorとして扱える', () => {
      const errors: AppError[] = [
        {
          type: ErrorType.API_ERROR,
          message: 'APIエラー',
          severity: ErrorSeverity.HIGH,
          timestamp: new Date(),
          statusCode: 500,
        },
        {
          type: ErrorType.FORM_ERROR,
          message: 'フォームエラー',
          severity: ErrorSeverity.MEDIUM,
          timestamp: new Date(),
          field: 'email',
        },
        {
          type: ErrorType.NETWORK_ERROR,
          message: 'ネットワークエラー',
          severity: ErrorSeverity.HIGH,
          timestamp: new Date(),
          url: 'https://api.example.com',
        },
      ];

      expect(errors).toHaveLength(3);
      expect(errors[0].type).toBe(ErrorType.API_ERROR);
      expect(errors[1].type).toBe(ErrorType.FORM_ERROR);
      expect(errors[2].type).toBe(ErrorType.NETWORK_ERROR);
    });
  });

  describe('ErrorResponse', () => {
    it('正しい構造を持つErrorResponseオブジェクトを作成できる', () => {
      const error: ApiError = {
        type: ErrorType.API_ERROR,
        message: 'APIエラー',
        severity: ErrorSeverity.HIGH,
        timestamp: new Date(),
        statusCode: 500,
      };

      const response: ErrorResponse = {
        error,
        success: false,
        responseId: 'resp-123',
      };

      expect(response.success).toBe(false);
      expect(response.error).toBe(error);
      expect(response.responseId).toBe('resp-123');
    });
  });

  describe('SuccessResponse', () => {
    it('正しい構造を持つSuccessResponseオブジェクトを作成できる', () => {
      const data = { id: 1, name: 'test' };
      const response: SuccessResponse<typeof data> = {
        data,
        success: true,
        responseId: 'resp-123',
      };

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.responseId).toBe('resp-123');
    });

    it('ジェネリック型なしでSuccessResponseオブジェクトを作成できる', () => {
      const response: SuccessResponse = {
        data: 'test data',
        success: true,
      };

      expect(response.success).toBe(true);
      expect(response.data).toBe('test data');
      expect(response.responseId).toBeUndefined();
    });
  });

  describe('ApiResponse', () => {
    it('SuccessResponseとErrorResponseの両方をApiResponseとして扱える', () => {
      const successResponse: ApiResponse<string> = {
        data: 'success',
        success: true,
      };

      const errorResponse: ApiResponse<string> = {
        error: {
          type: ErrorType.API_ERROR,
          message: 'エラー',
          severity: ErrorSeverity.MEDIUM,
          timestamp: new Date(),
          statusCode: 400,
        },
        success: false,
      };

      expect(successResponse.success).toBe(true);
      expect(errorResponse.success).toBe(false);
    });
  });

  describe('CreateErrorOptions', () => {
    it('正しい構造を持つCreateErrorOptionsオブジェクトを作成できる', () => {
      const options: CreateErrorOptions = {
        message: 'テストエラー',
        severity: ErrorSeverity.MEDIUM,
        code: 'TEST_ERROR',
        location: 'test.ts',
        details: { reason: 'test' },
        userMessage: 'テスト用エラーメッセージ',
      };

      expect(options.message).toBe('テストエラー');
      expect(options.severity).toBe(ErrorSeverity.MEDIUM);
      expect(options.code).toBe('TEST_ERROR');
      expect(options.location).toBe('test.ts');
      expect(options.details).toEqual({ reason: 'test' });
      expect(options.userMessage).toBe('テスト用エラーメッセージ');
    });
  });

  describe('CreateApiErrorOptions', () => {
    it('正しい構造を持つCreateApiErrorOptionsオブジェクトを作成できる', () => {
      const options: CreateApiErrorOptions = {
        message: 'APIエラー',
        severity: ErrorSeverity.HIGH,
        statusCode: 500,
        endpoint: '/api/test',
        requestId: 'req-123',
        responseData: { error: 'Internal Server Error' },
      };

      expect(options.message).toBe('APIエラー');
      expect(options.severity).toBe(ErrorSeverity.HIGH);
      expect(options.statusCode).toBe(500);
      expect(options.endpoint).toBe('/api/test');
      expect(options.requestId).toBe('req-123');
      expect(options.responseData).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('CreateFormErrorOptions', () => {
    it('正しい構造を持つCreateFormErrorOptionsオブジェクトを作成できる', () => {
      const options: CreateFormErrorOptions = {
        message: 'フォームエラー',
        severity: ErrorSeverity.MEDIUM,
        field: 'email',
        validationRule: 'required',
        inputValue: 'invalid-email',
      };

      expect(options.message).toBe('フォームエラー');
      expect(options.severity).toBe(ErrorSeverity.MEDIUM);
      expect(options.field).toBe('email');
      expect(options.validationRule).toBe('required');
      expect(options.inputValue).toBe('invalid-email');
    });
  });
});
