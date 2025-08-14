/**
 * @description ErrorNotificationコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ErrorNotification } from '../ErrorNotification';

describe('ErrorNotification', () => {
  const defaultProps = {
    message: 'テストエラーメッセージ',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('基本的な表示', () => {
    it('メッセージが正しく表示される', () => {
      render(<ErrorNotification {...defaultProps} />);

      expect(screen.getByText('テストエラーメッセージ')).toBeInTheDocument();
    });

    it('デフォルトでerrorタイプとして表示される', () => {
      render(<ErrorNotification {...defaultProps} />);

      const notification = screen.getByRole('alert');
      expect(notification).toHaveClass(
        'bg-red-50',
        'border-red-200',
        'text-red-800'
      );
    });

    it('タイトルが指定された場合、タイトルが表示される', () => {
      render(<ErrorNotification {...defaultProps} title='エラータイトル' />);

      expect(screen.getByText('エラータイトル')).toBeInTheDocument();
    });

    it('子要素が正しく表示される', () => {
      render(
        <ErrorNotification {...defaultProps}>
          <span data-testid='child'>子要素</span>
        </ErrorNotification>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  describe('タイプ別の表示', () => {
    it('warningタイプで正しいスタイルが適用される', () => {
      render(<ErrorNotification {...defaultProps} type='warning' />);

      const notification = screen.getByRole('alert');
      expect(notification).toHaveClass(
        'bg-yellow-50',
        'border-yellow-200',
        'text-yellow-800'
      );
    });

    it('infoタイプで正しいスタイルが適用される', () => {
      render(<ErrorNotification {...defaultProps} type='info' />);

      const notification = screen.getByRole('alert');
      expect(notification).toHaveClass(
        'bg-blue-50',
        'border-blue-200',
        'text-blue-800'
      );
    });
  });

  describe('位置の設定', () => {
    it('top位置で正しいクラスが適用される', () => {
      render(<ErrorNotification {...defaultProps} position='top' />);

      const notification = screen.getByRole('alert');
      expect(notification).toHaveClass('top-4');
    });

    it('bottom位置で正しいクラスが適用される', () => {
      render(<ErrorNotification {...defaultProps} position='bottom' />);

      const notification = screen.getByRole('alert');
      expect(notification).toHaveClass('bottom-4');
    });

    it('center位置で正しいクラスが適用される', () => {
      render(<ErrorNotification {...defaultProps} position='center' />);

      const notification = screen.getByRole('alert');
      expect(notification).toHaveClass(
        'top-1/2',
        'left-1/2',
        'transform',
        '-translate-x-1/2',
        '-translate-y-1/2'
      );
    });
  });

  describe('自動閉じる機能', () => {
    it('durationが設定された場合、指定時間後に自動で閉じる', async () => {
      const onClose = jest.fn();
      render(
        <ErrorNotification
          {...defaultProps}
          duration={1000}
          onClose={onClose}
        />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();

      // 1秒後に閉じる
      jest.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('durationが0の場合、自動で閉じない', () => {
      const onClose = jest.fn();
      render(
        <ErrorNotification {...defaultProps} duration={0} onClose={onClose} />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();

      // 時間を進めても閉じない
      jest.advanceTimersByTime(5000);

      expect(onClose).not.toHaveBeenCalled();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('手動で閉じる機能', () => {
    it('closableがtrueの場合、閉じるボタンが表示される', () => {
      render(<ErrorNotification {...defaultProps} closable={true} />);

      expect(
        screen.getByRole('button', { name: /閉じる/i })
      ).toBeInTheDocument();
    });

    it('closableがfalseの場合、閉じるボタンが表示されない', () => {
      render(<ErrorNotification {...defaultProps} closable={false} />);

      expect(
        screen.queryByRole('button', { name: /閉じる/i })
      ).not.toBeInTheDocument();
    });

    it('閉じるボタンをクリックするとonCloseが呼ばれる', async () => {
      const onClose = jest.fn();
      render(
        <ErrorNotification
          {...defaultProps}
          closable={true}
          onClose={onClose}
        />
      );

      const closeButton = screen.getByRole('button', { name: /閉じる/i });
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });

  describe('カスタムスタイル', () => {
    it('classNameが正しく適用される', () => {
      render(<ErrorNotification {...defaultProps} className='custom-class' />);

      const notification = screen.getByRole('alert');
      expect(notification).toHaveClass('custom-class');
    });
  });

  describe('アクセシビリティ', () => {
    it('role="alert"が設定されている', () => {
      render(<ErrorNotification {...defaultProps} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('閉じるボタンに適切なaria-labelが設定されている', () => {
      render(<ErrorNotification {...defaultProps} closable={true} />);

      const closeButton = screen.getByRole('button', { name: /閉じる/i });
      expect(closeButton).toHaveAttribute('aria-label', '閉じる');
    });
  });

  describe('アニメーション', () => {
    it('表示時にアニメーションクラスが適用される', () => {
      render(<ErrorNotification {...defaultProps} />);

      const notification = screen.getByRole('alert');
      expect(notification).toHaveClass(
        'transition-all',
        'duration-300',
        'opacity-100',
        'translate-y-0'
      );
    });

    it('閉じる時にアニメーションクラスが適用される', async () => {
      const onClose = jest.fn();
      render(
        <ErrorNotification
          {...defaultProps}
          closable={true}
          onClose={onClose}
        />
      );

      const closeButton = screen.getByRole('button', { name: /閉じる/i });
      fireEvent.click(closeButton);

      // アニメーション完了後にコールバックが実行される
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });
});
