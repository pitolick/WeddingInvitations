/**
 * @description MessageContentコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MessageContent } from '../MessageContent';

// DearBlockコンポーネントのモック
jest.mock('../DearBlock', () => {
  return function MockDearBlock({
    invitationId,
    draftKey,
  }: {
    invitationId: string;
    draftKey?: string;
  }) {
    return (
      <div
        data-testid='dear-block'
        data-invitation-id={invitationId}
        data-draft-key={draftKey}
      >
        Mock DearBlock
      </div>
    );
  };
});

// Buttonコンポーネントのモック
jest.mock('@/app/components/common/button', () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
    className,
    type,
    variant,
    size,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className: string;
    type: string;
    variant: string;
    size: string;
  }) => {
    return (
      <button
        data-testid='custom-button'
        onClick={onClick}
        className={className}
        data-type={type}
        data-variant={variant}
        data-size={size}
      >
        {children}
      </button>
    );
  },
}));

// MagicEffectコンポーネントのモック
jest.mock('@/app/components/common/animation', () => ({
  MagicEffect: ({
    isActive,
    left,
    top,
    size,
  }: {
    isActive: boolean;
    left: string;
    top: string;
    size: string;
  }) => {
    if (!isActive) return null;
    return (
      <div
        data-testid='magic-effect'
        data-left={left}
        data-top={top}
        data-size={size}
      >
        Magic Effect
      </div>
    );
  },
}));

// motion/reactのモック
jest.mock('motion/react', () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className: string;
      [key: string]: any;
    }) => (
      <div className={className} data-testid='motion-div' {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({
    children,
    mode,
  }: {
    children: React.ReactNode;
    mode: string;
  }) => (
    <div data-testid='animate-presence' data-mode={mode}>
      {children}
    </div>
  ),
}));

/**
 * @description MessageContentコンポーネントの基本表示テスト
 */
