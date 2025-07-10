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
  rsvpStatus?: 'pending' | 'attending' | 'not-attending';
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
  status: 'attending' | 'not-attending';
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

// 画像関連の型定義
export interface ImageConfig {
  /** 画像パス */
  src: string;
  /** 代替テキスト */
  alt: string;
  /** 幅 */
  width?: number;
  /** 高さ */
  height?: number;
  /** レスポンシブ設定 */
  responsive?: ResponsiveConfig;
}

// レスポンシブ設定の型定義
export interface ResponsiveConfig {
  /** モバイル設定 */
  mobile?: ImageSize;
  /** タブレット設定 */
  tablet?: ImageSize;
  /** デスクトップ設定 */
  desktop?: ImageSize;
}

// 画像サイズの型定義
export interface ImageSize {
  /** 幅 */
  width: number;
  /** 高さ */
  height: number;
}

// アニメーション設定の型定義
export interface AnimationConfig {
  /** アニメーション時間 */
  duration?: number;
  /** イージング */
  easing?: string;
  /** 遅延時間 */
  delay?: number;
  /** アニメーション方向 */
  direction?: 'up' | 'down' | 'left' | 'right';
}

// セクション設定の型定義
export interface SectionConfig {
  /** セクションID */
  id: string;
  /** セクション名 */
  name: string;
  /** 表示フラグ */
  visible: boolean;
  /** アニメーション設定 */
  animation?: AnimationConfig;
}

// ナビゲーション項目の型定義
export interface NavigationItem {
  /** 項目ID */
  id: string;
  /** 項目名 */
  name: string;
  /** リンク先 */
  href: string;
  /** アイコン */
  icon?: string;
  /** アクティブフラグ */
  isActive?: boolean;
}

// カウントダウン設定の型定義
export interface CountdownConfig {
  /** 目標日時 */
  targetDate: Date;
  /** 表示形式 */
  format: 'days' | 'hours' | 'minutes' | 'seconds' | 'all';
  /** 更新間隔（ミリ秒） */
  interval?: number;
}

// ギャラリー項目の型定義
export interface GalleryItem {
  /** 項目ID */
  id: string;
  /** 画像設定 */
  image: ImageConfig;
  /** タイトル */
  title?: string;
  /** 説明 */
  description?: string;
  /** カテゴリ */
  category?: string;
}

// メッセージ項目の型定義
export interface MessageItem {
  /** メッセージID */
  id: string;
  /** 送信者名 */
  sender: string;
  /** メッセージ内容 */
  content: string;
  /** 送信日時 */
  timestamp: Date;
  /** アバター画像 */
  avatar?: string;
}

// ホスト情報の型定義
export interface HostInfo {
  /** 新郎名 */
  groomName: string;
  /** 新婦名 */
  brideName: string;
  /** 新郎画像 */
  groomImage?: string;
  /** 新婦画像 */
  brideImage?: string;
  /** 紹介文 */
  introduction?: string;
}

// エラーハンドリングの型定義
export interface ErrorInfo {
  /** エラーコード */
  code: string;
  /** エラーメッセージ */
  message: string;
  /** 詳細情報 */
  details?: string;
  /** タイムスタンプ */
  timestamp: Date;
}

// バリデーション結果の型定義
export interface ValidationResult {
  /** バリデーション成功フラグ */
  isValid: boolean;
  /** エラーメッセージ */
  errors: string[];
  /** 警告メッセージ */
  warnings: string[];
}

// パフォーマンス指標の型定義
export interface PerformanceMetrics {
  /** 読み込み時間 */
  loadTime: number;
  /** レンダリング時間 */
  renderTime: number;
  /** メモリ使用量 */
  memoryUsage: number;
  /** ネットワークリクエスト数 */
  networkRequests: number;
}
