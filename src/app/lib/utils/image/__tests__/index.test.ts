/**
 * @description 画像ユーティリティ関数のテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  createResponsiveImage,
  getResponsiveImagePath,
  getImageOptimization,
  getLazyLoadConfig,
  getImageErrorHandling,
} from "../index";
import { ResponsiveImage } from "../index";

/**
 * @description createResponsiveImage関数のテスト
 */
describe("createResponsiveImage", () => {
  it("レスポンシブ画像オブジェクトを正しく作成する", () => {
    const basePath = "/images/sections/mv/hero";
    const description = "ヒーロー画像";

    const result = createResponsiveImage(basePath, description);

    expect(result).toEqual({
      description: "ヒーロー画像",
      mobile: "/images/sections/mv/hero-mobile.webp",
      tablet: "/images/sections/mv/hero-tablet.webp",
      desktop: "/images/sections/mv/hero-desktop.webp",
      alt: "ヒーロー画像",
    });
  });
});

/**
 * @description getResponsiveImagePath関数のテスト
 */
describe("getResponsiveImagePath", () => {
  const mockResponsiveImage: ResponsiveImage = {
    description: "テスト画像",
    mobile: "/images/test-mobile.webp",
    tablet: "/images/test-tablet.webp",
    desktop: "/images/test-desktop.webp",
    alt: "テスト画像",
  };

  it("モバイル幅でモバイル画像パスを返す", () => {
    const result = getResponsiveImagePath(mockResponsiveImage, 375);
    expect(result).toBe("/images/test-mobile.webp");
  });

  it("タブレット幅でタブレット画像パスを返す", () => {
    const result = getResponsiveImagePath(mockResponsiveImage, 768);
    expect(result).toBe("/images/test-tablet.webp");
  });

  it("デスクトップ幅でデスクトップ画像パスを返す", () => {
    const result = getResponsiveImagePath(mockResponsiveImage, 1200);
    expect(result).toBe("/images/test-desktop.webp");
  });
});

/**
 * @description getImageOptimization関数のテスト
 */
describe("getImageOptimization", () => {
  it("デフォルト設定で最適化設定を返す", () => {
    const result = getImageOptimization();

    expect(result).toEqual({
      priority: false,
      sizes: {},
      quality: 85,
      format: "webp",
    });
  });

  it("カスタム設定で最適化設定を返す", () => {
    const priority = true;
    const sizes = { mobile: "100vw", desktop: "50vw" };

    const result = getImageOptimization(priority, sizes);

    expect(result).toEqual({
      priority: true,
      sizes: { mobile: "100vw", desktop: "50vw" },
      quality: 85,
      format: "webp",
    });
  });
});

/**
 * @description getLazyLoadConfig関数のテスト
 */
describe("getLazyLoadConfig", () => {
  it("デフォルト設定で遅延読み込み設定を返す", () => {
    const result = getLazyLoadConfig();

    expect(result).toEqual({
      loading: "lazy",
      threshold: 0.1,
    });
  });

  it("カスタム閾値で遅延読み込み設定を返す", () => {
    const threshold = 0.5;
    const result = getLazyLoadConfig(threshold);

    expect(result).toEqual({
      loading: "lazy",
      threshold: 0.5,
    });
  });
});

/**
 * @description getImageErrorHandling関数のテスト
 */
describe("getImageErrorHandling", () => {
  it("エラーハンドリング設定を返す", () => {
    const fallbackSrc = "/images/fallback.webp";
    const result = getImageErrorHandling(fallbackSrc);

    expect(result).toHaveProperty("onError");
    expect(typeof result.onError).toBe("function");
  });

  it("エラーハンドラーが正しく動作する", () => {
    const fallbackSrc = "/images/fallback.webp";
    const { onError } = getImageErrorHandling(fallbackSrc);

    const mockEvent = {
      target: {
        src: "/images/original.webp",
      },
    } as React.SyntheticEvent<HTMLImageElement>;

    onError(mockEvent);

    expect(mockEvent.target.src).toBe(fallbackSrc);
  });
});
