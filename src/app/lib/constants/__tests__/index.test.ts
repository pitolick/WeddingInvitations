/**
 * @description 定数エクスポートバンドルのテスト
 */

import {
  APP_CONFIG,
  BREAKPOINTS,
  SECTION_IDS,
  RSVP_STATUS,
  EVENT_INFO,
  IMAGE_PATHS,
  API_CONFIG,
  FORM_CONFIG,
  ANIMATION_CONFIG,
  COLORS,
  NAVIGATION_CONFIG,
  COUNTDOWN_CONFIG,
  GALLERY_CONFIG,
  MESSAGE_CONFIG,
  HOST_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_CONFIG,
  PERFORMANCE_CONFIG,
  ACCESSIBILITY_CONFIG,
} from '../index';

describe('Constants Module', () => {
  describe('APP_CONFIG', () => {
    it('アプリケーション設定が正しく定義されている', () => {
      expect(APP_CONFIG.NAME).toBe('Wedding Invitations');
      expect(APP_CONFIG.VERSION).toBe('1.0.0');
      expect(APP_CONFIG.DESCRIPTION).toBe('ディズニーテーマの結婚式Web招待状');
    });

    it('APP_CONFIGが定数として定義されている', () => {
      // TypeScriptの型レベルでreadonlyとして定義されていることを確認
      // 実行時の変更は可能だが、TypeScriptでは型エラーとなる
      expect(APP_CONFIG).toBeDefined();
      expect(typeof APP_CONFIG).toBe('object');
    });
  });

  describe('BREAKPOINTS', () => {
    it('ブレークポイントが正しく定義されている', () => {
      expect(BREAKPOINTS.MOBILE).toBe(640);
      expect(BREAKPOINTS.TABLET).toBe(1024);
      expect(BREAKPOINTS.DESKTOP).toBe(1025);
    });

    it('ブレークポイントが論理的な順序である', () => {
      expect(BREAKPOINTS.MOBILE).toBeLessThan(BREAKPOINTS.TABLET);
      expect(BREAKPOINTS.TABLET).toBeLessThan(BREAKPOINTS.DESKTOP);
    });
  });

  describe('SECTION_IDS', () => {
    it('全セクションIDが文字列として定義されている', () => {
      const expectedSections = [
        'mv',
        'navigation',
        'countdown',
        'host',
        'message',
        'gallery',
        'event',
        'rsvp',
        'footer',
      ];

      expectedSections.forEach(section => {
        expect(Object.values(SECTION_IDS)).toContain(section);
      });
    });

    it('セクションIDが重複していない', () => {
      const values = Object.values(SECTION_IDS);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });
  });

  describe('RSVP_STATUS', () => {
    it('RSVPステータスが正しく定義されている', () => {
      expect(RSVP_STATUS.PENDING).toBe('pending');
      expect(RSVP_STATUS.ATTENDING).toBe('attending');
      expect(RSVP_STATUS.NOT_ATTENDING).toBe('not-attending');
    });

    it('全てのRSVPステータスが定義されている', () => {
      const expectedStatuses = ['pending', 'attending', 'not-attending'];
      expectedStatuses.forEach(status => {
        expect(Object.values(RSVP_STATUS)).toContain(status);
      });
    });
  });

  describe('EVENT_INFO', () => {
    it('イベント情報が正しく定義されている', () => {
      expect(EVENT_INFO.GROOM_NAME).toBe('新郎太郎');
      expect(EVENT_INFO.BRIDE_NAME).toBe('新婦花子');
      expect(EVENT_INFO.VENUE).toBe('ディズニーリゾート');
      expect(EVENT_INFO.ADDRESS).toBe('千葉県浦安市舞浜1-1');
      expect(EVENT_INFO.MAP_URL).toContain('google.com');
    });

    it('結婚式日時がDateオブジェクトである', () => {
      expect(EVENT_INFO.WEDDING_DATE).toBeInstanceOf(Date);
      expect(EVENT_INFO.WEDDING_DATE.getFullYear()).toBe(2024);
      expect(EVENT_INFO.WEDDING_DATE.getMonth()).toBe(11); // 12月は11
      expect(EVENT_INFO.WEDDING_DATE.getDate()).toBe(25);
    });
  });

  describe('IMAGE_PATHS', () => {
    it('画像パスが正しく定義されている', () => {
      expect(IMAGE_PATHS.SECTIONS).toBe('/images/sections');
      expect(IMAGE_PATHS.COMMON).toBe('/images/common');
      expect(IMAGE_PATHS.ICONS).toBe('/images/icons');
    });

    it('全ての画像パスが/で始まる', () => {
      Object.values(IMAGE_PATHS).forEach(path => {
        expect(path).toMatch(/^\/images\//);
      });
    });
  });

  describe('API_CONFIG', () => {
    it('API設定が正しく定義されている', () => {
      expect(API_CONFIG.MICROCMS_BASE_URL).toContain('microcms.io');
      expect(API_CONFIG.FIGMA_API_URL).toBe('https://api.figma.com/v1');
      expect(typeof API_CONFIG.GOOGLE_APPS_SCRIPT_URL).toBe('string');
    });

    it('API URLがHTTPS形式である', () => {
      expect(API_CONFIG.MICROCMS_BASE_URL).toMatch(/^https:\/\//);
      expect(API_CONFIG.FIGMA_API_URL).toMatch(/^https:\/\//);
    });
  });

  describe('FORM_CONFIG', () => {
    it('フォーム設定が正しく定義されている', () => {
      expect(FORM_CONFIG.MAX_COMPANIONS).toBe(5);
      expect(FORM_CONFIG.MAX_MESSAGE_LENGTH).toBe(500);
      expect(Array.isArray(FORM_CONFIG.DIETARY_OPTIONS)).toBe(true);
    });

    it('食事制限オプションが適切に定義されている', () => {
      const expectedOptions = [
        'なし',
        'ベジタリアン',
        'ビーガン',
        'グルテンフリー',
        'アレルギー対応',
      ];
      expect(FORM_CONFIG.DIETARY_OPTIONS).toEqual(expectedOptions);
    });

    it('制限値が正の数である', () => {
      expect(FORM_CONFIG.MAX_COMPANIONS).toBeGreaterThan(0);
      expect(FORM_CONFIG.MAX_MESSAGE_LENGTH).toBeGreaterThan(0);
    });
  });

  describe('ANIMATION_CONFIG', () => {
    it('アニメーション設定が正しく定義されている', () => {
      expect(ANIMATION_CONFIG.DURATION).toBe(0.3);
      expect(ANIMATION_CONFIG.EASING).toBe('ease-in-out');
      expect(ANIMATION_CONFIG.DELAY).toBe(0.1);
    });

    it('アニメーション値が正の数である', () => {
      expect(ANIMATION_CONFIG.DURATION).toBeGreaterThan(0);
      expect(ANIMATION_CONFIG.DELAY).toBeGreaterThanOrEqual(0);
    });
  });

  describe('COLORS', () => {
    it('カラーパレットが正しく定義されている', () => {
      expect(COLORS.PRIMARY).toBe('#3B82F6');
      expect(COLORS.SECONDARY).toBe('#6B7280');
      expect(COLORS.ACCENT).toBe('#F59E0B');
      expect(COLORS.SUCCESS).toBe('#10B981');
      expect(COLORS.ERROR).toBe('#EF4444');
      expect(COLORS.WARNING).toBe('#F59E0B');
    });

    it('全てのカラーがHEX形式である', () => {
      Object.values(COLORS).forEach(color => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });
  });

  describe('NAVIGATION_CONFIG', () => {
    it('ナビゲーション設定が正しく定義されている', () => {
      expect(Array.isArray(NAVIGATION_CONFIG.ITEMS)).toBe(true);
      expect(NAVIGATION_CONFIG.SCROLL_OFFSET).toBe(80);
      expect(NAVIGATION_CONFIG.SMOOTH_SCROLL).toBe(true);
    });

    it('ナビゲーション項目が適切な構造を持つ', () => {
      NAVIGATION_CONFIG.ITEMS.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('href');
        expect(item.href).toMatch(/^#/);
      });
    });

    it('ナビゲーション項目数が適切である', () => {
      expect(NAVIGATION_CONFIG.ITEMS.length).toBeGreaterThan(0);
      expect(NAVIGATION_CONFIG.ITEMS.length).toBeLessThanOrEqual(10);
    });
  });

  describe('COUNTDOWN_CONFIG', () => {
    it('カウントダウン設定が正しく定義されている', () => {
      expect(COUNTDOWN_CONFIG.TARGET_DATE).toBeInstanceOf(Date);
      expect(COUNTDOWN_CONFIG.UPDATE_INTERVAL).toBe(1000);
      expect(COUNTDOWN_CONFIG.FORMAT).toBe('all');
      expect(COUNTDOWN_CONFIG.END_MESSAGE).toBe('結婚式当日です！');
    });

    it('更新間隔が正の数である', () => {
      expect(COUNTDOWN_CONFIG.UPDATE_INTERVAL).toBeGreaterThan(0);
    });
  });

  describe('GALLERY_CONFIG', () => {
    it('ギャラリー設定が正しく定義されている', () => {
      expect(GALLERY_CONFIG.ITEMS_PER_PAGE).toBe(6);
      expect(GALLERY_CONFIG.MODAL_ENABLED).toBe(true);
      expect(GALLERY_CONFIG.ZOOM_ENABLED).toBe(true);
      expect(GALLERY_CONFIG.SLIDESHOW_ENABLED).toBe(false);
      expect(GALLERY_CONFIG.SLIDESHOW_INTERVAL).toBe(3000);
    });

    it('ブール値設定が正しく定義されている', () => {
      expect(typeof GALLERY_CONFIG.MODAL_ENABLED).toBe('boolean');
      expect(typeof GALLERY_CONFIG.ZOOM_ENABLED).toBe('boolean');
      expect(typeof GALLERY_CONFIG.SLIDESHOW_ENABLED).toBe('boolean');
    });
  });

  describe('MESSAGE_CONFIG', () => {
    it('メッセージ設定が正しく定義されている', () => {
      expect(MESSAGE_CONFIG.MAX_DISPLAY).toBe(10);
      expect(MESSAGE_CONFIG.MAX_LENGTH).toBe(200);
      expect(MESSAGE_CONFIG.ALLOW_LINE_BREAK).toBe(true);
      expect(MESSAGE_CONFIG.ALLOW_EMOJI).toBe(true);
    });

    it('制限値が正の数である', () => {
      expect(MESSAGE_CONFIG.MAX_DISPLAY).toBeGreaterThan(0);
      expect(MESSAGE_CONFIG.MAX_LENGTH).toBeGreaterThan(0);
    });
  });

  describe('HOST_CONFIG', () => {
    it('ホスト設定が正しく定義されている', () => {
      expect(HOST_CONFIG.GROOM).toHaveProperty('name', '新郎太郎');
      expect(HOST_CONFIG.GROOM).toHaveProperty('image');
      expect(HOST_CONFIG.GROOM).toHaveProperty('introduction');
      expect(HOST_CONFIG.BRIDE).toHaveProperty('name', '新婦花子');
      expect(HOST_CONFIG.BRIDE).toHaveProperty('image');
      expect(HOST_CONFIG.BRIDE).toHaveProperty('introduction');
    });

    it('画像パスが適切な形式である', () => {
      expect(HOST_CONFIG.GROOM.image).toMatch(/^\/images\//);
      expect(HOST_CONFIG.BRIDE.image).toMatch(/^\/images\//);
    });
  });

  describe('ERROR_MESSAGES', () => {
    it('エラーメッセージが正しく定義されている', () => {
      expect(ERROR_MESSAGES.NETWORK_ERROR).toContain('ネットワークエラー');
      expect(ERROR_MESSAGES.SERVER_ERROR).toContain('サーバーエラー');
      expect(ERROR_MESSAGES.VALIDATION_ERROR).toContain('入力内容');
      expect(ERROR_MESSAGES.AUTH_ERROR).toContain('認証');
      expect(ERROR_MESSAGES.UNKNOWN_ERROR).toContain('予期しない');
    });

    it('全てのエラーメッセージが文字列である', () => {
      Object.values(ERROR_MESSAGES).forEach(message => {
        expect(typeof message).toBe('string');
        expect(message.length).toBeGreaterThan(0);
      });
    });
  });

  describe('SUCCESS_MESSAGES', () => {
    it('成功メッセージが正しく定義されている', () => {
      expect(SUCCESS_MESSAGES.RSVP_SENT).toContain('RSVP');
      expect(SUCCESS_MESSAGES.MESSAGE_SENT).toContain('メッセージ');
      expect(SUCCESS_MESSAGES.DATA_SAVED).toContain('データ');
    });

    it('全ての成功メッセージが文字列である', () => {
      Object.values(SUCCESS_MESSAGES).forEach(message => {
        expect(typeof message).toBe('string');
        expect(message.length).toBeGreaterThan(0);
      });
    });
  });

  describe('VALIDATION_CONFIG', () => {
    it('バリデーション設定が正しく定義されている', () => {
      expect(VALIDATION_CONFIG.NAME_MIN_LENGTH).toBe(1);
      expect(VALIDATION_CONFIG.NAME_MAX_LENGTH).toBe(50);
      expect(VALIDATION_CONFIG.EMAIL_REGEX).toBeInstanceOf(RegExp);
      expect(VALIDATION_CONFIG.MESSAGE_MIN_LENGTH).toBe(1);
      expect(VALIDATION_CONFIG.MESSAGE_MAX_LENGTH).toBe(500);
    });

    it('メール正規表現が有効なパターンである', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.jp',
        'test123@test-domain.org',
      ];
      const invalidEmails = ['invalid-email', '@domain.com', 'test@'];

      validEmails.forEach(email => {
        expect(VALIDATION_CONFIG.EMAIL_REGEX.test(email)).toBe(true);
      });

      invalidEmails.forEach(email => {
        expect(VALIDATION_CONFIG.EMAIL_REGEX.test(email)).toBe(false);
      });
    });

    it('長さ制限が論理的である', () => {
      expect(VALIDATION_CONFIG.NAME_MIN_LENGTH).toBeLessThanOrEqual(
        VALIDATION_CONFIG.NAME_MAX_LENGTH
      );
      expect(VALIDATION_CONFIG.MESSAGE_MIN_LENGTH).toBeLessThanOrEqual(
        VALIDATION_CONFIG.MESSAGE_MAX_LENGTH
      );
    });
  });

  describe('PERFORMANCE_CONFIG', () => {
    it('パフォーマンス設定が正しく定義されている', () => {
      expect(PERFORMANCE_CONFIG.LAZY_LOAD_IMAGES).toBe(true);
      expect(PERFORMANCE_CONFIG.OPTIMIZE_ANIMATIONS).toBe(true);
      expect(PERFORMANCE_CONFIG.CACHE_ENABLED).toBe(true);
      expect(PERFORMANCE_CONFIG.COMPRESSION_ENABLED).toBe(true);
    });

    it('全てのパフォーマンス設定がブール値である', () => {
      Object.values(PERFORMANCE_CONFIG).forEach(value => {
        expect(typeof value).toBe('boolean');
      });
    });
  });

  describe('ACCESSIBILITY_CONFIG', () => {
    it('アクセシビリティ設定が正しく定義されている', () => {
      expect(ACCESSIBILITY_CONFIG.KEYBOARD_NAVIGATION).toBe(true);
      expect(ACCESSIBILITY_CONFIG.SCREEN_READER_SUPPORT).toBe(true);
      expect(ACCESSIBILITY_CONFIG.HIGH_CONTRAST_MODE).toBe(false);
      expect(ACCESSIBILITY_CONFIG.FONT_SIZE_ADJUSTMENT).toBe(true);
    });

    it('全てのアクセシビリティ設定がブール値である', () => {
      Object.values(ACCESSIBILITY_CONFIG).forEach(value => {
        expect(typeof value).toBe('boolean');
      });
    });
  });

  describe('統合テスト', () => {
    it('全ての定数が正しくエクスポートされている', () => {
      const allConstants = [
        APP_CONFIG,
        BREAKPOINTS,
        SECTION_IDS,
        RSVP_STATUS,
        EVENT_INFO,
        IMAGE_PATHS,
        API_CONFIG,
        FORM_CONFIG,
        ANIMATION_CONFIG,
        COLORS,
        NAVIGATION_CONFIG,
        COUNTDOWN_CONFIG,
        GALLERY_CONFIG,
        MESSAGE_CONFIG,
        HOST_CONFIG,
        ERROR_MESSAGES,
        SUCCESS_MESSAGES,
        VALIDATION_CONFIG,
        PERFORMANCE_CONFIG,
        ACCESSIBILITY_CONFIG,
      ];

      allConstants.forEach(constant => {
        expect(constant).toBeDefined();
        expect(typeof constant).toBe('object');
      });
    });

    it('定数間の整合性が保たれている', () => {
      // ナビゲーション項目のIDがSECTION_IDsと一致することを確認
      NAVIGATION_CONFIG.ITEMS.forEach(item => {
        expect(Object.values(SECTION_IDS)).toContain(item.id);
      });

      // カウントダウンとイベント情報の日時が一致することを確認
      expect(COUNTDOWN_CONFIG.TARGET_DATE.getTime()).toBe(
        EVENT_INFO.WEDDING_DATE.getTime()
      );

      // フォーム設定とバリデーション設定の整合性を確認
      expect(FORM_CONFIG.MAX_MESSAGE_LENGTH).toBe(
        VALIDATION_CONFIG.MESSAGE_MAX_LENGTH
      );
    });
  });
});
