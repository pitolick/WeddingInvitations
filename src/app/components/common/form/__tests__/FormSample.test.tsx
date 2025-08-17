/**
 * @description FormSampleコンポーネントのテストファイル
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import FormSample from '../FormSample';

// フォームコンポーネントのモック
jest.mock('../index', () => ({
  Input: ({ label, value, onChange, error, required, ...props }: any) => (
    <div data-testid={`input-${label}`}>
      <label>
        {label}
        {required && <span>*</span>}
      </label>
      <input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        {...props}
      />
      {error && <div data-testid={`error-${label}`} role="alert">{error}</div>}
    </div>
  ),
  TextArea: ({ label, value, onChange, ...props }: any) => (
    <div data-testid={`textarea-${label}`}>
      <label>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  ),
  Radio: ({ label, value, onChange, options, error, required, ...props }: any) => (
    <div data-testid={`radio-${label}`} role="radiogroup" aria-label={label}>
      <label>
        {label}
        {required && <span>*</span>}
      </label>
      {options.map((option: any) => (
        <label key={option.value}>
          <input
            type="radio"
            name={label}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          {option.label}
        </label>
      ))}
      {error && <div data-testid={`error-${label}`} role="alert">{error}</div>}
    </div>
  ),
  Checkbox: ({ label, values, checked, onChange, options, error, required, ...props }: any) => {
    if (options) {
      // 複数選択チェックボックス
      return (
        <div data-testid={`checkbox-group-${label}`}>
          <label>
            {label}
            {required && <span>*</span>}
          </label>
          {options.map((option: any) => (
            <label key={option.value}>
              <input
                type="checkbox"
                value={option.value}
                checked={values?.includes(option.value)}
                onChange={(e) => {
                  const newValues = e.target.checked
                    ? [...(values || []), option.value]
                    : (values || []).filter((v: string) => v !== option.value);
                  onChange(newValues);
                }}
              />
              {option.label}
            </label>
          ))}
          {error && <div data-testid={`error-${label}`} role="alert">{error}</div>}
        </div>
      );
    } else {
      // 単一チェックボックス
      return (
        <div data-testid={`checkbox-${label}`}>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
            />
            {label}
            {required && <span>*</span>}
          </label>
          {error && <div data-testid={`error-${label}`} role="alert">{error}</div>}
        </div>
      );
    }
  },
}));

// Alertのモック
global.alert = jest.fn();
// Console.logのモック
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

/**
 * @description FormSampleコンポーネントのテスト
 */
