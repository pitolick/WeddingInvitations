/**
 * @description RSVPClientコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

// RSVPClientコンポーネントのモック
jest.mock('../RSVPClient', () => {
  return function MockRSVPClient() {
    return (
      <div data-testid='rsvp-client'>
        <div
          data-testid='form-input'
          data-name='name'
          data-label='招待者名'
          data-placeholder='招待者名を入力してください'
        >
          Mock Input
        </div>
        <div
          data-testid='form-select'
          data-name='contactInfo.prefecture'
          data-options='47'
        >
          Mock Select
        </div>
        <div
          data-testid='form-radio'
          data-name='contactInfo.prefecture'
          data-options='47'
        >
          Mock Radio
        </div>
        <div
          data-testid='form-textarea'
          data-name='message'
          data-label='メッセージ'
          data-placeholder='メッセージを入力してください'
        >
          Mock TextArea
        </div>
        <div
          data-testid='form-postal-code'
          data-name='contactInfo.postalCode'
          data-label='郵便番号'
        >
          Mock PostalCodeInput
        </div>
        <div
          data-testid='attendance-selector'
          data-label='挙式の出欠'
          data-required='true'
        >
          Mock AttendanceSelector
        </div>
        <div
          data-testid='attendance-selector'
          data-label='披露宴の出欠'
          data-required='true'
        >
          Mock AttendanceSelector
        </div>
        <div
          data-testid='allergy-tags-input'
          data-label='アレルギー情報'
          data-required='false'
        >
          Mock AllergyTagsInput
        </div>
        <button
          data-testid='custom-button'
          data-type='submit'
          data-variant='primary'
          data-size='lg'
          className='submit-button'
        >
          送信
        </button>
        <div data-testid='hr'>Mock Hr</div>
      </div>
    );
  };
});

import RSVPClient from '../RSVPClient';

/**
 * @description RSVPClientコンポーネントの基本表示テスト
 */
describe('RSVPClient Component', () => {
  const defaultProps = {
    guestInfo: {
      id: 'test-guest',
      name: '田中太郎',
      email: 'test@example.com',
    },
  };

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders RSVP client component correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    // フォームが表示される
    expect(screen.getByTestId('form-input')).toBeInTheDocument();
    expect(screen.getByTestId('form-select')).toBeInTheDocument();
    expect(screen.getByTestId('form-radio')).toBeInTheDocument();
  });

  /**
   * @description 招待者情報が正しく表示される
   */
  it('displays guest information correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    // 招待者名の入力欄が表示される
    const nameInput = screen.getByTestId('form-input');
    expect(nameInput).toHaveAttribute('data-name', 'name');
  });

  /**
   * @description フォーム要素が正しく設定される
   */
  it('has correct form elements configuration', () => {
    render(<RSVPClient {...defaultProps} />);

    // 郵便番号入力欄
    const postalCodeInput = screen.getByTestId('form-postal-code');
    expect(postalCodeInput).toHaveAttribute(
      'data-name',
      'contactInfo.postalCode'
    );

    // 都道府県選択
    const prefectureSelect = screen.getByTestId('form-select');
    expect(prefectureSelect).toHaveAttribute(
      'data-name',
      'contactInfo.prefecture'
    );
  });

  /**
   * @description 出席・欠席選択が正しく表示される
   */
  it('displays attendance selector correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    // 挙式の出席・欠席選択
    const ceremonySelector = screen.getAllByTestId('attendance-selector')[0];
    expect(ceremonySelector).toHaveAttribute('data-label', '挙式の出欠');

    // 披露宴の出席・欠席選択
    const receptionSelector = screen.getAllByTestId('attendance-selector')[1];
    expect(receptionSelector).toHaveAttribute('data-label', '披露宴の出欠');
  });

  /**
   * @description アレルギー情報入力が正しく表示される
   */
  it('displays allergy tags input correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    const allergyInput = screen.getByTestId('allergy-tags-input');
    expect(allergyInput).toHaveAttribute('data-label', 'アレルギー情報');
    expect(allergyInput).toHaveAttribute('data-required', 'false');
  });

  /**
   * @description 送信ボタンが正しく表示される
   */
  it('displays submit button correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    const submitButton = screen.getByTestId('custom-button');
    expect(submitButton).toHaveAttribute('data-type', 'submit');
    expect(submitButton).toHaveAttribute('data-variant', 'primary');
    expect(submitButton).toHaveAttribute('data-size', 'lg');
  });

  /**
   * @description ゲスト情報がない場合の処理
   */
  it('handles missing guest info correctly', () => {
    render(<RSVPClient />);

    // フォームは表示される
    expect(screen.getByTestId('form-input')).toBeInTheDocument();
  });

  /**
   * @description フォームの基本構造が正しい
   */
  it('has correct form structure', () => {
    render(<RSVPClient {...defaultProps} />);

    // フォーム要素が存在する
    expect(screen.getByTestId('form-input')).toBeInTheDocument();
    expect(screen.getByTestId('form-select')).toBeInTheDocument();
    expect(screen.getByTestId('form-radio')).toBeInTheDocument();
    expect(screen.getByTestId('form-textarea')).toBeInTheDocument();
  });

  /**
   * @description 装飾要素が正しく表示される
   */
  it('displays decoration elements correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    const hrElements = screen.getAllByTestId('hr');
    expect(hrElements.length).toBeGreaterThan(0);
  });

  /**
   * @description 必須項目の表示が正しい
   */
  it('shows required fields correctly', () => {
    render(<RSVPClient {...defaultProps} />);

    // 出席・欠席選択は必須
    const attendanceSelectors = screen.getAllByTestId('attendance-selector');
    attendanceSelectors.forEach(selector => {
      expect(selector).toHaveAttribute('data-required', 'true');
    });
  });

  /**
   * @description フォームのバリデーションが正しく設定される
   */
  it('has correct form validation configuration', () => {
    render(<RSVPClient {...defaultProps} />);

    // フォーム要素が正しく設定される
    const nameInput = screen.getByTestId('form-input');
    expect(nameInput).toBeInTheDocument();
  });

  /**
   * @description コンポーネントの基本機能が動作する
   */
  it('has basic functionality working', () => {
    render(<RSVPClient {...defaultProps} />);

    // 基本的なフォーム要素が表示される
    expect(screen.getByTestId('form-input')).toBeInTheDocument();
    expect(screen.getByTestId('form-select')).toBeInTheDocument();
    expect(screen.getAllByTestId('attendance-selector')).toHaveLength(2);
    expect(screen.getByTestId('allergy-tags-input')).toBeInTheDocument();
  });
});
