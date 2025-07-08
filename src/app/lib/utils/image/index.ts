/**
 * @description 画像関連のユーティリティ関数
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { BREAKPOINTS } from "@/app/lib/constants";

/**
 * @description レスポンシブ画像オブジェクトの型定義
 * @interface ResponsiveImage
 * @since 1.0.0
 */
export interface ResponsiveImage {
  /** 画像の説明 */
  description: string;
  /** モバイル用画像パス */
  mobile: string;
  /** タブレット用画像パス */
  tablet: string;
  /** デスクトップ用画像パス */
  desktop: string;
  /** 代替テキスト */
  alt: string;
}

/**
 * @description レスポンシブ画像オブジェクトを作成する
 * @param basePath - 画像のベースパス
 * @param description - 画像の説明
 * @returns ResponsiveImage
 * @example
 * const heroImage = createResponsiveImage('/images/sections/mv/hero', 'ヒーロー画像');
 */
export function createResponsiveImage(
  basePath: string,
  description: string
): ResponsiveImage {
  return {
    description,
    mobile: `${basePath}-mobile.webp`,
    tablet: `${basePath}-tablet.webp`,
    desktop: `${basePath}-desktop.webp`,
    alt: description,
  };
}

/**
 * @description 現在のブレークポイントに応じた画像パスを取得する
 * @param responsiveImage - レスポンシブ画像オブジェクト
 * @param width - 現在の画面幅
 * @returns string
 * @example
 * const imagePath = getResponsiveImagePath(heroImage, 768);
 */
export function getResponsiveImagePath(
  responsiveImage: ResponsiveImage,
  width: number
): string {
  if (width <= BREAKPOINTS.MOBILE) {
    return responsiveImage.mobile;
  } else if (width <= BREAKPOINTS.TABLET) {
    return responsiveImage.tablet;
  } else {
    return responsiveImage.desktop;
  }
}

/**
 * @description 画像の最適化設定を取得する
 * @param priority - 優先読み込みフラグ
 * @param sizes - サイズ設定
 * @returns object
 * @example
 * const optimization = getImageOptimization(true, { mobile: '100vw', desktop: '50vw' });
 */
export function getImageOptimization(
  priority: boolean = false,
  sizes: Record<string, string> = {}
) {
  return {
    priority,
    sizes: sizes,
    quality: 85,
    format: "webp" as const,
  };
}

/**
 * @description 画像の遅延読み込み設定を取得する
 * @param threshold - 読み込み開始の閾値
 * @returns object
 * @example
 * const lazyLoad = getLazyLoadConfig(0.1);
 */
export function getLazyLoadConfig(threshold: number = 0.1) {
  return {
    loading: "lazy" as const,
    threshold,
  };
}

/**
 * @description 画像のエラーハンドリング設定を取得する
 * @param fallbackSrc - フォールバック画像パス
 * @returns object
 * @example
 * const errorHandling = getImageErrorHandling('/images/fallback.webp');
 */
export function getImageErrorHandling(fallbackSrc: string) {
  return {
    onError: (event: React.SyntheticEvent<HTMLImageElement>) => {
      const target = event.target as HTMLImageElement;
      target.src = fallbackSrc;
    },
  };
}
