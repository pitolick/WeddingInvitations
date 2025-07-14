/**
 * Googleカレンダー関連のユーティリティ関数
 * @description Googleカレンダーにイベントを追加する機能を提供
 */

/**
 * Googleカレンダーイベントの型定義
 */
export interface GoogleCalendarEvent {
  /** イベントタイトル */
  text: string;
  /** 開始日時 */
  dates: string;
  /** 詳細 */
  details?: string;
  /** 場所 */
  location?: string;
  /** 時間帯 */
  ctz?: string;
}

/**
 * GoogleカレンダーURLを生成
 * @description イベント情報からGoogleカレンダーに追加するためのURLを生成する
 * @param event - イベント情報
 * @returns string GoogleカレンダーURL
 */
export function generateGoogleCalendarUrl(event: GoogleCalendarEvent): string {
  // URLパラメータを構築
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.text,
    dates: event.dates,
    details: event.details || '',
    location: event.location || '',
    ctz: 'Asia/Tokyo',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
