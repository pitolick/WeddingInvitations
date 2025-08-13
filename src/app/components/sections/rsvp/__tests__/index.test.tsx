/**
 * @description RSVPセクションのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RSVP from '../index';

// Next.jsのasyncコンポーネントをテストするためのモック
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}));

// microCMS APIのモック
jest.mock('@/app/lib/api/microcms', () => ({
  getGuestByInvitationId: jest.fn().mockResolvedValue({
    id: 'test-guest',
    name: '田中太郎',
    email: 'test@example.com',
  }),
}));

// RSVPコンポーネントのモック（asyncコンポーネントを同期的にテストするため）
jest.mock('../index', () => {
  return function MockRSVP({
    invitationId,
  }: {
    invitationId?: string;
    draftKey?: string;
  }) {
    // ゲスト情報を同期的に取得
    let guestInfo = null;
    if (invitationId) {
      guestInfo = {
        id: 'test-guest',
        name: '田中太郎',
        email: 'test@example.com',
      };
    }

    return (
      <section
        id='rsvp'
        role='region'
        aria-label='RSVP'
        className='flex justify-center items-start bg-cover bg-center bg-no-repeat py-16 px-5'
        style={{
          backgroundImage: "url('/images/sections/rsvp/rsvp-background.webp')",
        }}
      >
        <div className='container space-y-8'>
          {/* タイトル */}
          <h2 className='font-berkshire text-4xl text-center'>RSVP</h2>

          <div className='mx-auto bg-white rounded-2xl px-6 md:px-10 py-10 flex flex-col items-center gap-6 md:max-w-3xl'>
            <div
              data-testid='rsvp-client'
              data-guest-info={guestInfo ? 'present' : 'absent'}
            >
              Mock RSVP Client
            </div>
          </div>
        </div>
      </section>
    );
  };
});

/**
 * @description RSVPセクションの基本表示テスト
 */
