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

// ナビゲーション設定
export const NAVIGATION_CONFIG = {
  /** ナビゲーション項目 */
  ITEMS: [
    { id: "mv", name: "トップ", href: "#mv" },
    { id: "countdown", name: "カウントダウン", href: "#countdown" },
    { id: "host", name: "ホスト", href: "#host" },
    { id: "message", name: "メッセージ", href: "#message" },
    { id: "gallery", name: "ギャラリー", href: "#gallery" },
    { id: "event", name: "イベント", href: "#event" },
    { id: "rsvp", name: "RSVP", href: "#rsvp" },
  ],
  /** スクロールオフセット */
  SCROLL_OFFSET: 80,
  /** スムーススクロール設定 */
  SMOOTH_SCROLL: true,
} as const;

// カウントダウン設定
export const COUNTDOWN_CONFIG = {
  /** 目標日時 */
  TARGET_DATE: new Date("2024-12-25T12:00:00"),
  /** 更新間隔（ミリ秒） */
  UPDATE_INTERVAL: 1000,
  /** 表示形式 */
  FORMAT: "all",
  /** 終了メッセージ */
  END_MESSAGE: "結婚式当日です！",
} as const;

// ギャラリー設定
export const GALLERY_CONFIG = {
  /** 画像表示数 */
  ITEMS_PER_PAGE: 6,
  /** モーダル表示設定 */
  MODAL_ENABLED: true,
  /** 画像拡大設定 */
  ZOOM_ENABLED: true,
  /** スライドショー設定 */
  SLIDESHOW_ENABLED: false,
  /** スライドショー間隔（ミリ秒） */
  SLIDESHOW_INTERVAL: 3000,
} as const;

// メッセージ設定
export const MESSAGE_CONFIG = {
  /** 最大表示数 */
  MAX_DISPLAY: 10,
  /** 文字数制限 */
  MAX_LENGTH: 200,
  /** 改行許可 */
  ALLOW_LINE_BREAK: true,
  /** 絵文字許可 */
  ALLOW_EMOJI: true,
} as const;

// ホスト設定
export const HOST_CONFIG = {
  /** 新郎情報 */
  GROOM: {
    name: "新郎太郎",
    image: "/images/host/groom.jpg",
    introduction: "新郎の紹介文",
  },
  /** 新婦情報 */
  BRIDE: {
    name: "新婦花子",
    image: "/images/host/bride.jpg",
    introduction: "新婦の紹介文",
  },
} as const;

// エラーメッセージ設定
export const ERROR_MESSAGES = {
  /** ネットワークエラー */
  NETWORK_ERROR: "ネットワークエラーが発生しました。",
  /** サーバーエラー */
  SERVER_ERROR: "サーバーエラーが発生しました。",
  /** バリデーションエラー */
  VALIDATION_ERROR: "入力内容に誤りがあります。",
  /** 認証エラー */
  AUTH_ERROR: "認証に失敗しました。",
  /** 不明なエラー */
  UNKNOWN_ERROR: "予期しないエラーが発生しました。",
} as const;

// 成功メッセージ設定
export const SUCCESS_MESSAGES = {
  /** RSVP送信成功 */
  RSVP_SENT: "RSVPを送信しました。",
  /** メッセージ送信成功 */
  MESSAGE_SENT: "メッセージを送信しました。",
  /** データ保存成功 */
  DATA_SAVED: "データを保存しました。",
} as const;

// バリデーション設定
export const VALIDATION_CONFIG = {
  /** 名前最小文字数 */
  NAME_MIN_LENGTH: 1,
  /** 名前最大文字数 */
  NAME_MAX_LENGTH: 50,
  /** メールアドレス正規表現 */
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  /** メッセージ最小文字数 */
  MESSAGE_MIN_LENGTH: 1,
  /** メッセージ最大文字数 */
  MESSAGE_MAX_LENGTH: 500,
} as const;

// パフォーマンス設定
export const PERFORMANCE_CONFIG = {
  /** 画像遅延読み込み */
  LAZY_LOAD_IMAGES: true,
  /** アニメーション最適化 */
  OPTIMIZE_ANIMATIONS: true,
  /** キャッシュ設定 */
  CACHE_ENABLED: true,
  /** 圧縮設定 */
  COMPRESSION_ENABLED: true,
} as const;

// アクセシビリティ設定
export const ACCESSIBILITY_CONFIG = {
  /** キーボードナビゲーション */
  KEYBOARD_NAVIGATION: true,
  /** スクリーンリーダー対応 */
  SCREEN_READER_SUPPORT: true,
  /** 高コントラストモード */
  HIGH_CONTRAST_MODE: false,
  /** フォントサイズ調整 */
  FONT_SIZE_ADJUSTMENT: true,
} as const;
