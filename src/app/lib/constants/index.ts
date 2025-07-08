/**
 * @description 定数のエクスポートバンドル
 * @author WeddingInvitations
 * @since 1.0.0
 */

// アプリケーション設定
export const APP_CONFIG = {
  /** アプリケーション名 */
  NAME: "Wedding Invitations",
  /** バージョン */
  VERSION: "1.0.0",
  /** 説明 */
  DESCRIPTION: "ディズニーテーマの結婚式Web招待状",
} as const;

// ブレークポイント設定
export const BREAKPOINTS = {
  /** モバイル */
  MOBILE: 640,
  /** タブレット */
  TABLET: 1024,
  /** デスクトップ */
  DESKTOP: 1025,
} as const;

// セクションID
export const SECTION_IDS = {
  /** メインビジュアル */
  MV: "mv",
  /** ナビゲーション */
  NAVIGATION: "navigation",
  /** カウントダウン */
  COUNTDOWN: "countdown",
  /** ホスト */
  HOST: "host",
  /** メッセージ */
  MESSAGE: "message",
  /** ギャラリー */
  GALLERY: "gallery",
  /** イベント */
  EVENT: "event",
  /** RSVP */
  RSVP: "rsvp",
  /** フッター */
  FOOTER: "footer",
} as const;

// RSVPステータス
export const RSVP_STATUS = {
  /** 未回答 */
  PENDING: "pending",
  /** 出席 */
  ATTENDING: "attending",
  /** 欠席 */
  NOT_ATTENDING: "not-attending",
} as const;

// イベント情報
export const EVENT_INFO = {
  /** 新郎名 */
  GROOM_NAME: "新郎太郎",
  /** 新婦名 */
  BRIDE_NAME: "新婦花子",
  /** 結婚式日時 */
  WEDDING_DATE: new Date("2024-12-25T12:00:00"),
  /** 結婚式会場 */
  VENUE: "ディズニーリゾート",
  /** 住所 */
  ADDRESS: "千葉県浦安市舞浜1-1",
  /** 地図URL */
  MAP_URL: "https://maps.google.com/?q=ディズニーリゾート",
} as const;

// 画像パス
export const IMAGE_PATHS = {
  /** セクション画像ベースパス */
  SECTIONS: "/images/sections",
  /** 共通画像ベースパス */
  COMMON: "/images/common",
  /** アイコン画像ベースパス */
  ICONS: "/images/icons",
} as const;

// API設定
export const API_CONFIG = {
  /** microCMS API エンドポイント */
  MICROCMS_BASE_URL: "https://your-service.microcms.io/api/v1",
  /** Google Apps Script URL */
  GOOGLE_APPS_SCRIPT_URL: process.env.GOOGLE_APPS_SCRIPT_URL || "",
  /** Figma API エンドポイント */
  FIGMA_API_URL: "https://api.figma.com/v1",
} as const;

// フォーム設定
export const FORM_CONFIG = {
  /** 最大お連れ様数 */
  MAX_COMPANIONS: 5,
  /** メッセージ最大文字数 */
  MAX_MESSAGE_LENGTH: 500,
  /** 食事制限オプション */
  DIETARY_OPTIONS: [
    "なし",
    "ベジタリアン",
    "ビーガン",
    "グルテンフリー",
    "アレルギー対応",
  ],
} as const;

// アニメーション設定
export const ANIMATION_CONFIG = {
  /** デフォルトアニメーション時間 */
  DURATION: 0.3,
  /** イージング */
  EASING: "ease-in-out",
  /** 遅延時間 */
  DELAY: 0.1,
} as const;

// カラーパレット
export const COLORS = {
  /** プライマリカラー */
  PRIMARY: "#3B82F6",
  /** セカンダリカラー */
  SECONDARY: "#6B7280",
  /** アクセントカラー */
  ACCENT: "#F59E0B",
  /** 成功色 */
  SUCCESS: "#10B981",
  /** エラー色 */
  ERROR: "#EF4444",
  /** 警告色 */
  WARNING: "#F59E0B",
} as const;