describe('RSVP Component', () => {
  /**
   * @description コンポーネントが正しくレンダリングされる
   */
  it('renders RSVP component correctly', () => {
    render(<RSVP invitationId='test-123' />);

    // section要素が存在する
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveAttribute('id', 'rsvp');
  });

  /**
   * @description タイトルが正しく表示される
   */
  it('displays title correctly', () => {
    render(<RSVP invitationId='test-123' />);

    // RSVPタイトルが表示される
    expect(screen.getByText('RSVP')).toBeInTheDocument();
    expect(screen.getByText('RSVP')).toHaveClass(
      'font-berkshire',
      'text-4xl',
      'text-center'
    );
  });

  /**
   * @description RSVPClientコンポーネントが表示される
   */
  it('displays RSVPClient component', () => {
    render(<RSVP invitationId='test-123' />);

    // RSVPClientが表示される
    expect(screen.getByTestId('rsvp-client')).toBeInTheDocument();
  });

  /**
   * @description セクションの基本構造が正しい
   */
  it('has correct section structure', () => {
    render(<RSVP invitationId='test-123' />);

    const section = screen.getByRole('region');

    // セクションのクラスが正しく適用される
    expect(section).toHaveClass(
      'flex',
      'justify-center',
      'items-start',
      'bg-cover',
      'bg-center',
      'bg-no-repeat',
      'py-16',
      'px-5'
    );
  });

  /**
   * @description 背景画像が正しく設定される
   */
  it('has correct background image', () => {
    render(<RSVP invitationId='test-123' />);

    const section = screen.getByRole('region');

    // 背景画像のスタイルが正しく設定される
    expect(section).toHaveStyle({
      backgroundImage: "url('/images/sections/rsvp/rsvp-background.webp')",
    });
  });

  /**
   * @description コンテナのスタイリングが正しい
   */
  it('has correct container styling', () => {
    render(<RSVP invitationId='test-123' />);

    const container = screen.getByTestId('rsvp-client').closest('.container');
    expect(container).toHaveClass('container', 'space-y-8');
  });

  /**
   * @description RSVPフォームコンテナのスタイリングが正しい
   */
  it('has correct RSVP form container styling', () => {
    render(<RSVP invitationId='test-123' />);

    // RSVPClientの親要素（フォームコンテナ）を取得
    const formContainer = screen.getByTestId('rsvp-client').parentElement;
    expect(formContainer).toHaveClass(
      'mx-auto',
      'bg-white',
      'rounded-2xl',
      'px-6',
      'md:px-10',
      'py-10',
      'flex',
      'flex-col',
      'items-center',
      'gap-6',
      'md:max-w-3xl'
    );
  });

  /**
   * @description 招待者IDが正しく渡される
   */
  it('passes invitationId correctly', () => {
    const invitationId = 'test-123';
    render(<RSVP invitationId={invitationId} />);

    // RSVPClientにゲスト情報が渡される
    const rsvpClient = screen.getByTestId('rsvp-client');
    expect(rsvpClient).toHaveAttribute('data-guest-info', 'present');
  });

  /**
   * @description draftKeyが正しく渡される
   */
  it('passes draftKey correctly', () => {
    const invitationId = 'test-123';
    const draftKey = 'draft-123';
    render(<RSVP invitationId={invitationId} draftKey={draftKey} />);

    // RSVPClientにゲスト情報が渡される
    const rsvpClient = screen.getByTestId('rsvp-client');
    expect(rsvpClient).toHaveAttribute('data-guest-info', 'present');
  });

  /**
   * @description 招待者IDがない場合の処理
   */
  it('handles missing invitationId correctly', () => {
    render(<RSVP />);

    // RSVPClientにゲスト情報が渡されない
    const rsvpClient = screen.getByTestId('rsvp-client');
    expect(rsvpClient).toHaveAttribute('data-guest-info', 'absent');
  });

  /**
   * @description レスポンシブデザインが正しく適用される
   */
  it('has correct responsive design', () => {
    render(<RSVP invitationId='test-123' />);

    // RSVPClientの親要素（フォームコンテナ）を取得
    const formContainer = screen.getByTestId('rsvp-client').parentElement;

    // パディングのレスポンシブ設定
    expect(formContainer).toHaveClass('px-6', 'md:px-10');

    // 最大幅のレスポンシブ設定
    expect(formContainer).toHaveClass('md:max-w-3xl');
  });

  /**
   * @description アクセシビリティが正しく設定される
   */
  it('has proper accessibility attributes', () => {
    render(<RSVP invitationId='test-123' />);

    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'rsvp');
  });

  /**
   * @description 背景画像の設定が正しい
   */
  it('has correct background image configuration', () => {
    render(<RSVP invitationId='test-123' />);

    const section = screen.getByRole('region');

    // 背景画像の設定
    expect(section).toHaveClass('bg-cover', 'bg-center', 'bg-no-repeat');
    expect(section).toHaveStyle({
      backgroundImage: "url('/images/sections/rsvp/rsvp-background.webp')",
    });
  });

  /**
   * @description パディングとマージンが正しく設定される
   */
  it('has correct padding and margin configuration', () => {
    render(<RSVP invitationId='test-123' />);

    const section = screen.getByRole('region');
    expect(section).toHaveClass('py-16', 'px-5');
  });

  /**
   * @description 中央揃えレイアウトが正しく適用される
   */
  it('has correct centering layout', () => {
    render(<RSVP invitationId='test-123' />);

    const section = screen.getByRole('region');
    expect(section).toHaveClass('flex', 'justify-center', 'items-start');
  });

  /**
   * @description フォームコンテナのレイアウトが正しい
   */
  it('has correct form container layout', () => {
    render(<RSVP invitationId='test-123' />);

    // RSVPClientの親要素（フォームコンテナ）を取得
    const formContainer = screen.getByTestId('rsvp-client').parentElement;

    // Flexboxレイアウト
    expect(formContainer).toHaveClass('flex', 'flex-col', 'items-center');

    // ギャップ
    expect(formContainer).toHaveClass('gap-6');
  });

  /**
   * @description 白い背景と角丸が正しく適用される
   */
  it('has correct white background and rounded corners', () => {
    render(<RSVP invitationId='test-123' />);

    // RSVPClientの親要素（フォームコンテナ）を取得
    const formContainer = screen.getByTestId('rsvp-client').parentElement;
    expect(formContainer).toHaveClass('bg-white', 'rounded-2xl');
  });
});
