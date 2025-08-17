/**
 * @description フィードバックコンポーネントエクスポートのテスト
 */

describe('Feedback Index Module', () => {
  describe('ErrorNotificationエクスポートのテスト', () => {
    it('ErrorNotificationコンポーネントが正しくエクスポートされている', async () => {
      const { ErrorNotification } = await import('../index');
      expect(ErrorNotification).toBeDefined();
      expect(typeof ErrorNotification).toBe('function');
    });

    it('ErrorNotificationManagerが正しくエクスポートされている', async () => {
      const { ErrorNotificationManager } = await import('../index');
      expect(ErrorNotificationManager).toBeDefined();
      expect(typeof ErrorNotificationManager).toBe('function');
    });

    it('useErrorNotificationフックが正しくエクスポートされている', async () => {
      const { useErrorNotification } = await import('../index');
      expect(useErrorNotification).toBeDefined();
      expect(typeof useErrorNotification).toBe('function');
    });
  });

  describe('LoadingSpinnerエクスポートのテスト', () => {
    it('LoadingSpinnerコンポーネントが正しくエクスポートされている', async () => {
      const { LoadingSpinner } = await import('../index');
      expect(LoadingSpinner).toBeDefined();
      expect(typeof LoadingSpinner).toBe('function');
    });

    it('LoadingOverlayが正しくエクスポートされている', async () => {
      const { LoadingOverlay } = await import('../index');
      expect(LoadingOverlay).toBeDefined();
      expect(typeof LoadingOverlay).toBe('function');
    });

    it('LoadingButtonが正しくエクスポートされている', async () => {
      const { LoadingButton } = await import('../index');
      expect(LoadingButton).toBeDefined();
      expect(typeof LoadingButton).toBe('function');
    });
  });

  describe('Toastエクスポートのテスト', () => {
    it('ToastProviderコンポーネントが正しくエクスポートされている', async () => {
      const { ToastProvider } = await import('../index');
      expect(ToastProvider).toBeDefined();
      expect(typeof ToastProvider).toBe('function');
    });

    it('useToastフックが正しくエクスポートされている', async () => {
      const { useToast } = await import('../index');
      expect(useToast).toBeDefined();
      expect(typeof useToast).toBe('function');
    });
  });

  describe('統合テスト', () => {
    it('すべてのフィードバックコンポーネントが正しくエクスポートされている', async () => {
      const feedbackModule = await import('../index');

      const expectedExports = [
        'ErrorNotification',
        'ErrorNotificationManager',
        'useErrorNotification',
        'LoadingSpinner',
        'LoadingOverlay',
        'LoadingButton',
        'ToastProvider',
        'useToast',
      ];

      expectedExports.forEach(exportName => {
        expect(feedbackModule[exportName]).toBeDefined();
        expect(typeof feedbackModule[exportName]).toBe('function');
      });
    });

    it('エクスポートされたコンポーネントが実際のコンポーネントと一致している', async () => {
      const {
        ErrorNotification,
        ErrorNotificationManager,
        useErrorNotification,
        LoadingSpinner,
        LoadingOverlay,
        LoadingButton,
        ToastProvider,
        useToast,
      } = await import('../index');

      // 各モジュールから直接インポートして一致を確認
      const errorNotificationModule = await import('../ErrorNotification');
      const loadingSpinnerModule = await import('../LoadingSpinner');
      const toastModule = await import('../Toast');

      expect(ErrorNotification).toBe(errorNotificationModule.default);
      expect(ErrorNotificationManager).toBe(
        errorNotificationModule.ErrorNotificationManager
      );
      expect(useErrorNotification).toBe(
        errorNotificationModule.useErrorNotification
      );

      expect(LoadingSpinner).toBe(loadingSpinnerModule.default);
      expect(LoadingOverlay).toBe(loadingSpinnerModule.LoadingOverlay);
      expect(LoadingButton).toBe(loadingSpinnerModule.LoadingButton);

      expect(ToastProvider).toBe(toastModule.default);
      expect(useToast).toBe(toastModule.useToast);
    });

    it('モジュール構造が正しい', async () => {
      const feedbackModule = await import('../index');
      const exportedKeys = Object.keys(feedbackModule);

      // default exportは存在しないことを確認（名前付きエクスポートのみ）
      expect(feedbackModule.default).toBeUndefined();

      // 期待されるエクスポート数を確認
      expect(exportedKeys.length).toBe(8);

      const expectedKeys = [
        'ErrorNotification',
        'ErrorNotificationManager',
        'useErrorNotification',
        'LoadingSpinner',
        'LoadingOverlay',
        'LoadingButton',
        'ToastProvider',
        'useToast',
      ];

      expectedKeys.forEach(key => {
        expect(exportedKeys).toContain(key);
      });
    });
  });

  describe('コンポーネントとフックの分類テスト', () => {
    it('コンポーネントとフックが適切に分類されている', async () => {
      const {
        ErrorNotification,
        ErrorNotificationManager,
        useErrorNotification,
        LoadingSpinner,
        LoadingOverlay,
        LoadingButton,
        ToastProvider,
        useToast,
      } = await import('../index');

      // コンポーネント（React関数コンポーネント）
      const components = [
        ErrorNotification,
        ErrorNotificationManager,
        LoadingSpinner,
        LoadingOverlay,
        LoadingButton,
        ToastProvider,
      ];

      // フック（use で始まる関数）
      const hooks = [useErrorNotification, useToast];

      components.forEach(component => {
        expect(typeof component).toBe('function');
      });

      hooks.forEach(hook => {
        expect(typeof hook).toBe('function');
        expect(hook.name).toMatch(/^use/);
      });
    });

    it('フィードバック機能の完全性を確認', async () => {
      const feedbackModule = await import('../index');

      // エラー通知関連
      expect(feedbackModule.ErrorNotification).toBeDefined();
      expect(feedbackModule.ErrorNotificationManager).toBeDefined();
      expect(feedbackModule.useErrorNotification).toBeDefined();

      // ローディング関連
      expect(feedbackModule.LoadingSpinner).toBeDefined();
      expect(feedbackModule.LoadingOverlay).toBeDefined();
      expect(feedbackModule.LoadingButton).toBeDefined();

      // トースト関連
      expect(feedbackModule.ToastProvider).toBeDefined();
      expect(feedbackModule.useToast).toBeDefined();
    });
  });

  describe('モジュール依存関係のテスト', () => {
    it('循環依存がないことを確認', async () => {
      // インデックスファイルからの動的インポートが成功することで循環依存がないことを確認
      await expect(import('../index')).resolves.toBeDefined();
    });

    it('各基底コンポーネントが独立してインポート可能', async () => {
      const componentPaths = [
        '../ErrorNotification',
        '../LoadingSpinner',
        '../Toast',
      ];

      for (const path of componentPaths) {
        await expect(import(path)).resolves.toBeDefined();
      }
    });
  });
});
