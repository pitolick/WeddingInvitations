/**
 * @description LoadingSpinnerコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

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