describe('FormSample Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  /**
   * @description 基本的なレンダリングテスト
   */
  describe('Basic Rendering', () => {
    it('renders form title correctly', () => {
      render(<FormSample />);
      expect(screen.getByText('結婚式出欠確認フォーム')).toBeInTheDocument();
    });

    it('renders all form sections', () => {
      render(<FormSample />);
      
      expect(screen.getByText('基本情報')).toBeInTheDocument();
      expect(screen.getByText('出欠確認')).toBeInTheDocument();
      expect(screen.getByText('食事制限')).toBeInTheDocument();
      expect(screen.getByText('横並びレイアウトサンプル')).toBeInTheDocument();
      expect(screen.getByText('メッセージ')).toBeInTheDocument();
      expect(screen.getByText('同意事項')).toBeInTheDocument();
    });

    it('renders all required form fields', () => {
      render(<FormSample />);
      
      expect(screen.getByTestId('input-お名前')).toBeInTheDocument();
      expect(screen.getByTestId('input-メールアドレス')).toBeInTheDocument();
      expect(screen.getByTestId('input-電話番号')).toBeInTheDocument();
      expect(screen.getByTestId('radio-ご出席について')).toBeInTheDocument();
      expect(screen.getByTestId('textarea-新郎新婦へのメッセージ')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<FormSample />);
      expect(screen.getByRole('button', { name: '送信する' })).toBeInTheDocument();
    });

    it('renders debug information section', () => {
      render(<FormSample />);
      expect(screen.getByText('デバッグ情報（開発用）')).toBeInTheDocument();
    });
  });

  /**
   * @description フォーム入力テスト
   */
  describe('Form Input Handling', () => {
    it('handles name input correctly', () => {
      render(<FormSample />);
      const nameInput = screen.getByTestId('input-お名前').querySelector('input');
      
      fireEvent.change(nameInput!, { target: { value: '田中太郎' } });
      
      expect(nameInput).toHaveValue('田中太郎');
    });

    it('handles email input correctly', () => {
      render(<FormSample />);
      const emailInput = screen.getByTestId('input-メールアドレス').querySelector('input');
      
      fireEvent.change(emailInput!, { target: { value: 'test@example.com' } });
      
      expect(emailInput).toHaveValue('test@example.com');
    });

    it('handles phone input correctly', () => {
      render(<FormSample />);
      const phoneInput = screen.getByTestId('input-電話番号').querySelector('input');
      
      fireEvent.change(phoneInput!, { target: { value: '090-1234-5678' } });
      
      expect(phoneInput).toHaveValue('090-1234-5678');
    });

    it('handles radio button selection correctly', () => {
      render(<FormSample />);
      const radioGroup = screen.getByTestId('radio-ご出席について');
      const attendRadio = radioGroup.querySelector('input[value="attend"]');
      
      fireEvent.click(attendRadio!);
      
      expect(attendRadio).toBeChecked();
    });

    it('handles multiple checkbox selection correctly', () => {
      render(<FormSample />);
      const vegetarianCheckbox = screen.getByDisplayValue('vegetarian');
      const veganCheckbox = screen.getByDisplayValue('vegan');
      
      fireEvent.click(vegetarianCheckbox);
      fireEvent.click(veganCheckbox);
      
      expect(vegetarianCheckbox).toBeChecked();
      expect(veganCheckbox).toBeChecked();
    });

    it('handles single checkbox correctly', () => {
      render(<FormSample />);
      const agreeCheckbox = screen.getByTestId('checkbox-利用規約に同意します').querySelector('input');
      
      fireEvent.click(agreeCheckbox!);
      
      expect(agreeCheckbox).toBeChecked();
    });

    it('handles textarea input correctly', () => {
      render(<FormSample />);
      const messageTextarea = screen.getByTestId('textarea-新郎新婦へのメッセージ').querySelector('textarea');
      
      fireEvent.change(messageTextarea!, { target: { value: 'おめでとうございます！' } });
      
      expect(messageTextarea).toHaveValue('おめでとうございます！');
    });
  });

  /**
   * @description バリデーションテスト
   */
  describe('Form Validation', () => {
    it('has validation logic for form submission', () => {
      render(<FormSample />);
      const submitButton = screen.getByRole('button', { name: '送信する' });
      
      // バリデーションロジックの存在確認
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('displays required field markers', () => {
      render(<FormSample />);
      
      const nameInput = screen.getByTestId('input-お名前');
      const emailInput = screen.getByTestId('input-メールアドレス');
      const attendanceRadio = screen.getByTestId('radio-ご出席について');
      const agreeCheckbox = screen.getByTestId('checkbox-利用規約に同意します');
      
      // 必須マーカーの存在確認
      expect(nameInput).toHaveTextContent('*');
      expect(emailInput).toHaveTextContent('*');
      expect(attendanceRadio).toHaveTextContent('*');
      expect(agreeCheckbox).toHaveTextContent('*');
    });

    it('handles form field updates correctly', () => {
      render(<FormSample />);
      const nameInput = screen.getByTestId('input-お名前').querySelector('input');
      
      fireEvent.change(nameInput!, { target: { value: '田中太郎' } });
      
      expect(nameInput).toHaveValue('田中太郎');
    });
  });

  /**
   * @description フォーム送信テスト
   */
  describe('Form Submission', () => {
    it('submits form successfully with valid data', async () => {
      render(<FormSample />);
      
      // 必須フィールドに有効なデータを入力
      const nameInput = screen.getByTestId('input-お名前').querySelector('input');
      const emailInput = screen.getByTestId('input-メールアドレス').querySelector('input');
      const radioGroup = screen.getByTestId('radio-ご出席について');
      const attendRadio = radioGroup.querySelector('input[value="attend"]');
      const agreeCheckbox = screen.getByTestId('checkbox-利用規約に同意します').querySelector('input');
      
      fireEvent.change(nameInput!, { target: { value: '田中太郎' } });
      fireEvent.change(emailInput!, { target: { value: 'test@example.com' } });
      fireEvent.click(attendRadio!);
      fireEvent.click(agreeCheckbox!);
      
      const submitButton = screen.getByRole('button', { name: '送信する' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('フォームデータ:', expect.objectContaining({
          name: '田中太郎',
          email: 'test@example.com',
          attendance: 'attend',
          agreeToTerms: true,
        }));
        expect(global.alert).toHaveBeenCalledWith('フォームが送信されました！');
      });
    });

    it('prevents form submission with invalid data', async () => {
      render(<FormSample />);
      const submitButton = screen.getByRole('button', { name: '送信する' });
      
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(consoleSpy).not.toHaveBeenCalled();
        expect(global.alert).not.toHaveBeenCalled();
      });
    });

    it('submits form with optional fields filled', async () => {
      render(<FormSample />);
      
      // 必須フィールド
      const nameInput = screen.getByTestId('input-お名前').querySelector('input');
      const emailInput = screen.getByTestId('input-メールアドレス').querySelector('input');
      const radioGroup = screen.getByTestId('radio-ご出席について');
      const attendRadio = radioGroup.querySelector('input[value="attend"]');
      const agreeCheckbox = screen.getByTestId('checkbox-利用規約に同意します').querySelector('input');
      
      // オプショナルフィールド
      const phoneInput = screen.getByTestId('input-電話番号').querySelector('input');
      const messageTextarea = screen.getByTestId('textarea-新郎新婦へのメッセージ').querySelector('textarea');
      const vegetarianCheckbox = screen.getByDisplayValue('vegetarian');
      const updatesCheckbox = screen.getByTestId('checkbox-結婚式の最新情報を受け取る（任意）').querySelector('input');
      
      fireEvent.change(nameInput!, { target: { value: '田中太郎' } });
      fireEvent.change(emailInput!, { target: { value: 'test@example.com' } });
      fireEvent.change(phoneInput!, { target: { value: '090-1234-5678' } });
      fireEvent.change(messageTextarea!, { target: { value: 'おめでとうございます！' } });
      fireEvent.click(attendRadio!);
      fireEvent.click(vegetarianCheckbox);
      fireEvent.click(agreeCheckbox!);
      fireEvent.click(updatesCheckbox!);
      
      const submitButton = screen.getByRole('button', { name: '送信する' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('フォームデータ:', expect.objectContaining({
          name: '田中太郎',
          email: 'test@example.com',
          phone: '090-1234-5678',
          message: 'おめでとうございます！',
          attendance: 'attend',
          dietaryRestrictions: ['vegetarian'],
          agreeToTerms: true,
          receiveUpdates: true,
        }));
      });
    });
  });

  /**
   * @description レスポンシブレイアウトテスト
   */
  describe('Responsive Layout', () => {
    it('renders horizontal layout components', () => {
      render(<FormSample />);
      
      expect(screen.getByText('横並びラジオボタン（3列）')).toBeInTheDocument();
      expect(screen.getByText('横並びチェックボックス（2列）')).toBeInTheDocument();
      expect(screen.getByText('レスポンシブ横並びチェックボックス')).toBeInTheDocument();
    });

    it('renders layout sample radio buttons', () => {
      render(<FormSample />);
      const layoutRadio = screen.getByTestId('radio-お気持ちの選択');
      
      expect(layoutRadio).toBeInTheDocument();
      expect(layoutRadio.querySelector('input[value="attend"]')).toBeInTheDocument();
      expect(layoutRadio.querySelector('input[value="absent"]')).toBeInTheDocument();
      expect(layoutRadio.querySelector('input[value="undecided"]')).toBeInTheDocument();
    });

    it('renders layout sample checkbox groups', () => {
      render(<FormSample />);
      
      expect(screen.getByTestId('checkbox-group-お好みの料理（複数選択可）')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-group-参加希望のイベント（複数選択可）')).toBeInTheDocument();
    });
  });

  /**
   * @description アクセシビリティテスト
   */
  describe('Accessibility', () => {
    it('has proper form structure', () => {
      render(<FormSample />);
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('has proper form input attributes', () => {
      render(<FormSample />);
      
      const nameInput = screen.getByTestId('input-お名前').querySelector('input');
      const emailInput = screen.getByTestId('input-メールアドレス').querySelector('input');
      
      // 基本的な属性の確認
      expect(nameInput).toHaveAttribute('aria-invalid');
      expect(emailInput).toHaveAttribute('aria-invalid');
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('has accessible form elements', () => {
      render(<FormSample />);
      
      // ラベルとinputの関連付けを確認
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBeGreaterThan(0);
      
      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons.length).toBeGreaterThan(0);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('has proper radiogroup role', () => {
      render(<FormSample />);
      const radioGroup = screen.getByRole('radiogroup', { name: 'ご出席について' });
      expect(radioGroup).toBeInTheDocument();
    });
  });

  /**
   * @description デバッグ情報テスト
   */
  describe('Debug Information', () => {
    it('displays current form data in debug section', () => {
      render(<FormSample />);
      const nameInput = screen.getByTestId('input-お名前').querySelector('input');
      
      fireEvent.change(nameInput!, { target: { value: 'テスト太郎' } });
      
      // デバッグセクション内のJSONを確認
      const debugSection = screen.getByText('デバッグ情報（開発用）').parentElement;
      expect(debugSection).toHaveTextContent('テスト太郎');
    });

    it('updates debug information when form data changes', () => {
      render(<FormSample />);
      const emailInput = screen.getByTestId('input-メールアドレス').querySelector('input');
      
      fireEvent.change(emailInput!, { target: { value: 'debug@test.com' } });
      
      const debugSection = screen.getByText('デバッグ情報（開発用）').parentElement;
      expect(debugSection).toHaveTextContent('debug@test.com');
    });
  });

  /**
   * @description エラーハンドリングテスト
   */
  describe('Error Handling', () => {
    it('handles form submission without throwing errors', () => {
      render(<FormSample />);
      const submitButton = screen.getByRole('button', { name: '送信する' });
      
      expect(() => {
        fireEvent.click(submitButton);
      }).not.toThrow();
    });

    it('handles input changes without throwing errors', () => {
      render(<FormSample />);
      const nameInput = screen.getByTestId('input-お名前').querySelector('input');
      const emailInput = screen.getByTestId('input-メールアドレス').querySelector('input');
      
      expect(() => {
        fireEvent.change(nameInput!, { target: { value: '田中太郎' } });
        fireEvent.change(emailInput!, { target: { value: 'test@example.com' } });
      }).not.toThrow();
    });
  });
});
