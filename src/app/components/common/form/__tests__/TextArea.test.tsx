/**
 * @description TextAreaコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '../TextArea';

/**
 * @description TextAreaコンポーネントの基本表示テスト
 */
describe('TextArea Component', () => {
  const defaultProps = {
    label: 'テストラベル',
    name: 'test-textarea',
    placeholder: 'テストプレースホルダー',
  };

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders textarea component correctly', () => {
    render(<TextArea {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    const label = screen.getByText('テストラベル');

    expect(textarea).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  /**
   * @description ラベルが正しく表示される
   */
  it('displays label correctly', () => {
    render(<TextArea {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm', 'font-medium', 'text-gray-700');
  });

  /**
   * @description テキストエリアが正しく表示される
   */
  it('displays textarea field correctly', () => {
    render(<TextArea {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('name', 'test-textarea');
    expect(textarea).toHaveAttribute('placeholder', 'テストプレースホルダー');
  });

  /**
   * @description デフォルトのスタイリングが正しく適用される
   */
  it('has correct default styling', () => {
    render(<TextArea {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
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
      'resize-vertical'
    );
  });

  /**
   * @description エラー状態のスタイリングが正しく適用される
   */
  it('applies error state styling correctly', () => {
    render(<TextArea {...defaultProps} error='エラーメッセージ' />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
      'border-pink-500',
      'focus:ring-pink-500',
      'focus:border-pink-500'
    );
  });

  /**
   * @description エラーメッセージが正しく表示される
   */
  it('displays error message correctly', () => {
    render(<TextArea {...defaultProps} error='エラーメッセージ' />);

    const errorMessage = screen.getByText('エラーメッセージ');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('font-noto', 'text-sm', 'text-pink-600');
  });

  /**
   * @description 必須項目の表示が正しい
   */
  it('shows required field correctly', () => {
    render(<TextArea {...defaultProps} required />);

    const label = screen.getByText('テストラベル');
    expect(label).toHaveTextContent('テストラベル*');
  });

  /**
   * @description 必須項目のスタイリングが正しい
   */
  it('has correct required field styling', () => {
    render(<TextArea {...defaultProps} required />);

    const requiredMark = screen.getByText('*');
    expect(requiredMark).toHaveClass('text-pink-500', 'ml-1');
  });

  /**
   * @description 入力値が正しく設定される
   */
  it('sets input value correctly', () => {
    render(<TextArea {...defaultProps} value='テスト値' onChange={() => {}} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('テスト値');
  });

  /**
   * @description 入力値の変更が正しく処理される
   */
  it('handles input value changes correctly', () => {
    const handleChange = jest.fn();
    render(<TextArea {...defaultProps} onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '新しい値' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  /**
   * @description フォーカス状態のスタイリングが正しい
   */
  it('has correct focus state styling', () => {
    render(<TextArea {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
      'focus:ring-lavender-500',
      'focus:border-lavender-500'
    );
  });

  /**
   * @description 無効状態のスタイリングが正しい
   */
  it('has correct disabled state styling', () => {
    render(<TextArea {...defaultProps} disabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });

  /**
   * @description 読み取り専用状態のスタイリングが正しい
   */
  it('has correct read-only state styling', () => {
    render(<TextArea {...defaultProps} readOnly />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveClass('read-only:bg-gray-50');
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    render(<TextArea {...defaultProps} className='custom-class' />);

    const container = screen.getByText('テストラベル').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  /**
   * @description 行数が正しく設定される
   */
  it('sets rows correctly', () => {
    render(<TextArea {...defaultProps} rows={5} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  /**
   * @description デフォルトの行数が正しい
   */
  it('has correct default rows', () => {
    render(<TextArea {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '4');
  });

  /**
   * @description 最大文字数が正しく設定される
   */
  it('sets maxLength correctly', () => {
    render(<TextArea {...defaultProps} maxLength={100} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  /**
   * @description 複数のインスタンスが正しく表示される
   */
  it('renders multiple instances correctly', () => {
    render(
      <div>
        <TextArea {...defaultProps} name='textarea1' />
        <TextArea {...defaultProps} name='textarea2' />
        <TextArea {...defaultProps} name='textarea3' />
      </div>
    );

    const textareas = screen.getAllByRole('textbox');
    expect(textareas).toHaveLength(3);
  });

  /**
   * @description 異なるラベルが正しく表示される
   */
  it('displays different labels correctly', () => {
    render(<TextArea {...defaultProps} label='ラベル1' />);
    expect(screen.getByText('ラベル1')).toBeInTheDocument();

    render(<TextArea {...defaultProps} label='ラベル2' />);
    expect(screen.getByText('ラベル2')).toBeInTheDocument();
  });

  /**
   * @description 異なるプレースホルダーが正しく設定される
   */
  it('sets different placeholders correctly', () => {
    render(<TextArea {...defaultProps} placeholder='プレースホルダー1' />);
    expect(
      screen.getByPlaceholderText('プレースホルダー1')
    ).toBeInTheDocument();

    render(<TextArea {...defaultProps} placeholder='プレースホルダー2' />);
    expect(
      screen.getByPlaceholderText('プレースホルダー2')
    ).toBeInTheDocument();
  });

  /**
   * @description コンポーネントの基本構造が正しい
   */
  it('has correct component structure', () => {
    render(<TextArea {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    const textarea = screen.getByRole('textbox');

    expect(label.tagName).toBe('LABEL');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  /**
   * @description アクセシビリティ属性が正しく設定される
   */
  it('has correct accessibility attributes', () => {
    render(<TextArea {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    const textarea = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for', 'textarea-test-textarea');
    expect(textarea).toHaveAttribute('id', 'textarea-test-textarea');
  });

  /**
   * @description 動的なプロパティ変更が正しく反映される
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(
      <TextArea {...defaultProps} value='初期値' onChange={() => {}} />
    );

    // 初期状態
    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('初期値');

    // 値変更
    rerender(<TextArea {...defaultProps} value='更新値' onChange={() => {}} />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('更新値');
  });

  /**
   * @description エラー状態の動的変更が正しく反映される
   */
  it('reflects dynamic error state changes correctly', () => {
    const { rerender } = render(<TextArea {...defaultProps} />);

    // 初期状態（エラーなし）
    expect(screen.queryByText('エラーメッセージ')).not.toBeInTheDocument();

    // エラー状態に変更
    rerender(<TextArea {...defaultProps} error='エラーメッセージ' />);
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
  });

  /**
   * @description 行数の動的変更が正しく反映される
   */
  it('reflects dynamic rows changes correctly', () => {
    const { rerender } = render(<TextArea {...defaultProps} rows={3} />);

    // 初期状態
    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '3');

    // 行数変更
    rerender(<TextArea {...defaultProps} rows={5} />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  /**
   * @description 長いテキストが正しく表示される
   */
  it('displays long text correctly', () => {
    const longText = 'これは非常に長いテキストです。'.repeat(10);
    render(<TextArea {...defaultProps} value={longText} onChange={() => {}} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(longText);
  });

  /**
   * @description 改行文字が正しく処理される
   */
  it('handles line breaks correctly', () => {
    const textWithLineBreaks = '1行目\n2行目\n3行目';
    render(
      <TextArea
        {...defaultProps}
        value={textWithLineBreaks}
        onChange={() => {}}
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(textWithLineBreaks);
  });

  /**
   * @description 特殊文字が正しく処理される
   */
  it('handles special characters correctly', () => {
    const specialText = '特殊文字: !@#$%^&*()_+-=[]{}|;:,.<>?';
    render(
      <TextArea {...defaultProps} value={specialText} onChange={() => {}} />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(specialText);
  });
});
