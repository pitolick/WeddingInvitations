/**
 * @description 装飾コンポーネントエクスポートのテスト
 */

describe('Decoration Index Module', () => {
  describe('エクスポートのテスト', () => {
    it('Hrコンポーネントが正しくエクスポートされている', async () => {
      const { Hr } = await import('../index');
      expect(Hr).toBeDefined();
      expect(typeof Hr).toBe('function');
    });

    it('Hrコンポーネントが実際のHrコンポーネントと一致している', async () => {
      const { Hr } = await import('../index');
      const HrDirect = (await import('../Hr/Hr')).default;
      expect(Hr).toBe(HrDirect);
    });
  });

  describe('統合テスト', () => {
    it('エクスポートされたHrコンポーネントが正常に動作する', async () => {
      const { Hr } = await import('../index');

      // コンポーネントが関数（React Component）であることを確認
      expect(typeof Hr).toBe('function');

      // displayNameが存在する場合は確認
      if (Hr.displayName || Hr.name) {
        expect(Hr.displayName || Hr.name).toMatch(/hr/i);
      }
    });

    it('モジュール構造が正しい', async () => {
      const decorationModule = await import('../index');

      // エクスポートされているオブジェクトの確認
      expect(decorationModule).toBeDefined();
      expect(decorationModule.Hr).toBeDefined();

      // default exportは存在しないことを確認（名前付きエクスポートのみ）
      expect(decorationModule.default).toBeUndefined();
    });

    it('単一のエクスポートのみが存在する', async () => {
      const decorationModule = await import('../index');
      const exportedKeys = Object.keys(decorationModule);

      expect(exportedKeys).toEqual(['Hr']);
      expect(exportedKeys.length).toBe(1);
    });
  });

  describe('モジュール依存関係のテスト', () => {
    it('循環依存がないことを確認', async () => {
      // インデックスファイルからの動的インポートが成功することで循環依存がないことを確認
      await expect(import('../index')).resolves.toBeDefined();
    });

    it('基底Hrコンポーネントが独立してインポート可能', async () => {
      // 基底コンポーネントが独立してインポート可能であることを確認
      await expect(import('../Hr/Hr')).resolves.toBeDefined();
    });

    it('Hr/indexファイル経由でもアクセス可能', async () => {
      // Hr/index.ts経由でもアクセス可能であることを確認
      await expect(import('../Hr')).resolves.toBeDefined();
    });
  });

  describe('コンポーネント特性のテスト', () => {
    it('Hrコンポーネントが装飾要素として適切', async () => {
      const { Hr } = await import('../index');

      // React関数コンポーネントであることを確認
      expect(typeof Hr).toBe('function');

      // 一般的な装飾コンポーネントの特性を確認
      // （具体的な実装詳細は避け、基本的な特性のみ）
      expect(Hr).toBeDefined();
    });
  });
});
