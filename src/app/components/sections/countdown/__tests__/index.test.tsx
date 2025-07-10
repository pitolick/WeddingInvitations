/**
 * @description カウントダウンセクションのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Countdown from '../index';

/**
 * @description カウントダウンセクションのテストスイート
 */
describe('Countdown', () => {
  /**
   * @description カウントダウンセクションが正しくレンダリングされる
   */
  it('カウントダウンセクションが正しくレンダリングされる', () => {
    render(<Countdown />);

    // タイトルが表示されることを確認
    expect(screen.getByText('Countdown')).toBeInTheDocument();

    // 英語ラベルが表示されることを確認（レスポンシブ対応）
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
    expect(screen.getByText('h')).toBeInTheDocument();
    expect(screen.getByText('m')).toBeInTheDocument();
    expect(screen.getByText('s')).toBeInTheDocument();

    // 日付表示が表示されることを確認
    expect(screen.getByText('To')).toBeInTheDocument();
    expect(screen.getByText('2025.11.08')).toBeInTheDocument();
  });

  /**
   * @description カウントダウンセクションのアクセシビリティが正しく設定される
   */
  it('カウントダウンセクションのアクセシビリティが正しく設定される', () => {
    render(<Countdown />);

    // aria-labelが設定されていることを確認
    const section = screen.getByRole('region', {
      name: 'カウントダウンセクション',
    });
    expect(section).toBeInTheDocument();
  });

  /**
   * @description 黒20%オーバーレイが正しく適用される
   */
  it('黒20%オーバーレイが正しく適用される', () => {
    render(<Countdown />);

    // 背景画像と黒20%オーバーレイが適用されていることを確認
    const backgroundContainer = document.querySelector('.absolute.inset-0.z-0');
    expect(backgroundContainer).toBeInTheDocument();

    const overlay = document.querySelector('.absolute.inset-0.bg-black\\/20');
    expect(overlay).toBeInTheDocument();
  });

  /**
   * @description カウントダウン数値が正しく表示される
   */
  it('カウントダウン数値が正しく表示される', () => {
    render(<Countdown />);

    // カウントダウン数値が表示されることを確認（実際の値）
    const countdownValues = screen.getAllByText(/\d+/);
    expect(countdownValues.length).toBeGreaterThan(0);
  });

  /**
   * @description レスポンシブレイアウトのクラスが適用される
   */
  it('レスポンシブレイアウトのクラスが適用される', () => {
    render(<Countdown />);

    // レスポンシブレイアウトクラスが適用されていることを確認
    const section = screen.getByRole('region', {
      name: 'カウントダウンセクション',
    });
    expect(section).toHaveClass('py-16');

    // 時分秒のコンテナに幅指定が適用されていることを確認
    const timeContainers = document.querySelectorAll(
      '.w-\\[73px\\].md\\:w-auto'
    );
    expect(timeContainers.length).toBe(3); // 時間、分、秒の3つ
  });

  /**
   * @description レイアウト調整が正しく適用される
   */
  it('レイアウト調整が正しく適用される', () => {
    render(<Countdown />);

    // 日数と時分秒のコンテナにitems-center md:items-endが適用されていることを確認
    const mainContainer = document.querySelector(
      '.flex.flex-col.md\\:flex-row.justify-center.items-center.md\\:items-end'
    );
    expect(mainContainer).toBeInTheDocument();

    // 時分秒のコンテナにitems-center md:items-endが適用されていることを確認
    const timeContainer = document.querySelector(
      '.flex.flex-row.justify-center.items-center.md\\:items-end'
    );
    expect(timeContainer).toBeInTheDocument();
  });
});
