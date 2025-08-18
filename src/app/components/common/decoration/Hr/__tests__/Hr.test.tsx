/**
 * @description Hrコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Hr from '../Hr';

// HrLeftとHrRightアイコンコンポーネントをモック
jest.mock('../../../icon/HrLeft/HrLeft', () => {
  return function MockHrLeft({
    size,
    className,
  }: {
    size: number;
    className: string;
  }) {
    return (
      <div
        data-testid='hr-left'
        className={className}
        style={{ width: size, height: size }}
      />
    );
  };
});

jest.mock('../../../icon/HrRight/HrRight', () => {
  return function MockHrRight({
    size,
    className,
  }: {
    size: number;
    className: string;
  }) {
    return (
      <div
        data-testid='hr-right'
        className={className}
        style={{ width: size, height: size }}
      />
    );
  };
});

/**
 * @description Hrコンポーネントの基本表示テスト
 */
describe('Hr Component', () => {
  const defaultProps = {
    className: 'custom-class',
  };

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders hr component correctly', () => {
    render(<Hr />);

    const hr = screen.getByTestId('hr');
    expect(hr).toBeInTheDocument();
  });

  /**
   * @description デフォルトのスタイリングが正しく適用される
   */
  it('has correct default styling', () => {
    render(<Hr />);

    const hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('relative', 'flex', 'items-center', 'h-12');
  });

  /**
   * @description カスタムクラスが正しく適用される
   */
  it('applies custom className correctly', () => {
    render(<Hr {...defaultProps} />);

    const hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('custom-class');
  });

  /**
   * @description デフォルトクラスとカスタムクラスが両方適用される
   */
  it('applies both default and custom classes', () => {
    render(<Hr {...defaultProps} />);

    const hr = screen.getByTestId('hr');
    expect(hr).toHaveClass(
      'relative',
      'flex',
      'items-center',
      'h-12',
      'custom-class'
    );
  });

  /**
   * @description コンポーネントの基本構造が正しい
   */
  it('has correct component structure', () => {
    render(<Hr />);

    const hr = screen.getByTestId('hr');
    expect(hr.tagName).toBe('DIV');
  });

  /**
   * @description アクセシビリティ属性が正しく設定される
   */
  it('has correct accessibility attributes', () => {
    render(<Hr />);

    const hr = screen.getByTestId('hr');
    expect(hr).toHaveAttribute('data-testid', 'hr');
  });

  /**
   * @description 複数のインスタンスが正しく表示される
   */
  it('renders multiple instances correctly', () => {
    render(
      <div>
        <Hr />
        <Hr />
        <Hr />
      </div>
    );

    const hrElements = screen.getAllByTestId('hr');
    expect(hrElements).toHaveLength(3);
  });

  /**
   * @description 異なるカスタムクラスが正しく適用される
   */
  it('applies different custom classes correctly', () => {
    const { rerender } = render(<Hr className='first-hr' />);
    let hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('first-hr');

    rerender(<Hr className='second-hr' />);
    hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('second-hr');
  });

  /**
   * @description 空のクラス名が正しく処理される
   */
  it('handles empty className correctly', () => {
    render(<Hr className='' />);

    const hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('relative', 'flex', 'items-center', 'h-12');
  });

  /**
   * @description スペース区切りのクラス名が正しく処理される
   */
  it('handles space-separated class names correctly', () => {
    render(<Hr className='class1 class2 class3' />);

    const hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('class1', 'class2', 'class3');
  });

  /**
   * @description レスポンシブクラスが正しく適用される
   */
  it('has correct responsive classes', () => {
    render(<Hr />);

    const hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('h-12');
  });

  /**
   * @description 装飾アイコンが正しく表示される
   */
  it('displays decoration icons correctly', () => {
    render(<Hr />);

    const leftIcon = screen.getByTestId('hr-left');
    const rightIcon = screen.getByTestId('hr-right');

    expect(leftIcon).toBeInTheDocument();
    expect(rightIcon).toBeInTheDocument();
  });

  /**
   * @description 水平線が正しく表示される
   */
  it('displays horizontal line correctly', () => {
    render(<Hr />);

    const hr = screen.getByTestId('hr');
    const line = hr.querySelector('.flex-1');

    expect(line).toBeInTheDocument();
    expect(line).toHaveClass('bg-lavender-600', 'h-px');
  });

  /**
   * @description カスタムサイズが正しく適用される
   */
  it('applies custom size correctly', () => {
    render(<Hr iconSize={50} />);

    const leftIcon = screen.getByTestId('hr-left');
    const rightIcon = screen.getByTestId('hr-right');

    expect(leftIcon).toHaveStyle({ width: '50px', height: '50px' });
    expect(rightIcon).toHaveStyle({ width: '50px', height: '50px' });
  });

  /**
   * @description カスタムカラーが正しく適用される
   */
  it('applies custom color correctly', () => {
    render(<Hr color='text-blue-600' />);

    const leftIcon = screen.getByTestId('hr-left');
    const rightIcon = screen.getByTestId('hr-right');

    expect(leftIcon).toHaveClass('text-blue-600');
    expect(rightIcon).toHaveClass('text-blue-600');
  });

  /**
   * @description カスタム幅が正しく適用される
   */
  it('applies custom width correctly', () => {
    render(<Hr width={300} />);

    const hr = screen.getByTestId('hr');
    expect(hr).toHaveStyle({ width: '300px' });
  });

  /**
   * @description カスタム高さが正しく適用される
   */
  it('applies custom height correctly', () => {
    render(<Hr containerHeight='h-20' />);

    const hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('h-20');
  });

  /**
   * @description カスタム線の高さが正しく適用される
   */
  it('applies custom line height correctly', () => {
    render(<Hr lineHeight='h-2' />);

    const hr = screen.getByTestId('hr');
    const line = hr.querySelector('.flex-1');

    expect(line).toHaveClass('h-2');
  });

  /**
   * @description カスタム線の色が正しく適用される
   */
  it('applies custom line color correctly', () => {
    render(<Hr lineColor='bg-blue-600' />);

    const hr = screen.getByTestId('hr');
    const line = hr.querySelector('.flex-1');

    expect(line).toHaveClass('bg-blue-600');
  });

  /**
   * @description 動的なクラス変更が正しく反映される
   */
  it('reflects dynamic class changes correctly', () => {
    const { rerender } = render(<Hr className='initial-class' />);

    // 初期状態
    let hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('initial-class');

    // クラス変更
    rerender(<Hr className='updated-class' />);
    hr = screen.getByTestId('hr');
    expect(hr).toHaveClass('updated-class');
    expect(hr).not.toHaveClass('initial-class');
  });

  /**
   * @description アイコンの位置が正しく設定される
   */
  it('has correct icon positioning', () => {
    render(<Hr />);

    const leftIconContainer = screen.getByTestId('hr-left').parentElement;
    const rightIconContainer = screen.getByTestId('hr-right').parentElement;

    expect(leftIconContainer).toHaveClass(
      'absolute',
      'left-0',
      '-translate-y-1/2'
    );
    expect(rightIconContainer).toHaveClass(
      'absolute',
      'right-0',
      '-translate-y-1/2'
    );
  });
});
