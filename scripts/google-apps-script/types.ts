/**
 * RSVP データの型定義
 * Google Apps Script と Next.js 間で共有する型定義
 */

/**
 * 連絡先情報の型定義
 */
export interface ContactInfo {
  /** 郵便番号 */
  postalCode: string;
  /** 都道府県 */
  prefecture: string;
  /** 住所 */
  address: string;
  /** 電話番号 */
  phone: string;
  /** メールアドレス */
  email: string;
}

/**
 * 出席者情報の型定義
 */
export interface Attendee {
  /** 出席者名 */
  name: string;
  /** ふりがな */
  furigana: string;
  /** 誕生日 */
  birthday: string;
  /** ホテル利用 */
  hotelUse: string;
  /** タクシー利用 */
  taxiUse: string;
  /** 駐車場利用 */
  parkingUse: string;
  /** アレルギー情報 */
  allergies: string[];
  /** 苦手な食べ物 */
  dislikedFoods?: string;
  /** 挙式出欠 */
  ceremony: string;
  /** 披露宴出欠 */
  reception: string;
  /** 二次会出欠 */
  afterParty: string;
}

/**
 * RSVP フォームデータの型定義
 */
export interface RSVPData {
  /** 招待者ID (microCMSのID) */
  guestId: string;
  /** 招待者名 */
  guestName: string;
  /** 連絡先情報 */
  contactInfo: ContactInfo;
  /** 出席者情報 */
  attendees: Attendee[];
  /** メッセージ */
  message?: string;
}

/**
 * RSVP レスポンスの型定義
 */
export interface RSVPResponse {
  /** 成功フラグ */
  success: boolean;
  /** メッセージ */
  message?: string;
  /** エラーメッセージ */
  error?: string;
}

/**
 * スプレッドシート行データの型定義
 */

/**
 * RSVP_Responses シートの行データ
 */
export interface RSVPResponseRow {
  /** 招待者ID */
  guestId: string;
  /** 招待者名 */
  guestName: string;
  /** 送信日時 */
  timestamp: string;
  /** 郵便番号 */
  postalCode: string;
  /** 都道府県 */
  prefecture: string;
  /** 住所 */
  address: string;
  /** 電話番号 */
  phone: string;
  /** メールアドレス */
  email: string;
  /** メッセージ */
  message: string;
}

/**
 * RSVP_Attendees シートの行データ
 */
export interface RSVPAttendeeRow {
  /** 招待者ID */
  guestId: string;
  /** 出席者番号（microCMSのIDまたは空文字） */
  attendeeNumber: string;
  /** 出席者名 */
  name: string;
  /** ふりがな */
  furigana: string;
  /** 誕生日 */
  birthday: string;
  /** ホテル利用 */
  hotelUse: string;
  /** タクシー利用 */
  taxiUse: string;
  /** 駐車場利用 */
  parkingUse: string;
  /** アレルギー情報 (JSON文字列) */
  allergies: string;
  /** 苦手な食べ物 */
  dislikedFoods: string;
  /** 挙式出欠 */
  ceremony: string;
  /** 披露宴出欠 */
  reception: string;
  /** 二次会出欠 */
  afterParty: string;
}

/**
 * RSVP_Summary シートの行データ
 */
export interface RSVPSummaryRow {
  /** イベント種別 */
  eventType: string;
  /** 参加予定者数 */
  attendingCount: number;
  /** 不参加者数 */
  declinedCount: number;
  /** 未回答者数 */
  noResponseCount: number;
  /** 更新日時 */
  timestamp: string;
}

/**
 * イベント種別の定義
 */
export const EVENT_TYPES = {
  CEREMONY: 'ceremony' as const,
  RECEPTION: 'reception' as const,
  AFTERPARTY: 'afterparty' as const,
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

/**
 * イベント種別の日本語表示名
 */
export const EVENT_DISPLAY_NAMES: Record<EventType, string> = {
  [EVENT_TYPES.CEREMONY]: '挙式',
  [EVENT_TYPES.RECEPTION]: '披露宴',
  [EVENT_TYPES.AFTERPARTY]: '二次会',
};

/**
 * 出欠回答の値
 */
export const ATTENDANCE_VALUES = {
  ATTENDING: 'attending' as const,
  DECLINED: 'declined' as const,
} as const;

export type AttendanceValue =
  (typeof ATTENDANCE_VALUES)[keyof typeof ATTENDANCE_VALUES];

/**
 * 出欠回答の日本語表示名
 */
export const ATTENDANCE_DISPLAY_NAMES: Record<AttendanceValue, string> = {
  [ATTENDANCE_VALUES.ATTENDING]: '参加',
  [ATTENDANCE_VALUES.DECLINED]: '不参加',
};

/**
 * 利用有無の値
 */
export const USAGE_VALUES = {
  YES: 'yes' as const,
  NO: 'no' as const,
} as const;

export type UsageValue = (typeof USAGE_VALUES)[keyof typeof USAGE_VALUES];

/**
 * 利用有無の日本語表示名
 */
export const USAGE_DISPLAY_NAMES: Record<UsageValue, string> = {
  [USAGE_VALUES.YES]: '利用する',
  [USAGE_VALUES.NO]: '利用しない',
};
