/**
 * @description RSVPセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description 連絡先情報の型定義
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
 * @description 出席者情報の型定義
 */
export interface Attendee {
  /** 出席者番号（microCMS IDまたは空文字） */
  attendeeId?: string;
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
  /** 代行利用 */
  daikoUse: string;
  /** アレルギー情報 */
  allergies: string[];
  /** 苦手な食べ物 */
  dislikedFoods?: string;
  /** 挙式出欠 */
  ceremony?: string;
  /** 披露宴出欠 */
  reception?: string;
  /** 二次会出欠 */
  afterParty?: string;
}

/**
 * @description RSVPフォームデータの型定義
 * @example
 * ```typescript
 * const rsvpData: RSVPFormData = {
 *   guestId: 'guest-123',
 *   name: '田中太郎',
 *   contactInfo: {
 *     postalCode: '1234567',
 *     prefecture: '東京都',
 *     address: '渋谷区...',
 *     phone: '09012345678',
 *     email: 'tanaka@example.com'
 *   },
 *   attendees: [...],
 *   message: '楽しみにしています！'
 * };
 * ```
 */
export interface RSVPFormData {
  /** 招待者ID */
  guestId: string;
  /** 招待者名 */
  name: string;
  /** 連絡先情報 */
  contactInfo: ContactInfo;
  /** 出席者情報 */
  attendees: Attendee[];
  /** メッセージ */
  message?: string;
}

/**
 * @description RSVPコンポーネントのProps型
 * @example
 * ```typescript
 * const rsvpProps: RSVPProps = {
 *   id: 'rsvp',
 *   className: 'bg-white',
 *   invitationId: 'invite-123'
 * };
 * ```
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
 * @example
 * ```typescript
 * const rsvpResponse: RSVPResponse = {
 *   success: true,
 *   message: 'RSVPが正常に送信されました',
 *   error: undefined
 * };
 * ```
 */
export interface RSVPResponse {
  /** 成功フラグ */
  success: boolean;
  /** メッセージ */
  message: string;
  /** エラー詳細 */
  error?: string;
}
