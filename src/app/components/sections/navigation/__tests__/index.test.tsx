/**
 * @description Navigationコンポーネントのテスト（FigmaMCP仕様準拠）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../index';

/**
 * @description Navigationコンポーネントの基本表示テスト
 */
describe('Navigation', () => {
  it('正しくレンダリングされる', () => {
    render(<Navigation />);

    // セクションが存在することを確認
    expect(screen.getByTestId('navigation-section')).toBeInTheDocument();
  });

  it('3つのナビゲーション項目が表示される', () => {
    render(<Navigation />);

    // 各ナビゲーション項目の英語タイトル
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Event')).toBeInTheDocument();
    expect(screen.getByText('RSVP')).toBeInTheDocument();

    // 各ナビゲーション項目の日本語タイトル
    expect(screen.getByText('ご挨拶')).toBeInTheDocument();
    expect(screen.getByText('日時・会場')).toBeInTheDocument();
    expect(screen.getByText('ご出欠')).toBeInTheDocument();
  });

  it('Sunアイコンが各ナビゲーション項目に表示される', () => {
    render(<Navigation />);

    // Sunアイコンが3つ存在することを確認
    const sunIcons = screen.getAllByTestId('sun-icon');
    expect(sunIcons).toHaveLength(3);
  });

  it('各ナビゲーション項目がaタグとして表示される', () => {
    render(<Navigation />);

    // 各ナビゲーション項目がaタグとして存在することを確認
    const messageLink = screen.getByRole('link', {
      name: /ご挨拶セクションへ移動/,
    });
    const eventLink = screen.getByRole('link', {
      name: /日時・会場セクションへ移動/,
    });
    const rsvpLink = screen.getByRole('link', {
      name: /ご出欠セクションへ移動/,
    });

    expect(messageLink).toBeInTheDocument();
    expect(eventLink).toBeInTheDocument();
    expect(rsvpLink).toBeInTheDocument();
  });

  it('各ナビゲーション項目のhref属性が正しく設定される', () => {
    render(<Navigation />);

    // 各ナビゲーション項目のhref属性を確認
    const messageLink = screen.getByRole('link', {
      name: /ご挨拶セクションへ移動/,
    });
    const eventLink = screen.getByRole('link', {
      name: /日時・会場セクションへ移動/,
    });
    const rsvpLink = screen.getByRole('link', {
      name: /ご出欠セクションへ移動/,
    });

    expect(messageLink).toHaveAttribute('href', '#message');
    expect(eventLink).toHaveAttribute('href', '#event');
    expect(rsvpLink).toHaveAttribute('href', '#rsvp');
  });

  it('英語タイトルがBerkshire Swashフォントで表示される', () => {
    render(<Navigation />);

    const englishTitles = screen.getAllByText(/Message|Event|RSVP/);
    englishTitles.forEach(title => {
      expect(title).toHaveClass('font-berkshire', 'text-white', 'text-xl');
    });
  });

  it('日本語タイトルがNoto Sans JPフォントで表示される', () => {
    render(<Navigation />);

    const japaneseTitles = screen.getAllByText(/ご挨拶|日時・会場|ご出欠/);
    japaneseTitles.forEach(title => {
      expect(title).toHaveClass(
        'font-noto',
        'font-bold',
        'text-white',
        'text-sm'
      );
    });
  });

  it('Sunアイコンが正しい色で表示される', () => {
    render(<Navigation />);

    const sunIcons = screen.getAllByTestId('sun-icon');
    sunIcons.forEach(icon => {
      expect(icon).toHaveClass('text-yellow-500');
    });
  });

  it('レスポンシブデザインのクラスが適用される', () => {
    render(<Navigation />);

    const section = screen.getByTestId('navigation-section');
    expect(section).toHaveClass('w-full', 'bg-lavender-600', 'py-4');
  });

  it('ナビゲーションコンテナが正しいレイアウトクラスを持つ', () => {
    render(<Navigation />);

    const section = screen.getByTestId('navigation-section');
    const container = section.querySelector(
      '.flex.items-center.justify-center.gap-2'
    );
    expect(container).toBeInTheDocument();
  });

  it('各ナビゲーション項目が正しいレイアウトクラスを持つ', () => {
    render(<Navigation />);

    const navigationSection = screen.getByTestId('navigation-section');
    const links = navigationSection.querySelectorAll('a');
    links.forEach(link => {
      expect(link).toHaveClass('flex');
      expect(link).toHaveClass('flex-col');
      expect(link).toHaveClass('items-center');
      expect(link).toHaveClass('gap-0.5');
      expect(link).toHaveClass('w-28');
      expect(link).toHaveClass('hover:opacity-80');
      expect(link).toHaveClass('transition-opacity');
      expect(link).toHaveClass('duration-200');
    });
  });

  it('ホバー効果が適用される', () => {
    render(<Navigation />);

    const navigationSection = screen.getByTestId('navigation-section');
    const links = navigationSection.querySelectorAll('a');
    links.forEach(link => {
      expect(link).toHaveClass(
        'hover:opacity-80',
        'transition-opacity',
        'duration-200'
      );
    });
  });

  /**
   * @description モバイルレイアウトのテスト
   */
  it('モバイルレイアウトが正しく適用される', () => {
    render(<Navigation />);

    const section = screen.getByTestId('navigation-section');

    // モバイル用のレスポンシブクラスが適用されていることを確認
    expect(section).toHaveClass('w-full', 'bg-lavender-600', 'py-4');

    // ナビゲーションコンテナのモバイルレイアウト
    const container = section.querySelector(
      '.flex.items-center.justify-center.gap-2'
    );
    expect(container).toBeInTheDocument();

    // 各ナビゲーション項目のモバイルレイアウト
    const links = section.querySelectorAll('a');
    links.forEach(link => {
      // モバイルでは縦並びレイアウト
      expect(link).toHaveClass('flex', 'flex-col', 'items-center');
      // モバイル用の幅設定
      expect(link).toHaveClass('w-28');
      // モバイル用の間隔設定
      expect(link).toHaveClass('gap-0.5');
    });
  });

  /**
   * @description モバイル表示でのアクセシビリティテスト
   */
  it('モバイル表示でもアクセシビリティが保たれる', () => {
    render(<Navigation />);

    // 各ナビゲーション項目が適切なaria-labelを持つことを確認
    const messageLink = screen.getByRole('link', {
      name: /ご挨拶セクションへ移動/,
    });
    const eventLink = screen.getByRole('link', {
      name: /日時・会場セクションへ移動/,
    });
    const rsvpLink = screen.getByRole('link', {
      name: /ご出欠セクションへ移動/,
    });

    expect(messageLink).toBeInTheDocument();
    expect(eventLink).toBeInTheDocument();
    expect(rsvpLink).toBeInTheDocument();

    // モバイルでもタッチターゲットサイズが適切であることを確認
    [messageLink, eventLink, rsvpLink].forEach(link => {
      expect(link).toHaveClass('w-28'); // 十分な幅を確保
    });
  });
});
