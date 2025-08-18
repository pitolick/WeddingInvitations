import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../index';

/**
 * @description Buttonコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */
describe('Button Component', () => {
  const defaultProps = {
    children: 'テストボタン',
    onClick: jest.fn(),
  };

  /**
   * @description 基本的なレンダリングテスト
   */
  it('renders correctly', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('テストボタン');
  });

  /**
   * @description ボタンの構造が正しいことをテスト
   */
  it('has correct structure', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
  });

  /**
   * @description デフォルトスタイリングが正しく適用されることをテスト
   */
  it('applies default styling correctly', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-lg',
      'font-noto',
      'font-medium',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'disabled:cursor-not-allowed',
      'transform',
      'hover:scale-105',
      'active:scale-95'
    );
  });

  /**
   * @description primaryバリアントのスタイリングが正しく適用されることをテスト
   */
  it('applies primary variant styling correctly', () => {
    render(<Button {...defaultProps} variant='primary' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-lavender-600',
      'text-white',
      'hover:bg-lavender-700',
      'focus:ring-lavender-500'
    );
  });

  /**
   * @description secondaryバリアントのスタイリングが正しく適用されることをテスト
   */
  it('applies secondary variant styling correctly', () => {
    render(<Button {...defaultProps} variant='secondary' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-gray-100',
      'text-gray-900',
      'hover:bg-gray-200',
      'focus:ring-gray-500',
      'border',
      'border-gray-300'
    );
  });

  /**
   * @description outlineバリアントのスタイリングが正しく適用されることをテスト
   */
  it('applies outline variant styling correctly', () => {
    render(<Button {...defaultProps} variant='outline' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'border-2',
      'border-lavender-600',
      'text-lavender-600',
      'bg-transparent',
      'hover:bg-lavender-600',
      'hover:text-white',
      'focus:ring-lavender-500'
    );
  });

  /**
   * @description dangerバリアントのスタイリングが正しく適用されることをテスト
   */
  it('applies danger variant styling correctly', () => {
    render(<Button {...defaultProps} variant='danger' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-pink-600',
      'text-white',
      'hover:bg-pink-700',
      'focus:ring-pink-500'
    );
  });

  /**
   * @description 小さいサイズのスタイリングが正しく適用されることをテスト
   */
  it('applies small size styling correctly', () => {
    render(<Button {...defaultProps} size='sm' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-8', 'px-3', 'text-sm');
  });

  /**
   * @description デフォルトサイズのスタイリングが正しく適用されることをテスト
   */
  it('applies default size styling correctly', () => {
    render(<Button {...defaultProps} size='md' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-10', 'px-4', 'py-2', 'text-base');
  });

  /**
   * @description 大きいサイズのスタイリングが正しく適用されることをテスト
   */
  it('applies large size styling correctly', () => {
    render(<Button {...defaultProps} size='lg' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-12', 'px-6', 'py-3', 'text-lg');
  });

  /**
   * @description カスタムクラス名が正しく適用されることをテスト
   */
  it('applies custom className correctly', () => {
    render(<Button {...defaultProps} className='custom-class' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  /**
   * @description クリックイベントが正しく動作することをテスト
   */
  it('handles click events correctly', () => {
    const handleClick = jest.fn();
    render(<Button {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * @description 無効状態が正しく動作することをテスト
   */
  it('handles disabled state correctly', () => {
    render(<Button {...defaultProps} disabled />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'disabled:cursor-not-allowed'
    );
  });

  /**
   * @description type属性が正しく設定されることをテスト
   */
  it('has correct type attribute', () => {
    render(<Button {...defaultProps} type='submit' />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  /**
   * @description 複数のボタンが正しく表示されることをテスト
   */
  it('displays multiple buttons correctly', () => {
    render(
      <div>
        <Button {...defaultProps} variant='primary' />
        <Button {...defaultProps} variant='secondary' />
        <Button {...defaultProps} variant='outline' />
      </div>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  /**
   * @description 異なるラベルが正しく表示されることをテスト
   */
  it('displays different labels correctly', () => {
    render(<Button {...defaultProps}>ボタン1</Button>);
    expect(screen.getByText('ボタン1')).toBeInTheDocument();

    render(<Button {...defaultProps}>ボタン2</Button>);
    expect(screen.getByText('ボタン2')).toBeInTheDocument();
  });

  /**
   * @description 動的なプロパティ変更が正しく反映されることをテスト
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(<Button {...defaultProps} variant='primary' />);

    // 初期状態
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-lavender-600');

    // バリアント変更
    rerender(<Button {...defaultProps} variant='secondary' />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-100');

    // サイズ変更
    rerender(<Button {...defaultProps} variant='secondary' size='lg' />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-12', 'px-6', 'py-3', 'text-lg');
  });

  /**
   * @description フォーカス状態のスタイリングが正しく適用されることをテスト
   */
  it('has correct focus state styling', () => {
    render(<Button {...defaultProps} variant='primary' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2'
    );
  });

  /**
   * @description ホバー状態のスタイリングが正しく適用されることをテスト
   */
  it('has correct hover state styling', () => {
    render(<Button {...defaultProps} variant='primary' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:scale-105', 'hover:bg-lavender-700');
  });

  /**
   * @description アクティブ状態のスタイリングが正しく適用されることをテスト
   */
  it('has correct active state styling', () => {
    render(<Button {...defaultProps} variant='primary' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('active:scale-95');
  });
});
