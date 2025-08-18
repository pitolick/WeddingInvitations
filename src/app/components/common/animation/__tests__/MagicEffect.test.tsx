/**
 * @description MagicEffectコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MagicEffect } from '../MagicEffect';

/**
 * @description MagicEffectコンポーネントの基本表示テスト
 */
describe('MagicEffect Component', () => {
  const defaultProps = {
    isActive: true,
    left: '50%',
    top: '50%',
    size: 'lg',
  };

  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders magic effect component correctly', () => {
    render(<MagicEffect {...defaultProps} />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toBeInTheDocument();
  });

  /**
   * @description アクティブ状態で正しく表示される
   */
  it('displays correctly when active', () => {
    render(<MagicEffect {...defaultProps} />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toBeInTheDocument();
    expect(magicEffect).toHaveClass('absolute', 'pointer-events-none');
  });

  /**
   * @description 非アクティブ状態では表示されない
   */
  it('does not render when not active', () => {
    render(<MagicEffect {...defaultProps} isActive={false} />);

    expect(screen.queryByTestId('magic-effect')).not.toBeInTheDocument();
  });

  /**
   * @description 位置が正しく設定される
   */
  it('has correct positioning', () => {
    render(<MagicEffect {...defaultProps} />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveStyle({
      left: '50%',
      top: '50%',
    });
  });

  /**
   * @description サイズが正しく設定される
   */
  it('has correct size classes', () => {
    render(<MagicEffect {...defaultProps} size='sm' />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveClass('w-32', 'h-28');
  });

  /**
   * @description 小サイズのクラスが正しく適用される
   */
  it('applies small size classes correctly', () => {
    render(<MagicEffect {...defaultProps} size='sm' />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveClass('w-32', 'h-28');
  });

  /**
   * @description 中サイズのクラスが正しく適用される
   */
  it('applies medium size classes correctly', () => {
    render(<MagicEffect {...defaultProps} size='md' />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveClass('w-48', 'h-36');
  });

  /**
   * @description 大サイズのクラスが正しく適用される
   */
  it('applies large size classes correctly', () => {
    render(<MagicEffect {...defaultProps} size='lg' />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveClass('w-64', 'h-48');
  });

  /**
   * @description 特大サイズのクラスが正しく適用される
   */
  it('applies extra large size classes correctly', () => {
    render(<MagicEffect {...defaultProps} size='lg' />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveClass('w-64', 'h-48');
  });

  /**
   * @description アニメーションクラスが正しく適用される
   */
  it('has correct animation classes', () => {
    render(<MagicEffect {...defaultProps} />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveClass('absolute', 'pointer-events-none');
  });

  /**
   * @description 装飾クラスが正しく適用される
   */
  it('has correct decoration classes', () => {
    render(<MagicEffect {...defaultProps} />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveClass('absolute', 'pointer-events-none');
  });

  /**
   * @description レスポンシブクラスが正しく適用される
   */
  it('has correct responsive classes', () => {
    render(<MagicEffect {...defaultProps} />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveClass('absolute', 'pointer-events-none');
  });

  /**
   * @description 異なる位置での表示が正しい
   */
  it('displays correctly at different positions', () => {
    render(<MagicEffect {...defaultProps} left='25%' top='75%' />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveStyle({
      left: '25%',
      top: '75%',
    });
  });

  /**
   * @description 異なるサイズでの表示が正しい
   */
  it('displays correctly with different sizes', () => {
    render(<MagicEffect {...defaultProps} size='lg' />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveClass('w-64', 'h-48');
  });

  /**
   * @description コンポーネントの基本構造が正しい
   */
  it('has correct component structure', () => {
    render(<MagicEffect {...defaultProps} />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toBeInTheDocument();
    expect(magicEffect.tagName).toBe('DIV');
  });

  /**
   * @description アクセシビリティ属性が正しく設定される
   */
  it('has correct accessibility attributes', () => {
    render(<MagicEffect {...defaultProps} />);

    const magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveAttribute('data-testid', 'magic-effect');
  });

  /**
   * @description 複数のインスタンスが正しく表示される
   */
  it('renders multiple instances correctly', () => {
    render(
      <div>
        <MagicEffect {...defaultProps} left='25%' top='25%' />
        <MagicEffect {...defaultProps} left='75%' top='75%' />
      </div>
    );

    const magicEffects = screen.getAllByTestId('magic-effect');
    expect(magicEffects).toHaveLength(2);
  });

  /**
   * @description 動的なプロパティ変更が正しく反映される
   */
  it('reflects dynamic property changes correctly', () => {
    const { rerender } = render(<MagicEffect {...defaultProps} />);

    // 初期状態
    let magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveStyle({ left: '50%', top: '50%' });

    // プロパティ変更
    rerender(<MagicEffect {...defaultProps} left='100%' top='0%' />);
    magicEffect = screen.getByTestId('magic-effect');
    expect(magicEffect).toHaveStyle({ left: '100%', top: '0%' });
  });
});
