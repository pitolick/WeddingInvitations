/**
 * @description Cardコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  describe('基本的なレンダリング', () => {
    it('子要素を正しくレンダリングする', () => {
      render(
        <Card>
          <div>テストコンテンツ</div>
        </Card>
      );

      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    });

    it('デフォルトのクラスが適用される', () => {
      const { container } = render(
        <Card>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('bg-white');
      expect(cardElement).toHaveClass('rounded-lg');
      expect(cardElement).toHaveClass('transition-all');
      expect(cardElement).toHaveClass('duration-200');
    });
  });

  describe('variant プロパティ', () => {
    it('デフォルトvariantが適用される', () => {
      const { container } = render(
        <Card>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('border');
      expect(cardElement).toHaveClass('border-gray-200');
    });

    it('elevatedバリアントが適用される', () => {
      const { container } = render(
        <Card variant='elevated'>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('shadow-md');
    });

    it('outlinedバリアントが適用される', () => {
      const { container } = render(
        <Card variant='outlined'>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('border-2');
      expect(cardElement).toHaveClass('border-lavender-200');
    });
  });

  describe('size プロパティ', () => {
    it('デフォルトサイズ(md)が適用される', () => {
      const { container } = render(
        <Card>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('p-6');
    });

    it('smサイズが適用される', () => {
      const { container } = render(
        <Card size='sm'>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('p-4');
    });

    it('lgサイズが適用される', () => {
      const { container } = render(
        <Card size='lg'>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('p-8');
    });
  });

  describe('hover プロパティ', () => {
    it('hoverがfalseの場合、ホバークラスが適用されない', () => {
      const { container } = render(
        <Card hover={false}>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).not.toHaveClass('hover:shadow-lg');
      expect(cardElement).not.toHaveClass('hover:transform');
      expect(cardElement).not.toHaveClass('hover:scale-105');
      expect(cardElement).not.toHaveClass('cursor-pointer');
    });

    it('hoverがtrueの場合、ホバークラスが適用される', () => {
      const { container } = render(
        <Card hover={true}>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('hover:shadow-lg');
      expect(cardElement).toHaveClass('hover:transform');
      expect(cardElement).toHaveClass('hover:scale-105');
      expect(cardElement).toHaveClass('cursor-pointer');
    });
  });

  describe('className プロパティ', () => {
    it('カスタムクラスが追加される', () => {
      const { container } = render(
        <Card className='custom-class'>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('custom-class');
    });

    it('デフォルトクラスとカスタムクラスが共存する', () => {
      const { container } = render(
        <Card className='custom-class'>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('bg-white');
      expect(cardElement).toHaveClass('custom-class');
    });
  });

  describe('onClick プロパティ', () => {
    it('クリックハンドラーが正しく動作する', () => {
      const handleClick = jest.fn();
      const { container } = render(
        <Card onClick={handleClick}>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      fireEvent.click(cardElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('onClickが指定されていない場合はエラーが発生しない', () => {
      const { container } = render(
        <Card>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(() => fireEvent.click(cardElement)).not.toThrow();
    });
  });

  describe('id プロパティ', () => {
    it('指定されたIDが適用される', () => {
      const { container } = render(
        <Card id='test-card'>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveAttribute('id', 'test-card');
    });

    it('IDが指定されていない場合はid属性が設定されない', () => {
      const { container } = render(
        <Card>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).not.toHaveAttribute('id');
    });
  });

  describe('複合プロパティのテスト', () => {
    it('すべてのプロパティが同時に正しく動作する', () => {
      const handleClick = jest.fn();
      const { container } = render(
        <Card
          variant='elevated'
          size='lg'
          hover={true}
          className='custom-class'
          onClick={handleClick}
          id='complex-card'
        >
          <div>複合テスト</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;

      // 基本クラス
      expect(cardElement).toHaveClass('bg-white');
      expect(cardElement).toHaveClass('rounded-lg');

      // variant
      expect(cardElement).toHaveClass('shadow-md');

      // size
      expect(cardElement).toHaveClass('p-8');

      // hover
      expect(cardElement).toHaveClass('hover:shadow-lg');
      expect(cardElement).toHaveClass('cursor-pointer');

      // className
      expect(cardElement).toHaveClass('custom-class');

      // id
      expect(cardElement).toHaveAttribute('id', 'complex-card');

      // onClick
      fireEvent.click(cardElement);
      expect(handleClick).toHaveBeenCalledTimes(1);

      // コンテンツ
      expect(screen.getByText('複合テスト')).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    it('divタグとして正しくレンダリングされる', () => {
      const { container } = render(
        <Card>
          <div>コンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.tagName).toBe('DIV');
    });

    it('clickableなカードでホバーとカーソルが適切に設定される', () => {
      const handleClick = jest.fn();
      const { container } = render(
        <Card onClick={handleClick} hover={true}>
          <div>クリック可能なコンテンツ</div>
        </Card>
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('cursor-pointer');
    });
  });
});
