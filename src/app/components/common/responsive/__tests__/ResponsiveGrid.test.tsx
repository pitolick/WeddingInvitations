import React from 'react';
import { render, screen } from '@testing-library/react';
import ResponsiveGrid from '../ResponsiveGrid';

describe('ResponsiveGrid', () => {
  it('デフォルトのpropsでレンダリングされる', () => {
    render(
      <ResponsiveGrid>
        <div data-testid="child">テストアイテム</div>
      </ResponsiveGrid>
    );

    const container = screen.getByTestId('child').parentElement;
    expect(container).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'gap-4'
    );
    expect(screen.getByTestId('child')).toHaveTextContent('テストアイテム');
  });

  it('複数の子要素が正しくレンダリングされる', () => {
    render(
      <ResponsiveGrid>
        <div data-testid="item1">アイテム1</div>
        <div data-testid="item2">アイテム2</div>
        <div data-testid="item3">アイテム3</div>
      </ResponsiveGrid>
    );

    expect(screen.getByTestId('item1')).toBeInTheDocument();
    expect(screen.getByTestId('item2')).toBeInTheDocument();
    expect(screen.getByTestId('item3')).toBeInTheDocument();
    expect(screen.getByTestId('item1')).toHaveTextContent('アイテム1');
    expect(screen.getByTestId('item2')).toHaveTextContent('アイテム2');
    expect(screen.getByTestId('item3')).toHaveTextContent('アイテム3');
  });

  describe('mobileCols プロパティ', () => {
    it('mobileCols=1（デフォルト）が正しく適用される', () => {
      render(
        <ResponsiveGrid>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('grid-cols-1');
    });

    it('mobileCols=2 が正しく適用される', () => {
      render(
        <ResponsiveGrid mobileCols={2}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('grid-cols-2');
      expect(container).not.toHaveClass('grid-cols-1');
    });
  });

  describe('tabletCols プロパティ', () => {
    it('tabletCols=2（デフォルト）が正しく適用される', () => {
      render(
        <ResponsiveGrid>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('md:grid-cols-2');
    });

    it('tabletCols=1 が正しく適用される', () => {
      render(
        <ResponsiveGrid tabletCols={1}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('md:grid-cols-1');
    });

    it('tabletCols=3 が正しく適用される', () => {
      render(
        <ResponsiveGrid tabletCols={3}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('md:grid-cols-3');
    });

    it('tabletCols=4 が正しく適用される', () => {
      render(
        <ResponsiveGrid tabletCols={4}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('md:grid-cols-4');
    });
  });

  describe('desktopCols プロパティ', () => {
    it('desktopCols=3（デフォルト）が正しく適用される', () => {
      render(
        <ResponsiveGrid>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('lg:grid-cols-3');
    });

    it('desktopCols=1 が正しく適用される', () => {
      render(
        <ResponsiveGrid desktopCols={1}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('lg:grid-cols-1');
    });

    it('desktopCols=2 が正しく適用される', () => {
      render(
        <ResponsiveGrid desktopCols={2}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('lg:grid-cols-2');
    });

    it('desktopCols=4 が正しく適用される', () => {
      render(
        <ResponsiveGrid desktopCols={4}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('lg:grid-cols-4');
    });

    it('desktopCols=5 が正しく適用される', () => {
      render(
        <ResponsiveGrid desktopCols={5}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('lg:grid-cols-5');
    });

    it('desktopCols=6 が正しく適用される', () => {
      render(
        <ResponsiveGrid desktopCols={6}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('lg:grid-cols-6');
    });
  });

  describe('gap プロパティ', () => {
    it('gap="md"（デフォルト）が正しく適用される', () => {
      render(
        <ResponsiveGrid>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('gap-4');
    });

    it('gap="sm" が正しく適用される', () => {
      render(
        <ResponsiveGrid gap="sm">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('gap-2');
      expect(container).not.toHaveClass('gap-4');
    });

    it('gap="lg" が正しく適用される', () => {
      render(
        <ResponsiveGrid gap="lg">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('gap-6');
    });

    it('gap="xl" が正しく適用される', () => {
      render(
        <ResponsiveGrid gap="xl">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('gap-8');
    });
  });

  describe('className プロパティ', () => {
    it('追加のclassNameが正しく適用される', () => {
      render(
        <ResponsiveGrid className="custom-grid bg-gray-100">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('custom-grid', 'bg-gray-100');
      expect(container).toHaveClass('grid', 'grid-cols-1'); // デフォルトクラスも保持
    });

    it('空のclassNameでもエラーにならない', () => {
      render(
        <ResponsiveGrid className="">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('grid', 'grid-cols-1');
    });
  });

  describe('複数のプロパティの組み合わせ', () => {
    it('全てのプロパティが同時に正しく適用される', () => {
      render(
        <ResponsiveGrid
          mobileCols={2}
          tabletCols={3}
          desktopCols={4}
          gap="lg"
          className="bg-white border rounded"
        >
          <div data-testid="child">コンテンツ</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass(
        'grid',
        'grid-cols-2',
        'md:grid-cols-3',
        'lg:grid-cols-4',
        'gap-6',
        'bg-white',
        'border',
        'rounded'
      );
    });

    it('レスポンシブ設定の段階的な変化', () => {
      render(
        <ResponsiveGrid mobileCols={1} tabletCols={2} desktopCols={6} gap="sm">
          <div data-testid="child">レスポンシブアイテム</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass(
        'grid-cols-1',    // モバイル: 1列
        'md:grid-cols-2', // タブレット: 2列
        'lg:grid-cols-6', // デスクトップ: 6列
        'gap-2'           // 小さなギャップ
      );
    });
  });

  describe('エラーハンドリング', () => {
    it('childrenが空でもエラーにならない', () => {
      render(<ResponsiveGrid>{null}</ResponsiveGrid>);
      
      // コンテナ自体は存在する
      const container = document.querySelector('.grid');
      expect(container).toBeInTheDocument();
    });

    it('単一の子要素を正しく処理する', () => {
      render(
        <ResponsiveGrid>
          <div data-testid="single-child">単一アイテム</div>
        </ResponsiveGrid>
      );

      expect(screen.getByTestId('single-child')).toBeInTheDocument();
      expect(screen.getByTestId('single-child')).toHaveTextContent('単一アイテム');
    });

    it('異なる種類の子要素を正しく処理する', () => {
      render(
        <ResponsiveGrid>
          <div data-testid="div-child">DIV要素</div>
          <span data-testid="span-child">SPAN要素</span>
          <p data-testid="p-child">P要素</p>
          <button data-testid="button-child">ボタン要素</button>
        </ResponsiveGrid>
      );

      expect(screen.getByTestId('div-child')).toBeInTheDocument();
      expect(screen.getByTestId('span-child')).toBeInTheDocument();
      expect(screen.getByTestId('p-child')).toBeInTheDocument();
      expect(screen.getByTestId('button-child')).toBeInTheDocument();
    });
  });

  describe('レスポンシブレイアウトのテスト', () => {
    it('グリッドコンテナとして正しく設定される', () => {
      render(
        <ResponsiveGrid>
          <div data-testid="child">グリッドアイテム</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container?.tagName.toLowerCase()).toBe('div');
      expect(container).toHaveClass('grid');
    });

    it('極端な設定でも正しく動作する', () => {
      render(
        <ResponsiveGrid mobileCols={2} tabletCols={1} desktopCols={6} gap="xl">
          <div data-testid="child">極端設定</div>
        </ResponsiveGrid>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass(
        'grid-cols-2',     // モバイル: 2列
        'md:grid-cols-1',  // タブレット: 1列（逆転）
        'lg:grid-cols-6',  // デスクトップ: 6列
        'gap-8'            // 最大ギャップ
      );
    });
  });

  describe('グリッドアイテムのテスト', () => {
    it('多数のアイテムを正しく処理する', () => {
      const items = Array.from({ length: 12 }, (_, i) => i + 1);
      
      render(
        <ResponsiveGrid mobileCols={2} tabletCols={3} desktopCols={4}>
          {items.map(item => (
            <div key={item} data-testid={`item-${item}`}>
              アイテム {item}
            </div>
          ))}
        </ResponsiveGrid>
      );

      // 全てのアイテムがレンダリングされていることを確認
      items.forEach(item => {
        expect(screen.getByTestId(`item-${item}`)).toBeInTheDocument();
        expect(screen.getByTestId(`item-${item}`)).toHaveTextContent(`アイテム ${item}`);
      });

      // グリッドクラスが正しく適用されていることを確認
      const container = screen.getByTestId('item-1').parentElement;
      expect(container).toHaveClass('grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');
    });
  });
});
