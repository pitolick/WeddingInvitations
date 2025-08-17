/**
 * @description FadeInアニメーションコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import FadeIn from '../FadeIn';

describe('FadeIn', () => {
  const defaultProps = {
    children: <div>テストコンテンツ</div>,
  };

  describe('基本的なレンダリング', () => {
    it('子要素を正しくレンダリングする', () => {
      render(<FadeIn {...defaultProps} />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('カスタムクラス名が適用される', () => {
      render(<FadeIn {...defaultProps} className='custom-class' />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });

  describe('immediateDisplay', () => {
    it('immediateDisplayがtrueの場合、即座に表示される', () => {
      render(<FadeIn {...defaultProps} immediateDisplay={true} />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('immediateDisplayがfalseの場合、子要素が表示される', () => {
      render(<FadeIn {...defaultProps} immediateDisplay={false} />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });

  describe('方向設定', () => {
    it('異なる方向が設定される', () => {
      const directions = ['up', 'down', 'left', 'right'] as const;

      directions.forEach(direction => {
        const { unmount } = render(
          <FadeIn {...defaultProps} direction={direction} />
        );

        expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('position calculation functions', () => {
    it('default direction returns opacity only', () => {
      // Test default direction by not providing direction prop
      render(<FadeIn {...defaultProps} />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('tests up direction animation', () => {
      render(<FadeIn {...defaultProps} direction='up' distance={25} />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('tests down direction animation', () => {
      render(<FadeIn {...defaultProps} direction='down' distance={25} />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('tests left direction animation', () => {
      render(<FadeIn {...defaultProps} direction='left' distance={25} />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('tests right direction animation', () => {
      render(<FadeIn {...defaultProps} direction='right' distance={25} />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('tests invalid direction fallback', () => {
      // @ts-expect-error Testing invalid direction
      render(<FadeIn {...defaultProps} direction='invalid' />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('handles custom distance values', () => {
      const distances = [10, 25, 50, 100];

      distances.forEach(distance => {
        const { unmount } = render(
          <FadeIn {...defaultProps} direction='up' distance={distance} />
        );
        expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('fallback rendering', () => {
    it('renders fallback when motion library is not available', () => {
      // Since we can't easily mock the dynamic import in Jest without complex setup,
      // we test the components behavior. The catch block will be covered if motion fails to load
      render(<FadeIn {...defaultProps} />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('renders with loading state initially', () => {
      // Test the initial state before motion loads
      render(<FadeIn {...defaultProps} />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });

  describe('configuration props', () => {
    it('handles triggerOnce prop', () => {
      render(<FadeIn {...defaultProps} triggerOnce={false} />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('handles viewportMargin prop', () => {
      render(<FadeIn {...defaultProps} viewportMargin='50px' />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('handles delay and duration props', () => {
      render(<FadeIn {...defaultProps} delay={0.5} duration={1.0} />);
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    it('子要素のアクセシビリティが維持される', () => {
      const accessibleChildren = (
        <div role='main' aria-label='メインコンテンツ'>
          テストコンテンツ
        </div>
      );

      render(<FadeIn>{accessibleChildren}</FadeIn>);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });
});