describe('MessageContent Component', () => {
  const defaultProps = {
    invitationId: 'test-123',
    draftKey: 'draft-123',
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders message content component correctly', () => {
    render(<MessageContent {...defaultProps} />);

    // タイトルが表示される
    expect(screen.getByText('Message')).toBeInTheDocument();

    // ボタンが表示される
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();

    // DearBlockが表示される
    expect(screen.getByTestId('dear-block')).toBeInTheDocument();
  });

  /**
   * @description 初期状態で通常のメッセージが表示される
   */
  it('displays normal message initially', () => {
    render(<MessageContent {...defaultProps} />);

    // 通常のメッセージが表示される
    expect(screen.getByText(/オラフも/)).toBeInTheDocument();
    expect(
      screen.getByText(/結婚式 を挙げることとなりました/)
    ).toBeInTheDocument();

    // 夢のメッセージは表示されない
    expect(screen.queryByText(/サラーム！🐍/)).not.toBeInTheDocument();
  });

  /**
   * @description ボタンクリック時にメッセージが切り替わる
   */
  it('switches message when button is clicked', async () => {
    render(<MessageContent {...defaultProps} />);

    const button = screen.getByTestId('custom-button');

    // 初期状態のボタンテキスト
    expect(button).toHaveTextContent('夢と魔法を体験する');

    // ボタンをクリック
    fireEvent.click(button);

    // 魔法のエフェクトが表示される
    expect(screen.getByTestId('magic-effect')).toBeInTheDocument();

    // タイマーを進める
    jest.advanceTimersByTime(2000);

    // メッセージが切り替わる
    await waitFor(() => {
      expect(screen.getByText(/サラーム！🐍/)).toBeInTheDocument();
      expect(screen.queryByText(/オラフも/)).not.toBeInTheDocument();
    });

    // ボタンテキストが変更される
    expect(button).toHaveTextContent('元に戻る');
  });

  /**
   * @description ボタンクリック時に魔法のエフェクトが表示される
   */
  it('shows magic effect when button is clicked', () => {
    render(<MessageContent {...defaultProps} />);

    const button = screen.getByTestId('custom-button');

    // 初期状態では魔法のエフェクトが表示されない
    expect(screen.queryByTestId('magic-effect')).not.toBeInTheDocument();

    // ボタンをクリック
    fireEvent.click(button);

    // 魔法のエフェクトが表示される
    expect(screen.getByTestId('magic-effect')).toBeInTheDocument();
    expect(screen.getByTestId('magic-effect')).toHaveAttribute(
      'data-left',
      '50%'
    );
    expect(screen.getByTestId('magic-effect')).toHaveAttribute(
      'data-top',
      '50%'
    );
    expect(screen.getByTestId('magic-effect')).toHaveAttribute(
      'data-size',
      'lg'
    );
  });

  /**
   * @description 招待者IDが正しく渡される
   */
  it('passes invitationId correctly', () => {
    render(<MessageContent {...defaultProps} />);

    const dearBlock = screen.getByTestId('dear-block');
    expect(dearBlock).toHaveAttribute('data-invitation-id', 'test-123');
  });

  /**
   * @description draftKeyが正しく渡される
   */
  it('passes draftKey correctly', () => {
    render(<MessageContent {...defaultProps} />);

    const dearBlock = screen.getByTestId('dear-block');
    expect(dearBlock).toHaveAttribute('data-draft-key', 'draft-123');
  });

  /**
   * @description ボタンの属性が正しく設定される
   */
  it('has correct button attributes', () => {
    render(<MessageContent {...defaultProps} />);

    const button = screen.getByTestId('custom-button');

    expect(button).toHaveAttribute('data-type', 'button');
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-size', 'lg');
    expect(button).toHaveClass('w-full', 'md:max-w-xs');
  });

  /**
   * @description タイトルのスタイリングが正しい
   */
  it('has correct title styling', () => {
    render(<MessageContent {...defaultProps} />);

    const title = screen.getByText('Message');
    expect(title).toHaveClass(
      'font-berkshire',
      'text-2xl',
      'md:text-5xl',
      'text-center',
      'text-gray-900',
      'md:text-black',
      'mb-0'
    );
  });

  /**
   * @description メッセージコンテナのスタイリングが正しい
   */
  it('has correct message container styling', () => {
    render(<MessageContent {...defaultProps} />);

    // メッセージコンテナを直接取得（proseクラスを持つ要素を探す）
    const messageContainer = screen.getByText(/オラフも/).closest('.prose');
    expect(messageContainer).toHaveClass(
      'prose',
      'prose-p:my-3',
      'text-sm',
      'md:text-base',
      'text-center',
      'text-gray-900',
      'md:text-black',
      'whitespace-pre-line',
      'relative'
    );
  });

  /**
   * @description メインコンテナのスタイリングが正しい
   */
  it('has correct main container styling', () => {
    render(<MessageContent {...defaultProps} />);

    const mainContainer = screen.getByText('Message').closest('div');
    expect(mainContainer).toHaveClass('w-full');
  });

  /**
   * @description レスポンシブデザインが正しく適用される
   */
  it('has correct responsive design', () => {
    render(<MessageContent {...defaultProps} />);

    // メインコンテナ
    const mainContainer = screen.getByText('Message').closest('div');
    expect(mainContainer).toHaveClass('w-full');

    // ボタン
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveClass('w-full', 'md:max-w-xs');

    // メッセージコンテナ
    const messageContainer = screen.getByText(/オラフも/).closest('.prose');
    expect(messageContainer).toHaveClass(
      'text-sm',
      'md:text-base',
      'text-gray-900',
      'md:text-black'
    );
  });

  /**
   * @description アニメーション要素が正しく設定される
   */
  it('has correct animation configuration', () => {
    render(<MessageContent {...defaultProps} />);

    const motionDivs = screen.getAllByTestId('motion-div');
    expect(motionDivs.length).toBeGreaterThan(0);

    const animatePresence = screen.getByTestId('animate-presence');
    expect(animatePresence).toHaveAttribute('data-mode', 'wait');
  });

  /**
   * @description メッセージ切り替えのタイミングが正しい
   */
  it('has correct message switching timing', async () => {
    render(<MessageContent {...defaultProps} />);

    const button = screen.getByTestId('custom-button');

    // ボタンをクリック
    fireEvent.click(button);

    // 魔法のエフェクトが表示される
    expect(screen.getByTestId('magic-effect')).toBeInTheDocument();

    // 1.5秒後でもまだメッセージは切り替わらない
    jest.advanceTimersByTime(1500);
    expect(screen.queryByText(/サラーム！/)).not.toBeInTheDocument();

    // 2秒後にメッセージが切り替わる
    jest.advanceTimersByTime(500);

    // 非同期の状態更新を待つ
    await waitFor(() => {
      expect(screen.getByText(/サラーム！/)).toBeInTheDocument();
    });
  });

  /**
   * @description 複数回のクリックで正しく動作する
   */
  it('works correctly with multiple clicks', async () => {
    render(<MessageContent {...defaultProps} />);

    const button = screen.getByTestId('custom-button');

    // 1回目のクリック
    fireEvent.click(button);
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText(/サラーム！/)).toBeInTheDocument();
      expect(button).toHaveTextContent('元に戻る');
    });

    // 2回目のクリック
    fireEvent.click(button);
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText(/オラフも/)).toBeInTheDocument();
      expect(button).toHaveTextContent('夢と魔法を体験する');
    });
  });
});
