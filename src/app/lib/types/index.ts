/**
 * @description 型定義のエクスポートバンドル
 * @author WeddingInvitations
 * @since 1.0.0
 */

// 招待者関連の型定義
export interface Guest {
  /** 招待者ID */
  id: string;
  /** 招待者名 */
  name: string;
  /** メールアドレス */
  email: string;
  /** お連れ様情報 */
  companions?: Companion[];
  /** RSVP状況 */
  rsvpStatus?: "pending" | "attending" | "not-attending";
  /** メッセージ */
  message?: string;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
}

// お連れ様情報の型定義
export interface Companion {
  /** お連れ様ID */
  id: string;
  /** お連れ様名 */
  name: string;
  /** 年齢 */
  age?: number;
  /** 関係性 */
  relationship?: string;
}

// イベント情報の型定義
export interface Event {
  /** イベントID */
  id: string;
  /** イベント名 */
  name: string;
  /** 開催日時 */
  date: Date;
  /** 開催場所 */
  venue: string;
  /** 住所 */
  address: string;
  /** 地図URL */
  mapUrl?: string;
  /** 説明 */
  description?: string;
}

// APIレスポンスの型定義
export interface ApiResponse<T> {
  /** 成功フラグ */
  success: boolean;
  /** データ */
  data?: T;
  /** エラーメッセージ */
  error?: string;
  /** ステータスコード */
  statusCode: number;
}

// フォームデータの型定義
export interface RSVPFormData {
  /** 招待者ID */
  guestId: string;
  /** 出欠状況 */
  status: "attending" | "not-attending";
  /** お連れ様数 */
  companionCount?: number;
  /** メッセージ */
  message?: string;
  /** 食事制限 */
  dietaryRestrictions?: string;
}

// コンポーネントPropsの共通型定義
export interface BaseComponentProps {
  /** コンポーネントのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** 子要素 */
  children?: React.ReactNode;
}

// 環境変数の型定義
export interface EnvironmentVariables {
  /** Figma API キー */
  FIGMA_API_KEY: string;
  /** Figma ファイルキー */
  FIGMA_FILE_KEY: string;
  /** GitHub トークン */
  GITHUB_TOKEN: string;
  /** microCMS API キー */
  MICROCMS_API_KEY?: string;
  /** Google Apps Script URL */
  GOOGLE_APPS_SCRIPT_URL?: string;
}
