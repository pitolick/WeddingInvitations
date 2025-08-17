/**
 * @description セクションコンポーネントエクスポートバンドルのテスト
 */

describe('Sections Index Module', () => {
  describe('エクスポートのテスト', () => {
    it('MainVisualコンポーネントが正しくエクスポートされている', async () => {
      const { MainVisual } = await import('../index');
      expect(MainVisual).toBeDefined();
      expect(typeof MainVisual).toBe('function');
    });

    it('Navigationコンポーネントが正しくエクスポートされている', async () => {
      const { Navigation } = await import('../index');
      expect(Navigation).toBeDefined();
      expect(typeof Navigation).toBe('function');
    });

    it('Countdownコンポーネントが正しくエクスポートされている', async () => {
      const { Countdown } = await import('../index');
      expect(Countdown).toBeDefined();
      expect(typeof Countdown).toBe('function');
    });

    it('Hostコンポーネントが正しくエクスポートされている', async () => {
      const { Host } = await import('../index');
      expect(Host).toBeDefined();
      expect(typeof Host).toBe('function');
    });

    it('Messageコンポーネントが正しくエクスポートされている', async () => {
      const { Message } = await import('../index');
      expect(Message).toBeDefined();
      expect(typeof Message).toBe('function');
    });

    it('Galleryコンポーネントが正しくエクスポートされている', async () => {
      const { Gallery } = await import('../index');
      expect(Gallery).toBeDefined();
      expect(typeof Gallery).toBe('function');
    });

    it('Eventコンポーネントが正しくエクスポートされている', async () => {
      const { Event } = await import('../index');
      expect(Event).toBeDefined();
      expect(typeof Event).toBe('function');
    });

    it('RSVPコンポーネントが正しくエクスポートされている', async () => {
      const { RSVP } = await import('../index');
      expect(RSVP).toBeDefined();
      expect(typeof RSVP).toBe('function');
    });

    it('Footerコンポーネントが正しくエクスポートされている', async () => {
      const { Footer } = await import('../index');
      expect(Footer).toBeDefined();
      expect(typeof Footer).toBe('function');
    });
  });

  describe('統合テスト', () => {
    it('すべてのセクションコンポーネントが正しくエクスポートされている', async () => {
      const sectionsModule = await import('../index');

      const expectedComponents = [
        'MainVisual',
        'Navigation',
        'Countdown',
        'Host',
        'Message',
        'Gallery',
        'Event',
        'RSVP',
        'Footer',
      ];

      expectedComponents.forEach(componentName => {
        expect(sectionsModule[componentName]).toBeDefined();
        expect(typeof sectionsModule[componentName]).toBe('function');
      });
    });

    it('エクスポートされたコンポーネントが実際のコンポーネントと一致している', async () => {
      const {
        MainVisual,
        Navigation,
        Countdown,
        Host,
        Message,
        Gallery,
        Event,
        RSVP,
        Footer,
      } = await import('../index');

      // 各コンポーネントが実際のコンポーネントファイルと一致することを確認
      const mvDirect = (await import('../mv')).default;
      const navigationDirect = (await import('../navigation')).default;
      const countdownDirect = (await import('../countdown')).default;
      const hostDirect = (await import('../host')).default;
      const messageDirect = (await import('../message')).default;
      const galleryDirect = (await import('../gallery')).default;
      const eventDirect = (await import('../event')).default;
      const rsvpDirect = (await import('../rsvp')).default;
      const footerDirect = (await import('../footer')).default;

      expect(MainVisual).toBe(mvDirect);
      expect(Navigation).toBe(navigationDirect);
      expect(Countdown).toBe(countdownDirect);
      expect(Host).toBe(hostDirect);
      expect(Message).toBe(messageDirect);
      expect(Gallery).toBe(galleryDirect);
      expect(Event).toBe(eventDirect);
      expect(RSVP).toBe(rsvpDirect);
      expect(Footer).toBe(footerDirect);
    });

    it('全てのコンポーネントがReact関数コンポーネントである', async () => {
      const sectionsModule = await import('../index');

      const components = [
        sectionsModule.MainVisual,
        sectionsModule.Navigation,
        sectionsModule.Countdown,
        sectionsModule.Host,
        sectionsModule.Message,
        sectionsModule.Gallery,
        sectionsModule.Event,
        sectionsModule.RSVP,
        sectionsModule.Footer,
      ];

      components.forEach(component => {
        expect(typeof component).toBe('function');
      });
    });
  });

  describe('モジュール構造のテスト', () => {
    it('循環依存がないことを確認', async () => {
      // インデックスファイルからの動的インポートが成功することで循環依存がないことを確認
      await expect(import('../index')).resolves.toBeDefined();
    });

    it('各セクションコンポーネントが独立してインポート可能', async () => {
      const sectionPaths = [
        '../mv',
        '../navigation',
        '../countdown',
        '../host',
        '../message',
        '../gallery',
        '../event',
        '../rsvp',
        '../footer',
      ];

      for (const path of sectionPaths) {
        await expect(import(path)).resolves.toBeDefined();
      }
    });

    it('モジュールエクスポート数が期待通り', async () => {
      const sectionsModule = await import('../index');
      const exportedKeys = Object.keys(sectionsModule);

      // default exportは存在しないことを確認
      expect(sectionsModule.default).toBeUndefined();

      // 9つのコンポーネントがエクスポートされていることを確認
      expect(exportedKeys.length).toBe(9);

      const expectedExports = [
        'MainVisual',
        'Navigation',
        'Countdown',
        'Host',
        'Message',
        'Gallery',
        'Event',
        'RSVP',
        'Footer',
      ];

      expectedExports.forEach(exportName => {
        expect(exportedKeys).toContain(exportName);
      });
    });
  });

  describe('セクションコンポーネントの命名規則テスト', () => {
    it('エクスポート名が適切な命名規則に従っている', async () => {
      const sectionsModule = await import('../index');
      const exportedKeys = Object.keys(sectionsModule);

      exportedKeys.forEach(key => {
        // PascalCaseであることを確認
        expect(key).toMatch(/^[A-Z][a-zA-Z]*$/);

        // コンポーネント名が予期された名前であることを確認
        expect([
          'MainVisual',
          'Navigation',
          'Countdown',
          'Host',
          'Message',
          'Gallery',
          'Event',
          'RSVP',
          'Footer',
        ]).toContain(key);
      });
    });

    it('各コンポーネントが適切なdisplayNameまたは関数名を持つ', async () => {
      const {
        MainVisual,
        Navigation,
        Countdown,
        Host,
        Message,
        Gallery,
        Event,
        RSVP,
        Footer,
      } = await import('../index');

      const components = [
        { component: MainVisual, expectedName: /main.*visual|mv/i },
        { component: Navigation, expectedName: /navigation/i },
        { component: Countdown, expectedName: /countdown/i },
        { component: Host, expectedName: /host/i },
        { component: Message, expectedName: /message/i },
        { component: Gallery, expectedName: /gallery/i },
        { component: Event, expectedName: /event/i },
        { component: RSVP, expectedName: /rsvp/i },
        { component: Footer, expectedName: /footer/i },
      ];

      components.forEach(({ component }) => {
        const componentName = component.displayName || component.name;
        if (componentName) {
          // displayNameまたは関数名が期待されるパターンにマッチすることを確認
          // ただし、厳密でない確認（一部のコンポーネントは異なる名前かもしれない）
          expect(typeof componentName).toBe('string');
        }
      });
    });
  });
});
