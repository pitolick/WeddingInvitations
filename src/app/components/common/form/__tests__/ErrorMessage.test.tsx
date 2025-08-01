/**
 * @description ErrorMessageコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('エラーメッセージを表示する', () => {
    render(<ErrorMessage message='テストエラー' hasError={true} />);

    expect(screen.getByText('テストエラー')).toBeInTheDocument();
  });

  it('エラーがない場合は何も表示しない', () => {
    const { container } = render(<ErrorMessage message='' hasError={false} />);

    expect(container.firstChild).toBeNull();
  });

  it('アイコンを表示する', () => {
    render(
      <ErrorMessage message='テストエラー' hasError={true} showIcon={true} />
    );

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('アイコンを非表示にする', () => {
    render(
      <ErrorMessage message='テストエラー' hasError={true} showIcon={false} />
    );

    const svg = document.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  it('異なるバリアントでスタイルが適用される', () => {
    const { rerender } = render(
      <ErrorMessage message='テストエラー' hasError={true} variant='default' />
    );

    const defaultElement = screen.getByText('テストエラー').closest('div');
    expect(defaultElement).toHaveClass('block', 'mt-1', 'p-2', 'bg-red-50');

    rerender(
      <ErrorMessage message='テストエラー' hasError={true} variant='inline' />
    );

    const inlineElement = screen.getByText('テストエラー').closest('div');
    expect(inlineElement).toHaveClass('inline-block', 'ml-2');
  });

  it('アクセシビリティ属性が正しく設定される', () => {
    render(<ErrorMessage message='テストエラー' hasError={true} />);

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveAttribute('aria-live', 'polite');
  });

  it('子要素を表示する', () => {
    render(
      <ErrorMessage hasError={true}>
        <span>カスタムエラーメッセージ</span>
      </ErrorMessage>
    );

    expect(screen.getByText('カスタムエラーメッセージ')).toBeInTheDocument();
  });
});
