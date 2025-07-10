/**
 * @description VibeCoding Logger設定
 * @example
 * ```typescript
 * import { logger } from '@/lib/logger';
 *
 * await logger.info('user_action', 'User clicked button', {
 *   context: { buttonId: 'submit', userId: '123' },
 *   humanNote: 'User interaction logged',
 *   aiTodo: 'Analyze user behavior patterns'
 * });
 * ```
 */

import { createFileLogger } from 'vibelogger';

/**
 * @description プロジェクト用ロガーインスタンス
 */
export const logger = createFileLogger('wedding-invitations');

/**
 * @description 開発環境用の簡易ロガー
 * @param operation 操作名
 * @param message メッセージ
 * @param context コンテキスト情報
 */
export const devLogger = {
  info: (operation: string, message: string, context?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${operation}: ${message}`, context || '');
    }
  },
  error: (
    operation: string,
    message: string,
    context?: Record<string, any>
  ) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${operation}: ${message}`, context || '');
    }
  },
  warning: (
    operation: string,
    message: string,
    context?: Record<string, any>
  ) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARNING] ${operation}: ${message}`, context || '');
    }
  },
};

/**
 * @description ログユーティリティ関数
 */
export const logUtils = {
  /**
   * @description ユーザーアクションをログに記録
   * @param action アクション名
   * @param details 詳細情報
   * @param userId ユーザーID（オプション）
   */
  logUserAction: async (
    action: string,
    details: Record<string, any>,
    userId?: string
  ) => {
    await logger.info('user_action', action, {
      context: {
        ...details,
        userId,
        timestamp: new Date().toISOString(),
      },
      humanNote: `User performed action: ${action}`,
      aiTodo: 'Analyze user behavior and interaction patterns',
    });
  },

  /**
   * @description エラーをログに記録
   * @param operation 操作名
   * @param error エラーオブジェクト
   * @param context 追加コンテキスト
   */
  logError: async (
    operation: string,
    error: Error | string,
    context?: Record<string, any>
  ) => {
    await logger.logException(operation, error, {
      context: {
        ...context,
        timestamp: new Date().toISOString(),
      },
      humanNote: `Error occurred in operation: ${operation}`,
      aiTodo: 'Analyze error patterns and suggest improvements',
    });
  },

  /**
   * @description API呼び出しをログに記録
   * @param endpoint APIエンドポイント
   * @param method HTTPメソッド
   * @param status ステータスコード
   * @param duration 実行時間（ms）
   */
  logApiCall: async (
    endpoint: string,
    method: string,
    status: number,
    duration: number
  ) => {
    await logger.info('api_call', `${method} ${endpoint}`, {
      context: {
        endpoint,
        method,
        status,
        duration,
        timestamp: new Date().toISOString(),
      },
      humanNote: `API call completed: ${method} ${endpoint}`,
      aiTodo: 'Monitor API performance and identify optimization opportunities',
    });
  },
};
