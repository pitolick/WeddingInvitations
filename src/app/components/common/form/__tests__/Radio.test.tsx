/**
 * @description Radioコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Radio from '../Radio';

/**
 * @description Radioコンポーネントの基本表示テスト
 */
describe('Radio Component', () => {
  const defaultProps = {
    label: 'テストラベル',
    name: 'test-radio',
    options: [
      { value: 'option1', label: 'オプション1' },
      { value: 'option2', label: 'オプション2' },
      { value: 'option3', label: 'オプション3' },
    ],
  };

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders radio component correctly', () => {
    render(<Radio {...defaultProps} />);

    const radioGroup = screen.getByRole('radiogroup');
    const label = screen.getByText('テストラベル');
    const radioButtons = screen.getAllByRole('radio');

    expect(radioGroup).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(radioButtons).toHaveLength(3);
  });

  /**
   * @description ラベルが正しく表示される
   */
  it('displays label correctly', () => {
    render(<Radio {...defaultProps} />);

    const label = screen.getByText('テストラベル');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm', 'font-medium', 'text-gray-700');
  });

  /**
   * @description ラジオボタンが正しく表示される
   */
  it('displays radio buttons correctly', () => {
    render(<Radio {...defaultProps} />);

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);

    radioButtons.forEach((radio, index) => {
      expect(radio).toHaveAttribute('name', 'test-radio');
      expect(radio).toHaveAttribute('value', `option${index + 1}`);
    });
  });

  /**
   * @description オプションラベルが正しく表示される
   */
  it('displays option labels correctly', () => {
    render(<Radio {...defaultProps} />);

    expect(screen.getByText('オプション1')).toBeInTheDocument();
    expect(screen.getByText('オプション2')).toBeInTheDocument();
    expect(screen.getByText('オプション3')).toBeInTheDocument();
  });

  /**
   * @description デフォルトのスタイリングが正しく適用される
   */
  it('has correct default styling', () => {
    render(<Radio {...defaultProps} />);

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toHaveClass(
        'mt-1',
        'h-4',
        'w-4',
        'text-lavender-600',
        'border-gray-300',
        'focus:ring-lavender-500',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      );
    });
  });

  /**
   * @description エラー状態のスタイリングが正しく適用される
   */
  it('applies error state styling correctly', () => {
    render(<Radio {...defaultProps} error='エラーメッセージ' />);

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toHaveClass(
        'mt-1',
        'h-4',
        'w-4',
        'text-lavender-600',
        'border-gray-300',
        'focus:ring-lavender-500',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      );
    });
  });

  /**
   * @description エラーメッセージが正しく表示される
   */
  it('displays error message correctly', () => {
    render(<Radio {...defaultProps} error='エラーメッセージ' />);

    const errorMessage = screen.getByText('エラーメッセージ');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('font-noto', 'text-sm', 'text-pink-600');
  });

  /**
   * @description 必須項目の表示が正しい
   */
  it('shows required field correctly', () => {
    render(<Radio {...defaultProps} required />);

    const label = screen.getByText('テストラベル');
    expect(label).toHaveTextContent('テストラベル*');
  });

  /**
   * @description 必須項目のスタイリングが正しい
   */
  it('has correct required field styling', () => {
    render(<Radio {...defaultProps} required />);

    const requiredMark = screen.getByText('*');
    expect(requiredMark).toHaveClass('text-pink-500', 'ml-1');
  });

  /**
   * @description 選択値が正しく設定される
   */
  it('sets selected value correctly', () => {
    render(<Radio {...defaultProps} value='option2' onChange={() => {}} />);

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[1]).toBeChecked();
    expect(radioButtons[0]).not.toBeChecked();
    expect(radioButtons[2]).not.toBeChecked();
  });

  /**
   * @description 選択値の変更が正しく処理される
   */
  it('handles selection changes correctly', () => {
    const handleChange = jest.fn();
    render(<Radio {...defaultProps} onChange={handleChange} />);

    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[1]);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  /**
   * @description フォーカス状態のスタイリングが正しい
   */
  it('has correct focus state styling', () => {
    render(<Radio {...defaultProps} />);

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toHaveClass('focus:ring-lavender-500');
    });
  });

  /**
   * @description 無効状態のスタイリングが正しい
   */
  it('has correct disabled state styling', () => {
    render(<Radio {...defaultProps} disabled />);

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toBeDisabled();
      expect(radio).toHaveClass(
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      );
    });
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    render(<Radio {...defaultProps} className='custom-class' />);

    // custom-classは外側のdivに適用される
    const container = screen.getByRole('radiogroup').parentElement;
    expect(container).toHaveClass('space-y-3', 'custom-class');

    // radiogroupにはspace-y-2が適用される
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('space-y-2');
  });

  /**
   * @description 横並びレイアウトが正しく適用される
   */
  it('applies horizontal layout correctly', () => {
    render(<Radio {...defaultProps} layout='horizontal' />);

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('flex', 'flex-row', 'gap-4');
  });

  /**
   * @description 垂直レイアウトが正しく適用される
   */
  it('applies vertical layout correctly', () => {
    render(<Radio {...defaultProps} />);

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('space-y-2');
  });

  /**
   * @description 空のオプションリストが正しく処理される
   */
  it('handles empty options list correctly', () => {
    render(<Radio {...defaultProps} options={[]} />);

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toBeInTheDocument();
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
  });

  /**
   * @description 複数のインスタンスが正しく表示される
   */
  it('renders multiple instances correctly', () => {
    render(
      <div>
        <Radio {...defaultProps} name='radio1' />
        <Radio {...defaultProps} name='radio2' />
        <Radio {...defaultProps} name='radio3' />
      </div>
    );

    const radioGroups = screen.getAllByRole('radiogroup');
    expect(radioGroups).toHaveLength(3);
  });

  /**
   * @description 異なるラベルが正しく表示される
   */
  it('displays different labels correctly', () => {
    render(<Radio {...defaultProps} label='ラベル1' />);
    expect(screen.getByText('ラベル1')).toBeInTheDocument();

    render(<Radio {...defaultProps} label='ラベル2' />);
    expect(screen.getByText('ラベル2')).toBeInTheDocument();
  });

  /**
   * @description 異なるオプションが正しく表示される
   */
  it('displays different options correctly', () => {
    const options1 = [{ value: 'val1', label: 'ラベル1' }];
    render(<Radio {...defaultProps} options={options1} />);
    expect(screen.getByText('ラベル1')).toBeInTheDocument();

    const options2 = [{ value: 'val2', label: 'ラベル2' }];
    render(<Radio {...defaultProps} options={options2} />);
    expect(screen.getByText('ラベル2')).toBeInTheDocument();
  });

  /**
   * @description コンポーネントの基本構造が正しい
   */
  it('has correct component structure', () => {
    render(<Radio {...defaultProps} />);

    const radioGroup = screen.getByRole('radiogroup');
    const radioButtons = screen.getAllByRole('radio');

    expect(radioGroup.tagName).toBe('DIV');
    expect(radioButtons).toHaveLength(3);
    radioButtons.forEach(radio => {
      expect(radio.tagName).toBe('INPUT');
    });
  });

  /**
   * @description アクセシビリティ属性が正しく設定される
   */
  it('has correct accessibility attributes', () => {
    render(<Radio {...defaultProps} />);

    const radioGroup = screen.getByRole('radiogroup');
    const radioButtons = screen.getAllByRole('radio');

    expect(radioGroup).toHaveAttribute('aria-labelledby');
    // aria-describedbyはerrorプロパティがある場合のみ追加される
    expect(radioGroup).not.toHaveAttribute('aria-describedby');
    expect(radioGroup).toHaveAttribute('aria-invalid', 'false');
    radioButtons.forEach(radio => {
      expect(radio).toHaveAttribute('name');
    });
  });

  /**
   * @description 動的なプロパティ変更が正しく反映される
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(
      <Radio {...defaultProps} value='option1' onChange={() => {}} />
    );

    // 初期状態
    let radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).toBeChecked();

    // 値変更
    rerender(<Radio {...defaultProps} value='option3' onChange={() => {}} />);
    radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[2]).toBeChecked();
    expect(radioButtons[0]).not.toBeChecked();
  });

  /**
   * @description オプションリストの動的変更が正しく反映される
   */
  it('reflects dynamic options changes correctly', () => {
    const { rerender } = render(<Radio {...defaultProps} />);

    // 初期状態
    expect(screen.getByText('オプション1')).toBeInTheDocument();

    // オプション変更
    const newOptions = [{ value: 'new1', label: '新しいオプション1' }];
    rerender(<Radio {...defaultProps} options={newOptions} />);
    expect(screen.getByText('新しいオプション1')).toBeInTheDocument();
    expect(screen.queryByText('オプション1')).not.toBeInTheDocument();
  });

  /**
   * @description エラー状態の動的変更が正しく反映される
   */
  it('reflects dynamic error state changes correctly', () => {
    const { rerender } = render(<Radio {...defaultProps} />);

    // 初期状態（エラーなし）
    expect(screen.queryByText('エラーメッセージ')).not.toBeInTheDocument();

    // エラー状態に変更
    rerender(<Radio {...defaultProps} error='エラーメッセージ' />);
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
  });

  /**
   * @description 動的なレイアウト変更が正しく反映される
   */
  it('reflects dynamic layout changes correctly', () => {
    const { rerender } = render(<Radio {...defaultProps} />);

    // 初期状態（縦並び）
    let radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('space-y-2');

    // 横並びに変更
    rerender(<Radio {...defaultProps} layout='horizontal' />);
    radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('flex', 'flex-row', 'gap-4');
    expect(radioGroup).not.toHaveClass('space-y-2');
  });

  /**
   * @description オプションの値とラベルが正しい
   */
  it('has correct option values and labels', () => {
    render(<Radio {...defaultProps} />);

    const radioButtons = screen.getAllByRole('radio');
    const optionLabels = screen.getAllByText(/オプション/);

    expect(radioButtons[0]).toHaveAttribute('value', 'option1');
    expect(optionLabels[0]).toHaveTextContent('オプション1');
    expect(radioButtons[1]).toHaveAttribute('value', 'option2');
    expect(optionLabels[1]).toHaveTextContent('オプション2');
  });
});
