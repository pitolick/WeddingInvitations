/**
 * @description 404エラーページのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound Page', () => {
  describe('Basic Rendering', () => {
    it('renders the 404 page with all essential elements', () => {
      render(<NotFound />);

      // 404メッセージの確認
      expect(screen.getByText('404')).toBeInTheDocument();
      expect(
        screen.getByText('お探しのページが見つかりません')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          '申し訳ございませんが、お探しのページは存在しないか、移動された可能性があります。'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('招待状のURLをご確認ください')
      ).toBeInTheDocument();
    });

    it('renders the main heading with proper hierarchy', () => {
      render(<NotFound />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('お探しのページが見つかりません');
    });

    it('displays the 404 number prominently', () => {
      render(<NotFound />);

      const notFoundNumber = screen.getByText('404');
      expect(notFoundNumber).toBeInTheDocument();
      expect(notFoundNumber).toHaveClass('text-8xl');
      expect(notFoundNumber).toHaveClass('font-bold');
      expect(notFoundNumber).toHaveClass('text-gray-400');
    });
  });

  describe('Visual Design Elements', () => {
    it('has the correct background gradient', () => {
      const { container } = render(<NotFound />);

      // ルートコンテナの確認
      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveClass('min-h-screen');
      expect(rootDiv).toHaveClass('bg-gradient-to-br');
      expect(rootDiv).toHaveClass('from-blue-50');
      expect(rootDiv).toHaveClass('to-purple-50');
    });

    it('renders the warning icon SVG', () => {
      render(<NotFound />);

      // SVGアイコンの存在を確認
      const svgIcon = screen
        .getByText('404')
        .parentElement?.querySelector('svg');
      expect(svgIcon).toBeInTheDocument();
      expect(svgIcon).toHaveClass('text-pink-500');
      expect(svgIcon).toHaveAttribute('stroke', 'currentColor');
      expect(svgIcon).toHaveAttribute('fill', 'none');
    });

    it('renders decorative animation elements', () => {
      const { container } = render(<NotFound />);

      // 装飾要素（3つのアニメーションドット）の確認
      const animationContainer = container.querySelector('.opacity-30');
      expect(animationContainer).toBeInTheDocument();

      // アニメーション要素のスタイルを確認
      const animationElements =
        animationContainer?.querySelectorAll('.animate-pulse');
      expect(animationElements).toHaveLength(3);
    });
  });

  describe('Content Structure', () => {
    it('has proper content organization with correct spacing', () => {
      const { container } = render(<NotFound />);

      // メインコンテナの構造確認
      const mainContainer = container.querySelector('.max-w-md');
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass('max-w-md');
      expect(mainContainer).toHaveClass('w-full');
      expect(mainContainer).toHaveClass('text-center');
    });

    it('displays all informational messages', () => {
      render(<NotFound />);

      // 情報メッセージの確認
      expect(
        screen.getByText(
          '申し訳ございませんが、お探しのページは存在しないか、移動された可能性があります。'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('招待状のURLをご確認ください')
      ).toBeInTheDocument();
    });

    it('has proper text styling for different sections', () => {
      render(<NotFound />);

      // メインヘッディングのスタイル確認
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-2xl');
      expect(heading).toHaveClass('font-bold');
      expect(heading).toHaveClass('text-gray-800');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<NotFound />);

      // ヘッディングが適切に設定されているか確認
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(1);
      expect(headings[0].tagName).toBe('H1');
    });

    it('provides meaningful text content for screen readers', () => {
      render(<NotFound />);

      // 404数字が見出しとして認識されないことを確認（装飾的要素）
      const fourOhFour = screen.getByText('404');
      expect(fourOhFour.tagName).not.toBe('H1');
      expect(fourOhFour.tagName).not.toBe('H2');
      expect(fourOhFour.tagName).not.toBe('H3');
    });

    it('has descriptive content for users', () => {
      render(<NotFound />);

      // ユーザー向けの説明文が含まれていることを確認
      expect(screen.getByText(/申し訳ございませんが/)).toBeInTheDocument();
      expect(
        screen.getByText(/招待状のURLをご確認ください/)
      ).toBeInTheDocument();
    });
  });

  describe('Layout and Responsive Design', () => {
    it('uses responsive classes for different screen sizes', () => {
      const { container } = render(<NotFound />);

      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveClass('p-4'); // padding for mobile
      expect(rootDiv).toHaveClass('flex');
      expect(rootDiv).toHaveClass('items-center');
      expect(rootDiv).toHaveClass('justify-center');
    });

    it('has proper spacing and margin classes', () => {
      const { container } = render(<NotFound />);

      // 404セクション全体のマージン確認
      const fourOhFourSection = container.querySelector('.mb-8');
      expect(fourOhFourSection).toBeInTheDocument();

      // メッセージセクションのマージン確認
      const messageSections = container.querySelectorAll('.mb-8');
      expect(messageSections.length).toBeGreaterThan(0);
    });
  });

  describe('Theme and Styling', () => {
    it('uses the correct color scheme', () => {
      render(<NotFound />);

      // カラーパレットの確認
      const fourOhFour = screen.getByText('404');
      expect(fourOhFour).toHaveClass('text-gray-400');

      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-gray-800');

      // SVGアイコンの色確認
      const svgIcon = screen
        .getByText('404')
        .parentElement?.querySelector('svg');
      expect(svgIcon).toHaveClass('text-pink-500');
    });

    it('has consistent typography', () => {
      render(<NotFound />);

      // フォントサイズとウェイトの確認
      const fourOhFour = screen.getByText('404');
      expect(fourOhFour).toHaveClass('text-8xl');
      expect(fourOhFour).toHaveClass('font-bold');

      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-2xl');
      expect(heading).toHaveClass('font-bold');
    });
  });

  describe('Animation Elements', () => {
    it('renders pulsing animation elements with proper styling', () => {
      const { container } = render(<NotFound />);

      const animationContainer = container.querySelector('.opacity-30');
      expect(animationContainer).toBeInTheDocument();

      const pulsingElements =
        animationContainer?.querySelectorAll('.animate-pulse');
      expect(pulsingElements).toHaveLength(3);

      // 各アニメーション要素のスタイル確認
      pulsingElements?.forEach(element => {
        expect(element).toHaveClass('w-2');
        expect(element).toHaveClass('h-2');
        expect(element).toHaveClass('bg-purple-400');
        expect(element).toHaveClass('rounded-full');
        expect(element).toHaveClass('animate-pulse');
      });
    });

    it('has proper animation delay styling', () => {
      const { container } = render(<NotFound />);

      const animationContainer = container.querySelector('.opacity-30');
      const pulsingElements =
        animationContainer?.querySelectorAll('.animate-pulse');

      // アニメーション遅延のスタイル属性確認
      pulsingElements?.forEach((element, index) => {
        expect(element.getAttribute('style')).toContain(
          `animation-delay: ${index * 0.2}s`
        );
      });
    });
  });

  describe('Component Export and Structure', () => {
    it('exports the component as default', () => {
      // デフォルトエクスポートされたコンポーネントが正しく動作することを確認
      expect(NotFound).toBeDefined();
      expect(typeof NotFound).toBe('function');
    });

    it('renders without any props', () => {
      // プロップスなしでレンダリングできることを確認
      expect(() => render(<NotFound />)).not.toThrow();
    });

    it('maintains consistent rendering across multiple renders', () => {
      const { rerender } = render(<NotFound />);

      // 初回レンダリング
      expect(screen.getByText('404')).toBeInTheDocument();
      expect(
        screen.getByText('お探しのページが見つかりません')
      ).toBeInTheDocument();

      // 再レンダリング
      rerender(<NotFound />);
      expect(screen.getByText('404')).toBeInTheDocument();
      expect(
        screen.getByText('お探しのページが見つかりません')
      ).toBeInTheDocument();
    });
  });
});
