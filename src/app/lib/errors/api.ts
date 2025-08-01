/**
 * @description APIエラーハンドリング専用ユーティリティ
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  ApiError,
  ErrorSeverity,
  ErrorType,
  CreateApiErrorOptions,
  ErrorResponse,
  SuccessResponse,
  ApiResponse,
} from '@/app/lib/types/errors';
// Loggerはデバッグが必要な時だけ使用
// import { logError } from './utils';

/**
 * @description APIエラーオブジェクトを作成する
 * @param options - APIエラー作成オプション
 * @returns APIエラーオブジェクト
 * @example
 * ```typescript
 * const apiError = createApiError({
 *   message: 'API呼び出しに失敗しました',
 *   statusCode: 500,
 *   endpoint: '/api/rsvp'
 * });
 * ```
 */
export function createApiError(options: CreateApiErrorOptions): ApiError {
  const {
    message,
    statusCode,
    severity = ErrorSeverity.MEDIUM,
    code,
    location,
    details,
    userMessage,
    endpoint,
    requestId,
    responseData,
  } = options;

  return {
    type: ErrorType.API_ERROR,
    message,
    severity,
    code,
    location,
    details,
    timestamp: new Date(),
    userMessage: userMessage || getDefaultUserMessage(statusCode),
    statusCode,
    endpoint,
    requestId,
    responseData,
  };
}

/**
 * @description HTTPステータスコードに基づいてデフォルトのユーザーメッセージを取得する
 * @param statusCode - HTTPステータスコード
 * @returns ユーザーフレンドリーなメッセージ
 * @example
 * ```typescript
 * const message = getDefaultUserMessage(404);
 * // 結果: "お探しの情報が見つかりませんでした"
 * ```
 */
export function getDefaultUserMessage(statusCode: number): string {
  switch (statusCode) {
    case 400:
      return 'リクエストが正しくありません。入力内容をご確認ください。';
    case 401:
      return '認証が必要です。ログインしてください。';
    case 403:
      return 'アクセスが拒否されました。';
    case 404:
      return 'お探しの情報が見つかりませんでした。';
    case 409:
      return 'データの競合が発生しました。';
    case 422:
      return '入力データが正しくありません。';
    case 429:
      return 'リクエストが多すぎます。しばらく時間をおいてから再度お試しください。';
    case 500:
      return 'サーバーエラーが発生しました。しばらく時間をおいてから再度お試しください。';
    case 502:
      return 'サーバーが一時的に利用できません。しばらく時間をおいてから再度お試しください。';
    case 503:
      return 'サービスが一時的に利用できません。しばらく時間をおいてから再度お試しください。';
    case 504:
      return 'リクエストがタイムアウトしました。しばらく時間をおいてから再度お試しください。';
    default:
      return 'エラーが発生しました。しばらく時間をおいてから再度お試しください。';
  }
}

/**
 * @description HTTPステータスコードに基づいてエラーの重要度を決定する
 * @param statusCode - HTTPステータスコード
 * @returns エラーの重要度
 * @example
 * ```typescript
 * const severity = getErrorSeverity(500);
 * // 結果: ErrorSeverity.HIGH
 * ```
 */
export function getErrorSeverity(statusCode: number): ErrorSeverity {
  if (statusCode >= 500) {
    return ErrorSeverity.HIGH;
  }
  if (statusCode >= 400) {
    return ErrorSeverity.MEDIUM;
  }
  return ErrorSeverity.LOW;
}

/**
 * @description 成功レスポンスを作成する
 * @param data - レスポンスデータ
 * @param responseId - レスポンスID（オプション）
 * @returns 成功レスポンス
 * @example
 * ```typescript
 * const response = createSuccessResponse(userData, 'req-123');
 * ```
 */
export function createSuccessResponse<T>(
  data: T,
  responseId?: string
): SuccessResponse<T> {
  return {
    data,
    success: true,
    responseId,
  };
}

/**
 * @description エラーレスポンスを作成する
 * @param error - エラーオブジェクト
 * @param responseId - レスポンスID（オプション）
 * @returns エラーレスポンス
 * @example
 * ```typescript
 * const response = createErrorResponse(apiError, 'req-123');
 * ```
 */
export function createErrorResponse(
  error: ApiError,
  responseId?: string
): ErrorResponse {
  return {
    error,
    success: false,
    responseId,
  };
}

/**
 * @description APIレスポンスを安全に処理する
 * @param response - fetchレスポンス
 * @param endpoint - APIエンドポイント
 * @param requestId - リクエストID（オプション）
 * @returns 処理されたAPIレスポンス
 * @example
 * ```typescript
 * const result = await handleApiResponse(response, '/api/rsvp', 'req-123');
 * ```
 */
export async function handleApiResponse<T>(
  response: Response,
  endpoint: string,
  requestId?: string
): Promise<ApiResponse<T>> {
  try {
    const responseData = await response.json();

    if (!response.ok) {
      const apiError = createApiError({
        message:
          responseData.error ||
          `API呼び出しに失敗しました (${response.status})`,
        statusCode: response.status,
        endpoint,
        requestId,
        responseData,
        severity: getErrorSeverity(response.status),
        userMessage: getDefaultUserMessage(response.status),
      });

      // デバッグが必要な時だけログ出力
      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', {
          endpoint,
          requestId,
          responseStatus: response.status,
          error: apiError,
        });
      }

      return createErrorResponse(apiError, requestId);
    }

    return createSuccessResponse(responseData, requestId);
  } catch (error) {
    const apiError = createApiError({
      message: 'レスポンスの解析に失敗しました',
      statusCode: response.status,
      endpoint,
      requestId,
      severity: ErrorSeverity.HIGH,
      userMessage: 'データの処理中にエラーが発生しました',
    });

    // デバッグが必要な時だけログ出力
    if (process.env.NODE_ENV === 'development') {
      console.error('API Parse Error:', {
        endpoint,
        requestId,
        responseStatus: response.status,
        parseError: error,
        error: apiError,
      });
    }

    return createErrorResponse(apiError, requestId);
  }
}

/**
 * @description fetchリクエストを安全に実行する
 * @param url - リクエストURL
 * @param options - fetchオプション
 * @param requestId - リクエストID（オプション）
 * @returns 処理されたAPIレスポンス
 * @example
 * ```typescript
 * const result = await safeFetch('/api/rsvp', {
 *   method: 'POST',
 *   body: JSON.stringify(data)
 * }, 'req-123');
 * ```
 */
export async function safeFetch<T>(
  url: string,
  options: RequestInit = {},
  requestId?: string
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    return await handleApiResponse<T>(response, url, requestId);
  } catch (error) {
    const apiError = createApiError({
      message:
        error instanceof Error
          ? error.message
          : 'ネットワークエラーが発生しました',
      statusCode: 0,
      endpoint: url,
      requestId,
      severity: ErrorSeverity.HIGH,
      userMessage: 'ネットワークエラーが発生しました。接続をご確認ください。',
      details: { originalError: error },
    });

    // デバッグが必要な時だけログ出力
    if (process.env.NODE_ENV === 'development') {
      console.error('API Fetch Error:', {
        endpoint: url,
        requestId,
        fetchError: error,
        error: apiError,
      });
    }

    return createErrorResponse(apiError, requestId);
  }
}

/**
 * @description リクエストIDを生成する
 * @returns ユニークなリクエストID
 * @example
 * ```typescript
 * const requestId = generateRequestId();
 * // 結果: "req-20231201-123456-abc123"
 * ```
 */
export function generateRequestId(): string {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
  const random = Math.random().toString(36).substring(2, 8);
  return `req-${timestamp}-${random}`;
}
