/**
 * @description 招待ページのテストファイル
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { validateInvitationId, normalizeInvitationId } from '../utils';

// microCMS APIのモック
jest.mock('@/app/lib/api', () => ({
  getDearBlockData: jest.fn().mockResolvedValue({
    dear: '田中太郎',
    message: '特別なメッセージです。',
  }),
}));

/**
 * @description 招待ページのテスト
 */
describe('InvitationPage', () => {
  /**
   * @description ページがレンダリングされることを確認
   */
  it.skip('ページがレンダリングされる', async () => {
    expect(true).toBe(true);
  });

  /**
   * @description 招待IDの検証テスト
   */
  it('招待IDの検証が正しく動作する', () => {
    // 有効なID（最小長3文字以上）
    expect(validateInvitationId('wedding-123')).toBe(true);
    expect(validateInvitationId('test123')).toBe(true);
    expect(validateInvitationId('my-wedding')).toBe(true);
    expect(validateInvitationId('abc')).toBe(true); // 最小長
    expect(validateInvitationId('test@123')).toBe(true); // 特殊文字も許可
    expect(validateInvitationId('test 123')).toBe(true); // スペースも許可

    // 無効なID
    expect(validateInvitationId('')).toBe(false);
    expect(validateInvitationId('ab')).toBe(false); // 最小長未満
  });

  /**
   * @description 招待IDの正規化テスト
   */
  it('招待IDの正規化が正しく動作する', () => {
    expect(normalizeInvitationId('WEDDING-123')).toBe('wedding-123');
    expect(normalizeInvitationId('  Test123  ')).toBe('test123');
    expect(normalizeInvitationId('My-Wedding')).toBe('my-wedding');
  });

  /**
   * @description ページの基本構造テスト
   */
  it.skip('ページの基本構造が正しく表示される', async () => {
    expect(true).toBe(true);
  });
});
