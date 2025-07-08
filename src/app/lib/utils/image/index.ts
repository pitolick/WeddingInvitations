// レスポンシブ画像管理ユーティリティ

export type Breakpoint = "mobile" | "tablet" | "desktop";

export interface ResponsiveImage {
  mobile: string;
  tablet: string;
  desktop: string;
  alt: string;
}

/**
 * ブレークポイントに基づいて適切な画像パスを取得
 * @description 指定されたベースパスとブレークポイントから、適切な画像パスを生成します
 * @param basePath - 画像のベースパス（例: '/images/sections/mv/hero'）
 * @param breakpoint - ブレークポイント（'mobile' | 'tablet' | 'desktop'）
 * @param extension - ファイル拡張子（デフォルト: 'webp'）
 * @returns 生成された画像パス
 * @example
 * ```typescript
 * const mobilePath = getResponsiveImagePath('/images/sections/mv/hero', 'mobile');
 * // 結果: '/images/sections/mv/hero-mobile.webp'
 * ```
 */
export const getResponsiveImagePath = (
  basePath: string,
  breakpoint: Breakpoint,
  extension: string = "webp"
): string => {
  return `${basePath}-${breakpoint}.${extension}`;
};

/**
 * レスポンシブ画像オブジェクトを生成
 * @description 指定されたベースパスと代替テキストから、モバイル・タブレット・デスクトップ用の画像パスを持つオブジェクトを生成します
 * @param basePath - 画像のベースパス（例: '/images/sections/mv/hero'）
 * @param alt - 画像の代替テキスト
 * @param extension - ファイル拡張子（デフォルト: 'webp'）
 * @returns レスポンシブ画像オブジェクト
 * @example
 * ```typescript
 * const heroImage = createResponsiveImage('/images/sections/mv/hero', 'ヒーロー画像');
 * // 結果: { mobile: '/images/sections/mv/hero-mobile.webp', ... }
 * ```
 */
export const createResponsiveImage = (
  basePath: string,
  alt: string,
  extension: string = "webp"
): ResponsiveImage => {
  return {
    mobile: getResponsiveImagePath(basePath, "mobile", extension),
    tablet: getResponsiveImagePath(basePath, "tablet", extension),
    desktop: getResponsiveImagePath(basePath, "desktop", extension),
    alt,
  };
};

/**
 * 現在のブレークポイントを判定
 * @description 指定された画面幅から、適切なブレークポイントを判定します
 * @param width - 画面幅（ピクセル）
 * @returns ブレークポイント（'mobile' | 'tablet' | 'desktop'）
 * @example
 * ```typescript
 * const breakpoint = getBreakpoint(768);
 * // 結果: 'tablet'
 * ```
 */
export const getBreakpoint = (width: number): Breakpoint => {
  if (width <= 640) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
};

/**
 * レスポンシブ画像のsrcset文字列を生成
 * @description レスポンシブ画像オブジェクトから、HTMLのsrcset属性用の文字列を生成します
 * @param responsiveImage - レスポンシブ画像オブジェクト
 * @returns srcset文字列
 * @example
 * ```typescript
 * const srcSet = generateSrcSet(heroImage);
 * // 結果: '/images/sections/mv/hero-mobile.webp 640w, /images/sections/mv/hero-tablet.webp 1024w, ...'
 * ```
 */
export const generateSrcSet = (responsiveImage: ResponsiveImage): string => {
  return `${responsiveImage.mobile} 640w, ${responsiveImage.tablet} 1024w, ${responsiveImage.desktop} 1920w`;
};

/**
 * レスポンシブ画像のsizes属性を生成
 * @description 各ブレークポイントでのサイズ指定から、HTMLのsizes属性用の文字列を生成します
 * @param sizes - 各ブレークポイントでのサイズ指定
 * @returns sizes文字列
 * @example
 * ```typescript
 * const sizes = generateSizes({
 *   mobile: '100vw',
 *   tablet: '50vw',
 *   desktop: '33vw'
 * });
 * // 結果: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
 * ```
 */
export const generateSizes = (sizes: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string => {
  const parts = [];

  if (sizes.mobile) {
    parts.push(`(max-width: 640px) ${sizes.mobile}`);
  }
  if (sizes.tablet) {
    parts.push(`(max-width: 1024px) ${sizes.tablet}`);
  }
  if (sizes.desktop) {
    parts.push(sizes.desktop);
  }

  return parts.join(", ");
};
