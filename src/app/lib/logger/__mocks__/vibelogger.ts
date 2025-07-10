/**
 * @description vibeloggerのモック実装
 * @example
 * ```typescript
 * import { createFileLogger } from 'vibelogger';
 * ```
 */

// モックロガーインスタンス
const mockLogger = {
  info: jest.fn().mockResolvedValue(undefined),
  error: jest.fn().mockResolvedValue(undefined),
  warning: jest.fn().mockResolvedValue(undefined),
  debug: jest.fn().mockResolvedValue(undefined),
  critical: jest.fn().mockResolvedValue(undefined),
  logException: jest.fn().mockResolvedValue(undefined),
  getLogsForAI: jest.fn().mockResolvedValue([]),
};

/**
 * @description ファイルロガーを作成するモック関数
 * @param projectName プロジェクト名
 * @returns モックロガーインスタンス
 */
export const createFileLogger = jest.fn().mockReturnValue(mockLogger);

/**
 * @description 基本ロガーを作成するモック関数
 * @param config ロガー設定
 * @returns モックロガーインスタンス
 */
export const createLogger = jest.fn().mockReturnValue(mockLogger);

/**
 * @description 環境設定ロガーを作成するモック関数
 * @returns モックロガーインスタンス
 */
export const createEnvLogger = jest.fn().mockReturnValue(mockLogger);

// デフォルトエクスポート
export default {
  createFileLogger,
  createLogger,
  createEnvLogger,
};
