/**
 * @description エラーハンドリング共通ユーティリティ
 * @author WeddingInvitations
 * @since 1.0.0
 */

// Loggerはデバッグが必要な時だけ使用
// import { logger, devLogger } from '@/app/lib/logger';
import {
  AppError,
  ErrorSeverity,
  ErrorType,
  UnknownError,
  CreateErrorOptions,
} from '@/app/lib/types/errors';

/**
 * @description 基本エラーオブジェクトを作成する
 * @param options - エラー作成オプション
 * @returns 基本エラーオブジェクト
 * @example
 * ```typescript
 * const baseError = createBaseError({
 *   message: 'エラーが発生しました',
 *   severity: ErrorSeverity.MEDIUM,
 *   location: 'UserComponent'
 * });
 * ```
 */
export function createBaseError(options: CreateErrorOptions): AppError {
  const {
    message,
    severity = ErrorSeverity.MEDIUM,
    code,
    location,
    details,
    userMessage,
  } = options;

  return {
    type: ErrorType.UNKNOWN_ERROR,
    message,
    severity,
    code,
    location,
    details,
    timestamp: new Date(),
    userMessage: userMessage || message,
  } as UnknownError;
}

/**
 * @description エラーログを出力する
 * @param error - エラーオブジェクト
 * @param context - エラーが発生したコンテキスト
 * @example
 * ```typescript
 * logError(apiError, { component: 'RSVPForm', action: 'submit' });
 * ```
 */
export async function logError(
  error: AppError,
  context?: Record<string, unknown>
): Promise<void> {
  // デバッグが必要な時だけログ出力
  if (process.env.NODE_ENV === 'development') {
    console.error('Error occurred:', {
      error: error.message,
      type: error.type,
      severity: error.severity,
      location: error.location,
      context,
    });
  }
}

/**
 * @description エラーの重要度に基づいてユーザーに表示するメッセージを決定する
 * @param error - エラーオブジェクト
 * @returns ユーザーに表示するメッセージ
 * @example
 * ```typescript
 * const userMessage = getUserFriendlyMessage(error);
 * ```
 */
export function getUserFriendlyMessage(error: AppError): string {
  // ユーザーメッセージが設定されている場合はそれを使用
  if (error.userMessage) {
    return error.userMessage;
  }

  // 重要度に基づいてメッセージを決定
  switch (error.severity) {
    case ErrorSeverity.CRITICAL:
      return 'システムエラーが発生しました。しばらく時間をおいてから再度お試しください。';
    case ErrorSeverity.HIGH:
      return 'エラーが発生しました。ページを再読み込みしてお試しください。';
    case ErrorSeverity.MEDIUM:
      return '処理中にエラーが発生しました。入力内容をご確認ください。';
    case ErrorSeverity.LOW:
      return '軽微なエラーが発生しました。';
    default:
      return 'エラーが発生しました。';
  }
}

/**
 * @description エラーが再試行可能かどうかを判定する
 * @param error - エラーオブジェクト
 * @returns 再試行可能な場合はtrue
 * @example
 * ```typescript
 * if (isRetryableError(error)) {
 *   // 再試行ロジック
 * }
 * ```
 */
export function isRetryableError(error: AppError): boolean {
  // ネットワークエラーやサーバーエラーは再試行可能
  if (error.type === ErrorType.NETWORK_ERROR) {
    return true;
  }

  if (error.type === ErrorType.SERVER_ERROR) {
    return true;
  }

  // APIエラーの場合、5xxエラーは再試行可能
  if (error.type === ErrorType.API_ERROR && 'statusCode' in error) {
    const statusCode = (error as any).statusCode;
    return statusCode >= 500 && statusCode < 600;
  }

  return false;
}

/**
 * @description エラーを安全に文字列化する
 * @param error - エラーオブジェクト
 * @returns 文字列化されたエラー情報
 * @example
 * ```typescript
 * const errorString = stringifyError(error);
 * ```
 */
export function stringifyError(error: AppError): string {
  try {
    return JSON.stringify({
      type: error.type,
      message: error.message,
      severity: error.severity,
      code: error.code,
      location: error.location,
      timestamp: error.timestamp.toISOString(),
      userMessage: error.userMessage,
    });
  } catch {
    return `Error: ${error.message}`;
  }
}

/**
 * @description エラーオブジェクトを正規化する
 * @param error - 任意のエラーオブジェクト
 * @returns 正規化されたAppErrorオブジェクト
 * @example
 * ```typescript
 * const normalizedError = normalizeError(originalError);
 * ```
 */
export function normalizeError(error: unknown): AppError {
  // 既にAppErrorの場合はそのまま返す
  if (
    error &&
    typeof error === 'object' &&
    'type' in error &&
    'message' in error
  ) {
    return error as AppError;
  }

  // Errorオブジェクトの場合
  if (error instanceof Error) {
    return {
      type: ErrorType.UNKNOWN_ERROR,
      message: error.message,
      severity: ErrorSeverity.MEDIUM,
      timestamp: new Date(),
      userMessage: 'エラーが発生しました',
      originalError: error,
    } as UnknownError;
  }

  // 文字列の場合
  if (typeof error === 'string') {
    return {
      type: ErrorType.UNKNOWN_ERROR,
      message: error,
      severity: ErrorSeverity.MEDIUM,
      timestamp: new Date(),
      userMessage: error,
    } as UnknownError;
  }

  // その他の場合
  return {
    type: ErrorType.UNKNOWN_ERROR,
    message: '不明なエラーが発生しました',
    severity: ErrorSeverity.MEDIUM,
    timestamp: new Date(),
    userMessage: 'エラーが発生しました',
    originalError: error,
  } as UnknownError;
}
