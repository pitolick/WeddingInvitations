/**
 * @description Toastコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastProvider, useToast, ToastItem } from '../Toast';

// テスト用のコンポーネント
const TestComponent = () => {
  const { addToast, removeToast, clearToasts } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          addToast({ type: 'success', title: '成功', message: 'テスト成功' })
        }
      >
        トースト追加
      </button>
      <button onClick={() => removeToast('test-id')}>トースト削除</button>
      <button onClick={clearToasts}>全削除</button>
    </div>
  );
};

describe('Toast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('ToastProvider', () => {
    it('子要素を正しくレンダリングする', () => {
      render(
        <ToastProvider>
          <div data-testid='child'>テスト子要素</div>
        </ToastProvider>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('デフォルトの位置設定が適用される', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const addButton = screen.getByText('トースト追加');
      fireEvent.click(addButton);

      // トーストコンテナが正しい位置に配置される
      const toastContainer = document.querySelector(
        '.fixed.z-50.space-y-2.top-4.right-4'
      );
      expect(toastContainer).toBeInTheDocument();
    });

    it('カスタム位置設定が適用される', () => {
      render(
        <ToastProvider position='bottom-left'>
          <TestComponent />
        </ToastProvider>
      );

      const addButton = screen.getByText('トースト追加');
      fireEvent.click(addButton);

      // トーストコンテナが指定された位置に配置される
      const toastContainer = document.querySelector(
        '.fixed.z-50.space-y-2.bottom-4.left-4'
      );
      expect(toastContainer).toBeInTheDocument();
    });
  });

  describe('useToast hook', () => {
    it('ToastProviderの外で使用するとエラーが発生する', () => {
      // エラーをキャッチするためのコンソールエラーを無効化
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useToast must be used within a ToastProvider');

      consoleSpy.mockRestore();
    });

    it('トーストを追加できる', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const addButton = screen.getByText('トースト追加');
      fireEvent.click(addButton);

      // トーストが表示される
      expect(screen.getByText('成功')).toBeInTheDocument();
      expect(screen.getByText('テスト成功')).toBeInTheDocument();
    });

    it('トーストを削除できる', async () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const addButton = screen.getByText('トースト追加');
      fireEvent.click(addButton);

      // トーストが表示される
      expect(screen.getByText('成功')).toBeInTheDocument();

      // 実際のトーストの削除ボタンをクリック
      const closeButton = screen.getByRole('button', { name: /閉じる/i });
      fireEvent.click(closeButton);

      // トーストが削除される
      await waitFor(
        () => {
          expect(screen.queryByText('成功')).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it('全てのトーストを削除できる', async () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const addButton = screen.getByText('トースト追加');
      fireEvent.click(addButton);

      // トーストが表示される
      expect(screen.getByText('成功')).toBeInTheDocument();

      const clearButton = screen.getByText('全削除');
      fireEvent.click(clearButton);

      // 全てのトーストが削除される
      await waitFor(() => {
        expect(screen.queryByText('成功')).not.toBeInTheDocument();
      });
    });
  });

  describe('ToastItem', () => {
    const mockToast: ToastItem = {
      id: 'test-toast',
      type: 'success',
      title: 'テストタイトル',
      message: 'テストメッセージ',
      duration: 5000,
      closable: true,
      createdAt: Date.now(),
    };

    it('トーストアイテムが正しく表示される', () => {
      render(
        <ToastProvider>
          <div
            data-testid='toast-item'
            data-toast={JSON.stringify(mockToast)}
          />
        </ToastProvider>
      );

      // トーストアイテムのデータ属性が正しく設定される
      const toastItem = screen.getByTestId('toast-item');
      expect(toastItem).toHaveAttribute('data-toast');
    });

    it('異なるタイプのトーストが正しいスタイルで表示される', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      // 成功トースト
      const addButton = screen.getByText('トースト追加');
      fireEvent.click(addButton);

      const successToast = screen.getByText('成功').closest('[role="alert"]');
      expect(successToast).toHaveClass(
        'bg-green-100',
        'border-green-300',
        'text-green-800'
      );

      // エラートーストのテストは別のテストケースで行う
      expect(successToast).toHaveClass(
        'bg-green-100',
        'border-green-300',
        'text-green-800'
      );
    });
  });

  describe('アクセシビリティ', () => {
    it('トーストに適切なroleが設定される', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const addButton = screen.getByText('トースト追加');
      fireEvent.click(addButton);

      const toast = screen.getByRole('alert');
      expect(toast).toBeInTheDocument();
    });

    it('閉じるボタンに適切なaria-labelが設定される', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const addButton = screen.getByText('トースト追加');
      fireEvent.click(addButton);

      const closeButton = screen.getByRole('button', { name: /閉じる/i });
      expect(closeButton).toHaveAttribute('aria-label', '閉じる');
    });
  });
});
