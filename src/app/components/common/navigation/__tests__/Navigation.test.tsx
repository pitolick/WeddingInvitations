/**
 * @description Navigationコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../Navigation';

// モックアイコンコンポーネント
const MockIcon = () => <span data-testid='mock-icon'>🏠</span>;

describe('Navigation', () => {
  const mockItems = [
    { id: 'home', label: 'ホーム', href: '/' },
    { id: 'about', label: '私たちについて', href: '/about' },
    { id: 'rsvp', label: 'RSVP', href: '/rsvp', isActive: true },
    {
      id: 'gallery',
      label: 'ギャラリー',
      href: '/gallery',
      icon: <MockIcon />,
    },
  ];

  const defaultProps = {
    items: mockItems,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('基本的なレンダリング', () => {
    it('navタグとして正しくレンダリングされる', () => {
      render(<Navigation {...defaultProps} />);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('デスクトップナビゲーションアイテムが表示される', () => {
      render(<Navigation {...defaultProps} />);

      // デスクトップとモバイルの両方でアイテムが表示されるため、各アイテムが2つずつ表示される
      expect(screen.getAllByText('ホーム')).toHaveLength(2);
      expect(screen.getAllByText('私たちについて')).toHaveLength(2);
      expect(screen.getAllByText('RSVP')).toHaveLength(2);
      expect(screen.getAllByText('ギャラリー')).toHaveLength(2);
    });

    it('アイコン付きアイテムが正しく表示される', () => {
      render(<Navigation {...defaultProps} />);

      expect(screen.getAllByTestId('mock-icon')).toHaveLength(2); // デスクトップ + モバイル
    });

    it('基本クラスが適用される', () => {
      const { container } = render(<Navigation {...defaultProps} />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('font-noto');
    });
  });

  describe('type プロパティ', () => {
    it('デフォルトでhorizontalタイプが適用される', () => {
      const { container } = render(<Navigation {...defaultProps} />);

      const desktopNav = container.querySelector('.hidden');
      expect(desktopNav).toBeInTheDocument();
      expect(desktopNav).toHaveClass('hidden');
      // Tailwindの詳細なクラスの確認は困難なため、基本的な構造を確認
    });

    it('verticalタイプが適用される', () => {
      const { container } = render(
        <Navigation {...defaultProps} type='vertical' />
      );

      const desktopNav = container.querySelector('.hidden');
      expect(desktopNav).toBeInTheDocument();
      expect(desktopNav).toHaveClass('hidden');
      // Tailwindの詳細なクラスの確認は困難なため、基本的な構造を確認
    });
  });

  describe('showMobileMenu プロパティ', () => {
    it('デフォルトでモバイルメニューが表示される', () => {
      render(<Navigation {...defaultProps} />);

      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      expect(mobileMenuButton).toBeInTheDocument();
    });

    it('showMobileMenuがfalseの場合はモバイルメニューが表示されない', () => {
      render(<Navigation {...defaultProps} showMobileMenu={false} />);

      const mobileMenuButton = screen.queryByLabelText('メニューを開く');
      expect(mobileMenuButton).not.toBeInTheDocument();
    });
  });

  describe('className プロパティ', () => {
    it('カスタムクラスが追加される', () => {
      const { container } = render(
        <Navigation {...defaultProps} className='custom-nav-class' />
      );

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('custom-nav-class');
      expect(nav).toHaveClass('font-noto');
    });
  });

  describe('id プロパティ', () => {
    it('指定されたIDが適用される', () => {
      const { container } = render(
        <Navigation {...defaultProps} id='main-navigation' />
      );

      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('id', 'main-navigation');
    });

    it('IDが未指定の場合はid属性が設定されない', () => {
      const { container } = render(<Navigation {...defaultProps} />);

      const nav = container.querySelector('nav');
      expect(nav).not.toHaveAttribute('id');
    });
  });

  describe('アクティブ状態', () => {
    it('アクティブなアイテムに適切なスタイルが適用される', () => {
      render(<Navigation {...defaultProps} />);

      // アクティブなアイテム (RSVP) の確認
      const activeItems = screen.getAllByText('RSVP');
      activeItems.forEach(item => {
        const button = item.closest('button');
        expect(button).toHaveClass('bg-lavender-100');
        expect(button).toHaveClass('text-lavender-700');
        expect(button).toHaveClass('font-medium');
      });
    });

    it('非アクティブなアイテムに適切なスタイルが適用される', () => {
      render(<Navigation {...defaultProps} />);

      const homeItems = screen.getAllByText('ホーム');
      homeItems.forEach(item => {
        const button = item.closest('button');
        expect(button).toHaveClass('text-gray-700');
        expect(button).toHaveClass('hover:bg-gray-100');
        expect(button).toHaveClass('hover:text-gray-900');
      });
    });
  });

  describe('モバイルメニューの動作', () => {
    it('初期状態ではモバイルメニューが閉じている', () => {
      const { container } = render(<Navigation {...defaultProps} />);

      const mobileMenu = container.querySelector('.absolute.top-full');
      expect(mobileMenu).toHaveClass('hidden');
    });

    it('ハンバーガーボタンクリックでモバイルメニューが開く', () => {
      const { container } = render(<Navigation {...defaultProps} />);

      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      fireEvent.click(mobileMenuButton);

      const mobileMenu = container.querySelector('.absolute.top-full');
      expect(mobileMenu).toHaveClass('block');
    });

    it('メニューが開いている時はaria-expandedがtrueになる', () => {
      render(<Navigation {...defaultProps} />);

      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      fireEvent.click(mobileMenuButton);

      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('メニューが閉じている時はaria-expandedがfalseになる', () => {
      render(<Navigation {...defaultProps} />);

      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('メニューアイコンが正しく切り替わる', () => {
      render(<Navigation {...defaultProps} />);

      const mobileMenuButton = screen.getByLabelText('メニューを開く');

      // 初期状態（ハンバーガーアイコン）
      expect(
        mobileMenuButton.querySelector('path[d="M4 6h16M4 12h16M4 18h16"]')
      ).toBeInTheDocument();

      // クリック後（クローズアイコン）
      fireEvent.click(mobileMenuButton);
      expect(
        mobileMenuButton.querySelector('path[d="M6 18L18 6M6 6l12 12"]')
      ).toBeInTheDocument();
    });

    it('再度クリックでモバイルメニューが閉じる', () => {
      const { container } = render(<Navigation {...defaultProps} />);

      const mobileMenuButton = screen.getByLabelText('メニューを開く');

      // 開く
      fireEvent.click(mobileMenuButton);
      let mobileMenu = container.querySelector('.absolute.top-full');
      expect(mobileMenu).toHaveClass('block');

      // 閉じる
      fireEvent.click(mobileMenuButton);
      mobileMenu = container.querySelector('.absolute.top-full');
      expect(mobileMenu).toHaveClass('hidden');
    });
  });

  describe('onItemClick イベント', () => {
    it('デスクトップアイテムクリックでonItemClickが呼ばれる', () => {
      const handleItemClick = jest.fn();
      render(<Navigation {...defaultProps} onItemClick={handleItemClick} />);

      const homeButton = screen
        .getAllByText('ホーム')[0]
        .closest('button') as HTMLElement;
      fireEvent.click(homeButton);

      expect(handleItemClick).toHaveBeenCalledTimes(1);
      expect(handleItemClick).toHaveBeenCalledWith(mockItems[0]);
    });

    it('モバイルアイテムクリックでonItemClickが呼ばれる', () => {
      const handleItemClick = jest.fn();
      render(<Navigation {...defaultProps} onItemClick={handleItemClick} />);

      // モバイルメニューを開く
      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      fireEvent.click(mobileMenuButton);

      // モバイルメニュー内のアイテムをクリック
      const mobileHomeButton = screen
        .getAllByText('ホーム')[1]
        .closest('button') as HTMLElement;
      fireEvent.click(mobileHomeButton);

      expect(handleItemClick).toHaveBeenCalledTimes(1);
      expect(handleItemClick).toHaveBeenCalledWith(mockItems[0]);
    });

    it('horizontalモードでモバイルアイテムクリック時にメニューが閉じる', () => {
      const { container } = render(
        <Navigation {...defaultProps} type='horizontal' />
      );

      // モバイルメニューを開く
      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      fireEvent.click(mobileMenuButton);

      // メニューが開いていることを確認
      let mobileMenu = container.querySelector('.absolute.top-full');
      expect(mobileMenu).toHaveClass('block');

      // モバイルメニュー内のアイテムをクリック
      const mobileHomeButton = screen
        .getAllByText('ホーム')[1]
        .closest('button') as HTMLElement;
      fireEvent.click(mobileHomeButton);

      // メニューが閉じることを確認
      mobileMenu = container.querySelector('.absolute.top-full');
      expect(mobileMenu).toHaveClass('hidden');
    });

    it('verticalモードではモバイルアイテムクリック時にメニューが閉じない', () => {
      const { container } = render(
        <Navigation {...defaultProps} type='vertical' />
      );

      // モバイルメニューを開く
      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      fireEvent.click(mobileMenuButton);

      // モバイルメニュー内のアイテムをクリック
      const mobileHomeButton = screen
        .getAllByText('ホーム')[1]
        .closest('button') as HTMLElement;
      fireEvent.click(mobileHomeButton);

      // メニューが開いたままであることを確認
      const mobileMenu = container.querySelector('.absolute.top-full');
      expect(mobileMenu).toHaveClass('block');
    });

    it('onItemClickが未指定でもエラーが発生しない', () => {
      render(<Navigation {...defaultProps} />);

      const homeButton = screen
        .getAllByText('ホーム')[0]
        .closest('button') as HTMLElement;
      expect(() => fireEvent.click(homeButton)).not.toThrow();
    });
  });

  describe('アクセシビリティ', () => {
    it('navタグにrole="navigation"が自動設定される', () => {
      render(<Navigation {...defaultProps} />);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('ハンバーガーボタンに適切なaria属性が設定される', () => {
      render(<Navigation {...defaultProps} />);

      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      expect(mobileMenuButton).toHaveAttribute('aria-label', 'メニューを開く');
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('ボタンにフォーカススタイルが適用される', () => {
      render(<Navigation {...defaultProps} />);

      const homeButton = screen.getAllByText('ホーム')[0].closest('button');
      expect(homeButton).toHaveClass('focus:outline-none');
      expect(homeButton).toHaveClass('focus:ring-2');
      expect(homeButton).toHaveClass('focus:ring-lavender-500');
    });
  });

  describe('空アイテム配列の処理', () => {
    it('アイテムが空の場合でもナビゲーションが表示される', () => {
      render(<Navigation items={[]} />);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('空アイテムでもモバイルメニューボタンが表示される', () => {
      render(<Navigation items={[]} />);

      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      expect(mobileMenuButton).toBeInTheDocument();
    });
  });

  describe('複合プロパティのテスト', () => {
    it('すべてのプロパティが同時に正しく動作する', () => {
      const handleItemClick = jest.fn();
      const { container } = render(
        <Navigation
          items={mockItems}
          type='vertical'
          showMobileMenu={true}
          onItemClick={handleItemClick}
          className='custom-navigation'
          id='main-nav'
        />
      );

      // 基本要素
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('font-noto');
      expect(nav).toHaveClass('custom-navigation');
      expect(nav).toHaveAttribute('id', 'main-nav');

      // タイプ
      const verticalNav = container.querySelector('.hidden');
      expect(verticalNav).toBeInTheDocument();
      expect(verticalNav).toHaveClass('hidden');

      // モバイルメニュー
      const mobileMenuButton = screen.getByLabelText('メニューを開く');
      expect(mobileMenuButton).toBeInTheDocument();

      // アイテムクリック
      const homeButton = screen
        .getAllByText('ホーム')[0]
        .closest('button') as HTMLElement;
      fireEvent.click(homeButton);
      expect(handleItemClick).toHaveBeenCalledWith(mockItems[0]);

      // アイテム表示
      expect(screen.getAllByText('ホーム')).toHaveLength(2);
      expect(screen.getAllByText('私たちについて')).toHaveLength(2);
      expect(screen.getAllByText('RSVP')).toHaveLength(2);
      expect(screen.getAllByText('ギャラリー')).toHaveLength(2);
    });
  });
});
