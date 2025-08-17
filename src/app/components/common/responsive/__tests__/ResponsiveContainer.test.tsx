import React from 'react';
import { render, screen } from '@testing-library/react';
import ResponsiveContainer from '../ResponsiveContainer';

describe('ResponsiveContainer', () => {
  it('デフォルトのpropsでレンダリングされる', () => {
    render(
      <ResponsiveContainer>
        <div data-testid="child">テストコンテンツ</div>
      </ResponsiveContainer>
    );

    const container = screen.getByTestId('child').parentElement;
    expect(container).toHaveClass('w-full', 'max-w-lg', 'px-6', 'py-4', 'mx-auto');
    expect(screen.getByTestId('child')).toHaveTextContent('テストコンテンツ');
  });

  it('子要素が正しくレンダリングされる', () => {
    render(
      <ResponsiveContainer>
        <p data-testid="paragraph">段落</p>
        <span data-testid="span">スパン</span>
      </ResponsiveContainer>
    );

    expect(screen.getByTestId('paragraph')).toBeInTheDocument();
    expect(screen.getByTestId('span')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph')).toHaveTextContent('段落');
    expect(screen.getByTestId('span')).toHaveTextContent('スパン');
  });

  describe('maxWidth プロパティ', () => {
    it('maxWidth="sm" が正しく適用される', () => {
      render(
        <ResponsiveContainer maxWidth="sm">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('max-w-sm');
      expect(container).not.toHaveClass('max-w-lg');
    });

    it('maxWidth="md" が正しく適用される', () => {
      render(
        <ResponsiveContainer maxWidth="md">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('max-w-md');
    });

    it('maxWidth="xl" が正しく適用される', () => {
      render(
        <ResponsiveContainer maxWidth="xl">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('max-w-xl');
    });

    it('maxWidth="2xl" が正しく適用される', () => {
      render(
        <ResponsiveContainer maxWidth="2xl">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('max-w-2xl');
    });

    it('maxWidth="full" が正しく適用される', () => {
      render(
        <ResponsiveContainer maxWidth="full">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('max-w-full');
    });
  });

  describe('padding プロパティ', () => {
    it('padding="none" が正しく適用される', () => {
      render(
        <ResponsiveContainer padding="none">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).not.toHaveClass('px-6', 'py-4', 'px-4', 'py-2');
    });

    it('padding="sm" が正しく適用される', () => {
      render(
        <ResponsiveContainer padding="sm">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('px-4', 'py-2');
    });

    it('padding="lg" が正しく適用される', () => {
      render(
        <ResponsiveContainer padding="lg">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('px-8', 'py-6');
    });

    it('padding="xl" が正しく適用される', () => {
      render(
        <ResponsiveContainer padding="xl">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('px-12', 'py-8');
    });
  });

  describe('center プロパティ', () => {
    it('center=true（デフォルト）でmx-autoクラスが適用される', () => {
      render(
        <ResponsiveContainer>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('mx-auto');
    });

    it('center=false でmx-autoクラスが適用されない', () => {
      render(
        <ResponsiveContainer center={false}>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).not.toHaveClass('mx-auto');
    });
  });

  describe('className プロパティ', () => {
    it('追加のclassNameが正しく適用される', () => {
      render(
        <ResponsiveContainer className="custom-class another-class">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('custom-class', 'another-class');
      expect(container).toHaveClass('w-full', 'max-w-lg'); // デフォルトクラスも保持
    });

    it('空のclassNameでもエラーにならない', () => {
      render(
        <ResponsiveContainer className="">
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('w-full', 'max-w-lg');
    });
  });

  describe('複数のプロパティの組み合わせ', () => {
    it('全てのプロパティが同時に正しく適用される', () => {
      render(
        <ResponsiveContainer
          maxWidth="xl"
          padding="lg"
          center={false}
          className="bg-gray-100 border"
        >
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass(
        'w-full',
        'max-w-xl',
        'px-8',
        'py-6',
        'bg-gray-100',
        'border'
      );
      expect(container).not.toHaveClass('mx-auto');
    });

    it('最小限のプロパティで正しく動作する', () => {
      render(
        <ResponsiveContainer maxWidth="sm" padding="none" center={false}>
          <div data-testid="child">最小設定</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container).toHaveClass('w-full', 'max-w-sm');
      expect(container).not.toHaveClass('mx-auto', 'px-4', 'py-2', 'px-6', 'py-4');
    });
  });

  describe('エラーハンドリング', () => {
    it('childrenが空でもエラーにならない', () => {
      render(<ResponsiveContainer>{null}</ResponsiveContainer>);
      
      // コンテナ自体は存在する
      const container = document.querySelector('.w-full');
      expect(container).toBeInTheDocument();
    });

    it('複数の子要素を正しく処理する', () => {
      render(
        <ResponsiveContainer>
          <div data-testid="child1">子要素1</div>
          <div data-testid="child2">子要素2</div>
          <span data-testid="child3">子要素3</span>
        </ResponsiveContainer>
      );

      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
      expect(screen.getByTestId('child3')).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    it('コンテナ要素がdivタグとして正しくレンダリングされる', () => {
      render(
        <ResponsiveContainer>
          <div data-testid="child">コンテンツ</div>
        </ResponsiveContainer>
      );

      const container = screen.getByTestId('child').parentElement;
      expect(container?.tagName.toLowerCase()).toBe('div');
    });

    it('roleやaria属性が適切に設定できる', () => {
      render(
        <ResponsiveContainer className="custom-container">
          <div data-testid="child" role="main" aria-label="メインコンテンツ">
            アクセシブルなコンテンツ
          </div>
        </ResponsiveContainer>
      );

      const child = screen.getByTestId('child');
      expect(child).toHaveAttribute('role', 'main');
      expect(child).toHaveAttribute('aria-label', 'メインコンテンツ');
    });
  });
});
