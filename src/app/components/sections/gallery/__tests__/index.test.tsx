/**
 * @description ギャラリーセクションのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Gallery from '../index';

// GalleryImageコンポーネントのモック
jest.mock('../GalleryImage', () => {
  return function MockGalleryImage({
    thumbnail,
    image,
    alt,
    size,
  }: {
    thumbnail: string;
    image: string;
    alt: string;
    size: number;
  }) {
    return (
      <div
        data-testid='gallery-image'
        data-thumbnail={thumbnail}
        data-image={image}
        data-alt={alt}
        data-size={size}
      >
        Mock Gallery Image
      </div>
    );
  };
});

/**
 * @description ギャラリーセクションの基本表示テスト
 */
describe('Gallery Component', () => {
  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders gallery component correctly', () => {
    render(<Gallery />);

    // section要素が存在する
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveAttribute('id', 'gallery');
  });

  /**
   * @description セクションの基本構造が正しい
   */
  it('has correct section structure', () => {
    render(<Gallery />);

    const section = screen.getByRole('region');

    // セクションのクラスが正しく適用される
    expect(section).toHaveClass(
      'w-full',
      'py-0',
      'sm:py-10',
      'bg-gradient-to-t',
      'from-lavender-400',
      'via-lavender-300',
      'to-pink-300'
    );
  });

  /**
   * @description 12枚の画像が正しく表示される
   */
  it('displays all 12 gallery images', () => {
    render(<Gallery />);

    // 12枚の画像が表示される
    const galleryImages = screen.getAllByTestId('gallery-image');
    expect(galleryImages).toHaveLength(12);
  });

  /**
   * @description 画像の属性が正しく設定される
   */
  it('has correct image attributes', () => {
    render(<Gallery />);

    const galleryImages = screen.getAllByTestId('gallery-image');

    // 最初の画像の属性を確認
    const firstImage = galleryImages[0];
    expect(firstImage).toHaveAttribute(
      'data-thumbnail',
      '/images/sections/gallery/gallery-1-thumbnail.webp'
    );
    expect(firstImage).toHaveAttribute(
      'data-image',
      '/images/sections/gallery/gallery-1.webp'
    );
    expect(firstImage).toHaveAttribute('data-alt', 'ギャラリー画像1');
    expect(firstImage).toHaveAttribute('data-size', '300');
  });

  /**
   * @description グリッドレイアウトが正しく適用される
   */
  it('has correct grid layout', () => {
    render(<Gallery />);

    const gridContainer = screen
      .getAllByTestId('gallery-image')[0]
      .closest('.grid');
    expect(gridContainer).toHaveClass(
      'grid',
      'grid-cols-3',
      'grid-rows-4',
      'gap-0',
      'sm:grid-cols-4',
      'md:grid-cols-6',
      'sm:grid-rows-3',
      'md:grid-rows-2'
    );
  });

  /**
   * @description レスポンシブデザインが正しく適用される
   */
  it('has correct responsive design classes', () => {
    render(<Gallery />);

    const gridContainer = screen
      .getAllByTestId('gallery-image')[0]
      .closest('.grid');

    // モバイル（デフォルト）
    expect(gridContainer).toHaveClass('grid-cols-3', 'grid-rows-4');

    // タブレット（sm:）
    expect(gridContainer).toHaveClass('sm:grid-cols-4', 'sm:grid-rows-3');

    // デスクトップ（md:）
    expect(gridContainer).toHaveClass('md:grid-cols-6', 'md:grid-rows-2');
  });

  /**
   * @description 背景グラデーションが正しく適用される
   */
  it('has correct background gradient', () => {
    render(<Gallery />);

    const section = screen.getByRole('region');
    expect(section).toHaveClass(
      'bg-gradient-to-t',
      'from-lavender-400',
      'via-lavender-300',
      'to-pink-300'
    );
  });

  /**
   * @description コンテナが正しく設定される
   */
  it('has correct container setup', () => {
    render(<Gallery />);

    const container = screen
      .getAllByTestId('gallery-image')[0]
      .closest('.container');
    expect(container).toHaveClass('container', 'm-auto');
  });

  /**
   * @description 中央揃えレイアウトが正しく適用される
   */
  it('has correct centering layout', () => {
    render(<Gallery />);

    const centerContainer = screen
      .getAllByTestId('gallery-image')[0]
      .closest('.flex');
    expect(centerContainer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center'
    );
  });

  /**
   * @description 画像の順序が正しい
   */
  it('displays images in correct order', () => {
    render(<Gallery />);

    const galleryImages = screen.getAllByTestId('gallery-image');

    // 最初の画像
    expect(galleryImages[0]).toHaveAttribute('data-alt', 'ギャラリー画像1');

    // 最後の画像
    expect(galleryImages[11]).toHaveAttribute('data-alt', 'ギャラリー画像12');

    // 中間の画像
    expect(galleryImages[5]).toHaveAttribute('data-alt', 'ギャラリー画像6');
  });

  /**
   * @description 画像サイズが正しく設定される
   */
  it('has correct image size configuration', () => {
    render(<Gallery />);

    const galleryImages = screen.getAllByTestId('gallery-image');

    // 全ての画像が同じサイズ（300）を持つ
    galleryImages.forEach(image => {
      expect(image).toHaveAttribute('data-size', '300');
    });
  });

  /**
   * @description パディングが正しく設定される
   */
  it('has correct padding configuration', () => {
    render(<Gallery />);

    const section = screen.getByRole('region');

    // モバイルではパディングなし
    expect(section).toHaveClass('py-0');

    // タブレット以上ではパディングあり
    expect(section).toHaveClass('sm:py-10');
  });

  /**
   * @description ギャップが正しく設定される
   */
  it('has correct gap configuration', () => {
    render(<Gallery />);

    const gridContainer = screen
      .getAllByTestId('gallery-image')[0]
      .closest('.grid');
    expect(gridContainer).toHaveClass('gap-0');
  });
});
