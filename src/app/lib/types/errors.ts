/**
 * @description エラーハンドリング用の型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description エラーの種類を定義する列挙型
 */
export enum ErrorType {
  API_ERROR = 'API_ERROR',
  FORM_ERROR = 'FORM_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * @description エラーの重要度を定義する列挙型
 */
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/**
 * @description 基本エラー型
 */
export interface BaseError {
  /** エラーの種類 */
  type: ErrorType;
  /** エラーメッセージ */
  message: string;
  /** エラーの重要度 */
  severity: ErrorSeverity;
  /** エラーコード */
  code?: string;
  /** エラーが発生した場所 */
  location?: string;
  /** エラーの詳細情報 */
  details?: Record<string, unknown>;
  /** エラーが発生した時刻 */
  timestamp: Date;
  /** ユーザーに表示するメッセージ */
  userMessage?: string;
}

/**
 * @description APIエラー型
 */
export interface ApiError extends BaseError {
  type: ErrorType.API_ERROR;
  /** HTTPステータスコード */
  statusCode: number;
  /** APIエンドポイント */
  endpoint?: string;
  /** リクエストID */
  requestId?: string;
  /** レスポンスデータ */
  responseData?: unknown;
}

/**
 * @description フォームエラー型
 */
export interface FormError extends BaseError {
  type: ErrorType.FORM_ERROR | ErrorType.VALIDATION_ERROR;
  /** フォームフィールド名 */
  field?: string;
  /** バリデーションルール */
  validationRule?: string;
  /** 入力値 */
  inputValue?: unknown;
}

/**
 * @description ネットワークエラー型
 */
export interface NetworkError extends BaseError {
  type: ErrorType.NETWORK_ERROR;
  /** リクエストURL */
  url?: string;
  /** ネットワークエラーの種類 */
  networkErrorType?: 'timeout' | 'connection' | 'cors' | 'offline';
}

/**
 * @description 認証エラー型
 */
export interface AuthenticationError extends BaseError {
  type: ErrorType.AUTHENTICATION_ERROR;
  /** 認証方法 */
  authMethod?: string;
  /** 認証トークン */
  token?: string;
}

/**
 * @description 認可エラー型
 */
export interface AuthorizationError extends BaseError {
  type: ErrorType.AUTHORIZATION_ERROR;
  /** 必要な権限 */
  requiredPermission?: string;
  /** 現在の権限 */
  currentPermission?: string;
}

/**
 * @description 404エラー型
 */
export interface NotFoundError extends BaseError {
  type: ErrorType.NOT_FOUND_ERROR;
  /** 見つからなかったリソース */
  resource?: string;
  /** リソースID */
  resourceId?: string;
}

/**
 * @description サーバーエラー型
 */
export interface ServerError extends BaseError {
  type: ErrorType.SERVER_ERROR;
  /** サーバーエラーコード */
  serverErrorCode?: string;
  /** サーバーログID */
  serverLogId?: string;
}

/**
 * @description 未知のエラー型
 */
export interface UnknownError extends BaseError {
  type: ErrorType.UNKNOWN_ERROR;
  /** 元のエラーオブジェクト */
  originalError?: unknown;
}

/**
 * @description 統合エラー型
 */
export type AppError =
  | ApiError
  | FormError
  | NetworkError
  | AuthenticationError
  | AuthorizationError
  | NotFoundError
  | ServerError
  | UnknownError;

/**
 * @description エラーレスポンス型
 */
export interface ErrorResponse {
  /** エラーオブジェクト */
  error: AppError;
  /** 成功フラグ */
  success: false;
  /** レスポンスID */
  responseId?: string;
}

/**
 * @description 成功レスポンス型
 */
export interface SuccessResponse<T = unknown> {
  /** データ */
  data: T;
  /** 成功フラグ */
  success: true;
  /** レスポンスID */
  responseId?: string;
}

/**
 * @description APIレスポンス型
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

/**
 * @description エラー作成用のユーティリティ型
 */
export interface CreateErrorOptions {
  /** エラーメッセージ */
  message: string;
  /** エラーの重要度 */
  severity?: ErrorSeverity;
  /** エラーコード */
  code?: string;
  /** エラーが発生した場所 */
  location?: string;
  /** エラーの詳細情報 */
  details?: Record<string, unknown>;
  /** ユーザーに表示するメッセージ */
  userMessage?: string;
}

/**
 * @description APIエラー作成用のオプション型
 */
export interface CreateApiErrorOptions extends CreateErrorOptions {
  /** HTTPステータスコード */
  statusCode: number;
  /** APIエンドポイント */
  endpoint?: string;
  /** リクエストID */
  requestId?: string;
  /** レスポンスデータ */
  responseData?: unknown;
}

/**
 * @description フォームエラー作成用のオプション型
 */
export interface CreateFormErrorOptions extends CreateErrorOptions {
  /** フォームフィールド名 */
  field?: string;
  /** バリデーションルール */
  validationRule?: string;
  /** 入力値 */
  inputValue?: unknown;
}
