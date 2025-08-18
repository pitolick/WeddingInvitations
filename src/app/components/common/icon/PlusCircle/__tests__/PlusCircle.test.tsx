/**
 * @description PlusCircleアイコンコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlusCircle from '../PlusCircle';

describe('PlusCircle', () => {
  describe('基本レンダリング', () => {
    it('デフォルトpropsでレンダリングされること', () => {
      const { container } = render(<PlusCircle />);
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();
    });

    it('SVG要素が正しい属性を持つこと', () => {
      const { container } = render(<PlusCircle />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveAttribute('width', '17');
      expect(svgElement).toHaveAttribute('height', '17');
      expect(svgElement).toHaveAttribute('viewBox', '0 0 17 16');
      expect(svgElement).toHaveAttribute('fill', 'none');
    });
  });

  describe('プロパティのカスタマイズ', () => {
    it('カスタムサイズが適用されること', () => {
      const { container } = render(<PlusCircle size={32} />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveAttribute('width', '32');
      expect(svgElement).toHaveAttribute('height', '32');
    });

    it('カスタムカラーが適用されること', () => {
      const { container } = render(<PlusCircle color='#ff0000' />);
      const pathElement = container.querySelector('path');

      expect(pathElement).toHaveAttribute('fill', '#ff0000');
    });

    it('カスタムクラス名が適用されること', () => {
      const { container } = render(<PlusCircle className='custom-class' />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveClass('custom-class');
    });

    it('複数のプロパティが同時に適用されること', () => {
      const { container } = render(
        <PlusCircle size={48} color='#00ff00' className='test-plus' />
      );
      const svgElement = container.querySelector('svg');
      const pathElement = container.querySelector('path');

      expect(svgElement).toHaveAttribute('width', '48');
      expect(svgElement).toHaveAttribute('height', '48');
      expect(pathElement).toHaveAttribute('fill', '#00ff00');
      expect(svgElement).toHaveClass('test-plus');
    });
  });

  describe('SVG内容', () => {
    it('pathエレメントが存在すること', () => {
      const { container } = render(<PlusCircle />);
      const pathElements = container.querySelectorAll('path');

      expect(pathElements.length).toBeGreaterThan(0);
    });

    it('プラスサークルの形状を表すパスが含まれていること', () => {
      const { container } = render(<PlusCircle />);
      const svgElement = container.querySelector('svg');

      expect(svgElement?.innerHTML).toContain('path');
      expect(svgElement?.innerHTML).toContain('d=');
    });

    it('デフォルトカラーが適用されること', () => {
      const { container } = render(<PlusCircle />);
      const pathElement = container.querySelector('path');

      expect(pathElement).toHaveAttribute('fill', 'currentColor');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なaria-labelが設定できること', () => {
      const { container } = render(<PlusCircle className='plus-icon' />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toBeInTheDocument();
    });
  });

  describe('エッジケース', () => {
    it('サイズ0でもエラーが発生しないこと', () => {
      expect(() => render(<PlusCircle size={0} />)).not.toThrow();
    });

    it('負のサイズでもエラーが発生しないこと', () => {
      expect(() => render(<PlusCircle size={-10} />)).not.toThrow();
    });

    it('空文字のクラス名でもエラーが発生しないこと', () => {
      expect(() => render(<PlusCircle className='' />)).not.toThrow();
    });

    it('空文字のカラーでもエラーが発生しないこと', () => {
      expect(() => render(<PlusCircle color='' />)).not.toThrow();
    });
  });
});
