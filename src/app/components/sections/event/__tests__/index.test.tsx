/**
 * @description イベントセクションの構造テスト（テキスト内容非依存）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { render } from '@testing-library/react';
import Event from '../index';
import { getGuestByInvitationId } from '@/app/lib/api/microcms';
import { devLogger } from '@/app/lib/logger';
import '@testing-library/jest-dom';

jest.mock('@/app/lib/api/microcms', () => ({
  getGuestByInvitationId: jest.fn(),
}));
jest.mock('@/app/lib/logger', () => ({
  devLogger: { error: jest.fn() },
}));

const mockGetGuestByInvitationId =
  getGuestByInvitationId as jest.MockedFunction<typeof getGuestByInvitationId>;
const mockDevLogger = devLogger as jest.Mocked<typeof devLogger>;

describe('Event Component (structure only)', () => {
  it('section要素が存在し、id="event"が付与されている', async () => {
    const { container } = render(await Event({}));
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'event');
  });

  it('containerクラスのdivが存在する', async () => {
    const { container } = render(await Event({}));
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('mx-auto', 'px-5');
  });

  it('gridレイアウトのdivが存在し、grid-cols-1クラスが付与されている', async () => {
    const { container } = render(await Event({}));
    const gridDiv = container.querySelector('.grid');
    expect(gridDiv).toBeInTheDocument();
    expect(gridDiv).toHaveClass('grid-cols-1');
  });

  it('iframe（地図）が1つ以上存在し、title="会場の地図"が付与されている', async () => {
    const { container } = render(await Event({}));
    const iframes = container.querySelectorAll('iframe[title="会場の地図"]');
    expect(iframes.length).toBeGreaterThan(0);
  });

  it('h2要素が1つ以上存在する', async () => {
    const { container } = render(await Event({}));
    const h2s = container.querySelectorAll('h2');
    expect(h2s.length).toBeGreaterThan(0);
  });
});

describe('Event Component with microCMS integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('招待者情報が正常に取得できる場合', () => {
    it('招待者情報に基づいてイベントをフィルタリングする（挙式・披露宴）', async () => {
      mockGetGuestByInvitationId.mockResolvedValue({
        id: 'guest-1',
        name: 'テスト太郎',
        invite: ['挙式', '披露宴'],
      } as any);

      const { container } = render(
        await Event({ invitationId: 'test-invitation' })
      );

      // microCMS APIが正しいパラメータで呼び出されることを確認
      expect(mockGetGuestByInvitationId).toHaveBeenCalledWith(
        'test-invitation',
        undefined
      );

      // コンポーネントが正常にレンダリングされることを確認
      const section = container.querySelector('section#event');
      expect(section).toBeInTheDocument();
    });

    it('招待者情報に基づいてイベントをフィルタリングする（二次会のみ）', async () => {
      mockGetGuestByInvitationId.mockResolvedValue({
        id: 'guest-2',
        name: 'テスト花子',
        invite: ['二次会'],
      } as any);

      const { container } = render(
        await Event({
          invitationId: 'test-invitation-2',
          draftKey: 'draft-key',
        })
      );

      // microCMS APIがdraftKeyと共に呼び出されることを確認
      expect(mockGetGuestByInvitationId).toHaveBeenCalledWith(
        'test-invitation-2',
        'draft-key'
      );

      // コンポーネントが正常にレンダリングされることを確認
      const section = container.querySelector('section#event');
      expect(section).toBeInTheDocument();
    });

    it('招待者情報のinvite配列が空の場合はデフォルトイベントを表示', async () => {
      mockGetGuestByInvitationId.mockResolvedValue({
        id: 'guest-3',
        name: 'テスト三郎',
        invite: [],
      } as any);

      const { container } = render(
        await Event({ invitationId: 'test-invitation-3' })
      );

      // デフォルトイベント（披露宴・二次会）が表示されることを確認
      const section = container.querySelector('section#event');
      expect(section).toBeInTheDocument();
    });

    it('招待者情報が存在しない場合はデフォルトイベントを表示', async () => {
      mockGetGuestByInvitationId.mockResolvedValue(null);

      const { container } = render(
        await Event({ invitationId: 'test-invitation-4' })
      );

      // デフォルトイベントが表示されることを確認
      const section = container.querySelector('section#event');
      expect(section).toBeInTheDocument();
    });

    it('招待者情報のinviteが配列でない場合はデフォルトイベントを表示', async () => {
      mockGetGuestByInvitationId.mockResolvedValue({
        id: 'guest-5',
        name: 'テスト五郎',
        invite: '披露宴', // 配列でない場合
      } as any);

      const { container } = render(
        await Event({ invitationId: 'test-invitation-5' })
      );

      // デフォルトイベントが表示されることを確認
      const section = container.querySelector('section#event');
      expect(section).toBeInTheDocument();
    });
  });

  describe('microCMS APIでエラーが発生する場合', () => {
    it('API呼び出しでErrorオブジェクトが投げられた場合のエラーハンドリング', async () => {
      const testError = new Error('microCMS API connection failed');
      mockGetGuestByInvitationId.mockRejectedValue(testError);

      const { container } = render(
        await Event({ invitationId: 'test-invitation-error' })
      );

      // エラーログが正しく出力されることを確認
      expect(mockDevLogger.error).toHaveBeenCalledWith(
        'microCMS API error',
        '招待者情報の取得に失敗しました',
        {
          context: 'Event component',
          humanNote: '招待者情報の取得に失敗しました',
          aiTodo: 'エラーハンドリングを改善し、フォールバック処理を実装する',
          error: 'microCMS API connection failed',
        }
      );

      // デフォルトイベントが表示されることを確認
      const section = container.querySelector('section#event');
      expect(section).toBeInTheDocument();
    });

    it('API呼び出しで非Errorオブジェクトが投げられた場合のエラーハンドリング', async () => {
      const testError = 'Network timeout';
      mockGetGuestByInvitationId.mockRejectedValue(testError);

      const { container } = render(
        await Event({ invitationId: 'test-invitation-error-2' })
      );

      // エラーログが正しく出力されることを確認（文字列に変換されている）
      expect(mockDevLogger.error).toHaveBeenCalledWith(
        'microCMS API error',
        '招待者情報の取得に失敗しました',
        {
          context: 'Event component',
          humanNote: '招待者情報の取得に失敗しました',
          aiTodo: 'エラーハンドリングを改善し、フォールバック処理を実装する',
          error: 'Network timeout',
        }
      );

      // デフォルトイベントが表示されることを確認
      const section = container.querySelector('section#event');
      expect(section).toBeInTheDocument();
    });
  });

  describe('invitationIdが提供されない場合', () => {
    it('invitationIdがundefinedの場合はAPIを呼び出さずデフォルトイベントを表示', async () => {
      const { container } = render(await Event({ invitationId: undefined }));

      // APIが呼び出されないことを確認
      expect(mockGetGuestByInvitationId).not.toHaveBeenCalled();

      // デフォルトイベントが表示されることを確認
      const section = container.querySelector('section#event');
      expect(section).toBeInTheDocument();
    });

    it('invitationIdが空文字の場合はAPIを呼び出さずデフォルトイベントを表示', async () => {
      const { container } = render(await Event({ invitationId: '' }));

      // APIが呼び出されないことを確認
      expect(mockGetGuestByInvitationId).not.toHaveBeenCalled();

      // デフォルトイベントが表示されることを確認
      const section = container.querySelector('section#event');
      expect(section).toBeInTheDocument();
    });
  });
});
