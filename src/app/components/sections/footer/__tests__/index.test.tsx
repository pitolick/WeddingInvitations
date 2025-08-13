/**
 * @description フッターセクションのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../index';

/**
 * @description フッターセクションの基本表示テスト
 */
describe('Footer Component', () => {
  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders footer component correctly', () => {
    render(<Footer />);

    // footer要素が存在する
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  /**
   * @description Thank Youメッセージが正しく表示される
   */
  it('displays Thank You message correctly', () => {
    render(<Footer />);

    // Thank Youメッセージが表示される
    expect(screen.getByText('Thank You !')).toBeInTheDocument();

    // フォントクラスが適用される
    const thankYouElement = screen.getByText('Thank You !');
    expect(thankYouElement).toHaveClass('font-rock');
  });

  /**
   * @description コピーライト情報が正しく表示される
   */
  it('displays copyright information correctly', () => {
    render(<Footer />);

    // コピーライトテキストが表示される
    expect(screen.getByText(/© 2025/)).toBeInTheDocument();

    // ぴいてっくリンクが表示される
    expect(screen.getByText('ぴいてっく')).toBeInTheDocument();
  });

  /**
   * @description ぴいてっくリンクが正しく設定される
   */
  it('has correct link to pitolick website', () => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: 'ぴいてっく' });

    // リンクの属性が正しく設定される
    expect(link).toHaveAttribute('href', 'https://www.pitolick.com/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveClass('underline');
  });

  /**
   * @description フッターの基本構造が正しい
   */
  it('has correct footer structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    // フッターのクラスが正しく適用される
    expect(footer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'w-full',
      'bg-white'
    );
  });

  /**
   * @description アニメーション要素が正しく設定される
   */
  it('has correct animation configuration', () => {
    render(<Footer />);

    const thankYouElement = screen.getByText('Thank You !');

    // motion要素の属性が正しく設定される
    expect(thankYouElement).toHaveClass(
      'text-4xl',
      'font-bold',
      'text-center',
      'font-rock',
      'text-gray-900'
    );
  });

  /**
   * @description レイアウトクラスが正しく適用される
   */
  it('has correct layout classes applied', () => {
    render(<Footer />);

    // メインコンテナのクラス
    const mainContainer = screen.getByText('Thank You !').closest('div');
    expect(mainContainer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'py-8',
      'gap-2'
    );

    // コピーライトコンテナのクラス
    const copyrightContainer = screen.getByText(/© 2025/).closest('div');
    expect(copyrightContainer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'w-full',
      'bg-lavender-600',
      'py-3'
    );
  });

  /**
   * @description コピーライトテキストのスタイリングが正しい
   */
  it('has correct copyright text styling', () => {
    render(<Footer />);

    const copyrightText = screen.getByText(/© 2025/);
    expect(copyrightText).toHaveClass('text-sm', 'text-center', 'text-white');
  });

  /**
   * @description フッターが画面幅いっぱいに表示される
   */
  it('spans full width of the screen', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('w-full');
  });

  /**
   * @description フッターが中央揃えで表示される
   */
  it('is centered horizontally and vertically', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('items-center', 'justify-center');
  });

  /**
   * @description 背景色が正しく設定される
   */
  it('has correct background colors', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-white');

    const copyrightContainer = screen.getByText(/© 2025/).closest('div');
    expect(copyrightContainer).toHaveClass('bg-lavender-600');
  });
});
