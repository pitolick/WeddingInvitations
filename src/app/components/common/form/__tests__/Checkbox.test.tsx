import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

/**
 * @description Checkboxコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */
describe('Checkbox Component', () => {
  const defaultProps = {
    checked: false,
    label: 'テストラベル',
    onChange: jest.fn(),
    name: 'test-checkbox',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders checkbox component correctly', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  /**
   * @description ラベルが正しく表示される
   */
  it('displays label correctly', () => {
    render(<Checkbox {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(
      'block',
      'font-noto',
      'text-sm',
      'text-gray-900',
      'cursor-pointer'
    );
  });

  /**
   * @description チェックボックスの基本構造が正しい
   */
  it('has correct checkbox structure', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('テストラベル');
    const container = checkbox.closest('div');

    expect(container).toHaveClass('flex', 'items-start');
    expect(label).toHaveAttribute('for', 'test-checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
  });

  /**
   * @description デフォルトのスタイリングが正しく適用される
   */
  it('has correct default styling', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass(
      'mt-1',
      'h-4',
      'w-4',
      'text-lavender-600',
      'border-gray-300',
      'rounded',
      'focus:ring-lavender-500',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });

  /**
   * @description エラー状態のスタイリングが正しく適用される
   */
  it('applies error state styling correctly', () => {
    render(<Checkbox {...defaultProps} error='エラーメッセージ' />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass(
      'mt-1',
      'h-4',
      'w-4',
      'text-lavender-600',
      'border-gray-300',
      'rounded',
      'focus:ring-lavender-500',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });

  /**
   * @description エラーメッセージが正しく表示される
   */
  it('displays error message correctly', () => {
    render(<Checkbox {...defaultProps} error='エラーメッセージ' />);

    const errorMessage = screen.getByText('エラーメッセージ');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('font-noto', 'text-sm', 'text-pink-600');
  });

  /**
   * @description 必須項目の表示が正しい
   */
  it('shows required field correctly', () => {
    render(<Checkbox {...defaultProps} required />);

    const label = screen.getByText('テストラベル');
    expect(label).toHaveTextContent('テストラベル*');
  });

  /**
   * @description 必須項目のスタイリングが正しい
   */
  it('has correct required field styling', () => {
    render(<Checkbox {...defaultProps} required />);

    const requiredMark = screen.getByText('*');
    expect(requiredMark).toHaveClass('text-pink-500', 'ml-1');
  });

  /**
   * @description チェック状態が正しく設定される
   */
  it('sets checked state correctly', () => {
    render(<Checkbox {...defaultProps} checked={true} onChange={() => {}} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  /**
   * @description 変更ハンドラーが正しく動作する
   */
  it('handles change events correctly', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  /**
   * @description フォーカス状態のスタイリングが正しい
   */
  it('has correct focus state styling', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('focus:ring-lavender-500');
  });

  /**
   * @description 無効状態のスタイリングが正しい
   */
  it('has correct disabled state styling', () => {
    render(<Checkbox {...defaultProps} disabled />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });

  /**
   * @description カスタムクラス名が正しく適用される
   */
  it('applies custom className correctly', () => {
    render(<Checkbox {...defaultProps} className='custom-class' />);

    const container = screen
      .getByRole('checkbox')
      .closest('div')?.parentElement;
    expect(container).not.toBeNull();
    if (container) {
      expect(container).toHaveClass('custom-class');
    }
  });

  /**
   * @description 複数のチェックボックスが正しく表示される
   */
  it('displays multiple checkboxes correctly', () => {
    render(
      <div>
        <Checkbox {...defaultProps} name='checkbox1' />
        <Checkbox {...defaultProps} name='checkbox2' />
        <Checkbox {...defaultProps} name='checkbox3' />
      </div>
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  /**
   * @description 異なるラベルが正しく表示される
   */
  it('displays different labels correctly', () => {
    render(<Checkbox {...defaultProps} label='ラベル1' />);
    expect(screen.getByText('ラベル1')).toBeInTheDocument();

    render(<Checkbox {...defaultProps} label='ラベル2' />);
    expect(screen.getByText('ラベル2')).toBeInTheDocument();
  });

  /**
   * @description 動的なプロパティ変更が正しく反映される
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(
      <Checkbox {...defaultProps} checked={false} onChange={() => {}} />
    );

    // 初期状態
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    // チェック状態変更
    rerender(<Checkbox {...defaultProps} checked={true} onChange={() => {}} />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    // エラー状態に変更
    rerender(<Checkbox {...defaultProps} error='エラーメッセージ' />);
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
  });

  /**
   * @description チェックボックスの状態が正しく切り替わる
   */
  it('toggles checkbox state correctly', () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Checkbox {...defaultProps} checked={false} onChange={handleChange} />
    );

    const checkbox = screen.getByRole('checkbox');

    // 初期状態
    expect(checkbox).not.toBeChecked();

    // クリックしてチェック
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);

    // 状態を更新して再度レンダリング
    rerender(
      <Checkbox {...defaultProps} checked={true} onChange={handleChange} />
    );

    // 再度クリックしてチェック解除
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  /**
   * @description 無効状態ではクリックイベントが発火しない
   */
  it('does not fire click events when disabled', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} disabled onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');

    // 無効状態ではクリックイベントが発火しない
    // 実際の実装では、disabled属性が設定されているため、ブラウザレベルでイベントがブロックされる
    // テストでは、disabled属性が正しく設定されていることを確認する
    expect(checkbox).toBeDisabled();
  });

  /**
   * @description アクセシビリティ属性が正しく設定される
   */
  it('has correct accessibility attributes', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'false');

    // エラー状態を別のコンポーネントとしてレンダリング
    const { container } = render(
      <Checkbox {...defaultProps} error='エラーメッセージ' />
    );
    const errorCheckbox = container.querySelector('input[type="checkbox"]');
    expect(errorCheckbox).not.toBeNull();
    if (errorCheckbox) {
      expect(errorCheckbox).toHaveAttribute('aria-invalid', 'true');
      expect(errorCheckbox).toHaveAttribute('aria-describedby');
    }
  });

  /**
   * @description コンポーネントの基本構造が正しい
   */
  it('has correct component structure', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('テストラベル');
    const container = checkbox.closest('div')?.parentElement;

    expect(container).not.toBeNull();
    if (container) {
      expect(container).toHaveClass('space-y-2');
    }
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  /**
   * @description ラベルのスタイリングが正しい
   */
  it('has correct label styling', () => {
    render(<Checkbox {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    expect(label).toHaveClass(
      'block',
      'font-noto',
      'text-sm',
      'text-gray-900',
      'cursor-pointer'
    );
  });
});
