/**
 * @description Closeアイコンコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Close } from '../Close';

describe('Close', () => {
  describe('基本レンダリング', () => {
    it('デフォルトpropsでレンダリングされること', () => {
      const { container } = render(<Close />);
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();
    });

    it('SVG要素が正しいデフォルト属性を持つこと', () => {
      const { container } = render(<Close />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');
      expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svgElement).toHaveAttribute('fill', 'none');
    });
  });

  describe('プロパティのカスタマイズ', () => {
    it('カスタム幅が適用されること', () => {
      const { container } = render(<Close width={32} />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveAttribute('width', '32');
    });

    it('カスタム高さが適用されること', () => {
      const { container } = render(<Close height={32} />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveAttribute('height', '32');
    });

    it('カスタムクラス名が適用されること', () => {
      const { container } = render(<Close className='custom-close' />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveClass('custom-close');
    });

    it('複数のプロパティが同時に適用されること', () => {
      const { container } = render(
        <Close width={48} height={48} className='test-close' />
      );
      const svgElement = container.querySelector('svg');

      expect(svgElement).toHaveAttribute('width', '48');
      expect(svgElement).toHaveAttribute('height', '48');
      expect(svgElement).toHaveClass('test-close');
    });
  });

  describe('SVG内容', () => {
    it('pathエレメントが存在すること', () => {
      const { container } = render(<Close />);
      const pathElements = container.querySelectorAll('path');

      expect(pathElements.length).toBeGreaterThan(0);
    });

    it('閉じるアイコンの形状を表すパスが含まれていること', () => {
      const { container } = render(<Close />);
      const svgElement = container.querySelector('svg');

      expect(svgElement?.innerHTML).toContain('path');
      expect(svgElement?.innerHTML).toContain('d=');
    });

    it('stroke属性が適切に設定されていること', () => {
      const { container } = render(<Close color='#ff0000' />);
      const pathElement = container.querySelector('path');

      expect(pathElement).toHaveAttribute('stroke', '#ff0000');
    });
  });

  describe('カラープロパティ', () => {
    it('デフォルトカラーが適用されること', () => {
      const { container } = render(<Close />);
      const pathElement = container.querySelector('path');

      expect(pathElement).toHaveAttribute('stroke', 'currentColor');
    });

    it('カスタムカラーが適用されること', () => {
      const { container } = render(<Close color='#0000ff' />);
      const pathElement = container.querySelector('path');

      expect(pathElement).toHaveAttribute('stroke', '#0000ff');
    });
  });

  describe('エッジケース', () => {
    it('幅0でもエラーが発生しないこと', () => {
      expect(() => render(<Close width={0} />)).not.toThrow();
    });

    it('高さ0でもエラーが発生しないこと', () => {
      expect(() => render(<Close height={0} />)).not.toThrow();
    });

    it('負のサイズでもエラーが発生しないこと', () => {
      expect(() => render(<Close width={-10} height={-10} />)).not.toThrow();
    });

    it('空文字のクラス名でもエラーが発生しないこと', () => {
      expect(() => render(<Close className='' />)).not.toThrow();
    });

    it('空文字のカラーでもエラーが発生しないこと', () => {
      expect(() => render(<Close color='' />)).not.toThrow();
    });
  });

  describe('アクセシビリティ', () => {
    it('SVG要素が存在すること', () => {
      const { container } = render(<Close />);
      const svgElement = container.querySelector('svg');

      expect(svgElement).toBeInTheDocument();
    });
  });
});
