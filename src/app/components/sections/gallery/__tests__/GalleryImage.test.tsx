/**
 * @description GalleryImageコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import GalleryImage from '../GalleryImage';

// Modalコンポーネントのモック
jest.mock('@/app/components/common/modal', () => ({
  Modal: ({
    children,
    isOpen,
    onClose,
    size,
    showCloseButton,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    size: string;
    showCloseButton: boolean;
  }) => {
    if (!isOpen) return null;
    return (
      <div
        data-testid='modal'
        data-size={size}
        data-show-close-button={showCloseButton.toString()}
      >
        <button onClick={onClose} data-testid='modal-close'>
          Close
        </button>
        {children}
      </div>
    );
  },
}));

// Next.js Imageコンポーネントのモック
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    width,
    height,
    className,
    priority,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
    priority: boolean;
  }) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        data-priority={priority.toString()}
        data-testid='next-image'
      />
    );
  };
});

/**
 * @description GalleryImageコンポーネントの基本表示テスト
 */
describe('GalleryImage Component', () => {
  const defaultProps = {
    thumbnail: '/images/sections/gallery/gallery-1-thumbnail.webp',
    image: '/images/sections/gallery/gallery-1.webp',
    alt: 'ギャラリー画像1',
    size: 300,
  };

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders gallery image component correctly', () => {
    render(<GalleryImage {...defaultProps} />);

    // ボタンが存在する
    expect(screen.getByRole('button')).toBeInTheDocument();

    // サムネイル画像が表示される
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
  });

  /**
   * @description サムネイル画像の属性が正しく設定される
   */
  it('has correct thumbnail image attributes', () => {
    render(<GalleryImage {...defaultProps} />);

    const thumbnailImage = screen.getByTestId('next-image');

    expect(thumbnailImage).toHaveAttribute('src', defaultProps.thumbnail);
    expect(thumbnailImage).toHaveAttribute('alt', defaultProps.alt);
    expect(thumbnailImage).toHaveAttribute(
      'width',
      defaultProps.size.toString()
    );
    expect(thumbnailImage).toHaveAttribute(
      'height',
      defaultProps.size.toString()
    );
    expect(thumbnailImage).toHaveClass('object-cover', 'w-full', 'h-auto');
    expect(thumbnailImage).toHaveAttribute('data-priority', 'false');
  });

  /**
   * @description ボタンの属性が正しく設定される
   */
  it('has correct button attributes', () => {
    render(<GalleryImage {...defaultProps} />);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-label', defaultProps.alt);
    expect(button).toHaveClass(
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
      'size-full'
    );
  });

  /**
   * @description クリック時にモーダルが開く
   */
  it('opens modal when clicked', () => {
    render(<GalleryImage {...defaultProps} />);

    const button = screen.getByRole('button');

    // 初期状態ではモーダルが閉じている
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    // クリック時にモーダルが開く
    fireEvent.click(button);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  /**
   * @description モーダルの属性が正しく設定される
   */
  it('has correct modal attributes', () => {
    render(<GalleryImage {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const modal = screen.getByTestId('modal');

    expect(modal).toHaveAttribute('data-size', 'fullscreen');
    expect(modal).toHaveAttribute('data-show-close-button', 'true');
  });

  /**
   * @description モーダル内の画像が正しく表示される
   */
  it('displays correct image in modal', () => {
    render(<GalleryImage {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // モーダル内に2つの画像が表示される（サムネイルとフルサイズ）
    const images = screen.getAllByTestId('next-image');
    expect(images).toHaveLength(2);

    // フルサイズ画像の属性を確認
    const fullSizeImage = images[1]; // 2番目の画像がフルサイズ
    expect(fullSizeImage).toHaveAttribute('src', defaultProps.image);
    expect(fullSizeImage).toHaveAttribute('alt', defaultProps.alt);
    expect(fullSizeImage).toHaveAttribute('width', '800');
    expect(fullSizeImage).toHaveAttribute('height', '800');
    expect(fullSizeImage).toHaveClass('max-h-[90vh]', 'w-auto');
  });

  /**
   * @description モーダルが閉じるボタンで閉じる
   */
  it('closes modal when close button is clicked', () => {
    render(<GalleryImage {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // モーダルが開いている
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // 閉じるボタンをクリック
    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);

    // モーダルが閉じる
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  /**
   * @description 異なるサイズで正しく動作する
   */
  it('works with different sizes', () => {
    const props = { ...defaultProps, size: 150 };
    render(<GalleryImage {...props} />);

    const thumbnailImage = screen.getByTestId('next-image');
    expect(thumbnailImage).toHaveAttribute('width', '150');
    expect(thumbnailImage).toHaveAttribute('height', '150');
  });

  /**
   * @description 異なるaltテキストで正しく動作する
   */
  it('works with different alt text', () => {
    const props = { ...defaultProps, alt: 'カスタム画像説明' };
    render(<GalleryImage {...props} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'カスタム画像説明');

    const thumbnailImage = screen.getByTestId('next-image');
    expect(thumbnailImage).toHaveAttribute('alt', 'カスタム画像説明');
  });

  /**
   * @description 異なる画像パスで正しく動作する
   */
  it('works with different image paths', () => {
    const props = {
      ...defaultProps,
      thumbnail: '/custom/thumbnail.jpg',
      image: '/custom/full.jpg',
    };
    render(<GalleryImage {...props} />);

    const thumbnailImage = screen.getByTestId('next-image');
    expect(thumbnailImage).toHaveAttribute('src', '/custom/thumbnail.jpg');

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const images = screen.getAllByTestId('next-image');
    const fullSizeImage = images[1];
    expect(fullSizeImage).toHaveAttribute('src', '/custom/full.jpg');
  });

  /**
   * @description アクセシビリティが正しく設定される
   */
  it('has proper accessibility attributes', () => {
    render(<GalleryImage {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', defaultProps.alt);
    expect(button).toHaveAttribute('type', 'button');

    const thumbnailImage = screen.getByTestId('next-image');
    expect(thumbnailImage).toHaveAttribute('alt', defaultProps.alt);
  });

  /**
   * @description ボタンのスタイリングが正しく適用される
   */
  it('has correct button styling', () => {
    render(<GalleryImage {...defaultProps} />);

    const button = screen.getByRole('button');

    // Flexboxレイアウト
    expect(button).toHaveClass(
      'flex',
      'flex-col',
      'justify-center',
      'items-center'
    );

    // サイズ
    expect(button).toHaveClass('size-full');
  });

  /**
   * @description 画像のスタイリングが正しく適用される
   */
  it('has correct image styling', () => {
    render(<GalleryImage {...defaultProps} />);

    const thumbnailImage = screen.getByTestId('next-image');

    // オブジェクトフィット
    expect(thumbnailImage).toHaveClass('object-cover');

    // サイズ
    expect(thumbnailImage).toHaveClass('w-full', 'h-auto');
  });
});
