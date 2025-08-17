/**
 * @description 招待ページ用レイアウトコンポーネントのテスト
 */

import { render } from '@testing-library/react';
import InvitationLayout, { metadata } from '../layout';

describe('InvitationLayout', () => {
  it('メタデータが正しく設定されている', () => {
    expect(metadata).toEqual({
      title: 'Wedding Invitation - 結婚式招待状',
      description: 'ディズニーテーマの特別な結婚式招待状です。',
      keywords: ['wedding', 'invitation', 'disney', '結婚式', '招待状'],
      authors: [{ name: 'WeddingInvitations' }],
      openGraph: {
        title: 'Wedding Invitation - 結婚式招待状',
        description: 'ディズニーテーマの特別な結婚式招待状です。',
        type: 'website',
        locale: 'ja_JP',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Wedding Invitation - 結婚式招待状',
        description: 'ディズニーテーマの特別な結婚式招待状です。',
      },
    });
  });

  it('正しいレイアウト構造でレンダリングされる', () => {
    const { container } = render(
      <InvitationLayout>
        <div>テストコンテンツ</div>
      </InvitationLayout>
    );

    // 最外側のdivが適切なクラスを持つ
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass(
      'min-h-screen',
      'bg-gradient-to-br',
      'from-blue-50',
      'to-purple-50'
    );

    // mainタグが存在し、適切なクラスを持つ
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('relative');
  });

  it('子要素が正しくレンダリングされる', () => {
    const testContent = 'テストコンテンツ';
    const { getByText } = render(
      <InvitationLayout>
        <div>{testContent}</div>
      </InvitationLayout>
    );

    expect(getByText(testContent)).toBeInTheDocument();
  });

  it('複数の子要素を受け入れる', () => {
    const { getByText } = render(
      <InvitationLayout>
        <div>子要素1</div>
        <div>子要素2</div>
        <span>子要素3</span>
      </InvitationLayout>
    );

    expect(getByText('子要素1')).toBeInTheDocument();
    expect(getByText('子要素2')).toBeInTheDocument();
    expect(getByText('子要素3')).toBeInTheDocument();
  });

  it('空の子要素でもレンダリングできる', () => {
    const { container } = render(<InvitationLayout>{null}</InvitationLayout>);

    // レイアウト構造は維持される
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass('min-h-screen');

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('relative');
  });

  it('DOM構造が期待通りである', () => {
    const { container } = render(
      <InvitationLayout>
        <div>コンテンツ</div>
      </InvitationLayout>
    );

    // div > main > div の構造
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv.tagName).toBe('DIV');

    const main = outerDiv.firstChild as HTMLElement;
    expect(main.tagName).toBe('MAIN');

    const innerDiv = main.firstChild as HTMLElement;
    expect(innerDiv.tagName).toBe('DIV');
    expect(innerDiv).toHaveTextContent('コンテンツ');
  });
});
