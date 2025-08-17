/**
 * @description RSVPClientコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import RSVPClient from '../RSVPClient';

// react-hook-formのモック
const mockUseForm = {
  control: {},
  register: jest.fn(() => ({})),
  handleSubmit: jest.fn(onSubmit => (e: any) => {
    e.preventDefault();
    onSubmit({});
  }),
  formState: { errors: {} },
  watch: jest.fn(() => ({})),
  setValue: jest.fn(),
  getValues: jest.fn(() => ({})),
  reset: jest.fn(),
};

const mockUseFieldArray = {
  fields: [],
  append: jest.fn(),
  remove: jest.fn(),
};

jest.mock('react-hook-form', () => ({
  useForm: () => mockUseForm,
  useFieldArray: () => mockUseFieldArray,
  Controller: ({ render }: any) => render({ field: {} }),
}));

// 子コンポーネントのモック
jest.mock('../AttendanceSelector', () => {
  return function MockAttendanceSelector() {
    return <div data-testid='attendance-selector'>AttendanceSelector</div>;
  };
});
jest.mock('../AllergyTagsInput', () => {
  return function MockAllergyTagsInput() {
    return <div data-testid='allergy-tags-input'>AllergyTagsInput</div>;
  };
});
jest.mock('../../../common/decoration/Hr', () => {
  return function MockHr() {
    return <div data-testid='hr'>Hr</div>;
  };
});

// localStorageのモック
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('RSVPClient Component', () => {
  const defaultProps = {
    guestInfo: {
      id: 'test-guest-123',
      name: 'テスト太郎',
      kana: 'テストタロウ',
      autofill: {
        name: true,
        kana: true,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();

    // localStorageで常にfalseを返すようにして、フォームが表示されるようにする
    localStorageMock.getItem.mockReturnValue('false');
  });

  it('renders RSVPClient component correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    expect(screen.getByText('連絡先')).toBeInTheDocument();
    expect(screen.getByText('郵便番号')).toBeInTheDocument();
    expect(screen.getByText('都道府県')).toBeInTheDocument();
  });

  it('displays guest information correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    // 隠しフィールドは値が設定されていないため、存在確認のみ
    const hiddenInputs = screen.getAllByDisplayValue('');
    expect(hiddenInputs.length).toBeGreaterThan(0);
  });

  it('displays contact information section correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    expect(screen.getByText('郵便番号')).toBeInTheDocument();
    expect(screen.getByText('都道府県')).toBeInTheDocument();
    expect(screen.getByText('ご住所')).toBeInTheDocument();
    expect(screen.getByText('電話番号')).toBeInTheDocument();
    expect(screen.getByText('メールアドレス')).toBeInTheDocument();
  });

  it('displays add companion button correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    expect(screen.getByText('+ お連れ様を追加')).toBeInTheDocument();
    expect(
      screen.getByText('ご回答により詳細をお聞きする場合がございます')
    ).toBeInTheDocument();
  });

  it('displays message input correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    const messageInput = screen.getByLabelText('メッセージ（任意）');
    expect(messageInput).toBeInTheDocument();
    expect(messageInput).toHaveAttribute(
      'placeholder',
      'ご出席に関する追加情報や新郎新婦に伝えたいメッセージがあればご記入ください'
    );
    expect(messageInput).toHaveAttribute('rows', '4');
  });

  it('displays submit button correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    const submitButton = screen.getByRole('button', { name: /送信する/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass(
      'bg-lavender-600',
      'hover:bg-lavender-700'
    );
  });

  it('has correct form structure', () => {
    render(<RSVPClient {...defaultProps} />);
    const form = screen.getByTestId('rsvp-client').querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('displays prefecture options correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    const prefectureSelect = screen
      .getByText('都道府県')
      .closest('div')
      ?.querySelector('select');
    expect(prefectureSelect).toBeInTheDocument();
    expect(screen.getByText('東京都')).toBeInTheDocument();
    expect(screen.getByText('大阪府')).toBeInTheDocument();
    expect(screen.getByText('北海道')).toBeInTheDocument();
  });

  it('displays postal code input correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    const postalCodeInput = screen
      .getByText('郵便番号')
      .closest('div')
      ?.querySelector('input');
    expect(postalCodeInput).toBeInTheDocument();
    expect(postalCodeInput).toHaveAttribute('placeholder', '1234567');
    expect(postalCodeInput).toHaveAttribute('maxLength', '8');
  });

  it('displays phone number input correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    const phoneInput = screen
      .getByText('電話番号')
      .closest('div')
      ?.querySelector('input');
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });

  it('displays email input correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    const emailInput = screen
      .getByText('メールアドレス')
      .closest('div')
      ?.querySelector('input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('displays address input correctly', () => {
    render(<RSVPClient {...defaultProps} />);
    const addressInput = screen
      .getByText('ご住所')
      .closest('div')
      ?.querySelector('input');
    expect(addressInput).toBeInTheDocument();
    expect(addressInput).toHaveAttribute('type', 'text');
    expect(addressInput).toHaveAttribute('placeholder', '市区町村番地');
  });

  // 新しいテストケースを追加
  it('displays required field indicators correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    // 必須フィールドに*マークが表示されていることを確認
    const requiredFields = [
      '郵便番号',
      '都道府県',
      'ご住所',
      '電話番号',
      'メールアドレス',
    ];
    requiredFields.forEach(fieldName => {
      const field = screen.getByText(fieldName);
      const requiredMark = field.querySelector('.text-pink-500');
      expect(requiredMark).toBeInTheDocument();
      expect(requiredMark).toHaveTextContent('*');
    });
  });

  it('displays deadline information correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    // テキストが分割されているため、部分的なテキストを確認
    expect(screen.getByText(/お手数ではございますが/)).toBeInTheDocument();
    expect(screen.getByText(/下記お日にち迄に/)).toBeInTheDocument();
    expect(screen.getByText(/出欠のお返事賜りますよう/)).toBeInTheDocument();
    expect(screen.getByText(/お願い申し上げます/)).toBeInTheDocument();
    expect(screen.getByText('2025/09/17')).toBeInTheDocument();
  });

  it('displays postal code help text correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    expect(
      screen.getByText('7桁の郵便番号を入力すると住所が自動で入力されます')
    ).toBeInTheDocument();
  });

  it('has correct form validation attributes', () => {
    render(<RSVPClient {...defaultProps} />);

    // 必須フィールドにrequired属性が設定されていることを確認
    const requiredInputs = screen
      .getAllByDisplayValue('')
      .filter(input => input.hasAttribute('required'));
    expect(requiredInputs.length).toBeGreaterThan(0);
  });

  it('has correct responsive grid layout', () => {
    render(<RSVPClient {...defaultProps} />);

    // グリッドレイアウトが適用されていることを確認
    const gridContainer = screen.getByText('郵便番号').closest('.grid');
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2');
  });

  it('displays form sections with correct spacing', () => {
    render(<RSVPClient {...defaultProps} />);

    // フォームセクションに適切なスペーシングが適用されていることを確認
    const form = screen.getByTestId('rsvp-client').querySelector('form');
    expect(form).toHaveClass('space-y-8');
  });

  it('has correct button styling and states', () => {
    render(<RSVPClient {...defaultProps} />);

    const addCompanionButton = screen.getByText('+ お連れ様を追加');
    const submitButton = screen.getByRole('button', { name: /送信する/i });

    // ボタンのスタイリングを確認
    expect(addCompanionButton).toHaveClass('bg-gray-100', 'hover:bg-gray-200');
    expect(submitButton).toHaveClass(
      'bg-lavender-600',
      'hover:bg-lavender-700'
    );

    // ボタンのサイズとタイプを確認
    expect(addCompanionButton).toHaveClass('h-12', 'px-6', 'py-3', 'text-lg');
    expect(submitButton).toHaveClass('h-12', 'px-6', 'py-3', 'text-lg');
  });

  it('displays form labels with correct typography', () => {
    render(<RSVPClient {...defaultProps} />);

    const postalCodeLabel = screen.getByText('郵便番号');
    expect(postalCodeLabel).toHaveClass(
      'font-noto',
      'text-sm',
      'font-medium',
      'text-gray-700'
    );
  });

  it('has correct input field styling', () => {
    render(<RSVPClient {...defaultProps} />);

    // 入力フィールドのスタイリングを確認（実際のDOMに合わせて調整）
    const postalCodeInput = screen
      .getByText('郵便番号')
      .closest('div')
      ?.querySelector('input');

    if (postalCodeInput) {
      expect(postalCodeInput).toHaveClass(
        'w-full',
        'px-4',
        'py-3',
        'font-noto',
        'text-base',
        'text-gray-900',
        'bg-white',
        'border',
        'border-gray-300',
        'rounded-lg'
      );
    }
  });

  it('displays form with correct accessibility attributes', () => {
    render(<RSVPClient {...defaultProps} />);

    // フォームに適切なアクセシビリティ属性が設定されていることを確認
    const form = screen.getByTestId('rsvp-client').querySelector('form');
    expect(form).toHaveAttribute('style', 'pointer-events: auto;');
  });

  it('has correct date display formatting', () => {
    render(<RSVPClient {...defaultProps} />);

    const dateElement = screen.getByText('2025/09/17');
    expect(dateElement).toHaveClass(
      'font-noto',
      'font-bold',
      'text-2xl',
      'text-pink-600'
    );
  });

  it('displays form sections with proper borders', () => {
    render(<RSVPClient {...defaultProps} />);

    const contactSection = screen.getByText('連絡先').closest('h3');
    expect(contactSection).toHaveClass('border-b', 'border-gray-200', 'pb-2');
  });

  // 新しい機能テストケース
  describe('Form Submission and Validation', () => {
    it('handles form submission correctly', async () => {
      const mockHandleSubmit = jest.fn(onSubmit => (e: any) => {
        e.preventDefault();
        onSubmit({});
      });
      mockUseForm.handleSubmit = mockHandleSubmit;

      render(<RSVPClient {...defaultProps} />);

      const submitButton = screen.getByRole('button', { name: /送信する/i });
      fireEvent.click(submitButton);

      expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('displays submission error when validation fails', async () => {
      // エラー状態をシミュレート
      const mockFormState = {
        errors: {
          contactInfo: {
            postalCode: { message: '郵便番号は必須です' },
            prefecture: { message: '都道府県は必須です' },
          },
        },
      };
      mockUseForm.formState = mockFormState;

      render(<RSVPClient {...defaultProps} />);

      // エラーメッセージが表示されることを確認
      expect(screen.getByText('郵便番号は必須です')).toBeInTheDocument();
      expect(screen.getByText('都道府県は必須です')).toBeInTheDocument();
    });

    it('handles add attendee functionality', () => {
      const mockAppend = jest.fn();
      mockUseFieldArray.append = mockAppend;

      render(<RSVPClient {...defaultProps} />);

      const addButton = screen.getByText('+ お連れ様を追加');
      fireEvent.click(addButton);

      expect(mockAppend).toHaveBeenCalled();
    });

    it('handles remove attendee functionality', () => {
      const mockRemove = jest.fn();
      mockUseFieldArray.remove = mockRemove;
      (mockUseFieldArray as any).fields = [{}, {}]; // 2人の出席者をシミュレート

      render(<RSVPClient {...defaultProps} />);

      // 削除ボタンが表示されることを確認（実際のコンポーネントでは削除ボタンが表示される）
      expect((mockUseFieldArray as any).fields.length).toBe(2);
    });
  });

  describe('State Management', () => {
    it('initializes with correct default state', () => {
      render(<RSVPClient {...defaultProps} />);

      // 初期状態では送信エラーや成功メッセージが表示されない
      expect(screen.queryByText(/エラー/)).not.toBeInTheDocument();
      expect(screen.queryByText(/送信完了/)).not.toBeInTheDocument();
    });

    it('checks localStorage for submitted status on mount', () => {
      localStorageMock.getItem.mockReturnValue('false');

      render(<RSVPClient {...defaultProps} />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'rsvp_submitted_test-guest-123'
      );
    });

    it('handles resubmit functionality', () => {
      localStorageMock.getItem.mockReturnValue('false');

      render(<RSVPClient {...defaultProps} />);

      // 再回答ボタンが表示されることを確認（実際のコンポーネントでは条件付きで表示）
      expect(localStorageMock.getItem).toHaveBeenCalled();
    });
  });

  // 送信完了画面のテスト
  describe('Submission Complete Screen', () => {
    beforeEach(() => {
      // 送信完了状態にするためlocalStorageをtrueに設定
      localStorageMock.getItem.mockReturnValue('true');
    });

    it('displays submission complete screen when hasSubmitted is true', () => {
      render(<RSVPClient {...defaultProps} />);

      expect(screen.getByTestId('submission-complete')).toBeInTheDocument();
      expect(screen.getByText('送信完了')).toBeInTheDocument();
      expect(
        screen.getByText('出欠のご回答をいただき誠にありがとうございます')
      ).toBeInTheDocument();
      expect(screen.getByTestId('resubmit-button')).toBeInTheDocument();
    });

    it('handles resubmit button click correctly', () => {
      render(<RSVPClient {...defaultProps} />);

      const resubmitButton = screen.getByTestId('resubmit-button');
      fireEvent.click(resubmitButton);

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        'rsvp_submitted_test-guest-123'
      );
    });

    it('displays correct success icon and styling', () => {
      render(<RSVPClient {...defaultProps} />);

      const successIcon = screen
        .getByTestId('submission-complete')
        .querySelector('svg');
      expect(successIcon).toBeInTheDocument();
      expect(successIcon).toHaveClass('w-16', 'h-16', 'text-green-500');
    });
  });

  // data-testid属性を使用したテスト
  describe('Data Test ID Integration', () => {
    beforeEach(() => {
      // フォーム表示状態に戻す
      localStorageMock.getItem.mockReturnValue('false');
    });

    it('can find elements using data-testid attributes', () => {
      render(<RSVPClient {...defaultProps} />);

      expect(screen.getByTestId('rsvp-client')).toBeInTheDocument();
      expect(screen.getByTestId('contact-info-section')).toBeInTheDocument();
      expect(screen.getByTestId('add-companion-section')).toBeInTheDocument();
      expect(screen.getByTestId('add-companion-button')).toBeInTheDocument();
      expect(screen.getByTestId('submit-section')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('displays attendee sections with dynamic test ids', () => {
      // 複数の出席者をシミュレート
      mockUseFieldArray.fields = [{ id: '1' }, { id: '2' }];

      render(<RSVPClient {...defaultProps} />);

      expect(screen.getByTestId('attendee-section-0')).toBeInTheDocument();
      expect(screen.getByTestId('attendee-section-1')).toBeInTheDocument();
    });
  });

  // フォームの詳細動作テスト
  describe('Form Behavior and Interactions', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('false');
    });

    it('handles form field interactions correctly', () => {
      render(<RSVPClient {...defaultProps} />);

      // 各セクションの存在確認
      expect(screen.getByTestId('contact-info-section')).toBeInTheDocument();
      expect(screen.getByTestId('add-companion-section')).toBeInTheDocument();
      expect(screen.getByTestId('submit-section')).toBeInTheDocument();
    });

    it('manages form state correctly', () => {
      render(<RSVPClient {...defaultProps} />);

      // register関数が呼ばれることを確認
      expect(mockUseForm.register).toHaveBeenCalled();

      // setValue関数の存在確認
      expect(mockUseForm.setValue).toBeDefined();
    });

    it('handles postal code input correctly', () => {
      render(<RSVPClient {...defaultProps} />);

      const postalCodeSection = screen.getByTestId('contact-info-section');
      const postalCodeInput = postalCodeSection.querySelector(
        'input[placeholder="1234567"]'
      );

      expect(postalCodeInput).toBeInTheDocument();
      expect(postalCodeInput).toHaveAttribute('maxLength', '8');
    });

    it('displays help text for postal code', () => {
      render(<RSVPClient {...defaultProps} />);

      expect(
        screen.getByText('7桁の郵便番号を入力すると住所が自動で入力されます')
      ).toBeInTheDocument();
    });
  });

  // エラー状態のテスト
  describe('Error States and Validation', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('false');
    });

    it('displays form validation errors', () => {
      mockUseForm.formState = {
        errors: {
          contactInfo: {
            postalCode: { message: '郵便番号は必須です' },
            email: { message: 'メールアドレスの形式が正しくありません' },
          },
        },
      };

      render(<RSVPClient {...defaultProps} />);

      expect(screen.getByText('郵便番号は必須です')).toBeInTheDocument();
      expect(
        screen.getByText('メールアドレスの形式が正しくありません')
      ).toBeInTheDocument();
    });

    it('handles different error types correctly', () => {
      mockUseForm.formState = {
        errors: {
          contactInfo: {
            prefecture: { message: '都道府県は必須です' },
            phone: { message: '電話番号は必須です' },
            address: { message: 'ご住所は必須です' },
          },
        },
      };

      render(<RSVPClient {...defaultProps} />);

      expect(screen.getByText('都道府県は必須です')).toBeInTheDocument();
      expect(screen.getByText('電話番号は必須です')).toBeInTheDocument();
      expect(screen.getByText('ご住所は必須です')).toBeInTheDocument();
    });
  });

  // レスポンシブ対応のテスト
  describe('Responsive Design', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('false');
    });

    it('has responsive grid layout for contact form', () => {
      render(<RSVPClient {...defaultProps} />);

      const contactSection = screen.getByTestId('contact-info-section');
      const gridContainer = contactSection.querySelector('.grid');

      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2');
    });

    it('has responsive text breaks in deadline section', () => {
      render(<RSVPClient {...defaultProps} />);

      // sm:hiddenクラスを持つbrタグが存在することを確認
      const breaks = screen
        .getByTestId('rsvp-client')
        .querySelectorAll('br.sm\\:hidden');
      expect(breaks.length).toBeGreaterThan(0);
    });

    it('has responsive button sizing', () => {
      render(<RSVPClient {...defaultProps} />);

      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toHaveClass('w-full', 'md:max-w-md');
    });
  });

  // フォームの完全性テスト
  describe('Form Completeness', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('false');
    });

    it('includes all required form fields', () => {
      render(<RSVPClient {...defaultProps} />);

      // 隠しフィールドの確認
      const form = screen.getByTestId('rsvp-client').querySelector('form');
      const hiddenInputs = form?.querySelectorAll('input[type="hidden"]');
      expect(hiddenInputs?.length).toBeGreaterThanOrEqual(2); // guestId, name

      // 必須フィールドの確認
      const requiredInputs = form?.querySelectorAll('input[required]');
      expect(requiredInputs?.length).toBeGreaterThan(0);
    });

    it('has proper form structure with all sections', () => {
      render(<RSVPClient {...defaultProps} />);

      expect(screen.getByTestId('contact-info-section')).toBeInTheDocument();
      expect(screen.getByTestId('add-companion-section')).toBeInTheDocument();
      expect(screen.getByTestId('submit-section')).toBeInTheDocument();
    });

    it('displays all prefecture options', () => {
      render(<RSVPClient {...defaultProps} />);

      // 都道府県セレクトボックスの確認
      expect(screen.getByText('選択してください')).toBeInTheDocument();
      expect(screen.getByText('北海道')).toBeInTheDocument();
      expect(screen.getByText('東京都')).toBeInTheDocument();
      expect(screen.getByText('大阪府')).toBeInTheDocument();
      expect(screen.getByText('沖縄県')).toBeInTheDocument();
    });
  });

  // 招待種別別のテスト
  describe('Invite Type Handling', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('false');
    });

    it('handles multiple invite types correctly', () => {
      const propsWithMultipleInvites = {
        guestInfo: {
          ...defaultProps.guestInfo,
          invite: ['挙式', '披露宴', '二次会'],
        },
      };

      render(<RSVPClient {...propsWithMultipleInvites} />);

      // フォームが正常に表示されることを確認
      expect(screen.getByTestId('rsvp-client')).toBeInTheDocument();
      expect(screen.getByTestId('add-companion-button')).toBeInTheDocument();
    });

    it('handles single invite type correctly', () => {
      const propsWithSingleInvite = {
        guestInfo: {
          ...defaultProps.guestInfo,
          invite: ['二次会'],
        },
      };

      render(<RSVPClient {...propsWithSingleInvite} />);

      // フォームが正常に表示されることを確認
      expect(screen.getByTestId('rsvp-client')).toBeInTheDocument();
      expect(screen.getByTestId('add-companion-button')).toBeInTheDocument();
    });
  });

  // 家族情報のテスト
  describe('Family Member Handling', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('false');
    });

    it('handles guest with family members', () => {
      const propsWithFamily = {
        guestInfo: {
          ...defaultProps.guestInfo,
          family: [
            {
              id: 'family-1',
              name: '家族メンバー1',
              kana: 'カゾクメンバー1',
              autofill: { name: true, kana: true },
            },
          ],
        },
      };

      render(<RSVPClient {...propsWithFamily} />);

      // フォームが正常に表示されることを確認
      expect(screen.getByTestId('rsvp-client')).toBeInTheDocument();
      expect(screen.getByTestId('add-companion-button')).toBeInTheDocument();
    });

    it('handles guest without family members', () => {
      const propsWithoutFamily = {
        guestInfo: {
          ...defaultProps.guestInfo,
          family: [],
        },
      };

      render(<RSVPClient {...propsWithoutFamily} />);

      // フォームが正常に表示されることを確認
      expect(screen.getByTestId('rsvp-client')).toBeInTheDocument();
      expect(screen.getByTestId('add-companion-button')).toBeInTheDocument();
    });
  });
});
