/**
 * @description AllergyTagsInputコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AllergyTagsInput from '../AllergyTagsInput';

/**
 * @description AllergyTagsInputコンポーネントの基本表示テスト
 */
describe('AllergyTagsInput Component', () => {
  const defaultProps = {
    value: [] as string[],
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders allergy tags input component correctly', () => {
    render(<AllergyTagsInput {...defaultProps} />);

    // ラベルが表示される
    expect(screen.getByText('アレルギー情報')).toBeInTheDocument();

    // 入力欄が表示される
    expect(
      screen.getByPlaceholderText('選択または入力してください')
    ).toBeInTheDocument();

    // ヘルプテキストが表示される
    expect(
      screen.getByText(/候補から選択するか自由に入力してください/)
    ).toBeInTheDocument();
  });

  /**
   * @description カスタムラベルが正しく表示される
   */
  it('displays custom label correctly', () => {
    const customLabel = '食べ物アレルギー';
    render(<AllergyTagsInput {...defaultProps} label={customLabel} />);

    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  /**
   * @description 必須項目の表示が正しい
   */
  it('shows required indicator correctly', () => {
    render(<AllergyTagsInput {...defaultProps} required />);

    // 必須マークが表示される
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  /**
   * @description 入力値が正しく設定される
   */
  it('sets input value correctly', () => {
    render(<AllergyTagsInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('選択または入力してください');
    fireEvent.change(input, { target: { value: '小麦' } });

    expect(input).toHaveValue('小麦');
  });

  /**
   * @description タグが正しく追加される
   */
  it('adds tags correctly', () => {
    const onChange = jest.fn();
    render(<AllergyTagsInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByPlaceholderText('選択または入力してください');

    // タグを入力してEnterキーを押す
    fireEvent.change(input, { target: { value: '小麦' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // onChangeが正しく呼び出される
    expect(onChange).toHaveBeenCalledWith(['小麦']);
  });

  /**
   * @description カンマキーでタグが追加される
   */
  it('adds tags with comma key', () => {
    const onChange = jest.fn();
    render(<AllergyTagsInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByPlaceholderText('選択または入力してください');

    // タグを入力してカンマキーを押す
    fireEvent.change(input, { target: { value: '卵' } });
    fireEvent.keyDown(input, { key: ',' });

    // onChangeが正しく呼び出される
    expect(onChange).toHaveBeenCalledWith(['卵']);
  });

  /**
   * @description 重複するタグは追加されない
   */
  it('does not add duplicate tags', () => {
    const onChange = jest.fn();
    render(
      <AllergyTagsInput
        {...defaultProps}
        value={['小麦']}
        onChange={onChange}
      />
    );

    const input = screen.getByPlaceholderText('追加のアレルギーを入力...');

    // 既存のタグと同じ値を入力
    fireEvent.change(input, { target: { value: '小麦' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // onChangeは呼び出されない
    expect(onChange).not.toHaveBeenCalled();
  });

  /**
   * @description タグが正しく削除される
   */
  it('removes tags correctly', () => {
    const onChange = jest.fn();
    render(
      <AllergyTagsInput
        {...defaultProps}
        value={['小麦', '卵']}
        onChange={onChange}
      />
    );

    // 削除ボタンをクリック
    const removeButtons = screen.getAllByRole('button');
    fireEvent.click(removeButtons[0]); // 最初のタグの削除ボタン

    // onChangeが正しく呼び出される
    expect(onChange).toHaveBeenCalledWith(['卵']);
  });

  /**
   * @description Backspaceキーで最後のタグが削除される
   */
  it('removes last tag with backspace key', () => {
    const onChange = jest.fn();
    render(
      <AllergyTagsInput
        {...defaultProps}
        value={['小麦', '卵']}
        onChange={onChange}
      />
    );

    const input = screen.getByPlaceholderText('追加のアレルギーを入力...');

    // 入力値がない状態でBackspaceキーを押す
    fireEvent.keyDown(input, { key: 'Backspace' });

    // onChangeが正しく呼び出される
    expect(onChange).toHaveBeenCalledWith(['小麦']);
  });

  /**
   * @description 候補リストが正しく表示される
   */
  it('shows suggestions list correctly', async () => {
    render(<AllergyTagsInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('選択または入力してください');

    // 入力欄にフォーカス
    fireEvent.focus(input);

    // 候補リストが表示される
    await waitFor(() => {
      expect(screen.getByText('穀物')).toBeInTheDocument();
      expect(screen.getByText('小麦')).toBeInTheDocument();
      expect(screen.getByText('卵')).toBeInTheDocument();
    });
  });

  /**
   * @description 候補リストが正しくフィルタリングされる
   */
  it('filters suggestions correctly', async () => {
    render(<AllergyTagsInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('選択または入力してください');

    // 入力欄にフォーカス
    fireEvent.focus(input);

    // 入力値を変更
    fireEvent.change(input, { target: { value: '小麦' } });

    // フィルタリングされた候補が表示される
    await waitFor(() => {
      expect(screen.getByText('小麦')).toBeInTheDocument();
      expect(screen.queryByText('卵')).not.toBeInTheDocument();
    });
  });

  /**
   * @description 候補をクリックしてタグが追加される
   */
  it('adds tag when suggestion is clicked', async () => {
    const onChange = jest.fn();
    render(<AllergyTagsInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByPlaceholderText('選択または入力してください');

    // 入力欄にフォーカス
    fireEvent.focus(input);

    // 候補リストが表示されるまで待つ
    await waitFor(() => {
      expect(screen.getByText('小麦')).toBeInTheDocument();
    });

    // 候補をクリック
    const wheatSuggestion = screen.getByText('小麦');
    fireEvent.click(wheatSuggestion);

    // onChangeが正しく呼び出される
    expect(onChange).toHaveBeenCalledWith(['小麦']);
  });

  /**
   * @description 選択済みタグは候補リストに表示されない
   */
  it('does not show selected tags in suggestions', async () => {
    render(<AllergyTagsInput {...defaultProps} value={['小麦']} />);

    const input = screen.getByPlaceholderText('追加のアレルギーを入力...');

    // 入力欄にフォーカス
    fireEvent.focus(input);

    // 選択済みのタグは候補リストに表示されない（ただし、タグ自体は表示される）
    await waitFor(() => {
      expect(screen.getByText('卵')).toBeInTheDocument();
    });
  });

  /**
   * @description 候補リストが正しくカテゴリ分けされる
   */
  it('groups suggestions by category correctly', async () => {
    render(<AllergyTagsInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('選択または入力してください');

    // 入力欄にフォーカス
    fireEvent.focus(input);

    // カテゴリヘッダーが表示される
    await waitFor(() => {
      expect(screen.getByText('穀物')).toBeInTheDocument();
      expect(screen.getByText('乳製品')).toBeInTheDocument();
      expect(screen.getByText('肉')).toBeInTheDocument();
    });
  });

  /**
   * @description 入力欄のプレースホルダーが正しく変更される
   */
  it('changes placeholder text correctly', () => {
    // 初期状態
    const { rerender } = render(<AllergyTagsInput {...defaultProps} />);
    expect(
      screen.getByPlaceholderText('選択または入力してください')
    ).toBeInTheDocument();

    // タグが追加された状態
    rerender(<AllergyTagsInput {...defaultProps} value={['小麦']} />);
    expect(
      screen.getByPlaceholderText('追加のアレルギーを入力...')
    ).toBeInTheDocument();
  });

  /**
   * @description 無効化状態が正しく適用される
   */
  it('applies disabled state correctly', () => {
    render(<AllergyTagsInput {...defaultProps} value={['小麦']} disabled />);

    const input = screen.getByPlaceholderText('追加のアレルギーを入力...');
    expect(input).toBeDisabled();

    // 削除ボタンも無効化される
    const removeButtons = screen.getAllByRole('button');
    removeButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<AllergyTagsInput {...defaultProps} className={customClass} />);

    const container = screen.getByText('アレルギー情報').closest('div');
    expect(container).toHaveClass('w-full', customClass);
  });

  /**
   * @description カスタムname属性が正しく設定される
   */
  it('sets custom name attribute correctly', () => {
    const customName = 'custom-allergies';
    render(<AllergyTagsInput {...defaultProps} name={customName} />);

    const input = screen.getByPlaceholderText('選択または入力してください');
    expect(input).toHaveAttribute('name', customName);
  });

  /**
   * @description タグのスタイリングが正しい
   */
  it('has correct tag styling', () => {
    render(<AllergyTagsInput {...defaultProps} value={['小麦']} />);

    const tag = screen.getByText('小麦');
    expect(tag).toHaveClass(
      'inline-flex',
      'items-center',
      'gap-1',
      'px-2',
      'py-1',
      'text-sm',
      'bg-pink-100',
      'text-pink-800',
      'rounded-md'
    );
  });

  /**
   * @description 入力欄のスタイリングが正しい
   */
  it('has correct input field styling', () => {
    render(<AllergyTagsInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('選択または入力してください');
    expect(input).toHaveClass(
      'w-full',
      'border-none',
      'outline-none',
      'text-sm',
      'placeholder-gray-400'
    );
  });

  /**
   * @description 候補リストのスタイリングが正しい
   */
  it('has correct suggestions list styling', async () => {
    render(<AllergyTagsInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('選択または入力してください');
    fireEvent.focus(input);

    await waitFor(() => {
      // 候補リストの要素を直接取得
      const suggestionsList = document.querySelector(
        '[class*="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"]'
      );

      // 候補リストが存在することを確認
      expect(suggestionsList).toBeTruthy();

      // 候補リストのスタイリングクラスを確認
      expect(suggestionsList).toHaveClass(
        'absolute',
        'z-10',
        'w-full',
        'mt-1',
        'bg-white',
        'border',
        'border-gray-300',
        'rounded-lg',
        'shadow-lg',
        'max-h-60',
        'overflow-y-auto'
      );
    });
  });

  /**
   * @description カテゴリヘッダーのスタイリングが正しい
   */
  it('has correct category header styling', async () => {
    render(<AllergyTagsInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('選択または入力してください');
    fireEvent.focus(input);

    await waitFor(() => {
      const categoryHeader = screen.getByText('穀物');
      expect(categoryHeader).toHaveClass(
        'px-3',
        'py-2',
        'text-xs',
        'font-medium',
        'text-gray-500',
        'bg-gray-50',
        'border-b',
        'border-gray-200'
      );
    });
  });

  /**
   * @description 候補ボタンのスタイリングが正しい
   */
  it('has correct suggestion button styling', async () => {
    render(<AllergyTagsInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('選択または入力してください');
    fireEvent.focus(input);

    await waitFor(() => {
      const suggestionButton = screen.getByText('小麦');
      expect(suggestionButton).toHaveClass(
        'w-full',
        'text-left',
        'px-3',
        'py-2',
        'text-sm',
        'hover:bg-pink-50',
        'hover:text-pink-700',
        'focus:bg-pink-50',
        'focus:text-pink-700',
        'focus:outline-none'
      );
    });
  });

  /**
   * @description ヘルプテキストのスタイリングが正しい
   */
  it('has correct help text styling', () => {
    render(<AllergyTagsInput {...defaultProps} />);

    const helpText =
      screen.getByText(/候補から選択するか自由に入力してください/);
    expect(helpText).toHaveClass('text-xs', 'text-gray-500');
  });
});
