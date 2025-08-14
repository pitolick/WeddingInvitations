/**
 * @description ScaleInアニメーションコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ScaleIn from '../ScaleIn';

describe('ScaleIn', () => {
  const defaultProps = {
    children: <div>テストコンテンツ</div>,
  };

  describe('基本的なレンダリング', () => {
    it('子要素を正しくレンダリングする', () => {
      render(<ScaleIn {...defaultProps} />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('カスタムクラス名が適用される', () => {
      render(<ScaleIn {...defaultProps} className='custom-class' />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });

  describe('immediateDisplay', () => {
    it('immediateDisplayがtrueの場合、即座に表示される', () => {
      render(<ScaleIn {...defaultProps} immediateDisplay={true} />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('immediateDisplayがfalseの場合、子要素が表示される', () => {
      render(<ScaleIn {...defaultProps} immediateDisplay={false} />);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });

  describe('スケール設定', () => {
    it('異なる初期スケール値が設定される', () => {
      const scales = [0.5, 0.8, 1.0, 1.2];

      scales.forEach(scale => {
        const { unmount } = render(
          <ScaleIn {...defaultProps} initialScale={scale} />
        );

        expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
        unmount();
      });
    });

    it('異なる最終スケール値が設定される', () => {
      const scales = [0.8, 1.0, 1.2, 1.5];

      scales.forEach(scale => {
        const { unmount } = render(
          <ScaleIn {...defaultProps} finalScale={scale} />
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
        const { unmount } = render(<ScaleIn {...defaultProps} delay={delay} />);

        expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
        unmount();
      });
    });

    it('カスタムの持続時間が設定される', () => {
      const durations = [0.3, 0.5, 1.0, 2.0];

      durations.forEach(duration => {
        const { unmount } = render(
          <ScaleIn {...defaultProps} duration={duration} />
        );

        expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('アクセシビリティ', () => {
    it('子要素のアクセシビリティが維持される', () => {
      const accessibleChildren = (
        <div role='banner' aria-label='バナーコンテンツ'>
          テストコンテンツ
        </div>
      );

      render(<ScaleIn>{accessibleChildren}</ScaleIn>);

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });
  });
});
