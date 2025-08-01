/**
 * @description フォームエラーハンドリング専用ユーティリティ
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  FormError,
  ErrorSeverity,
  ErrorType,
  CreateFormErrorOptions,
} from '@/app/lib/types/errors';
// Loggerはデバッグが必要な時だけ使用
// import { logError } from './utils';

/**
 * @description フォームエラーオブジェクトを作成する
 * @param options - フォームエラー作成オプション
 * @returns フォームエラーオブジェクト
 * @example
 * ```typescript
 * const formError = createFormError({
 *   message: '必須項目が入力されていません',
 *   field: 'name',
 *   validationRule: 'required'
 * });
 * ```
 */
export function createFormError(options: CreateFormErrorOptions): FormError {
  const {
    message,
    severity = ErrorSeverity.MEDIUM,
    code,
    location,
    details,
    userMessage,
    field,
    validationRule,
    inputValue,
  } = options;

  return {
    type: ErrorType.FORM_ERROR,
    message,
    severity,
    code,
    location,
    details,
    timestamp: new Date(),
    userMessage:
      userMessage || getDefaultFormUserMessage(field, validationRule),
    field,
    validationRule,
    inputValue,
  };
}

/**
 * @description バリデーションエラーオブジェクトを作成する
 * @param options - バリデーションエラー作成オプション
 * @returns バリデーションエラーオブジェクト
 * @example
 * ```typescript
 * const validationError = createValidationError({
 *   message: 'メールアドレスの形式が正しくありません',
 *   field: 'email',
 *   validationRule: 'email'
 * });
 * ```
 */
export function createValidationError(
  options: CreateFormErrorOptions
): FormError {
  const {
    message,
    severity = ErrorSeverity.MEDIUM,
    code,
    location,
    details,
    userMessage,
    field,
    validationRule,
    inputValue,
  } = options;

  return {
    type: ErrorType.VALIDATION_ERROR,
    message,
    severity,
    code,
    location,
    details,
    timestamp: new Date(),
    userMessage:
      userMessage || getDefaultValidationUserMessage(field, validationRule),
    field,
    validationRule,
    inputValue,
  };
}

/**
 * @description フィールドとバリデーションルールに基づいてデフォルトのフォームエラーメッセージを取得する
 * @param field - フォームフィールド名
 * @param validationRule - バリデーションルール
 * @returns ユーザーフレンドリーなメッセージ
 * @example
 * ```typescript
 * const message = getDefaultFormUserMessage('name', 'required');
 * // 結果: "お名前を入力してください"
 * ```
 */
export function getDefaultFormUserMessage(
  field?: string,
  validationRule?: string
): string {
  if (!field) {
    return '入力内容に問題があります。';
  }

  const fieldNames: Record<string, string> = {
    name: 'お名前',
    email: 'メールアドレス',
    phone: '電話番号',
    postalCode: '郵便番号',
    address: '住所',
    attendance: '出欠回答',
    companions: 'お連れ様',
    allergies: 'アレルギー',
    message: 'メッセージ',
    guestId: '招待者ID',
  };

  const fieldName = fieldNames[field] || field;

  switch (validationRule) {
    case 'required':
      return `${fieldName}を入力してください。`;
    case 'email':
      return `${fieldName}の形式が正しくありません。`;
    case 'phone':
      return `${fieldName}の形式が正しくありません。`;
    case 'postalCode':
      return `${fieldName}は7桁の数字で入力してください。`;
    case 'maxLength':
      return `${fieldName}が長すぎます。`;
    case 'minLength':
      return `${fieldName}が短すぎます。`;
    case 'pattern':
      return `${fieldName}の形式が正しくありません。`;
    default:
      return `${fieldName}の入力内容をご確認ください。`;
  }
}

/**
 * @description フィールドとバリデーションルールに基づいてデフォルトのバリデーションエラーメッセージを取得する
 * @param field - フォームフィールド名
 * @param validationRule - バリデーションルール
 * @returns ユーザーフレンドリーなメッセージ
 * @example
 * ```typescript
 * const message = getDefaultValidationUserMessage('email', 'email');
 * // 結果: "メールアドレスの形式が正しくありません"
 * ```
 */
