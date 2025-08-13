/**
 * @description AttendanceSelectorコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AttendanceSelector from '../AttendanceSelector';

// Next.js Imageコンポーネントのモック
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  }) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        data-testid='next-image'
      />
    );
  };
});

/**
 * @description AttendanceSelectorコンポーネントの基本表示テスト
 */
describe('AttendanceSelector Component', () => {
  const defaultProps = {
    value: '' as 'attending' | 'declined' | '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders attendance selector component correctly', () => {
    render(<AttendanceSelector {...defaultProps} />);

    // ラベルが表示される
    expect(screen.getByText('出席・欠席の選択')).toBeInTheDocument();

    // 出席・欠席の選択肢が表示される
    expect(screen.getByText('御出席')).toBeInTheDocument();
    expect(screen.getByText('御欠席')).toBeInTheDocument();
  });

  /**
   * @description ラジオボタンが正しく設定される
   */
  it('has correct radio button configuration', () => {
    render(<AttendanceSelector {...defaultProps} />);

    // ラジオボタンが存在する（sr-onlyで非表示）
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(2);

    // 出席のラジオボタン
    const attendingRadio = radioButtons[0];
    expect(attendingRadio).toHaveAttribute('value', 'attending');
    expect(attendingRadio).toHaveAttribute('name', 'attendance');

    // 欠席のラジオボタン
    const declinedRadio = radioButtons[1];
    expect(declinedRadio).toHaveAttribute('value', 'declined');
    expect(declinedRadio).toHaveAttribute('name', 'attendance');
  });

  /**
   * @description 出席を選択した時の動作
   */
  it('handles attending selection correctly', () => {
    const onChange = jest.fn();
    render(<AttendanceSelector {...defaultProps} onChange={onChange} />);

    const attendingLabel = screen.getByText('御出席');
    fireEvent.click(attendingLabel);

    // onChangeが正しく呼び出される
    expect(onChange).toHaveBeenCalledWith('attending');
  });

  /**
   * @description 欠席を選択した時の動作
   */
  it('handles declined selection correctly', () => {
    const onChange = jest.fn();
    render(<AttendanceSelector {...defaultProps} onChange={onChange} />);

    const declinedLabel = screen.getByText('御欠席');
    fireEvent.click(declinedLabel);

    // onChangeが正しく呼び出される
    expect(onChange).toHaveBeenCalledWith('declined');
  });

  /**
   * @description 選択状態での表示が正しい
   */
  it('displays correctly when value is selected', () => {
    render(<AttendanceSelector {...defaultProps} value='attending' />);

    // 選択状態では「出席」「欠席」と表示される
    expect(screen.getByText('出席')).toBeInTheDocument();
    expect(screen.getByText('欠席')).toBeInTheDocument();

    // 画像が表示される
    const images = screen.getAllByTestId('next-image');
    expect(images).toHaveLength(2);
  });

  /**
   * @description 出席選択時の画像が正しく表示される
   */
  it('shows correct image when attending is selected', () => {
    render(<AttendanceSelector {...defaultProps} value='attending' />);

    const images = screen.getAllByTestId('next-image');

    // 出席選択時は出席画像が表示される
    expect(images[0]).toHaveAttribute(
      'src',
      '/images/sections/rsvp/rsvp-attendance.webp'
    );
    expect(images[0]).toHaveAttribute('alt', '出席');

    // 欠席選択時は欠席画像が表示される
    expect(images[1]).toHaveAttribute(
      'src',
      '/images/sections/rsvp/rsvp-absence.webp'
    );
    expect(images[1]).toHaveAttribute('alt', '欠席');
  });

  /**
   * @description 欠席選択時の画像が正しく表示される
   */
  it('shows correct image when declined is selected', () => {
    render(<AttendanceSelector {...defaultProps} value='declined' />);

    const images = screen.getAllByTestId('next-image');

    // 出席選択時は欠席画像が表示される
    expect(images[0]).toHaveAttribute(
      'src',
      '/images/sections/rsvp/rsvp-absence.webp'
    );
    expect(images[0]).toHaveAttribute('alt', '出席');

    // 欠席選択時は出席画像が表示される
    expect(images[1]).toHaveAttribute(
      'src',
      '/images/sections/rsvp/rsvp-attendance.webp'
    );
    expect(images[1]).toHaveAttribute('alt', '欠席');
  });

  /**
   * @description カスタムラベルが正しく表示される
   */
  it('displays custom label correctly', () => {
    const customLabel = '挙式の出欠';
    render(<AttendanceSelector {...defaultProps} label={customLabel} />);

    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  /**
   * @description 必須項目の表示が正しい
   */
  it('shows required indicator correctly', () => {
    render(<AttendanceSelector {...defaultProps} required />);

    // 必須マークが表示される
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-pink-500');
  });

  /**
   * @description カスタムname属性が正しく設定される
   */
  it('uses custom name attribute correctly', () => {
    const customName = 'custom-attendance';
    render(<AttendanceSelector {...defaultProps} name={customName} />);

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toHaveAttribute('name', customName);
    });
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<AttendanceSelector {...defaultProps} className={customClass} />);

    const container = screen.getByText('出席・欠席の選択').closest('div');
    expect(container).toHaveClass(customClass, 'space-y-2');
  });

  /**
   * @description ラベルのスタイリングが正しい
   */
  it('has correct label styling', () => {
    render(<AttendanceSelector {...defaultProps} />);

    const label = screen.getByText('出席・欠席の選択');
    expect(label).toHaveClass(
      'block',
      'font-noto',
      'text-sm',
      'font-medium',
      'text-gray-700',
      'text-start',
      'border-b',
      'border-gray-300',
      'pb-2'
    );
  });

  /**
   * @description オプションのスタイリングが正しい
   */
  it('has correct option styling', () => {
    render(<AttendanceSelector {...defaultProps} />);

    const attendingLabel = screen.getByText('御出席');
    const declinedLabel = screen.getByText('御欠席');

    // 共通のスタイル
    [attendingLabel, declinedLabel].forEach(label => {
      expect(label).toHaveClass(
        'text-center',
        'font-noto',
        'font-bold',
        'text-xl'
      );
    });
  });

  /**
   * @description 画像のスタイリングが正しい
   */
  it('has correct image styling', () => {
    render(<AttendanceSelector {...defaultProps} value='attending' />);

    const images = screen.getAllByTestId('next-image');
    images.forEach(image => {
      expect(image).toHaveAttribute('width', '80');
      expect(image).toHaveAttribute('height', '80');
      expect(image).toHaveClass('object-cover');
    });
  });

  /**
   * @description 画像コンテナのスタイリングが正しい
   */
  it('has correct image container styling', () => {
    render(<AttendanceSelector {...defaultProps} value='attending' />);

    const imageContainers = screen
      .getAllByTestId('next-image')
      .map(img => img.closest('div'));
    imageContainers.forEach(container => {
      expect(container).toHaveClass(
        'absolute',
        'size-20',
        'flex',
        'justify-center',
        'items-center'
      );
    });
  });

  /**
   * @description オプションコンテナのレイアウトが正しい
   */
  it('has correct options container layout', () => {
    render(<AttendanceSelector {...defaultProps} />);

    // オプションコンテナを正しく取得
    const optionsContainer = screen
      .getByText('御出席')
      ?.closest('label')?.parentElement;
    expect(optionsContainer).toBeTruthy();
    expect(optionsContainer).toHaveClass(
      'flex',
      'flex-row',
      'justify-center',
      'gap-8'
    );
  });

  /**
   * @description テキストのスタイリングが正しい
   */
  it('has correct text styling', () => {
    render(<AttendanceSelector {...defaultProps} />);

    const attendingText = screen.getByText('御出席');
    const declinedText = screen.getByText('御欠席');

    [attendingText, declinedText].forEach(text => {
      expect(text).toHaveClass(
        'text-center',
        'font-noto',
        'font-bold',
        'text-xl'
      );
    });
  });

  /**
   * @description 初期状態での画像表示がない
   */
  it('does not show images initially', () => {
    render(<AttendanceSelector {...defaultProps} />);

    // 初期状態では画像が表示されない
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
  });

  /**
   * @description 選択状態での画像表示がある
   */
  it('shows images when value is selected', () => {
    render(<AttendanceSelector {...defaultProps} value='attending' />);

    // 選択状態では画像が表示される
    const images = screen.getAllByTestId('next-image');
    expect(images).toHaveLength(2);
  });
});
