/**
 * @description レスポンシブ画像コンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React, { useState, useEffect } from "react";
import { ResponsiveImage, getResponsiveImagePath } from "@/app/lib/utils/image";

/**
 * @description レスポンシブ画像コンポーネントのProps型定義
 * @interface ResponsiveImageComponentProps
 * @since 1.0.0
 */
interface ResponsiveImageComponentProps {
  /** レスポンシブ画像オブジェクト */
  responsiveImage: ResponsiveImage;
  /** 追加のCSSクラス */
  className?: string;
  /** サイズ設定 */
  sizes?: Record<string, string>;
  /** 優先読み込みフラグ（Next.js Imageコンポーネント用） */
  priority?: boolean;
  /** 遅延読み込み設定 */
  lazy?: boolean;
  /** フォールバック画像パス */
  fallbackSrc?: string;
}

/**
 * @description レスポンシブ画像コンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <ResponsiveImageComponent
 *   responsiveImage={heroImage}
 *   className="w-full h-64 object-cover"
 *   sizes={{ mobile: "100vw", desktop: "50vw" }}
 *   priority={true}
 * />
 */
const ResponsiveImageComponent: React.FC<ResponsiveImageComponentProps> = ({
  responsiveImage,
  className = "",
  sizes = {},
  lazy = true,
  fallbackSrc = "/images/fallback.webp",
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<number>(0);

  /**
   * @description ウィンドウサイズの変更を監視する
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 初期サイズを設定
    setWindowWidth(window.innerWidth);

    // リサイズイベントリスナーを追加
    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * @description 現在の画面幅に応じた画像パスを取得する
   */
  useEffect(() => {
    if (windowWidth > 0) {
      const imagePath = getResponsiveImagePath(responsiveImage, windowWidth);
      setCurrentSrc(imagePath);
    }
  }, [responsiveImage, windowWidth]);

  /**
   * @description エラーハンドリング
   */
  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    target.src = fallbackSrc;
  };

  /**
   * @description sizes属性を生成する
   */
  const generateSizes = (): string => {
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

    return parts.join(", ") || "100vw";
  };

  return (
    <img
      src={currentSrc}
      alt={responsiveImage.alt}
      className={className}
      loading={lazy ? "lazy" : "eager"}
      sizes={generateSizes()}
      onError={handleError}
    />
  );
};

export default ResponsiveImageComponent;
