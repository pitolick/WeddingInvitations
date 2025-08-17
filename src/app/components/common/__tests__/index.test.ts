/**
 * @description 共通コンポーネントインデックスファイルのテスト
 */

describe('Common Components Index Module', () => {
  describe('エクスポートのテスト', () => {
    it('Buttonコンポーネントが正しくエクスポートされている', async () => {
      const { Button } = await import('../index');
      expect(Button).toBeDefined();
      expect(typeof Button).toBe('function');
    });

    it('formモジュールが正しくエクスポートされている', async () => {
      const formModule = await import('../form');
      expect(formModule).toBeDefined();
      // フォームコンポーネントの存在を確認
      expect(typeof formModule.Input).toBe('function');
      expect(typeof formModule.PostalCodeInput).toBe('function');
      expect(typeof formModule.TextArea).toBe('function');
      expect(typeof formModule.Select).toBe('function');
      expect(typeof formModule.Radio).toBe('function');
      expect(typeof formModule.Checkbox).toBe('function');
      expect(typeof formModule.ErrorMessage).toBe('function');
    });

    it('modalモジュールが正しくエクスポートされている', async () => {
      const modalModule = await import('../modal');
      expect(modalModule).toBeDefined();
      expect(typeof modalModule.Modal).toBe('function');
    });

    it('iconモジュールが正しくエクスポートされている', async () => {
      const iconModule = await import('../icon');
      expect(iconModule).toBeDefined();
      // アイコンコンポーネントの存在を確認
      expect(typeof iconModule.Castle).toBe('function');
      expect(typeof iconModule.Close).toBe('function');
      expect(typeof iconModule.Dust).toBe('function');
      expect(typeof iconModule.Menu).toBe('function');
      expect(typeof iconModule.PlusCircle).toBe('function');
    });

    it('cardモジュールが正しくエクスポートされている', async () => {
      const cardModule = await import('../card');
      expect(cardModule).toBeDefined();
      expect(typeof cardModule.Card).toBe('function');
      expect(typeof cardModule.CardContent).toBe('function');
      expect(typeof cardModule.CardHeader).toBe('function');
    });

    it('animationモジュールが正しくエクスポートされている', async () => {
      const animationModule = await import('../animation');
      expect(animationModule).toBeDefined();
    });

    it('responsiveモジュールが正しくエクスポートされている', async () => {
      const responsiveModule = await import('../responsive');
      expect(responsiveModule).toBeDefined();
      expect(typeof responsiveModule.ResponsiveContainer).toBe('function');
      expect(typeof responsiveModule.ResponsiveGrid).toBe('function');
    });

    it('imageモジュールが正しくエクスポートされている', async () => {
      const imageModule = await import('../image');
      expect(imageModule).toBeDefined();
      expect(typeof imageModule.ResponsiveImage).toBe('function');
    });

    it('decorationモジュールが正しくエクスポートされている', async () => {
      const decorationModule = await import('../decoration');
      expect(decorationModule).toBeDefined();
    });

    it('feedbackモジュールが正しくエクスポートされている', async () => {
      const feedbackModule = await import('../feedback');
      expect(feedbackModule).toBeDefined();
    });
  });

  describe('統合テスト', () => {
    it('すべてのエクスポートが正常に動作する', async () => {
      const commonModule = await import('../index');

      // 主要なコンポーネントが存在することを確認
      expect(commonModule.Button).toBeDefined();
      expect(typeof commonModule.Button).toBe('function');

      // 各モジュールからの個別エクスポートも確認
      expect(commonModule.Modal).toBeDefined();
      expect(commonModule.Card).toBeDefined();
      expect(commonModule.CardContent).toBeDefined();
      expect(commonModule.CardHeader).toBeDefined();
      expect(commonModule.ResponsiveContainer).toBeDefined();
      expect(commonModule.ResponsiveGrid).toBeDefined();
      expect(commonModule.ResponsiveImage).toBeDefined();
      expect(commonModule.Input).toBeDefined();
      expect(commonModule.PostalCodeInput).toBeDefined();
      expect(commonModule.TextArea).toBeDefined();
      expect(commonModule.Select).toBeDefined();
      expect(commonModule.Radio).toBeDefined();
      expect(commonModule.Checkbox).toBeDefined();
      expect(commonModule.ErrorMessage).toBeDefined();
      expect(commonModule.Castle).toBeDefined();
      expect(commonModule.Close).toBeDefined();
      expect(commonModule.Dust).toBeDefined();
      expect(commonModule.Menu).toBeDefined();
      expect(commonModule.PlusCircle).toBeDefined();
    });

    it('エクスポートされたコンポーネントが関数として利用可能', async () => {
      const { Button, Modal, Card, ResponsiveContainer } = await import(
        '../index'
      );

      // 各コンポーネントが関数（React Component）であることを確認
      expect(typeof Button).toBe('function');
      expect(typeof Modal).toBe('function');
      expect(typeof Card).toBe('function');
      expect(typeof ResponsiveContainer).toBe('function');
    });
  });

  describe('モジュール構造の検証', () => {
    it('循環依存がないことを確認', async () => {
      // インデックスファイルからの動的インポートが成功することで循環依存がないことを確認
      await expect(import('../index')).resolves.toBeDefined();
    });

    it('各サブモジュールが独立してインポート可能', async () => {
      // 各サブモジュールが独立してインポート可能であることを確認
      const modules = [
        '../button',
        '../form',
        '../modal',
        '../icon',
        '../card',
        '../animation',
        '../responsive',
        '../image',
        '../decoration',
        '../feedback',
      ];

      for (const modulePath of modules) {
        await expect(import(modulePath)).resolves.toBeDefined();
      }
    });
  });
});
