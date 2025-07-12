/**
 * @description メインビジュアルセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description MainVisualコンポーネントのProps型
 */
export interface MainVisualProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description レスポンシブ画像設定の型
 */
export interface ResponsiveImageConfig {
  /** モバイル用画像パス */
  mobile: string;
  /** デスクトップ用画像パス */
  desktop: string;
  /** 代替テキスト */
  alt: string;
}
