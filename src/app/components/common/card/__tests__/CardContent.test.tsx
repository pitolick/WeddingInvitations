/**
 * @description CardContentコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import CardContent from '../CardContent';

describe('CardContent', () => {
  describe('基本的なレンダリング', () => {
    it('子要素を正しくレンダリングする', () => {
      render(
        <CardContent>
          <p>カードコンテンツテキスト</p>
        </CardContent>
      );

      expect(screen.getByText('カードコンテンツテキスト')).toBeInTheDocument();
    });

    it('デフォルトのクラスが適用される', () => {
      const { container } = render(
        <CardContent>
          <p>コンテンツ</p>
        </CardContent>
      );

      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('pt-4');
    });

    it('divタグとして正しくレンダリングされる', () => {
      const { container } = render(
        <CardContent>
          <p>コンテンツ</p>
        </CardContent>
      );

      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement.tagName).toBe('DIV');
    });
  });

  describe('className プロパティ', () => {
    it('カスタムクラスが追加される', () => {
      const { container } = render(
        <CardContent className='custom-content-class'>
          <p>コンテンツ</p>
        </CardContent>
      );

      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('custom-content-class');
    });

    it('デフォルトクラスとカスタムクラスが共存する', () => {
      const { container } = render(
        <CardContent className='text-center'>
          <p>中央揃えコンテンツ</p>
        </CardContent>
      );

      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('pt-4');
      expect(contentElement).toHaveClass('text-center');
    });

    it('classNameが空文字列の場合はデフォルトクラスのみ適用される', () => {
      const { container } = render(
        <CardContent className=''>
          <p>コンテンツ</p>
        </CardContent>
      );

      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('pt-4');
      expect(contentElement.className).toBe('pt-4 ');
    });

    it('classNameが未指定の場合はデフォルトクラスのみ適用される', () => {
      const { container } = render(
        <CardContent>
          <p>コンテンツ</p>
        </CardContent>
      );

      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('pt-4');
      expect(contentElement.className).toBe('pt-4 ');
    });
  });

  describe('子要素の種類テスト', () => {
    it('テキストノードを正しく表示する', () => {
      render(<CardContent>直接テキスト</CardContent>);

      expect(screen.getByText('直接テキスト')).toBeInTheDocument();
    });

    it('複数の子要素を正しく表示する', () => {
      render(
        <CardContent>
          <h4>カードタイトル</h4>
          <p>カードの説明文</p>
          <button>アクションボタン</button>
        </CardContent>
      );

      expect(screen.getByText('カードタイトル')).toBeInTheDocument();
      expect(screen.getByText('カードの説明文')).toBeInTheDocument();
      expect(screen.getByText('アクションボタン')).toBeInTheDocument();
    });

    it('ネストした要素を正しく表示する', () => {
      render(
        <CardContent>
          <div>
            <span>ネストした</span>
            <strong>要素</strong>
          </div>
        </CardContent>
      );

      expect(screen.getByText('ネストした')).toBeInTheDocument();
      expect(screen.getByText('要素')).toBeInTheDocument();
    });

    it('ReactFragment要素を正しく表示する', () => {
      render(
        <CardContent>
          <>
            <p>フラグメント内の要素1</p>
            <p>フラグメント内の要素2</p>
          </>
        </CardContent>
      );

      expect(screen.getByText('フラグメント内の要素1')).toBeInTheDocument();
      expect(screen.getByText('フラグメント内の要素2')).toBeInTheDocument();
    });
  });

  describe('スタイリングとレイアウト', () => {
    it('コンテンツエリアに適切な上部パディングが設定される', () => {
      const { container } = render(
        <CardContent>
          <p>パディングテスト</p>
        </CardContent>
      );

      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('pt-4');
    });

    it('追加のスタイリングクラスが正しく適用される', () => {
      const { container } = render(
        <CardContent className='text-gray-700 leading-relaxed'>
          <p>スタイリングされたコンテンツ</p>
        </CardContent>
      );

      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('pt-4');
      expect(contentElement).toHaveClass('text-gray-700');
      expect(contentElement).toHaveClass('leading-relaxed');
    });
  });

  describe('実用的な使用例', () => {
    it('典型的なカードコンテンツの構造を正しく表示する', () => {
      render(
        <CardContent className='font-noto text-gray-700'>
          <p className='mb-2'>これはカードの説明文です。</p>
          <p className='text-sm text-gray-500'>最終更新: 2024年1月1日</p>
        </CardContent>
      );

      expect(
        screen.getByText('これはカードの説明文です。')
      ).toBeInTheDocument();
      expect(screen.getByText('最終更新: 2024年1月1日')).toBeInTheDocument();
    });

    it('リッチコンテンツを正しく表示する', () => {
      render(
        <CardContent>
          <div className='space-y-2'>
            <p>
              <strong>重要:</strong> この情報をご確認ください。
            </p>
            <ul className='list-disc list-inside'>
              <li>項目1</li>
              <li>項目2</li>
            </ul>
          </div>
        </CardContent>
      );

      expect(screen.getByText('重要:')).toBeInTheDocument();
      expect(
        screen.getByText('この情報をご確認ください。')
      ).toBeInTheDocument();
      expect(screen.getByText('項目1')).toBeInTheDocument();
      expect(screen.getByText('項目2')).toBeInTheDocument();
    });
  });
});
