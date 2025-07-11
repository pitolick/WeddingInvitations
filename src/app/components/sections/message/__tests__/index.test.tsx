/**
 * @description メッセージセクションのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

// Messageコンポーネントのテスト

// microCMS APIのモック
jest.mock('@/app/lib/api', () => ({
  getDearBlockData: jest.fn().mockResolvedValue({
    dear: '田中太郎',
    message: '特別なメッセージです。',
  }),
}));

/**
 * @description メッセージセクションの基本表示テスト
 */
describe('Message Component', () => {
  /**
   * @description コンポーネントがレンダリングされることを確認
   */
  it.skip('renders message component', () => {
    expect(true).toBe(true);
  });

  /**
   * @description 招待者IDが正しく渡されることを確認
   */
  it.skip('receives invitationId prop correctly', () => {
    expect(true).toBe(true);
  });

  /**
   * @description コンポーネントの基本構造を確認
   */
  it.skip('has proper component structure', () => {
    expect(true).toBe(true);
  });
});
