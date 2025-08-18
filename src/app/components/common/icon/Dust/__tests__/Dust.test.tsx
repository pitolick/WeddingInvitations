/**
 * @description Dustアイコンコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dust from '../Dust';

describe('Dust', () => {
  describe('基本レンダリング', () => {
    it('デフォルトpropsでレンダリングされること', () => {
      const { container } = render(<Dust />);
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();
    });

    it('SVG要素が正しい属性を持つこと', () => {
      const { container } = render(<Dust />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveAttribute('width', '15');
      expect(svgElement).toHaveAttribute('height', '15');
      expect(svgElement).toHaveAttribute('viewBox', '0 0 15 16');
      expect(svgElement).toHaveAttribute('fill', 'none');
    });
  });

  describe('プロパティのカスタマイズ', () => {
    it('カスタムサイズが適用されること', () => {
      const { container } = render(<Dust size={32} />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveAttribute('width', '32');
      expect(svgElement).toHaveAttribute('height', '32');
    });

    it('カスタムカラーが適用されること', () => {
      const { container } = render(<Dust color='#ff0000' />);
      const pathElement = container.querySelector('path');

      expect(pathElement).toHaveAttribute('fill', '#ff0000');
    });

    it('カスタムクラス名が適用されること', () => {
      const { container } = render(<Dust className='custom-class' />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveClass('custom-class');
    });

    it('複数のプロパティが同時に適用されること', () => {
      const { container } = render(
        <Dust size={48} color='#00ff00' className='test-dust' />
      );
      const svgElement = container.querySelector('svg');
      const pathElement = container.querySelector('path');

      expect(svgElement).toHaveAttribute('width', '48');
      expect(svgElement).toHaveAttribute('height', '48');
      expect(pathElement).toHaveAttribute('fill', '#00ff00');
      expect(svgElement).toHaveClass('test-dust');
    });
  });

  describe('SVG内容', () => {
    it('pathエレメントが存在すること', () => {
      const { container } = render(<Dust />);
      const pathElements = container.querySelectorAll('path');

      expect(pathElements.length).toBeGreaterThan(0);
    });

    it('ダストの形状を表すパスが含まれていること', () => {
      const { container } = render(<Dust />);
      const svgElement = container.querySelector('svg');

      expect(svgElement?.innerHTML).toContain('path');
      expect(svgElement?.innerHTML).toContain('d=');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なaria-labelが設定できること', () => {
      const { container } = render(<Dust className='dust-icon' />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toBeInTheDocument();
    });
  });

  describe('エッジケース', () => {
    it('サイズ0でもエラーが発生しないこと', () => {
      expect(() => render(<Dust size={0} />)).not.toThrow();
    });

    it('負のサイズでもエラーが発生しないこと', () => {
      expect(() => render(<Dust size={-10} />)).not.toThrow();
    });

    it('空文字のクラス名でもエラーが発生しないこと', () => {
      expect(() => render(<Dust className='' />)).not.toThrow();
    });

    it('空文字のカラーでもエラーが発生しないこと', () => {
      expect(() => render(<Dust color='' />)).not.toThrow();
    });
  });
});
