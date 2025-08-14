/**
 * @description LoadingSpinnerコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoadingSpinner, {
  LoadingOverlay,
  LoadingButton,
} from '../LoadingSpinner';

/**
 * @description LoadingSpinnerコンポーネントの基本表示テスト
 */
describe('LoadingSpinner Component', () => {
  const defaultProps = {
    size: 'md' as const,
    color: 'primary' as const,
  };

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders loading spinner component correctly', () => {
    render(<LoadingSpinner {...defaultProps} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  /**
   * @description スピナーが正しく表示される
   */
  it('displays spinner correctly', () => {
    render(<LoadingSpinner {...defaultProps} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  /**
   * @description デフォルトのスタイリングが正しく適用される
   */
  it('has correct default styling', () => {
    render(<LoadingSpinner {...defaultProps} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('animate-spin', 'rounded-full', 'border-2');
  });

  /**
   * @description 小サイズのスタイリングが正しく適用される
   */
  it('applies small size styling correctly', () => {
    render(<LoadingSpinner {...defaultProps} size='sm' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-4', 'h-4');
  });

  /**
   * @description 中サイズのスタイリングが正しく適用される
   */
  it('applies medium size styling correctly', () => {
    render(<LoadingSpinner {...defaultProps} size='md' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-6', 'h-6');
  });

  /**
   * @description 大サイズのスタイリングが正しく適用される
   */
  it('applies large size styling correctly', () => {
    render(<LoadingSpinner {...defaultProps} size='lg' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-8', 'h-8');
  });

  /**
   * @description 特大サイズのスタイリングが正しく適用される
   */
  it('applies extra large size styling correctly', () => {
    render(<LoadingSpinner {...defaultProps} size='xl' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  /**
   * @description プライマリカラーのスタイリングが正しく適用される
   */
  it('applies primary color styling correctly', () => {
    render(<LoadingSpinner {...defaultProps} color='primary' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-blue-600');
  });

  /**
   * @description セカンダリカラーのスタイリングが正しく適用される
   */
  it('applies secondary color styling correctly', () => {
    render(<LoadingSpinner {...defaultProps} color='secondary' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-gray-600');
  });

  /**
   * @description ホワイトカラーのスタイリングが正しく適用される
   */
  it('applies white color styling correctly', () => {
    render(<LoadingSpinner {...defaultProps} color='white' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-white');
  });

  /**
   * @description グレーカラーのスタイリングが正しく適用される
   */
  it('applies gray color styling correctly', () => {
    render(<LoadingSpinner {...defaultProps} color='gray' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-gray-400');
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    render(<LoadingSpinner {...defaultProps} className='custom-class' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('custom-class');
  });

  /**
   * @description 複数のインスタンスが正しく表示される
   */
  it('renders multiple instances correctly', () => {
    render(
      <div>
        <LoadingSpinner {...defaultProps} size='sm' />
        <LoadingSpinner {...defaultProps} size='md' />
        <LoadingSpinner {...defaultProps} size='lg' />
      </div>
    );

    const spinners = screen.getAllByTestId('loading-spinner');
    expect(spinners).toHaveLength(3);
  });

  /**
   * @description 異なるサイズが正しく表示される
   */
  it('displays different sizes correctly', () => {
    const { rerender } = render(<LoadingSpinner {...defaultProps} size='sm' />);
    let spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-4', 'h-4');

    rerender(<LoadingSpinner {...defaultProps} size='xl' />);
    spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  /**
   * @description 異なるカラーが正しく表示される
   */
  it('displays different colors correctly', () => {
    const { rerender } = render(
      <LoadingSpinner {...defaultProps} color='primary' />
    );
    let spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-blue-600');

    rerender(<LoadingSpinner {...defaultProps} color='secondary' />);
    spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-gray-600');
    expect(spinner).not.toHaveClass('text-blue-600');
  });

  /**
   * @description コンポーネントの基本構造が正しい
   */
  it('has correct component structure', () => {
    render(<LoadingSpinner {...defaultProps} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.tagName).toBe('DIV');
  });

  /**
   * @description アクセシビリティ属性が正しく設定される
   */
  it('has correct accessibility attributes', () => {
    render(<LoadingSpinner {...defaultProps} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveAttribute('data-testid', 'loading-spinner');
    expect(spinner).toHaveAttribute('role', 'status');
    expect(spinner).toHaveAttribute('aria-label', '読み込み中');
  });

  /**
   * @description 動的なプロパティ変更が正しく反映される
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(<LoadingSpinner {...defaultProps} size='sm' />);

    // 初期状態
    let spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-4', 'h-4');

    // サイズ変更
    rerender(<LoadingSpinner {...defaultProps} size='xl' />);
    spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  /**
   * @description カラーの動的変更が正しく反映される
   */
  it('reflects dynamic color changes correctly', () => {
    const { rerender } = render(
      <LoadingSpinner {...defaultProps} color='primary' />
    );

    // 初期状態
    let spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-blue-600');

    // カラー変更
    rerender(<LoadingSpinner {...defaultProps} color='secondary' />);
    spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-gray-600');
    expect(spinner).not.toHaveClass('text-blue-600');
  });

  /**
   * @description アニメーションクラスが正しく適用される
   */
  it('has correct animation classes', () => {
    render(<LoadingSpinner {...defaultProps} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('animate-spin');
  });

  /**
   * @description ボーダークラスが正しく適用される
   */
  it('has correct border classes', () => {
    render(<LoadingSpinner {...defaultProps} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('rounded-full', 'border-2');
  });

  /**
   * @description カスタムaria-labelが正しく適用される
   */
  it('applies custom aria-label correctly', () => {
    render(<LoadingSpinner {...defaultProps} aria-label='カスタムラベル' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveAttribute('aria-label', 'カスタムラベル');
  });

  /**
   * @description デフォルトのaria-labelが正しく適用される
   */
  it('applies default aria-label correctly', () => {
    render(<LoadingSpinner {...defaultProps} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveAttribute('aria-label', '読み込み中');
  });

  /**
   * @description sr-onlyテキストが正しく表示される
   */
  it('displays sr-only text correctly', () => {
    render(<LoadingSpinner {...defaultProps} />);

    const srOnlyText = screen.getByText('読み込み中');
    expect(srOnlyText).toBeInTheDocument();
    expect(srOnlyText).toHaveClass('sr-only');
  });

  /**
   * @description カスタムsr-onlyテキストが正しく表示される
   */
  it('displays custom sr-only text correctly', () => {
    render(<LoadingSpinner {...defaultProps} aria-label='カスタムラベル' />);

    const srOnlyText = screen.getByText('カスタムラベル');
    expect(srOnlyText).toBeInTheDocument();
    expect(srOnlyText).toHaveClass('sr-only');
  });
});

/**
 * @description LoadingOverlayコンポーネントのテスト
 */
describe('LoadingOverlay Component', () => {
  const defaultProps = {
    isLoading: true,
    children: <div data-testid='content'>コンテンツ</div>,
  };

  /**
   * @description ローディング状態でオーバーレイが表示される
   */
  it('displays overlay when loading', () => {
    render(<LoadingOverlay {...defaultProps} />);

    const overlay = screen
      .getByTestId('content')
      .parentElement?.querySelector('[aria-live="polite"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute('aria-live', 'polite');
  });

  /**
   * @description ローディング状態でない場合は子要素のみ表示される
   */
  it('shows only children when not loading', () => {
    render(<LoadingOverlay {...defaultProps} isLoading={false} />);

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  /**
   * @description カスタム背景色が正しく適用される
   */
  it('applies custom background color correctly', () => {
    render(
      <LoadingOverlay
        {...defaultProps}
        backgroundColor='bg-black bg-opacity-50'
      />
    );

    const overlay = screen
      .getByTestId('content')
      .parentElement?.querySelector('[aria-live="polite"]');
    expect(overlay).toHaveClass('bg-black', 'bg-opacity-50');
  });

  /**
   * @description カスタムスピナーサイズが正しく適用される
   */
  it('applies custom spinner size correctly', () => {
    render(<LoadingOverlay {...defaultProps} spinnerSize='xl' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  /**
   * @description カスタムスピナーカラーが正しく適用される
   */
  it('applies custom spinner color correctly', () => {
    render(<LoadingOverlay {...defaultProps} spinnerColor='white' />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-white');
  });

  /**
   * @description ローディングメッセージが正しく表示される
   */
  it('displays loading message correctly', () => {
    render(
      <LoadingOverlay {...defaultProps} message='データを読み込み中...' />
    );

    const message = screen.getByText('データを読み込み中...');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('mt-2', 'text-sm', 'text-gray-600');
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    render(
      <LoadingOverlay {...defaultProps} className='custom-overlay-class' />
    );

    const container = screen.getByTestId('content').parentElement;
    expect(container).toHaveClass('custom-overlay-class');
  });

  /**
   * @description 子要素が正しく表示される
   */
  it('displays children correctly', () => {
    render(<LoadingOverlay {...defaultProps} />);

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
  });

  /**
   * @description オーバーレイが子要素の上に正しく配置される
   */
  it('positions overlay correctly over children', () => {
    render(<LoadingOverlay {...defaultProps} />);

    const overlay = screen
      .getByTestId('content')
      .parentElement?.querySelector('[aria-live="polite"]');
    expect(overlay).toHaveClass('absolute', 'inset-0');
  });

  /**
   * @description オーバーレイのレイアウトが正しい
   */
  it('has correct overlay layout', () => {
    render(<LoadingOverlay {...defaultProps} />);

    const overlay = screen
      .getByTestId('content')
      .parentElement?.querySelector('[aria-live="polite"]');
    expect(overlay).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center'
    );
  });
});

/**
 * @description LoadingButtonコンポーネントのテスト
 */
describe('LoadingButton Component', () => {
  const defaultProps = {
    isLoading: false,
    children: '送信',
  };

  /**
   * @description ボタンが正しくレンダリングされる
   */
  it('renders button correctly', () => {
    render(<LoadingButton {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('送信');
  });

  /**
   * @description ローディング状態でスピナーが表示される
   */
  it('displays spinner when loading', () => {
    render(<LoadingButton {...defaultProps} isLoading={true} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('mr-2');
  });

  /**
   * @description ローディング状態でローディングテキストが表示される
   */
  it('displays loading text when loading', () => {
    render(
      <LoadingButton
        {...defaultProps}
        isLoading={true}
        loadingText='送信中...'
      />
    );

    expect(screen.getByText('送信中...')).toBeInTheDocument();
  });

  /**
   * @description ローディング状態でない場合は通常のテキストが表示される
   */
  it('displays normal text when not loading', () => {
    render(<LoadingButton {...defaultProps} />);

    expect(screen.getByText('送信')).toBeInTheDocument();
  });

  /**
   * @description プライマリバリアントのスタイリングが正しく適用される
   */
  it('applies primary variant styling correctly', () => {
    render(<LoadingButton {...defaultProps} variant='primary' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700'
    );
  });

  /**
   * @description セカンダリバリアントのスタイリングが正しく適用される
   */
  it('applies secondary variant styling correctly', () => {
    render(<LoadingButton {...defaultProps} variant='secondary' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-gray-600',
      'text-white',
      'hover:bg-gray-700'
    );
  });

  /**
   * @description アウトラインバリアントのスタイリングが正しく適用される
   */
  it('applies outline variant styling correctly', () => {
    render(<LoadingButton {...defaultProps} variant='outline' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('border', 'border-gray-300', 'text-gray-700');
  });

  /**
   * @description 小サイズのスタイリングが正しく適用される
   */
  it('applies small size styling correctly', () => {
    render(<LoadingButton {...defaultProps} size='sm' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
  });

  /**
   * @description 中サイズのスタイリングが正しく適用される
   */
  it('applies medium size styling correctly', () => {
    render(<LoadingButton {...defaultProps} size='md' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-4', 'py-2', 'text-sm');
  });

  /**
   * @description 大サイズのスタイリングが正しく適用される
   */
  it('applies large size styling correctly', () => {
    render(<LoadingButton {...defaultProps} size='lg' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6', 'py-3', 'text-base');
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    render(<LoadingButton {...defaultProps} className='custom-button-class' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-button-class');
  });

  /**
   * @description クリックハンドラーが正しく動作する
   */
  it('handles click correctly', () => {
    const handleClick = jest.fn();
    render(<LoadingButton {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * @description ローディング状態でクリックが無効化される
   */
  it('disables click when loading', () => {
    const handleClick = jest.fn();
    render(
      <LoadingButton {...defaultProps} isLoading={true} onClick={handleClick} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  /**
   * @description 無効状態でクリックが無効化される
   */
  it('disables click when disabled', () => {
    const handleClick = jest.fn();
    render(
      <LoadingButton {...defaultProps} disabled={true} onClick={handleClick} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  /**
   * @description ボタンのタイプが正しく設定される
   */
  it('sets button type correctly', () => {
    render(<LoadingButton {...defaultProps} type='submit' />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  /**
   * @description デフォルトのボタンタイプが正しく設定される
   */
  it('sets default button type correctly', () => {
    render(<LoadingButton {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  /**
   * @description ローディング状態でボタンが無効化される
   */
  it('disables button when loading', () => {
    render(<LoadingButton {...defaultProps} isLoading={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  /**
   * @description 無効状態でボタンが無効化される
   */
  it('disables button when disabled', () => {
    render(<LoadingButton {...defaultProps} disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  /**
   * @description 基本クラスが正しく適用される
   */
  it('applies base classes correctly', () => {
    render(<LoadingButton {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-md',
      'transition-colors',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2'
    );
  });

  /**
   * @description 無効状態のスタイリングが正しく適用される
   */
  it('applies disabled state styling correctly', () => {
    render(<LoadingButton {...defaultProps} disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });

  /**
   * @description カスタムスピナーサイズが正しく適用される
   */
  it('applies custom spinner size correctly', () => {
    render(
      <LoadingButton {...defaultProps} isLoading={true} spinnerSize='xl' />
    );

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  /**
   * @description カスタムスピナーカラーが正しく適用される
   */
  it('applies custom spinner color correctly', () => {
    render(
      <LoadingButton {...defaultProps} isLoading={true} spinnerColor='white' />
    );

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-white');
  });

  /**
   * @description 動的なプロパティ変更が正しく反映される
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(
      <LoadingButton {...defaultProps} variant='primary' />
    );

    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600');

    rerender(<LoadingButton {...defaultProps} variant='secondary' />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-600');
    expect(button).not.toHaveClass('bg-blue-600');
  });

  /**
   * @description ローディング状態の動的変更が正しく反映される
   */
  it('reflects dynamic loading state changes correctly', () => {
    const { rerender } = render(<LoadingButton {...defaultProps} />);

    let button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    rerender(<LoadingButton {...defaultProps} isLoading={true} />);
    button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
