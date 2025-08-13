/**
 * @description Selectコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../Select';

/**
 * @description Selectコンポーネントの基本表示テスト
 */
describe('Select Component', () => {
  const defaultProps = {
    label: 'テストラベル',
    name: 'test-select',
    value: '',
    onChange: jest.fn(),
    options: [
      { value: 'option1', label: 'オプション1' },
      { value: 'option2', label: 'オプション2' },
      { value: 'option3', label: 'オプション3' },
    ],
  };

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders select component correctly', () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole('combobox');
    const label = screen.getByText('テストラベル');

    expect(select).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  /**
   * @description ラベルが正しく表示される
   */
  it('displays label correctly', () => {
    render(<Select {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm', 'font-medium', 'text-gray-700');
  });

  /**
   * @description セレクトフィールドが正しく表示される
   */
  it('displays select field correctly', () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('name', 'test-select');
  });

  /**
   * @description オプションが正しく表示される
   */
  it('displays options correctly', () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option1');

    // オプションが正しく表示される
    expect(screen.getByText('オプション1')).toBeInTheDocument();
    expect(screen.getByText('オプション2')).toBeInTheDocument();
    expect(screen.getByText('オプション3')).toBeInTheDocument();
  });

  /**
   * @description デフォルトのスタイリングが正しく適用される
   */
  it('has correct default styling', () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
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
      'focus:border-lavender-500',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'read-only:bg-gray-50',
      'appearance-none',
      'bg-no-repeat',
      'bg-right',
      'pr-10'
    );
  });

  /**
   * @description エラー状態のスタイリングが正しく適用される
   */
  it('applies error state styling correctly', () => {
    render(<Select {...defaultProps} error='エラーメッセージ' />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
      'border-pink-500',
      'focus:ring-pink-500',
      'focus:border-pink-500'
    );
  });

  /**
   * @description エラーメッセージが正しく表示される
   */
  it('displays error message correctly', () => {
    render(<Select {...defaultProps} error='エラーメッセージ' />);

    const errorMessage = screen.getByText('エラーメッセージ');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('font-noto', 'text-sm', 'text-pink-600');
  });

  /**
   * @description 必須項目の表示が正しい
   */
  it('shows required field correctly', () => {
    render(<Select {...defaultProps} required />);

    const label = screen.getByText('テストラベル');
    expect(label).toHaveTextContent('テストラベル*');
  });

  /**
   * @description 必須項目のスタイリングが正しい
   */
  it('has correct required field styling', () => {
    render(<Select {...defaultProps} required />);

    const requiredMark = screen.getByText('*');
    expect(requiredMark).toHaveClass('text-pink-500', 'ml-1');
  });

  /**
   * @description 選択値が正しく設定される
   */
  it('sets selected value correctly', () => {
    render(<Select {...defaultProps} value='option2' onChange={() => {}} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  /**
   * @description 選択値の変更が正しく処理される
   */
  it('handles selection changes correctly', () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  /**
   * @description フォーカス状態のスタイリングが正しい
   */
  it('has correct focus state styling', () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
      'focus:ring-lavender-500',
      'focus:border-lavender-500'
    );
  });

  /**
   * @description 無効状態のスタイリングが正しい
   */
  it('has correct disabled state styling', () => {
    render(<Select {...defaultProps} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    expect(select).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    render(<Select {...defaultProps} className='custom-class' />);

    const container = screen.getByText('テストラベル').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  /**
   * @description プレースホルダーが正しく表示される
   */
  it('displays placeholder correctly', () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  /**
   * @description 空のオプションリストが正しく処理される
   */
  it('handles empty options list correctly', () => {
    render(<Select {...defaultProps} options={[]} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select.children).toHaveLength(0);
  });

  /**
   * @description 複数のインスタンスが正しく表示される
   */
  it('renders multiple instances correctly', () => {
    render(
      <div>
        <Select {...defaultProps} name='select1' />
        <Select {...defaultProps} name='select2' />
        <Select {...defaultProps} name='select3' />
      </div>
    );

    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(3);
  });

  /**
   * @description 異なるラベルが正しく表示される
   */
  it('displays different labels correctly', () => {
    render(<Select {...defaultProps} label='ラベル1' />);
    expect(screen.getByText('ラベル1')).toBeInTheDocument();

    render(<Select {...defaultProps} label='ラベル2' />);
    expect(screen.getByText('ラベル2')).toBeInTheDocument();
  });

  /**
   * @description 異なるオプションが正しく表示される
   */
  it('displays different options correctly', () => {
    const options1 = [{ value: 'val1', label: 'ラベル1' }];
    render(<Select {...defaultProps} options={options1} />);
    expect(screen.getByText('ラベル1')).toBeInTheDocument();

    const options2 = [{ value: 'val2', label: 'ラベル2' }];
    render(<Select {...defaultProps} options={options2} />);
    expect(screen.getByText('ラベル2')).toBeInTheDocument();
  });

  /**
   * @description コンポーネントの基本構造が正しい
   */
  it('has correct component structure', () => {
    render(<Select {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    const select = screen.getByRole('combobox');

    expect(label.tagName).toBe('LABEL');
    expect(select.tagName).toBe('SELECT');
  });

  /**
   * @description アクセシビリティ属性が正しく設定される
   */
  it('has correct accessibility attributes', () => {
    render(<Select {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    const select = screen.getByRole('combobox');

    expect(label).toHaveAttribute('for', 'select-test-select');
    expect(select).toHaveAttribute('id', 'select-test-select');
  });

  /**
   * @description 動的なプロパティ変更が正しく反映される
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(
      <Select {...defaultProps} value='option1' onChange={() => {}} />
    );

    // 初期状態
    let select = screen.getByRole('combobox');
    expect(select).toHaveValue('option1');

    // 値変更
    rerender(<Select {...defaultProps} value='option3' onChange={() => {}} />);
    select = screen.getByRole('combobox');
    expect(select).toHaveValue('option3');
  });

  /**
   * @description オプションリストの動的変更が正しく反映される
   */
  it('reflects dynamic options changes correctly', () => {
    const { rerender } = render(<Select {...defaultProps} />);

    // 初期状態
    expect(screen.getByText('オプション1')).toBeInTheDocument();

    // オプション変更
    const newOptions = [{ value: 'new1', label: '新しいオプション1' }];
    rerender(<Select {...defaultProps} options={newOptions} />);
    expect(screen.getByText('新しいオプション1')).toBeInTheDocument();
    expect(screen.queryByText('オプション1')).not.toBeInTheDocument();
  });

  /**
   * @description エラー状態の動的変更が正しく反映される
   */
  it('reflects dynamic error state changes correctly', () => {
    const { rerender } = render(<Select {...defaultProps} />);

    // 初期状態（エラーなし）
    expect(screen.queryByText('エラーメッセージ')).not.toBeInTheDocument();

    // エラー状態に変更
    rerender(<Select {...defaultProps} error='エラーメッセージ' />);
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
  });

  /**
   * @description オプションの値とラベルが正しい
   */
  it('has correct option values and labels', () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole('combobox');
    const options = Array.from(select.children) as HTMLOptionElement[];

    expect(options[0]).toHaveValue('option1');
    expect(options[0]).toHaveTextContent('オプション1');
    expect(options[1]).toHaveValue('option2');
    expect(options[1]).toHaveTextContent('オプション2');
  });
});
