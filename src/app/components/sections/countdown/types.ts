/**
 * @description カウントダウンセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description CountdownコンポーネントのProps型
 */
export interface CountdownProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** 目標日時 */
  targetDate?: Date;
}

/**
 * @description カウントダウン時間の型
 */
export interface CountdownTime {
  /** 日数 */
  days: number;
  /** 時間 */
  hours: number;
  /** 分 */
  minutes: number;
  /** 秒 */
  seconds: number;
}
