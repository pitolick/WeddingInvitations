/**
 * @description ユーティリティ関数のテスト
 */

import { cn } from '../index';

// モジュールのエクスポートをテスト
describe('Utils Index Module', () => {
  describe('エクスポートのテスト', () => {
    it('cnが正しくエクスポートされている', () => {
      expect(typeof cn).toBe('function');
    });

    it('calendarモジュールが正しくエクスポートされている', async () => {
      const calendarModule = await import('../calendar');
      expect(typeof calendarModule.generateGoogleCalendarUrl).toBe('function');
      expect(typeof calendarModule.GoogleCalendarEvent).toBe('undefined'); // 型なので undefined
    });

    it('imageモジュールが正しくエクスポートされている', async () => {
      const imageModule = await import('../image');
      expect(typeof imageModule.createResponsiveImage).toBe('function');
      expect(typeof imageModule.getResponsiveImagePath).toBe('function');
      expect(typeof imageModule.getImageOptimization).toBe('function');
      expect(typeof imageModule.getLazyLoadConfig).toBe('function');
      expect(typeof imageModule.getImageErrorHandling).toBe('function');
    });
  });

  describe('cn関数のテスト', () => {
    it('文字列クラスを正しく結合する', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('truthy値のみを含める', () => {
      const result = cn(
        'class1',
        true && 'class2',
        false && 'class3',
        'class4'
      );
      expect(result).toBe('class1 class2 class4');
    });

    it('falsy値を除外する', () => {
      const result = cn('class1', null, undefined, false, '', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('空の引数を処理する', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('すべてfalsy値の場合空文字を返す', () => {
      const result = cn(null, undefined, false, '');
      expect(result).toBe('');
    });

    it('条件付きクラスを正しく処理する', () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn(
        'base-class',
        isActive && 'active',
        isDisabled && 'disabled',
        'another-class'
      );
      expect(result).toBe('base-class active another-class');
    });

    it('複雑な組み合わせを処理する', () => {
      const result = cn(
        'px-4',
        'py-2',
        true && 'bg-blue-500',
        false && 'bg-red-500',
        null,
        undefined,
        'text-white',
        '' && 'hidden'
      );
      expect(result).toBe('px-4 py-2 bg-blue-500 text-white');
    });

    it('数値0をfalsy値として処理する', () => {
      const result = cn('class1', 0, 'class2');
      expect(result).toBe('class1 class2');
    });

    it('空白を含む文字列を正しく処理する', () => {
      const result = cn('class1 class2', 'class3 class4');
      expect(result).toBe('class1 class2 class3 class4');
    });

    it('重複したクラス名も含める（重複除去は行わない）', () => {
      const result = cn('class1', 'class2', 'class1');
      expect(result).toBe('class1 class2 class1');
    });
  });
});
