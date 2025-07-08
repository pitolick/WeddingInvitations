import React from "react";
import Image from "next/image";
import { ResponsiveImage, generateSizes } from "@/app/lib/utils/image";

/**
 * レスポンシブ画像コンポーネントのプロパティ
 * @description レスポンシブ画像を表示するためのプロパティを定義します
 */
interface ResponsiveImageProps {
  /** レスポンシブ画像オブジェクト */
  responsiveImage: ResponsiveImage;
  /** CSSクラス名 */
  className?: string;
  /** 各ブレークポイントでのサイズ指定 */
  sizes?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  /** 優先読み込みフラグ */
  priority?: boolean;
  /** 読み込み方法 */
  loading?: "lazy" | "eager";
}

/**
 * レスポンシブ画像コンポーネント
 * @description デバイスサイズに応じて最適な画像を表示するコンポーネントです
 * @param props - コンポーネントのプロパティ
 * @returns レスポンシブ画像コンポーネント
 * @example
 * ```typescript
 * <ResponsiveImageComponent
 *   responsiveImage={heroImage}
 *   className="w-full h-64 object-cover"
 *   sizes={{ mobile: '100vw', tablet: '100vw', desktop: '50vw' }}
 *   priority={true}
 * />
 * ```
 */
export const ResponsiveImageComponent: React.FC<ResponsiveImageProps> = ({
  responsiveImage,
  className = "",
  sizes = {
    mobile: "100vw",
    tablet: "100vw",
    desktop: "100vw",
  },
  priority = false,
  loading = "lazy",
}) => {
  const sizesAttr = generateSizes(sizes);

  return (
    <Image
      src={responsiveImage.desktop} // デフォルト画像
      alt={responsiveImage.alt}
      width={1920}
      height={1080}
      className={className}
      sizes={sizesAttr}
      priority={priority}
      loading={loading}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  );
};

export default ResponsiveImageComponent;
