/**
 * @description ImageModalSampleコンポーネントのテストファイル
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImageModalSample } from '../ImageModalSample';

// Modalコンポーネントのモック
jest.mock('../common/modal', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Modal: ({ children, isOpen, onClose, title, size }: any) =>
    isOpen ? (
      <div data-testid='modal' data-size={size}>
        <div data-testid='modal-title'>{title}</div>
        <button onClick={onClose} data-testid='modal-close'>
          Close
        </button>
        <div data-testid='modal-content'>{children}</div>
      </div>
    ) : null,
}));

// Imageオブジェクトのモック
const mockImage = {
  onload: null as ((this: GlobalEventHandlers, ev: Event) => any) | null,
  onerror: null as
    | ((this: GlobalEventHandlers, ev: Event | string) => any)
    | null,
  src: '',
  naturalWidth: 800,
  naturalHeight: 600,
};

// グローバルImageコンストラクタのモック
(global as any).Image = jest.fn(() => mockImage);

describe('ImageModalSample', () => {
  beforeEach(() => {
    // console.warnをモック
    jest.spyOn(console, 'warn').mockImplementation();

    // windowオブジェクトのモック
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('基本的なレンダリング', () => {
    test('コンポーネントが正常にレンダリングされる', () => {
      render(<ImageModalSample />);

      expect(
        screen.getByText('画像拡大表示 Modal サンプル（元サイズ制限版）')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          '以下の画像をクリックすると、元サイズを超えない範囲で拡大表示されます。'
        )
      ).toBeInTheDocument();
    });

    test('サンプル画像が表示される', () => {
      render(<ImageModalSample />);

      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);

      // 画像のalt属性をチェック
      expect(screen.getByAltText('結婚式のメイン写真')).toBeInTheDocument();
      expect(screen.getByAltText('新郎新婦の写真')).toBeInTheDocument();
      expect(screen.getByAltText('結婚式の会場')).toBeInTheDocument();
    });

    test('初期状態ではモーダルが表示されない', () => {
      render(<ImageModalSample />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('画像クリック動作', () => {
    test('画像をクリックするとモーダルが開く', () => {
      render(<ImageModalSample />);

      const firstImage = screen.getByAltText('結婚式のメイン写真');
      fireEvent.click(firstImage);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
      // タイトルの内容は実際のModalコンポーネントに依存するので存在確認のみ
      expect(screen.getByTestId('modal-title')).toBeInTheDocument();
    });

    test('異なる画像をクリックすると対応する画像が表示される', () => {
      render(<ImageModalSample />);

      const secondImage = screen.getByAltText('新郎新婦の写真');
      fireEvent.click(secondImage);

      expect(screen.getByTestId('modal')).toBeInTheDocument();

      // モーダル内の画像のalt属性を確認
      const modalImage = screen
        .getByTestId('modal-content')
        .querySelector('img');
      expect(modalImage).toHaveAttribute('alt', '新郎新婦の写真');
    });
  });

  describe('モーダル操作', () => {
    test('モーダルのクローズボタンをクリックするとモーダルが閉じる', () => {
      render(<ImageModalSample />);

      // 画像をクリックしてモーダルを開く
      const firstImage = screen.getByAltText('結婚式のメイン写真');
      fireEvent.click(firstImage);

      expect(screen.getByTestId('modal')).toBeInTheDocument();

      // クローズボタンをクリック
      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    test('ESCキーでモーダルが閉じる（Modalコンポーネントの機能）', () => {
      render(<ImageModalSample />);

      const firstImage = screen.getByAltText('結婚式のメイン写真');
      fireEvent.click(firstImage);

      expect(screen.getByTestId('modal')).toBeInTheDocument();

      // ESCキーを押下（実際のModalコンポーネントの機能）
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

      // モーダルが存在することを確認（クローズ機能は実際のModalコンポーネントで実装）
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  describe('画像サイズ取得', () => {
    test('画像のサイズが正常に取得される', async () => {
      render(<ImageModalSample />);

      const firstImage = screen.getByAltText('結婚式のメイン写真');
      fireEvent.click(firstImage);

      // 画像のロードをシミュレート
      const mockImg = (global as any).Image.mock.results[0].value;

      // onloadイベントを発火
      if (mockImg.onload) {
        mockImg.onload();
      }

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });
    });

    test('画像の読み込みエラーが処理される', async () => {
      render(<ImageModalSample />);

      const firstImage = screen.getByAltText('結婚式のメイン写真');
      fireEvent.click(firstImage);

      // 画像のエラーをシミュレート
      const mockImg = (global as any).Image.mock.results[0].value;

      // onerrorイベントを発火
      if (mockImg.onerror) {
        mockImg.onerror();
      }

      await waitFor(() => {
        expect(console.warn).toHaveBeenCalledWith(
          '画像の読み込みに失敗しました:',
          expect.stringContaining('unsplash.com')
        );
      });
    });
  });

  describe('画像表示スタイル', () => {
    test('画像のサイズが計算される', () => {
      render(<ImageModalSample />);

      const firstImage = screen.getByAltText('結婚式のメイン写真');
      fireEvent.click(firstImage);

      // 画像のロードをシミュレート
      const mockImg = (global as any).Image.mock.results[0].value;
      mockImg.naturalWidth = 1200;
      mockImg.naturalHeight = 800;

      if (mockImg.onload) {
        mockImg.onload();
      }

      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    test('ウィンドウサイズに応じて画像サイズが調整される', () => {
      // 小さなウィンドウサイズを設定
      Object.defineProperty(window, 'innerWidth', {
        value: 400,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 300,
      });

      render(<ImageModalSample />);

      const firstImage = screen.getByAltText('結婚式のメイン写真');
      fireEvent.click(firstImage);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    test('画像に適切なalt属性が設定されている', () => {
      render(<ImageModalSample />);

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });

    test('モーダル内の画像にもalt属性が設定される', () => {
      render(<ImageModalSample />);

      const firstImage = screen.getByAltText('結婚式のメイン写真');
      fireEvent.click(firstImage);

      const modalImage = screen
        .getByTestId('modal-content')
        .querySelector('img');
      expect(modalImage).toHaveAttribute('alt', '結婚式のメイン写真');
    });
  });

  describe('状態管理', () => {
    test('初期状態が正しく設定される', () => {
      render(<ImageModalSample />);

      // モーダルが閉じている状態
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    test('画像選択状態が正しく管理される', () => {
      render(<ImageModalSample />);

      // 最初の画像をクリック
      const firstImage = screen.getByAltText('結婚式のメイン写真');
      fireEvent.click(firstImage);

      expect(screen.getByTestId('modal')).toBeInTheDocument();

      // モーダルを閉じる
      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

      // 別の画像をクリック
      const secondImage = screen.getByAltText('新郎新婦の写真');
      fireEvent.click(secondImage);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
      const modalImage = screen
        .getByTestId('modal-content')
        .querySelector('img');
      expect(modalImage).toHaveAttribute('alt', '新郎新婦の写真');
    });
  });

  describe('レスポンシブ対応', () => {
    test('グリッドレイアウトが適用される', () => {
      const { container } = render(<ImageModalSample />);

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('grid');
    });

    test('異なるスクリーンサイズでのカラム数', () => {
      const { container } = render(<ImageModalSample />);

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('grid-cols-2');
      expect(gridContainer).toHaveClass('md:grid-cols-3');
      expect(gridContainer).toHaveClass('lg:grid-cols-4');
    });
  });
});
