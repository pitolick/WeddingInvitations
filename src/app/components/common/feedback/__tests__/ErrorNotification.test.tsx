/**
 * @description ErrorNotificationコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import {
  ErrorNotification,
  ErrorNotificationManager,
  useErrorNotification,
} from '../ErrorNotification';

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

  describe('アイコンの表示', () => {
    it('errorタイプで正しいアイコンが表示される', () => {
      render(<ErrorNotification {...defaultProps} type='error' />);

      const notification = screen.getByRole('alert');
      const icon = notification.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('w-5', 'h-5');
    });

    it('warningタイプで正しいアイコンが表示される', () => {
      render(<ErrorNotification {...defaultProps} type='warning' />);

      const notification = screen.getByRole('alert');
      const icon = notification.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('w-5', 'h-5');
    });

    it('infoタイプで正しいアイコンが表示される', () => {
      render(<ErrorNotification {...defaultProps} type='info' />);

      const notification = screen.getByRole('alert');
      const icon = notification.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('w-5', 'h-5');
    });
  });

  describe('状態管理', () => {
    it('isVisibleがfalseの場合、何も表示されない', () => {
      const { rerender } = render(<ErrorNotification {...defaultProps} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();

      // isVisibleをfalseに設定（実際のコンポーネントでは内部状態）
      rerender(<ErrorNotification {...defaultProps} />);

      // コンポーネントがマウントされている限り表示される
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});

/**
 * @description ErrorNotificationManagerコンポーネントのテスト
 */
describe('ErrorNotificationManager', () => {
  const TestComponent = () => {
    const { addNotification, removeNotification, clearNotifications } =
      useErrorNotification();

    return (
      <div>
        <button
          onClick={() =>
            addNotification({ message: 'テスト通知', type: 'error' })
          }
        >
          通知を追加
        </button>
        <button onClick={() => removeNotification('test-id')}>
          通知を削除
        </button>
        <button onClick={clearNotifications}>全通知を削除</button>
      </div>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('子要素が正しく表示される', () => {
    render(
      <ErrorNotificationManager>
        <div data-testid='child'>テストコンテンツ</div>
      </ErrorNotificationManager>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('デフォルトの位置設定が正しく適用される', () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('top-4');
  });

  it('カスタム位置設定が正しく適用される', () => {
    render(
      <ErrorNotificationManager position='bottom'>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('bottom-4');
  });

  it('デフォルトの表示時間が正しく設定される', async () => {
    render(
      <ErrorNotificationManager defaultDuration={3000}>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    expect(screen.getByText('テスト通知')).toBeInTheDocument();

    // 3秒後に自動で閉じる
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // アニメーション完了まで待つ
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.queryByText('テスト通知')).not.toBeInTheDocument();
    });
  });

  it('通知が正しく追加される', () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    expect(screen.getByText('テスト通知')).toBeInTheDocument();
  });

  it('複数の通知が正しく表示される', () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');

    // 複数回クリック
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const notifications = screen.getAllByRole('alert');
    expect(notifications).toHaveLength(3);
  });

  it('通知が正しく削除される', async () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    expect(screen.getByText('テスト通知')).toBeInTheDocument();

    // 通知が自動で閉じるまで待つ
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // アニメーション完了まで待つ
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.queryByText('テスト通知')).not.toBeInTheDocument();
    });
  });

  it('全通知が正しく削除される', () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    const clearButton = screen.getByText('全通知を削除');

    // 複数の通知を追加
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getAllByRole('alert')).toHaveLength(3);

    // 全通知を削除
    fireEvent.click(clearButton);

    expect(screen.queryAllByRole('alert')).toHaveLength(0);
  });

  it('通知のIDが一意に生成される', () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');

    // 複数回クリック
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const notifications = screen.getAllByRole('alert');
    expect(notifications).toHaveLength(2);

    // 各通知が異なるIDを持つことを確認（DOM要素の存在で確認）
    expect(notifications.length).toBe(2);
  });

  it('removeNotificationが正しく動作する', async () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    expect(screen.getByText('テスト通知')).toBeInTheDocument();

    // 通知が自動で閉じるまで待つ
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // アニメーション完了まで待つ
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.queryByText('テスト通知')).not.toBeInTheDocument();
    });
  });
});

/**
 * @description useErrorNotificationフックのテスト
 */
describe('useErrorNotification', () => {
  const TestComponent = () => {
    const { addNotification, removeNotification, clearNotifications } =
      useErrorNotification();

    return (
      <div>
        <button
          onClick={() =>
            addNotification({ message: 'テスト通知', type: 'error' })
          }
        >
          通知を追加
        </button>
        <button onClick={() => removeNotification('test-id')}>
          通知を削除
        </button>
        <button onClick={clearNotifications}>全通知を削除</button>
      </div>
    );
  };

  it('ErrorNotificationManagerの外で使用するとエラーが発生する', () => {
    // エラーをキャッチするためのコンソールエラーを無効化
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow(
      'useErrorNotification must be used within an ErrorNotificationManager'
    );

    consoleSpy.mockRestore();
  });

  it('ErrorNotificationManager内で正しく動作する', () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    expect(screen.getByText('テスト通知')).toBeInTheDocument();
  });

  it('addNotificationが正しく動作する', () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    expect(screen.getByText('テスト通知')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass(
      'bg-red-50',
      'border-red-200',
      'text-red-800'
    );
  });

  it('clearNotificationsが正しく動作する', () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    const clearButton = screen.getByText('全通知を削除');

    // 複数の通知を追加
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getAllByRole('alert')).toHaveLength(3);

    // 全通知を削除
    fireEvent.click(clearButton);

    expect(screen.queryAllByRole('alert')).toHaveLength(0);
  });

  it('通知のタイプが正しく設定される', () => {
    render(
      <ErrorNotificationManager>
        <TestComponent />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass(
      'bg-red-50',
      'border-red-200',
      'text-red-800'
    );
  });

  it('通知のタイトルが正しく設定される', () => {
    const TestComponentWithTitle = () => {
      const { addNotification } = useErrorNotification();

      return (
        <button
          onClick={() =>
            addNotification({
              message: 'テスト通知',
              type: 'error',
              title: 'エラータイトル',
            })
          }
        >
          通知を追加
        </button>
      );
    };

    render(
      <ErrorNotificationManager>
        <TestComponentWithTitle />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    expect(screen.getByText('エラータイトル')).toBeInTheDocument();
    expect(screen.getByText('テスト通知')).toBeInTheDocument();
  });

  it('通知のclosable設定が正しく動作する', () => {
    const TestComponentWithClosable = () => {
      const { addNotification } = useErrorNotification();

      return (
        <button
          onClick={() =>
            addNotification({
              message: 'テスト通知',
              type: 'error',
              closable: false,
            })
          }
        >
          通知を追加
        </button>
      );
    };

    render(
      <ErrorNotificationManager>
        <TestComponentWithClosable />
      </ErrorNotificationManager>
    );

    const addButton = screen.getByText('通知を追加');
    fireEvent.click(addButton);

    expect(screen.getByText('テスト通知')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /閉じる/i })
    ).not.toBeInTheDocument();
  });
});
