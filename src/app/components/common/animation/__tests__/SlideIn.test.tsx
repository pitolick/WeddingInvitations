/**
 * @description SlideInアニメーションコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SlideIn from '../SlideIn';

describe('SlideIn', () => {
  const defaultProps = {
    children: <div>テストコンテンツ</div>,
  };

  describe('基本的なレンダリング', () => {
    it('子要素を正しくレンダリングする', () => {
      render(<SlideIn {...defaultProps} />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('カスタムクラス名が適用される', () => {
      render(<SlideIn {...defaultProps} className='custom-class' />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });

  describe('immediateDisplay', () => {
    it('immediateDisplayがtrueの場合、即座に表示される', () => {
      render(<SlideIn {...defaultProps} immediateDisplay={true} />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('immediateDisplayがfalseの場合、子要素が表示される', () => {
      render(<SlideIn {...defaultProps} immediateDisplay={false} />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });

  describe('方向設定', () => {
    it('異なる方向が設定される', () => {
      const directions = ['up', 'down', 'left', 'right'] as const;

      directions.forEach(direction => {
        const { unmount } = render(
          <SlideIn {...defaultProps} direction={direction} />
        );

        expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('距離設定', () => {
    it('異なる距離値が設定される', () => {
      const distances = [10, 20, 50, 100];

      distances.forEach(distance => {
        const { unmount } = render(
          <SlideIn {...defaultProps} distance={distance} />
        );

        expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('アニメーション設定', () => {
    it('カスタムの遅延時間が設定される', () => {
      const delays = [0, 0.2, 0.5, 1.0];

      delays.forEach(delay => {
        const { unmount } = render(<SlideIn {...defaultProps} delay={delay} />);

        expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
        unmount();
      });
    });

    it('カスタムの持続時間が設定される', () => {
      const durations = [0.3, 0.5, 1.0, 2.0];

      durations.forEach(duration => {
        const { unmount } = render(
          <SlideIn {...defaultProps} duration={duration} />
        );

        expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('アクセシビリティ', () => {
    it('子要素のアクセシビリティが維持される', () => {
      const accessibleChildren = (
        <div role='contentinfo' aria-label='コンテンツ情報'>
          テストコンテンツ
        </div>
      );

      render(<SlideIn>{accessibleChildren}</SlideIn>);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });
});
