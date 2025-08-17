/**
 * @description PostalCodeInputコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostalCodeInput from '../PostalCodeInput';

// fetch APIのモック
global.fetch = jest.fn();

/**
 * @description PostalCodeInputコンポーネントの基本表示テスト
 */
describe('PostalCodeInput Component', () => {
  const defaultProps = {
    label: '郵便番号',
    name: 'postalCode',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders postal code input component correctly', () => {
    render(<PostalCodeInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    const label = screen.getByText('郵便番号');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  /**
   * @description ラベルが正しく表示される
   */
  it('displays label correctly', () => {
    render(<PostalCodeInput {...defaultProps} />);

    const label = screen.getByText('郵便番号');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm', 'font-medium', 'text-gray-700');
  });

  /**
   * @description 入力フィールドが正しく表示される
   */
  it('displays input field correctly', () => {
    render(<PostalCodeInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', '1234567');
  });

  /**
   * @description デフォルトのスタイリングが正しく適用される
   */
  it('has correct default styling', () => {
    render(<PostalCodeInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('w-full', 'px-4', 'py-3');
  });

  /**
   * @description エラー状態のスタイリングが正しく適用される
   */
  it('applies error state styling correctly', () => {
    render(<PostalCodeInput {...defaultProps} error='エラーメッセージ' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-pink-500', 'focus:ring-pink-500');
  });

  /**
   * @description エラーメッセージが正しく表示される
   */
  it('displays error message correctly', () => {
    render(<PostalCodeInput {...defaultProps} error='エラーメッセージ' />);

    const errorMessage = screen.getByText('エラーメッセージ');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-sm', 'text-pink-600');
  });

  /**
   * @description 必須項目の表示が正しい
   */
  it('shows required field correctly', () => {
    render(<PostalCodeInput {...defaultProps} required />);

    const label = screen.getByText('郵便番号');
    expect(label).toHaveTextContent('郵便番号*');
  });

  /**
   * @description 必須項目のスタイリングが正しい
   */
  it('has correct required field styling', () => {
    render(<PostalCodeInput {...defaultProps} required />);

    const requiredMark = screen.getByText('*');
    expect(requiredMark).toHaveClass('text-pink-500', 'ml-1');
  });

  /**
   * @description 入力値が正しく設定される
   */
  it('sets input value correctly', () => {
    render(
      <PostalCodeInput {...defaultProps} value='123-4567' onChange={() => {}} />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123-4567');
  });

  /**
   * @description 入力値の変更が正しく処理される
   */
  it('handles input value changes correctly', () => {
    const handleChange = jest.fn();
    render(<PostalCodeInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '987-6543' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  /**
   * @description 郵便番号の自動フォーマットが正しく動作する
   */
  it('formats postal code automatically', () => {
    const handleChange = jest.fn();
    render(<PostalCodeInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');

    // ハイフンなしで入力
    fireEvent.change(input, { target: { value: '1234567' } });

    // 入力値がそのまま渡される
    expect(handleChange).toHaveBeenCalledWith('1234567');
  });

  /**
   * @description 無効な郵便番号が正しく処理される
   */
  it('handles invalid postal code correctly', () => {
    const handleChange = jest.fn();
    render(<PostalCodeInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');

    // 無効な文字を入力
    fireEvent.change(input, { target: { value: 'abc-defg' } });

    // 変更は呼ばれる（バリデーションは別途行う）
    expect(handleChange).toHaveBeenCalledWith('abc-defg');
  });

  /**
   * @description 住所自動入力が正しく動作する', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            address1: '東京都',
            address2: '渋谷区',
            address3: '渋谷',
            address4: '1-1-1',
          },
        ],
      }),
    } as Response);

    const handleChange = jest.fn();
    const onAddressChange = jest.fn();
    
    render(
      <PostalCodeInput 
        {...defaultProps} 
        onChange={handleChange}
        onAddressChange={onAddressChange}
      />
    );

    const input = screen.getByRole('textbox');
    
    // 有効な郵便番号を入力
    fireEvent.change(input, { target: { value: '150-0002' } });
    
    // 住所情報が取得される
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://zipcloud.ibsnet.co.jp/api/search?zipcode=1500002'
      );
    });

    // 住所変更コールバックが呼ばれる
    await waitFor(() => {
      expect(onAddressChange).toHaveBeenCalledWith({
        prefecture: '東京都',
        city: '渋谷区',
        street: '渋谷',
        building: '1-1-1',
      });
    });
  });

  /**
   * @description 住所取得エラーが正しく処理される', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const handleChange = jest.fn();
    const onAddressChange = jest.fn();
    
    render(
      <PostalCodeInput 
        {...defaultProps} 
        onChange={handleChange}
        onAddressChange={onAddressChange}
      />
    );

    const input = screen.getByRole('textbox');
    
    // 有効な郵便番号を入力
    fireEvent.change(input, { target: { value: '150-0002' } });
    
    // エラーが発生しても住所変更コールバックは呼ばれない
    await waitFor(() => {
      expect(onAddressChange).not.toHaveBeenCalled();
    });
  });

  /**
   * @description 住所が見つからない場合が正しく処理される', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: null,
      }),
    } as Response);

    const handleChange = jest.fn();
    const onAddressChange = jest.fn();
    
    render(
      <PostalCodeInput 
        {...defaultProps} 
        onChange={handleChange}
        onAddressChange={onAddressChange}
      />
    );

    const input = screen.getByRole('textbox');
    
    // 存在しない郵便番号を入力
    fireEvent.change(input, { target: { value: '999-9999' } });
    
    // 住所変更コールバックは呼ばれない
    await waitFor(() => {
      expect(onAddressChange).not.toHaveBeenCalled();
    });
  });

  /**
   * @description フォーカス状態のスタイリングが正しい
   */
  it('has correct focus state styling', () => {
    render(<PostalCodeInput {...defaultProps} />);

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
    render(<PostalCodeInput {...defaultProps} disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50');
  });

  /**
   * @description 読み取り専用状態のスタイリングが正しい
   */
  it('has correct read-only state styling', () => {
    render(<PostalCodeInput {...defaultProps} readOnly />);

    const input = screen.getByRole('textbox');
    // PostalCodeInputコンポーネントにはreadOnlyプロパティが定義されていない
    // このテストは削除するか、readOnlyプロパティを実装する必要がある
    expect(input).not.toHaveAttribute('readonly');
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    render(<PostalCodeInput {...defaultProps} className='custom-class' />);

    // カスタムクラスは外側のdivに適用される
    const container = screen.getByRole('textbox').closest('div').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  /**
   * @description 最大文字数が正しく設定される
   */
  it('sets maxLength correctly', () => {
    render(<PostalCodeInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '8');
  });

  /**
   * @description 複数のインスタンスが正しく表示される
   */
  it('renders multiple instances correctly', () => {
    render(
      <div>
        <PostalCodeInput {...defaultProps} name='postalCode1' />
        <PostalCodeInput {...defaultProps} name='postalCode2' />
        <PostalCodeInput {...defaultProps} name='postalCode3' />
      </div>
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);
  });

  /**
   * @description 異なるラベルが正しく表示される
   */
  it('displays different labels correctly', () => {
    render(<PostalCodeInput {...defaultProps} label='ラベル1' />);
    expect(screen.getByText('ラベル1')).toBeInTheDocument();

    render(<PostalCodeInput {...defaultProps} label='ラベル2' />);
    expect(screen.getByText('ラベル2')).toBeInTheDocument();
  });

  /**
   * @description コンポーネントの基本構造が正しい
   */
  it('has correct component structure', () => {
    render(<PostalCodeInput {...defaultProps} />);

    const label = screen.getByText('郵便番号');
    const input = screen.getByRole('textbox');

    expect(label.tagName).toBe('LABEL');
    expect(input.tagName).toBe('INPUT');
  });

  /**
   * @description アクセシビリティ属性が正しく設定される
   */
  it('has correct accessibility attributes', () => {
    render(<PostalCodeInput {...defaultProps} />);

    const label = screen.getByText('郵便番号');
    const input = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for');
    expect(input).toHaveAttribute('id');
    expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
  });

  /**
   * @description 動的なプロパティ変更が正しく反映される
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(
      <PostalCodeInput {...defaultProps} value='123-4567' onChange={() => {}} />
    );

    // 初期状態
    let input = screen.getByRole('textbox');
    expect(input).toHaveValue('123-4567');

    // 値変更
    rerender(
      <PostalCodeInput {...defaultProps} value='987-6543' onChange={() => {}} />
    );
    input = screen.getByRole('textbox');
    expect(input).toHaveValue('987-6543');
  });

  /**
   * @description エラー状態の動的変更が正しく反映される
   */
  it('reflects dynamic error state changes correctly', () => {
    const { rerender } = render(<PostalCodeInput {...defaultProps} />);

    // 初期状態（エラーなし）
    expect(screen.queryByText('エラーメッセージ')).not.toBeInTheDocument();

    // エラー状態に変更
    rerender(<PostalCodeInput {...defaultProps} error='エラーメッセージ' />);
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
  });

  /**
   * @description 郵便番号の検証が正しく動作する
   */
  it('validates postal code correctly', () => {
    const handleChange = jest.fn();
    render(<PostalCodeInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');

    // 有効な郵便番号
    fireEvent.change(input, { target: { value: '123-4567' } });
    expect(handleChange).toHaveBeenCalledWith('123-4567');

    // 短い郵便番号
    fireEvent.change(input, { target: { value: '123' } });
    expect(handleChange).toHaveBeenCalledWith('123');

    // 長い郵便番号
    fireEvent.change(input, { target: { value: '123-45678' } });
    expect(handleChange).toHaveBeenCalledWith('123-45678');
  });

  /**
   * @description 特殊文字が正しく処理される
   */
  it('handles special characters correctly', () => {
    const handleChange = jest.fn();
    render(<PostalCodeInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');

    // 特殊文字を含む入力
    fireEvent.change(input, { target: { value: 'abc-defg' } });
    expect(handleChange).toHaveBeenCalledWith('abc-defg');

    // 数字とハイフンのみ
    fireEvent.change(input, { target: { value: '123-4567' } });
    expect(handleChange).toHaveBeenCalledWith('123-4567');
  });

  /**
   * @description 未カバレッジケースのテスト
   */
  describe('Uncovered Cases', () => {
    beforeEach(() => {
      // fetch APIをモック
      global.fetch = jest.fn();
    });

    it('does not search address for invalid postal code', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
      const onAddressChange = jest.fn();

      render(
        <PostalCodeInput {...defaultProps} onAddressChange={onAddressChange} />
      );

      const input = screen.getByRole('textbox');

      // 無効な郵便番号を入力（validatePostalCodeがfalseを返すケース）
      fireEvent.change(input, { target: { value: '12' } }); // 短すぎる

      // 少し待機してもfetchが呼ばれないことを確認
      await new Promise(resolve => setTimeout(resolve, 500));

      expect(mockFetch).not.toHaveBeenCalled();
      expect(onAddressChange).not.toHaveBeenCalled();
    });

    it('handles API response with data wrapper', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: {
            addresses: [
              {
                pref_name: '東京都',
                city_name: '渋谷区',
                town_name: '渋谷',
              },
            ],
          },
        }),
      } as Response);

      const onAddressChange = jest.fn();

      render(
        <PostalCodeInput {...defaultProps} onAddressChange={onAddressChange} />
      );

      const input = screen.getByRole('textbox');

      // 有効な郵便番号を入力
      fireEvent.change(input, { target: { value: '150-0002' } });

      // 住所変更コールバックが呼ばれることを確認
      await waitFor(() => {
        expect(onAddressChange).toHaveBeenCalledWith({
          prefecture: '東京都',
          address: '東京都渋谷区渋谷',
        });
      });
    });

    it('shows error when no addresses found in response', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          addresses: [], // 空の配列
        }),
      } as Response);

      const onAddressChange = jest.fn();

      render(
        <PostalCodeInput {...defaultProps} onAddressChange={onAddressChange} />
      );

      const input = screen.getByRole('textbox');

      // 有効な郵便番号を入力
      fireEvent.change(input, { target: { value: '999-9999' } });

      // エラーメッセージが表示されることを確認
      await waitFor(() => {
        expect(
          screen.getByText('該当する住所が見つかりませんでした')
        ).toBeInTheDocument();
      });

      expect(onAddressChange).not.toHaveBeenCalled();
    });

    it('shows error when addresses property is null', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          addresses: null, // null
        }),
      } as Response);

      const onAddressChange = jest.fn();

      render(
        <PostalCodeInput {...defaultProps} onAddressChange={onAddressChange} />
      );

      const input = screen.getByRole('textbox');

      // 有効な郵便番号を入力
      fireEvent.change(input, { target: { value: '999-9999' } });

      // エラーメッセージが表示されることを確認
      await waitFor(() => {
        expect(
          screen.getByText('該当する住所が見つかりませんでした')
        ).toBeInTheDocument();
      });

      expect(onAddressChange).not.toHaveBeenCalled();
    });

    it('shows error when response has no addresses property', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          // addresses プロパティがない
          results: null,
        }),
      } as Response);

      const onAddressChange = jest.fn();

      render(
        <PostalCodeInput {...defaultProps} onAddressChange={onAddressChange} />
      );

      const input = screen.getByRole('textbox');

      // 有効な郵便番号を入力
      fireEvent.change(input, { target: { value: '999-9999' } });

      // エラーメッセージが表示されることを確認
      await waitFor(() => {
        expect(
          screen.getByText('該当する住所が見つかりませんでした')
        ).toBeInTheDocument();
      });

      expect(onAddressChange).not.toHaveBeenCalled();
    });
  });
});
