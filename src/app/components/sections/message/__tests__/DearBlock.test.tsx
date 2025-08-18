/**
 * @description DearBlockコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import DearBlock from '../DearBlock';

global.fetch = jest.fn(); // Mock fetch API

describe('DearBlock Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders DearBlock component', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dear: '田中太郎',
        message: '特別なメッセージです。',
      }),
    } as Response);

    render(<DearBlock invitationId='test-123' />);

    // ローディング状態が表示される
    expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();

    // データ取得後にコンテンツが表示される
    await waitFor(() => {
      // Dearタイトルが表示される
      expect(screen.getByText('Dear')).toBeInTheDocument();
      expect(screen.getByText('田中太郎')).toBeInTheDocument();
      expect(screen.getByText('特別なメッセージです。')).toBeInTheDocument();
    });
  });

  it('has proper component structure', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dear: '田中太郎',
        message: '特別なメッセージです。',
      }),
    } as Response);

    render(<DearBlock invitationId='test-123' />);

    await waitFor(() => {
      // Hr装飾要素が表示される
      expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();

      // Dearタイトルが表示される
      expect(screen.getByText('Dear')).toBeInTheDocument();
      expect(screen.getByText('田中太郎')).toBeInTheDocument();

      // メッセージが表示される
      expect(screen.getByText('特別なメッセージです。')).toBeInTheDocument();
    });
  });

  it('shows loading state correctly', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<DearBlock invitationId='test-123' />);

    // ローディングスピナーが表示される
    const loadingElement = screen.getAllByRole('generic')[0];
    expect(loadingElement).toBeInTheDocument();
    // ローディング状態ではanimate-spinクラスが適用される
    expect(loadingElement.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('handles error state correctly', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<DearBlock invitationId='test-123' />);

    // エラー時は何も表示されない
    await waitFor(() => {
      expect(screen.queryByText('Dear')).not.toBeInTheDocument();
      expect(screen.queryByText('田中太郎')).not.toBeInTheDocument();
    });
  });

  it('handles 404 response correctly', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      status: 404,
      ok: false,
    } as Response);

    render(<DearBlock invitationId='test-123' />);

    // 404時は何も表示されない
    await waitFor(() => {
      expect(screen.queryByText('Dear')).not.toBeInTheDocument();
      expect(screen.queryByText('田中太郎')).not.toBeInTheDocument();
    });
  });

  it('handles empty data correctly', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dear: '',
        message: '',
      }),
    } as Response);

    render(<DearBlock invitationId='test-123' />);

    // 空データ時は何も表示されない
    await waitFor(() => {
      expect(screen.queryByText('Dear')).not.toBeInTheDocument();
    });
  });

  it('uses draftKey correctly', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dear: '田中太郎',
        message: '特別なメッセージです。',
      }),
    } as Response);

    render(<DearBlock invitationId='test-123' draftKey='draft-123' />);

    // draftKeyが正しく使用される
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/dear-block?invitationId=test-123&draftKey=draft-123'
    );

    await waitFor(() => {
      expect(screen.getByText('Dear')).toBeInTheDocument();
    });
  });

  it('renders HTML message correctly', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dear: '田中太郎',
        message: '<strong>太字のメッセージ</strong>',
      }),
    } as Response);

    render(<DearBlock invitationId='test-123' />);

    await waitFor(() => {
      expect(screen.getByText('太字のメッセージ')).toBeInTheDocument();
    });
  });

  it('renders multi-line message correctly', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dear: '田中太郎',
        message: '1行目のメッセージ\n2行目のメッセージ\n3行目のメッセージ',
      }),
    } as Response);

    render(<DearBlock invitationId='test-123' />);

    await waitFor(() => {
      expect(screen.getByText(/1行目のメッセージ/)).toBeInTheDocument();
      expect(screen.getByText(/2行目のメッセージ/)).toBeInTheDocument();
      expect(screen.getByText(/3行目のメッセージ/)).toBeInTheDocument();
    });
  });
});
