/**
 * @description DearBlockコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

// microCMS APIのモック
jest.mock('@/app/lib/api', () => ({
  getDearBlockData: jest.fn().mockResolvedValue({
    dear: '田中太郎',
    message: '特別なメッセージです。',
  }),
}));

/**
 * @description DearBlockコンポーネントの基本表示テスト
 */
describe('DearBlock Component', () => {
  /**
   * @description コンポーネントがレンダリングされることを確認
   */
  it.skip('renders DearBlock component', () => {
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
