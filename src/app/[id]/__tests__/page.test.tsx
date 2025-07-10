/**
 * @description 招待ページのテストファイル
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvitationPage from '../page';
import { validateInvitationId, normalizeInvitationId } from '../utils';

/**
 * @description 招待ページのテスト
 */
describe('InvitationPage', () => {
  /**
   * @description 正常な招待IDでの表示テスト
   */
  it('正常な招待IDでページが表示される', async () => {
    const params = Promise.resolve({ id: 'wedding-123' });

    render(await InvitationPage({ params }));

    // メインビジュアルのタイトルが表示されることを確認（data-testidを使用）
    await waitFor(() => {
      expect(screen.getByTestId('main-visual-title')).toBeInTheDocument();
    });
    // ディズニーテーマのサブタイトルは要件変更により削除

    // 招待IDが表示されることを確認
    expect(screen.getByText('招待ID: wedding-123')).toBeInTheDocument();

    // 招待情報セクションが表示されることを確認
    expect(screen.getByText('ご招待')).toBeInTheDocument();
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
   * @description メインビジュアルコンポーネントの表示テスト
   */
  it('メインビジュアルコンポーネントが正しく表示される', async () => {
    const params = Promise.resolve({ id: 'wedding-123' });

    render(await InvitationPage({ params }));

    // メインビジュアルセクションが存在することを確認
    await waitFor(() => {
      const mvSection = screen.getByTestId('main-visual-section');
      expect(mvSection).toBeInTheDocument();
    });

    // メインビジュアルのコンテンツが存在することを確認
    const mvContent = screen.getByTestId('main-visual-content');
    expect(mvContent).toBeInTheDocument();
  });

  /**
   * @description レスポンシブデザインのテスト
   */
  it('レスポンシブデザインのクラスが適用される', async () => {
    const params = Promise.resolve({ id: 'wedding-123' });

    render(await InvitationPage({ params }));

    // メインビジュアルセクションにレスポンシブクラスが適用されていることを確認
    await waitFor(() => {
      const mvSection = screen.getByTestId('main-visual-section');
      expect(mvSection).toHaveClass('relative', 'w-full', 'h-screen');
    });
  });

  /**
   * @description アクセシビリティのテスト
   */
  it('アクセシビリティ属性が正しく設定される', async () => {
    const params = Promise.resolve({ id: 'wedding-123' });

    render(await InvitationPage({ params }));

    // メインビジュアルのタイトルにdata-testidが設定されていることを確認
    await waitFor(() => {
      const title = screen.getByTestId('main-visual-title');
      expect(title).toBeInTheDocument();
    });

    // サブタイトルは要件変更により削除されたため、テストを削除
  });
});
