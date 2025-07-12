/**
 * @description メインビジュアルセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description MainVisualコンポーネントのProps型
 * @example
 * ```typescript
 * const mainVisualProps: MainVisualProps = {
 *   id: 'mv',
 *   className: 'relative h-screen'
 * };
 * ```
 */
export interface MainVisualProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description レスポンシブ画像設定の型
 * @example
 * ```typescript
 * const responsiveImageConfig: ResponsiveImageConfig = {
 *   mobile: '/images/mv-hero-mobile.webp',
 *   desktop: '/images/mv-hero-desktop.webp',
 *   alt: 'メインビジュアル画像'
 * };
 * ```
 */
export interface ResponsiveImageConfig {
  /** モバイル用画像パス */
  mobile: string;
  /** デスクトップ用画像パス */
  desktop: string;
  /** 代替テキスト */
  alt: string;
}
