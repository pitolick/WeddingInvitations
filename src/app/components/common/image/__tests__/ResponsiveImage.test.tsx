/**
 * @description ResponsiveImageコンポーネントのテストファイル
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import ResponsiveImageComponent from '../ResponsiveImage';
import { ResponsiveImage, getResponsiveImagePath } from '@/app/lib/utils/image';

// getResponsiveImagePathをモック
jest.mock('@/app/lib/utils/image', () => ({
  ...jest.requireActual('@/app/lib/utils/image'),
  getResponsiveImagePath: jest.fn(),
}));

const mockGetResponsiveImagePath =
  getResponsiveImagePath as jest.MockedFunction<typeof getResponsiveImagePath>;

describe('ResponsiveImage', () => {
  const mockResponsiveImage: ResponsiveImage = {
    description: 'テスト画像',
    mobile: '/images/test-mobile.webp',
    tablet: '/images/test-tablet.webp',
    desktop: '/images/test-desktop.webp',
    alt: 'テスト画像の代替テキスト',
  };

  beforeEach(() => {
    // windowオブジェクトのモック設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // デフォルトのモック戻り値
    mockGetResponsiveImagePath.mockReturnValue('/images/test-tablet.webp');

    // addEventListener とremoveEventListenerをスパイする
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');

    // モックのリセット
    jest.clearAllMocks();
  });

  afterEach(() => {
    // モックのクリーンアップ
    jest.restoreAllMocks();
  });

  describe('基本的なレンダリング', () => {
    test('コンポーネントが正常にレンダリングされる', () => {
      render(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'テスト画像の代替テキスト');
    });

    test('デフォルトのpropsが適用される', () => {
      render(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('sizes', '100vw');
      expect(img).toHaveAttribute('class', '');
    });

    test('カスタムクラスが適用される', () => {
      const customClass = 'w-full h-64 object-cover';
      render(
        <ResponsiveImageComponent
          responsiveImage={mockResponsiveImage}
          className={customClass}
        />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveClass(customClass);
    });
  });

  describe('プロパティ設定', () => {
    test('lazy=falseの場合、loading="eager"が設定される', () => {
      render(
        <ResponsiveImageComponent
          responsiveImage={mockResponsiveImage}
          lazy={false}
        />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('loading', 'eager');
    });

    test('カスタムサイズが正しく生成される', () => {
      const sizes = {
        mobile: '100vw',
        tablet: '50vw',
        desktop: '33vw',
      };

      render(
        <ResponsiveImageComponent
          responsiveImage={mockResponsiveImage}
          sizes={sizes}
        />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute(
        'sizes',
        '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      );
    });

    test('部分的なサイズ設定が正しく処理される', () => {
      const sizes = {
        mobile: '100vw',
        desktop: '50vw',
      };

      render(
        <ResponsiveImageComponent
          responsiveImage={mockResponsiveImage}
          sizes={sizes}
        />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('sizes', '(max-width: 640px) 100vw, 50vw');
    });
  });

  describe('レスポンシブ動作', () => {
    test('ウィンドウサイズに応じてモバイル画像が選択される', async () => {
      mockGetResponsiveImagePath.mockReturnValue('/images/test-mobile.webp');

      render(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/images/test-mobile.webp');
    });

    test('ウィンドウサイズに応じてタブレット画像が選択される', async () => {
      mockGetResponsiveImagePath.mockReturnValue('/images/test-tablet.webp');

      render(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/images/test-tablet.webp');
    });

    test('ウィンドウサイズに応じてデスクトップ画像が選択される', async () => {
      mockGetResponsiveImagePath.mockReturnValue('/images/test-desktop.webp');

      render(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/images/test-desktop.webp');
    });

    test('リサイズイベントリスナーが正しく設定される', () => {
      render(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      expect(window.addEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
    });

    test('コンポーネントのアンマウント時にリサイズイベントリスナーが削除される', () => {
      const { unmount } = render(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      unmount();

      expect(window.removeEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
    });
  });

  describe('エラーハンドリング', () => {
    test('画像読み込みエラー時にフォールバック画像が設定される', () => {
      render(
        <ResponsiveImageComponent
          responsiveImage={mockResponsiveImage}
          fallbackSrc='/images/fallback-test.webp'
        />
      );

      const img = screen.getByRole('img');

      // エラーイベントをシミュレート
      act(() => {
        fireEvent.error(img);
      });

      expect(img).toHaveAttribute('src', '/images/fallback-test.webp');
    });

    test('デフォルトのフォールバック画像が使用される', () => {
      render(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      const img = screen.getByRole('img');

      // エラーイベントをシミュレート
      act(() => {
        fireEvent.error(img);
      });

      expect(img).toHaveAttribute('src', '/images/fallback.webp');
    });
  });

  describe('sizes属性の生成', () => {
    test('空のsizesオブジェクトの場合、デフォルト値が使用される', () => {
      render(
        <ResponsiveImageComponent
          responsiveImage={mockResponsiveImage}
          sizes={{}}
        />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('sizes', '100vw');
    });

    test('mobileのみ指定の場合', () => {
      render(
        <ResponsiveImageComponent
          responsiveImage={mockResponsiveImage}
          sizes={{ mobile: '90vw' }}
        />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('sizes', '(max-width: 640px) 90vw');
    });

    test('tabletのみ指定の場合', () => {
      render(
        <ResponsiveImageComponent
          responsiveImage={mockResponsiveImage}
          sizes={{ tablet: '80vw' }}
        />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('sizes', '(max-width: 1024px) 80vw');
    });

    test('desktopのみ指定の場合', () => {
      render(
        <ResponsiveImageComponent
          responsiveImage={mockResponsiveImage}
          sizes={{ desktop: '70vw' }}
        />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('sizes', '70vw');
    });
  });

  describe('リサイズ動作', () => {
    test('ウィンドウリサイズで画像パスが更新される', () => {
      const { rerender } = render(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      // モバイル画像を設定
      getResponsiveImagePath.mockReturnValue('/images/test-mobile.webp');

      // 再レンダリングをトリガー
      rerender(
        <ResponsiveImageComponent responsiveImage={mockResponsiveImage} />
      );

      // リサイズイベントをシミュレート
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 480,
        });
        window.dispatchEvent(new Event('resize'));
      });

      expect(mockGetResponsiveImagePath).toHaveBeenCalled();
    });
  });
});
