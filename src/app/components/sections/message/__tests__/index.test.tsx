/**
 * @description メッセージセクションのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Message from '../index';

// Messageコンポーネントのテスト

// microCMS APIのモック
jest.mock('@/app/lib/api', () => ({
  getDearBlockData: jest.fn().mockResolvedValue({
    dear: '田中太郎',
    message: '特別なメッセージです。',
  }),
}));

// DearBlockコンポーネントのモック
jest.mock('../DearBlock', () => {
  return function MockDearBlock({
    invitationId,
    draftKey,
  }: {
    invitationId: string;
    draftKey?: string;
  }) {
    return (
      <div
        data-testid='dear-block'
        data-invitation-id={invitationId}
        data-draft-key={draftKey}
      >
        Mock DearBlock
      </div>
    );
  };
});

/**
 * @description メッセージセクションの基本表示テスト
 */
describe('Message Component', () => {
  /**
   * @description コンポーネントがレンダリングされることを確認
   */
  it('renders message component', () => {
    render(<Message invitationId='test-123' />);

    // セクション要素が存在する
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveAttribute('id', 'message');

    // DearBlockコンポーネントが表示される
    expect(screen.getByTestId('dear-block')).toBeInTheDocument();
  });

  /**
   * @description 招待者IDが正しく渡されることを確認
   */
  it('receives invitationId prop correctly', () => {
    const invitationId = 'test-123';
    render(<Message invitationId={invitationId} />);

    // DearBlockコンポーネントに正しい招待者IDが渡される
    const dearBlock = screen.getByTestId('dear-block');
    expect(dearBlock).toHaveAttribute('data-invitation-id', invitationId);
  });

  /**
   * @description コンポーネントの基本構造を確認
   */
  it('has proper component structure', () => {
    render(<Message invitationId='test-123' />);

    // セクション要素が正しい構造を持つ
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'message');
    expect(section).toHaveClass(
      'relative',
      'flex',
      'flex-col',
      'items-center',
      'py-16',
      'md:py-16',
      'bg-gradient-to-b',
      'from-lavender-400',
      'via-lavender-300',
      'to-pink-300'
    );

    // DearBlockコンポーネントが含まれる
    expect(screen.getByTestId('dear-block')).toBeInTheDocument();
  });

  /**
   * @description draftKeyが正しく渡されることを確認
   */
  it('receives draftKey prop correctly', () => {
    const invitationId = 'test-123';
    const draftKey = 'draft-123';
    render(<Message invitationId={invitationId} draftKey={draftKey} />);

    // DearBlockコンポーネントに正しいdraftKeyが渡される
    const dearBlock = screen.getByTestId('dear-block');
    expect(dearBlock).toHaveAttribute('data-draft-key', draftKey);
  });

  /**
   * @description draftKeyが未定義の場合の処理
   */
  it('handles undefined draftKey correctly', () => {
    const invitationId = 'test-123';
    render(<Message invitationId={invitationId} />);

    // DearBlockコンポーネントにdraftKeyが渡されない
    const dearBlock = screen.getByTestId('dear-block');
    expect(dearBlock).not.toHaveAttribute('data-draft-key');
  });

  /**
   * @description セクションのアクセシビリティ属性が正しく設定される
   */
  it('has proper accessibility attributes', () => {
    render(<Message invitationId='test-123' />);

    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'message');
    expect(section).toHaveAttribute('aria-label', 'メッセージセクション');
  });

  /**
   * @description セクションのスタイリングが正しく適用される
   */
  it('has proper styling applied', () => {
    render(<Message invitationId='test-123' />);

    const section = screen.getByRole('region');
    expect(section).toHaveClass(
      'relative',
      'flex',
      'flex-col',
      'items-center',
      'py-16',
      'md:py-16',
      'bg-gradient-to-b',
      'from-lavender-400',
      'via-lavender-300',
      'to-pink-300'
    );
  });

  /**
   * @description 複数の招待者IDで正しく動作する
   */
  it('works with different invitation IDs', () => {
    const invitationIds = ['test-123', 'wedding-456', 'invitation-789'];

    invitationIds.forEach(id => {
      const { unmount } = render(<Message invitationId={id} />);

      const dearBlock = screen.getByTestId('dear-block');
      expect(dearBlock).toHaveAttribute('data-invitation-id', id);

      unmount();
    });
  });

  /**
   * @description 空の招待者IDでも動作する
   */
  it('works with empty invitation ID', () => {
    render(<Message invitationId='' />);

    const dearBlock = screen.getByTestId('dear-block');
    expect(dearBlock).toHaveAttribute('data-invitation-id', '');
  });

  /**
   * @description 特殊文字を含む招待者IDでも動作する
   */
  it('works with special characters in invitation ID', () => {
    const specialIds = [
      'test@123',
      'test#456',
      'test$789',
      'test%abc',
      'test^def',
    ];

    specialIds.forEach(id => {
      const { unmount } = render(<Message invitationId={id} />);

      const dearBlock = screen.getByTestId('dear-block');
      expect(dearBlock).toHaveAttribute('data-invitation-id', id);

      unmount();
    });
  });
});
