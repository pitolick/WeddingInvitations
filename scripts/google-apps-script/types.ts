/**
 * RSVP データの型定義
 * Google Apps Script と Next.js 間で共有する型定義
 */

export interface RSVPData {
  /** 招待者ID (microCMSのID) */
  guestId: string;

  /** 招待者名 */
  guestName: string;

  /** 参加予定イベント */
  events: ("ceremony" | "reception" | "afterparty")[];

  /** 参加人数 */
  attendees: number;

  /** お連れ様情報 */
  companions?: Companion[];

  /** メッセージ */
  message?: string;
}

export interface Companion {
  /** お連れ様名 */
  name: string;

  /** 関係性 */
  relationship?: string;
}

export interface RSVPResponse {
  /** 成功フラグ */
  success: boolean;

  /** メッセージ */
  message?: string;

  /** エラーメッセージ */
  error?: string;
}

/**
 * Google スプレッドシートの列定義
 */
export interface SpreadsheetRow {
  /** 招待者ID */
  guestId: string;

  /** 招待者名 */
  guestName: string;

  /** 参加予定イベント (カンマ区切り) */
  events: string;

  /** 参加人数 */
  attendees: number;

  /** お連れ様情報 (JSON文字列) */
  companions: string;

  /** メッセージ */
  message: string;

  /** 送信日時 */
  timestamp: string;
}

/**
 * イベント種別の定義
 */
export const EVENT_TYPES = {
  CEREMONY: "ceremony" as const,
  RECEPTION: "reception" as const,
  AFTERPARTY: "afterparty" as const,
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

/**
 * イベント種別の日本語表示名
 */
export const EVENT_DISPLAY_NAMES: Record<EventType, string> = {
  [EVENT_TYPES.CEREMONY]: "挙式",
  [EVENT_TYPES.RECEPTION]: "披露宴",
  [EVENT_TYPES.AFTERPARTY]: "二次会",
};

/**
 * イベント種別の説明
 */
export const EVENT_DESCRIPTIONS: Record<EventType, string> = {
  [EVENT_TYPES.CEREMONY]: "挙式にご参加いただけますか？",
  [EVENT_TYPES.RECEPTION]: "披露宴にご参加いただけますか？",
  [EVENT_TYPES.AFTERPARTY]: "二次会にご参加いただけますか？",
};