export function getDefaultValidationUserMessage(
  field?: string,
  validationRule?: string
): string {
  if (!field) {
    return '入力内容の形式が正しくありません。';
  }

  const fieldNames: Record<string, string> = {
    name: 'お名前',
    email: 'メールアドレス',
    phone: '電話番号',
    postalCode: '郵便番号',
    address: '住所',
    attendance: '出欠回答',
    companions: 'お連れ様',
    allergies: 'アレルギー',
    message: 'メッセージ',
    guestId: '招待者ID',
  };

  const fieldName = fieldNames[field] || field;

  switch (validationRule) {
    case 'email':
      return `${fieldName}の形式が正しくありません。`;
    case 'phone':
      return `${fieldName}は正しい形式で入力してください。`;
    case 'postalCode':
      return `${fieldName}は7桁の数字で入力してください。`;
    case 'maxLength':
      return `${fieldName}は指定された文字数以内で入力してください。`;
    case 'minLength':
      return `${fieldName}は指定された文字数以上で入力してください。`;
    case 'pattern':
      return `${fieldName}の形式が正しくありません。`;
    case 'required':
      return `${fieldName}は必須項目です。`;
    default:
      return `${fieldName}の入力内容をご確認ください。`;
  }
}

/**
 * @description フォームエラーをログに出力する
 * @param error - フォームエラーオブジェクト
 * @param context - エラーが発生したコンテキスト
 * @example
 * ```typescript
 * await logFormError(formError, { component: 'RSVPForm', action: 'validation' });
 * ```
 */
export async function logFormError(
  error: FormError,
  context?: Record<string, unknown>
): Promise<void> {
  // デバッグが必要な時だけログ出力
  if (process.env.NODE_ENV === 'development') {
    console.error('Form Error:', {
      formField: error.field,
      validationRule: error.validationRule,
      inputValue: error.inputValue,
      error: error,
      context,
    });
  }
}

/**
 * @description 複数のフォームエラーをまとめて処理する
 * @param errors - フォームエラーの配列
 * @param context - エラーが発生したコンテキスト
 * @example
 * ```typescript
 * await logFormErrors([error1, error2], { component: 'RSVPForm' });
 * ```
 */
export async function logFormErrors(
  errors: FormError[],
  context?: Record<string, unknown>
): Promise<void> {
  // デバッグが必要な時だけログ出力
  if (process.env.NODE_ENV === 'development') {
    console.error('Form Errors:', {
      errors: errors,
      context,
    });
  }
}

/**
 * @description フォームエラーの重要度を決定する
 * @param validationRule - バリデーションルール
 * @returns エラーの重要度
 * @example
 * ```typescript
 * const severity = getFormErrorSeverity('required');
 * // 結果: ErrorSeverity.MEDIUM
 * ```
 */
export function getFormErrorSeverity(validationRule?: string): ErrorSeverity {
  switch (validationRule) {
    case 'required':
      return ErrorSeverity.MEDIUM;
    case 'email':
    case 'phone':
    case 'postalCode':
      return ErrorSeverity.MEDIUM;
    case 'maxLength':
    case 'minLength':
      return ErrorSeverity.LOW;
    default:
      return ErrorSeverity.MEDIUM;
  }
}

/**
 * @description フォームエラーをフィールド別にグループ化する
 * @param errors - フォームエラーの配列
 * @returns フィールド別にグループ化されたエラー
 * @example
 * ```typescript
 * const groupedErrors = groupErrorsByField(formErrors);
 * // 結果: { name: [error1], email: [error2, error3] }
 * ```
 */
export function groupErrorsByField(
  errors: FormError[]
): Record<string, FormError[]> {
  return errors.reduce(
    (grouped, error) => {
      const field = error.field || 'unknown';
      if (!grouped[field]) {
        grouped[field] = [];
      }
      grouped[field].push(error);
      return grouped;
    },
    {} as Record<string, FormError[]>
  );
}

/**
 * @description フォームエラーが存在するかどうかをチェックする
 * @param errors - フォームエラーの配列
 * @param field - チェックするフィールド（オプション）
 * @returns エラーが存在する場合はtrue
 * @example
 * ```typescript
 * const hasErrors = hasFormErrors(errors, 'email');
 * ```
 */
export function hasFormErrors(errors: FormError[], field?: string): boolean {
  if (field) {
    return errors.some(error => error.field === field);
  }
  return errors.length > 0;
}

/**
 * @description 特定フィールドのエラーメッセージを取得する
 * @param errors - フォームエラーの配列
 * @param field - フィールド名
 * @returns エラーメッセージの配列
 * @example
 * ```typescript
 * const messages = getFieldErrors(errors, 'email');
 * ```
 */
export function getFieldErrors(errors: FormError[], field: string): string[] {
  return errors
    .filter(error => error.field === field)
    .map(error => error.userMessage || error.message);
}
