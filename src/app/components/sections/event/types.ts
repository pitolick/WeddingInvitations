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
 * @description 会場情報の型
 */
export interface EventVenue {
  /** 会場名 */
  name: string;
  /** 会場URL */
  url: string;
  /** 住所 */
  address: string;
  /** 電話番号 */
  tel: string;
  /** 会費（オプション） */
  fee?: string;
}

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
  /** 親族集合時間（オプション） */
  familyGatheringTime?: string;
  /** 会場情報 */
  venue: EventVenue;
  /** メッセージ */
  message: string;
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

/**
 * @description EventセクションのProps型
 */
export interface EventProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}
