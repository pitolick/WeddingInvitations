/**
 * @description イベントセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description イベント種別
 */
export type EventType = 'ceremony' | 'reception' | 'afterparty';

/**
 * @description 単一イベント（挙式・披露宴・二次会など）の型
 */
export interface EventItem {
  /** イベント種別 */
  type: EventType;
  /** イベントタイトル */
  title: string;
  /** イベントサブタイトル */
  subtitle: string;
  /** 開催日 */
  date: string;
  /** 開催時間 */
  time: string;
  /** 受付時間（オプション） */
  receptionTime?: string;
  /** 会場情報 */
  venue: {
    key: string;
    value: React.ReactNode;
  }[];
  /** メッセージ */
  message: React.ReactNode;
  /** 地図URL */
  mapUrl: string;
}

/**
 * @description EventItemコンポーネントのProps型
 */
export interface EventItemProps {
  /** イベント情報 */
  event: EventItem;
}
