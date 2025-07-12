/**
 * @description カウントダウンセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description CountdownコンポーネントのProps型
 * @example
 * ```typescript
 * const countdownProps: CountdownProps = {
 *   id: 'countdown',
 *   className: 'text-center',
 *   targetDate: new Date('2024-12-25T12:00:00')
 * };
 * ```
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
 * @example
 * ```typescript
 * const countdownTime: CountdownTime = {
 *   days: 30,
 *   hours: 12,
 *   minutes: 45,
 *   seconds: 30
 * };
 * ```
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
