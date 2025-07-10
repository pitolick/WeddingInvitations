/**
 * @description クライアントサイド用のロガー
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description クライアントサイド用のロガー設定
 */
interface ClientLoggerConfig {
  context: string;
  humanNote: string;
  aiTodo: string;
}

/**
 * @description クライアントサイド用のロガー
 * @param level - ログレベル
 * @param context - コンテキスト
 * @param message - メッセージ
 * @param config - ロガー設定
 */
function clientLogger(
  level: 'info' | 'warn' | 'error' | 'debug',
  context: string,
  message: string,
  config: ClientLoggerConfig
) {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    level,
    message,
    ...config,
  };

  // 開発環境でのみコンソールに出力
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${level.toUpperCase()}] ${context}: ${message}`, logData);
  }

  // 将来的にAnalyticsサービスに送信する実装を追加可能
  // 例: Google Analytics、Mixpanel等
}

/**
 * @description クライアントサイド用のロガー関数
 */
export const clientDevLogger = {
  info: (context: string, message: string, config: ClientLoggerConfig) => {
    clientLogger('info', context, message, config);
  },
  warn: (context: string, message: string, config: ClientLoggerConfig) => {
    clientLogger('warn', context, message, config);
  },
  error: (context: string, message: string, config: ClientLoggerConfig) => {
    clientLogger('error', context, message, config);
  },
  debug: (context: string, message: string, config: ClientLoggerConfig) => {
    clientLogger('debug', context, message, config);
  },
};
