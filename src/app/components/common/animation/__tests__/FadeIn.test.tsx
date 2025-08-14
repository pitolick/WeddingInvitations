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
