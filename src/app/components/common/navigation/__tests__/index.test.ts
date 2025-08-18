/**
 * @description ナビゲーションコンポーネントエクスポートのテスト
 */

describe('Navigation Index Module', () => {
  describe('エクスポートのテスト', () => {
    it('Navigationコンポーネントが正しくエクスポートされている', async () => {
      const { Navigation } = await import('../index');
      expect(Navigation).toBeDefined();
      expect(typeof Navigation).toBe('function');
    });

    it('Navigationコンポーネントが実際のNavigationコンポーネントと一致している', async () => {
      const { Navigation } = await import('../index');
      const NavigationDirect = (await import('../Navigation')).default;
      expect(Navigation).toBe(NavigationDirect);
    });
  });

  describe('統合テスト', () => {
    it('エクスポートされたNavigationコンポーネントが正常に動作する', async () => {
      const { Navigation } = await import('../index');

      // コンポーネントが関数（React Component）であることを確認
      expect(typeof Navigation).toBe('function');

      // displayNameが存在する場合は確認
      if (Navigation.displayName || Navigation.name) {
        expect(Navigation.displayName || Navigation.name).toMatch(
          /navigation/i
        );
      }
    });

    it('モジュール構造が正しい', async () => {
      const navigationModule = await import('../index');

      // エクスポートされているオブジェクトの確認
      expect(navigationModule).toBeDefined();
      expect(navigationModule.Navigation).toBeDefined();

      // default exportは存在しないことを確認（名前付きエクスポートのみ）
      expect(navigationModule.default).toBeUndefined();
    });
  });

  describe('モジュール依存関係のテスト', () => {
    it('循環依存がないことを確認', async () => {
      // インデックスファイルからの動的インポートが成功することで循環依存がないことを確認
      await expect(import('../index')).resolves.toBeDefined();
    });

    it('基底Navigationコンポーネントが独立してインポート可能', async () => {
      // 基底コンポーネントが独立してインポート可能であることを確認
      await expect(import('../Navigation')).resolves.toBeDefined();
    });
  });
});
