/**
 * @description RSVPセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description RSVPフォームデータの型定義
 */
export interface RSVPFormData {
  /** 招待者名 */
  name: string;
  /** メールアドレス */
  email: string;
  /** 参加予定人数 */
  attendance: 'attending' | 'declined';
  /** 同伴者数 */
  companions?: number;
  /** メッセージ */
  message?: string;
  /** 食事制限 */
  dietaryRestrictions?: string;
}

/**
 * @description RSVPコンポーネントのProps型
 */
export interface RSVPProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** 招待ID */
  invitationId: string;
}

/**
 * @description RSVP送信結果の型
 */
export interface RSVPResponse {
  /** 成功フラグ */
  success: boolean;
  /** メッセージ */
  message: string;
  /** エラー詳細 */
  error?: string;
}
