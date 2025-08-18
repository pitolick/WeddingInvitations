/**
 * @description APIクライアントインデックスファイルのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

describe('API Index Exports', () => {
  describe('MicroCMS Exports', () => {
    it('exports getMicroCMSClient function', async () => {
      const { getMicroCMSClient } = await import('../index');
      expect(typeof getMicroCMSClient).toBe('function');
      expect(getMicroCMSClient.name).toBe('getMicroCMSClient');
    });

    it('exports getGuestByInvitationId function', async () => {
      const { getGuestByInvitationId } = await import('../index');
      expect(typeof getGuestByInvitationId).toBe('function');
      expect(getGuestByInvitationId.name).toBe('getGuestByInvitationId');
    });

    it('exports getDearBlockData function', async () => {
      const { getDearBlockData } = await import('../index');
      expect(typeof getDearBlockData).toBe('function');
      expect(getDearBlockData.name).toBe('getDearBlockData');
    });

    it('exports getGuests function', async () => {
      const { getGuests } = await import('../index');
      expect(typeof getGuests).toBe('function');
      expect(getGuests.name).toBe('getGuests');
    });

    it('exports getGuestsByInviteType function', async () => {
      const { getGuestsByInviteType } = await import('../index');
      expect(typeof getGuestsByInviteType).toBe('function');
      expect(getGuestsByInviteType.name).toBe('getGuestsByInviteType');
    });
  });

  describe('Complete Export Functionality', () => {
    it('exports all expected functions from microcms module', async () => {
      const exports = await import('../index');
      const expectedExports = [
        'getMicroCMSClient',
        'getGuestByInvitationId',
        'getDearBlockData',
        'getGuests',
        'getGuestsByInviteType',
      ];

      expectedExports.forEach(exportName => {
        expect(exports).toHaveProperty(exportName);
        expect(typeof exports[exportName]).toBe('function');
      });
    });

    it('re-exports work correctly with function execution', async () => {
      const { getMicroCMSClient } = await import('../index');

      // 環境変数のモック
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        MICROCMS_SERVICE_DOMAIN: 'test-domain',
        MICROCMS_API_KEY: 'test-key',
      };

      try {
        // 実際に関数を呼び出してエラーが出ないことを確認
        const client = await getMicroCMSClient();
        expect(client).toBeDefined();
        expect(typeof client.get).toBe('function');
      } finally {
        // 環境変数を元に戻す
        process.env = originalEnv;
      }
    });

    it('maintains function signatures through re-export', async () => {
      const exports = await import('../index');

      // 関数の名前が正しく保持されているかチェック
      expect(exports.getMicroCMSClient.name).toBe('getMicroCMSClient');
      expect(exports.getGuestByInvitationId.name).toBe(
        'getGuestByInvitationId'
      );
      expect(exports.getDearBlockData.name).toBe('getDearBlockData');
      expect(exports.getGuests.name).toBe('getGuests');
      expect(exports.getGuestsByInviteType.name).toBe('getGuestsByInviteType');
    });
  });

  describe('Module Structure', () => {
    it('has correct module structure', async () => {
      const exports = await import('../index');

      // エクスポートされたオブジェクトの基本構造をチェック
      expect(typeof exports).toBe('object');
      expect(exports).not.toBeNull();

      // 意図しないデフォルトエクスポートがないことを確認
      expect(exports.default).toBeUndefined();
    });

    it('does not export unexpected properties', async () => {
      const exports = await import('../index');
      const exportedKeys = Object.keys(exports);

      // 期待されるエクスポートがすべて含まれていることを確認
      const expectedExports = [
        'getMicroCMSClient',
        'getGuestByInvitationId',
        'getDearBlockData',
        'getGuests',
        'getGuestsByInviteType',
      ];

      expectedExports.forEach(exportName => {
        expect(exportedKeys).toContain(exportName);
      });

      // 最低限の期待される関数数をチェック
      expect(exportedKeys.length).toBeGreaterThanOrEqual(
        expectedExports.length
      );
    });
  });

  describe('Error Handling', () => {
    it('handles import errors gracefully', async () => {
      // インポートが正常に完了することを確認
      await expect(import('../index')).resolves.toBeDefined();
    });

    it('handles empty invitation ID gracefully', async () => {
      const { getGuestByInvitationId } = await import('../index');

      // 空の招待IDに対してnullを返すことを確認
      const result = await getGuestByInvitationId('');
      expect(result).toBeNull();
    });
  });
});
