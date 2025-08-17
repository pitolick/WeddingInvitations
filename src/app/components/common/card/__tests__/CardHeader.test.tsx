/**
 * @description CardHeaderコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import CardHeader from '../CardHeader';

describe('CardHeader', () => {
  describe('基本的なレンダリング', () => {
    it('子要素を正しくレンダリングする', () => {
      render(
        <CardHeader>
          <h3>カードヘッダータイトル</h3>
        </CardHeader>
      );

      expect(screen.getByText('カードヘッダータイトル')).toBeInTheDocument();
    });

    it('デフォルトのクラスが適用される', () => {
      const { container } = render(
        <CardHeader>
          <h3>ヘッダー</h3>
        </CardHeader>
      );

      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('pb-4');
      expect(headerElement).toHaveClass('border-b');
      expect(headerElement).toHaveClass('border-gray-200');
    });

    it('divタグとして正しくレンダリングされる', () => {
      const { container } = render(
        <CardHeader>
          <h3>ヘッダー</h3>
        </CardHeader>
      );

      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement.tagName).toBe('DIV');
    });
  });

  describe('className プロパティ', () => {
    it('カスタムクラスが追加される', () => {
      const { container } = render(
        <CardHeader className='custom-header-class'>
          <h3>ヘッダー</h3>
        </CardHeader>
      );

      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('custom-header-class');
    });

    it('デフォルトクラスとカスタムクラスが共存する', () => {
      const { container } = render(
        <CardHeader className='text-center bg-gray-50'>
          <h3>中央揃えヘッダー</h3>
        </CardHeader>
      );

      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('pb-4');
      expect(headerElement).toHaveClass('border-b');
      expect(headerElement).toHaveClass('border-gray-200');
      expect(headerElement).toHaveClass('text-center');
      expect(headerElement).toHaveClass('bg-gray-50');
    });

    it('classNameが空文字列の場合はデフォルトクラスのみ適用される', () => {
      const { container } = render(
        <CardHeader className=''>
          <h3>ヘッダー</h3>
        </CardHeader>
      );

      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('pb-4');
      expect(headerElement).toHaveClass('border-b');
      expect(headerElement).toHaveClass('border-gray-200');
      expect(headerElement.className).toBe('pb-4 border-b border-gray-200 ');
    });

    it('classNameが未指定の場合はデフォルトクラスのみ適用される', () => {
      const { container } = render(
        <CardHeader>
          <h3>ヘッダー</h3>
        </CardHeader>
      );

      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('pb-4');
      expect(headerElement).toHaveClass('border-b');
      expect(headerElement).toHaveClass('border-gray-200');
      expect(headerElement.className).toBe('pb-4 border-b border-gray-200 ');
    });
  });

  describe('子要素の種類テスト', () => {
    it('見出し要素を正しく表示する', () => {
      render(
        <CardHeader>
          <h1>H1見出し</h1>
          <h2>H2見出し</h2>
          <h3>H3見出し</h3>
        </CardHeader>
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'H1見出し'
      );
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'H2見出し'
      );
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'H3見出し'
      );
    });

    it('テキストノードを正しく表示する', () => {
      render(<CardHeader>直接テキストヘッダー</CardHeader>);

      expect(screen.getByText('直接テキストヘッダー')).toBeInTheDocument();
    });

    it('複合要素を正しく表示する', () => {
      render(
        <CardHeader>
          <div className='flex justify-between items-center'>
            <h3>タイトル</h3>
            <button>アクション</button>
          </div>
        </CardHeader>
      );

      expect(screen.getByText('タイトル')).toBeInTheDocument();
      expect(screen.getByText('アクション')).toBeInTheDocument();
    });

    it('アイコンと文字の組み合わせを正しく表示する', () => {
      render(
        <CardHeader>
          <div className='flex items-center gap-2'>
            <span>⭐</span>
            <h3>お気に入りカード</h3>
          </div>
        </CardHeader>
      );

      expect(screen.getByText('⭐')).toBeInTheDocument();
      expect(screen.getByText('お気に入りカード')).toBeInTheDocument();
    });

    it('ReactFragment要素を正しく表示する', () => {
      render(
        <CardHeader>
          <>
            <h3>メインタイトル</h3>
            <p>サブタイトル</p>
          </>
        </CardHeader>
      );

      expect(screen.getByText('メインタイトル')).toBeInTheDocument();
      expect(screen.getByText('サブタイトル')).toBeInTheDocument();
    });
  });

  describe('スタイリングとレイアウト', () => {
    it('ヘッダーエリアに適切な下部パディングとボーダーが設定される', () => {
      const { container } = render(
        <CardHeader>
          <h3>スタイリングテスト</h3>
        </CardHeader>
      );

      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('pb-4');
      expect(headerElement).toHaveClass('border-b');
      expect(headerElement).toHaveClass('border-gray-200');
    });

    it('カスタムスタイリングが正しく適用される', () => {
      const { container } = render(
        <CardHeader className='bg-purple-50 text-purple-900 border-purple-200'>
          <h3>カスタムスタイル</h3>
        </CardHeader>
      );

      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('pb-4');
      expect(headerElement).toHaveClass('border-b');
      expect(headerElement).toHaveClass('border-gray-200');
      expect(headerElement).toHaveClass('bg-purple-50');
      expect(headerElement).toHaveClass('text-purple-900');
      expect(headerElement).toHaveClass('border-purple-200');
    });
  });

  describe('実用的な使用例', () => {
    it('典型的なカードヘッダーの構造を正しく表示する', () => {
      render(
        <CardHeader>
          <h3 className='font-noto text-lg font-semibold text-gray-900'>
            ウェディング情報
          </h3>
        </CardHeader>
      );

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('ウェディング情報');
      expect(heading).toHaveClass('font-noto');
      expect(heading).toHaveClass('text-lg');
      expect(heading).toHaveClass('font-semibold');
      expect(heading).toHaveClass('text-gray-900');
    });

    it('アクション付きヘッダーを正しく表示する', () => {
      render(
        <CardHeader className='flex justify-between items-center'>
          <h3>設定</h3>
          <div className='flex gap-2'>
            <button>編集</button>
            <button>削除</button>
          </div>
        </CardHeader>
      );

      expect(screen.getByText('設定')).toBeInTheDocument();
      expect(screen.getByText('編集')).toBeInTheDocument();
      expect(screen.getByText('削除')).toBeInTheDocument();
    });

    it('ステータス表示付きヘッダーを正しく表示する', () => {
      render(
        <CardHeader>
          <div className='flex items-center justify-between'>
            <h3>タスク名</h3>
            <span className='px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs'>
              完了
            </span>
          </div>
        </CardHeader>
      );

      expect(screen.getByText('タスク名')).toBeInTheDocument();
      expect(screen.getByText('完了')).toBeInTheDocument();
    });

    it('サブタイトル付きヘッダーを正しく表示する', () => {
      render(
        <CardHeader>
          <div>
            <h3 className='text-lg font-semibold'>メインタイトル</h3>
            <p className='text-sm text-gray-500 mt-1'>この情報は重要です</p>
          </div>
        </CardHeader>
      );

      expect(screen.getByText('メインタイトル')).toBeInTheDocument();
      expect(screen.getByText('この情報は重要です')).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    it('見出し要素が正しく認識される', () => {
      render(
        <CardHeader>
          <h2>アクセシビリティテスト</h2>
        </CardHeader>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('アクセシビリティテスト');
    });

    it('複数の見出しレベルが正しく認識される', () => {
      render(
        <CardHeader>
          <h2>メインヘッダー</h2>
          <h3>サブヘッダー</h3>
        </CardHeader>
      );

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'メインヘッダー'
      );
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'サブヘッダー'
      );
    });
  });
});
