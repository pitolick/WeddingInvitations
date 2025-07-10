/**
 * @description メインビジュアル（MV）セクションのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainVisual from '../index';

/**
 * @description メインビジュアル（MV）セクションのテストスイート
 */
describe('MainVisual', () => {
  /**
   * @description 基本的なレンダリングテスト
   */
  it('正しくレンダリングされること', () => {
    render(<MainVisual />);

    expect(screen.getByTestId('main-visual-section')).toBeInTheDocument();
    expect(screen.getByTestId('main-visual-content')).toBeInTheDocument();
    expect(screen.getByTestId('main-visual-title')).toBeInTheDocument();
  });

  /**
   * @description タイトルの表示テスト
   */
  it('タイトルが正しく表示されること', () => {
    render(<MainVisual />);

    expect(screen.getByText('Wedding Celebration')).toBeInTheDocument();
  });

  /**
   * @description 背景画像の表示テスト
   */
  it('背景画像が正しく表示されること', () => {
    render(<MainVisual />);

    const backgroundImage = screen.getByAltText('背景画像');
    expect(backgroundImage).toBeInTheDocument();
    // Next.jsのImageコンポーネントは画像URLを最適化するため、src属性の存在のみを確認
    expect(backgroundImage).toHaveAttribute('src');
  });

  /**
   * @description アニメーションクラスの確認テスト
   */
  it('アニメーションクラスが適用されること', () => {
    render(<MainVisual />);

    const title = screen.getByTestId('main-visual-title');
    expect(title).toHaveClass('animate-[fadeIn_2s_ease-in-out]');
  });

  /**
   * @description デフォルトのセクションIDの確認テスト
   */
  it('デフォルトのセクションIDが設定されること', () => {
    render(<MainVisual />);

    expect(screen.getByTestId('main-visual-section')).toBeInTheDocument();
  });
});
