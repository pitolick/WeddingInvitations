/**
 * @description Inputコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

/**
 * @description Inputコンポーネントの基本表示テスト
 */
describe('Input Component', () => {
  const defaultProps = {
    label: 'テストラベル',
    name: 'test-input',
    placeholder: 'テストプレースホルダー',
    value: '', // valueは必須プロパティ
  };

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders input component correctly', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByRole('textbox');
    const label = screen.getByText('テストラベル');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  /**
   * @description ラベルが正しく表示される
   */
  it('displays label correctly', () => {
    render(<Input {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm', 'font-medium', 'text-gray-700');
  });

  /**
   * @description 入力フィールドが正しく表示される
   */
  it('displays input field correctly', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'test-input');
    expect(input).toHaveAttribute('placeholder', 'テストプレースホルダー');
  });

  /**
   * @description デフォルトのスタイリングが正しく適用される
   */
  it('has correct default styling', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'w-full',
      'px-4',
      'py-3',
      'font-noto',
      'text-base',
      'text-gray-900',
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-lg',
      'transition-colors',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-lavender-500',
      'focus:border-lavender-500'
    );
  });

  /**
   * @description エラー状態のスタイリングが正しく適用される
   */
  it('applies error state styling correctly', () => {
    render(<Input {...defaultProps} error='エラーメッセージ' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'border-pink-500',
      'focus:ring-pink-500',
      'focus:border-pink-500'
    );
  });

  /**
   * @description エラーメッセージが正しく表示される
   */
  it('displays error message correctly', () => {
    render(<Input {...defaultProps} error='エラーメッセージ' />);

    const errorMessage = screen.getByText('エラーメッセージ');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-sm', 'text-pink-600');
  });

  /**
   * @description 必須項目の表示が正しい
   */
  it('shows required field correctly', () => {
    render(<Input {...defaultProps} required />);

    const label = screen.getByText('テストラベル');
    expect(label).toHaveTextContent('テストラベル*');
  });

  /**
   * @description 必須項目のスタイリングが正しい
   */
  it('has correct required field styling', () => {
    render(<Input {...defaultProps} required />);

    const requiredMark = screen.getByText('*');
    expect(requiredMark).toHaveClass('text-pink-500', 'ml-1');
  });

  /**
   * @description 入力値が正しく設定される
   */
  it('sets input value correctly', () => {
    render(<Input {...defaultProps} value='テスト値' onChange={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('テスト値');
  });

  /**
   * @description 入力値の変更が正しく処理される
   */
  it('handles input value changes correctly', () => {
    const handleChange = jest.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '新しい値' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  /**
   * @description フォーカス状態のスタイリングが正しい
   */
  it('has correct focus state styling', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'focus:ring-lavender-500',
      'focus:border-lavender-500'
    );
  });

  /**
   * @description 無効状態のスタイリングが正しい
   */
  it('has correct disabled state styling', () => {
    render(<Input {...defaultProps} disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });

  /**
   * @description 読み取り専用状態のスタイリングが正しい
   */
  it('has correct read-only state styling', () => {
    render(<Input {...defaultProps} readOnly />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveClass('read-only:bg-gray-50');
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    render(<Input {...defaultProps} className='custom-class' />);

    const container = screen.getByText('テストラベル').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  /**
   * @description 異なるタイプの入力が正しく設定される
   */
  it('sets different input types correctly', () => {
    render(<Input {...defaultProps} type='email' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  /**
   * @description デフォルトの入力タイプが正しい
   */
  it('has correct default input type', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  /**
   * @description 複数のインスタンスが正しく表示される
   */
  it('renders multiple instances correctly', () => {
    render(
      <div>
        <Input {...defaultProps} name='input1' />
        <Input {...defaultProps} name='input2' />
        <Input {...defaultProps} name='input3' />
      </div>
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);
  });

  /**
   * @description 異なるラベルが正しく表示される
   */
  it('displays different labels correctly', () => {
    render(<Input {...defaultProps} label='ラベル1' />);
    expect(screen.getByText('ラベル1')).toBeInTheDocument();

    render(<Input {...defaultProps} label='ラベル2' />);
    expect(screen.getByText('ラベル2')).toBeInTheDocument();
  });

  /**
   * @description 異なるプレースホルダーが正しく設定される
   */
  it('sets different placeholders correctly', () => {
    render(<Input {...defaultProps} placeholder='プレースホルダー1' />);
    expect(
      screen.getByPlaceholderText('プレースホルダー1')
    ).toBeInTheDocument();

    render(<Input {...defaultProps} placeholder='プレースホルダー2' />);
    expect(
      screen.getByPlaceholderText('プレースホルダー2')
    ).toBeInTheDocument();
  });

  /**
   * @description コンポーネントの基本構造が正しい
   */
  it('has correct component structure', () => {
    render(<Input {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    const input = screen.getByRole('textbox');

    expect(label.tagName).toBe('LABEL');
    expect(input.tagName).toBe('INPUT');
  });

  /**
   * @description アクセシビリティ属性が正しく設定される
   */
  it('has correct accessibility attributes', () => {
    render(<Input {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    const input = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for', 'input-test-input');
    expect(input).toHaveAttribute('id', 'input-test-input');
  });

  /**
   * @description 動的なプロパティ変更が正しく反映される
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(
      <Input {...defaultProps} value='初期値' onChange={() => {}} />
    );

    // 初期状態
    let input = screen.getByRole('textbox');
    expect(input).toHaveValue('初期値');

    // 値変更
    rerender(<Input {...defaultProps} value='更新値' onChange={() => {}} />);
    input = screen.getByRole('textbox');
    expect(input).toHaveValue('更新値');
  });

  /**
   * @description エラー状態の動的変更が正しく反映される
   */
  it('reflects dynamic error state changes correctly', () => {
    const { rerender } = render(<Input {...defaultProps} />);

    // 初期状態（エラーなし）
    expect(screen.queryByText('エラーメッセージ')).not.toBeInTheDocument();

    // エラー状態に変更
    rerender(<Input {...defaultProps} error='エラーメッセージ' />);
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
  });
});
