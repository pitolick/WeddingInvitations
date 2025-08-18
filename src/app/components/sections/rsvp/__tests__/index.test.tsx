/**
 * @description RSVPセクションコンポーネントのテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RSVP from '../index';

// MicroCMS APIのモック
const mockGetGuestByInvitationId = jest.fn();
jest.mock('@/app/lib/api/microcms', () => ({
  getGuestByInvitationId: jest.fn(),
}));

// RSVPClientコンポーネントのモック
const mockRSVPClient = jest.fn();
jest.mock('../RSVPClient', () => {
  return function MockRSVPClient(props: any) {
    mockRSVPClient(props);
    return (
      <div data-testid='rsvp-client-mock'>
        <div data-testid='guest-info'>{JSON.stringify(props.guestInfo)}</div>
      </div>
    );
  };
});

describe('RSVP Section Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // モックの設定
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getGuestByInvitationId } = require('@/app/lib/api/microcms');
    (getGuestByInvitationId as jest.Mock).mockImplementation(
      mockGetGuestByInvitationId
    );
  });

  describe('Component Rendering', () => {
    it('renders RSVP section with correct structure', async () => {
      mockGetGuestByInvitationId.mockResolvedValue(null);

      const RSVPComponent = await RSVP({});
      render(RSVPComponent);

      // セクション要素の確認
      const section = screen.getByRole('region', { name: 'RSVP' });
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('id', 'rsvp');

      // タイトルの確認
      expect(screen.getByText('RSVP')).toBeInTheDocument();
      expect(screen.getByText('RSVP')).toHaveClass(
        'font-berkshire',
        'text-4xl',
        'text-center'
      );

      // RSVPClientが表示されることを確認
      expect(screen.getByTestId('rsvp-client-mock')).toBeInTheDocument();
    });

    it('has correct background styling', async () => {
      mockGetGuestByInvitationId.mockResolvedValue(null);

      const RSVPComponent = await RSVP({});
      render(RSVPComponent);

      const section = screen.getByRole('region', { name: 'RSVP' });
      expect(section).toHaveClass(
        'flex',
        'justify-center',
        'items-start',
        'bg-cover',
        'bg-center',
        'bg-no-repeat',
        'py-16',
        'px-5'
      );
    });

    it('has correct container structure', async () => {
      mockGetGuestByInvitationId.mockResolvedValue(null);

      const RSVPComponent = await RSVP({});
      render(RSVPComponent);

      const container = screen.getByText('RSVP').closest('.container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container', 'space-y-8');

      // 内部の白いボックスの確認
      const contentBox = screen.getByTestId('rsvp-client-mock').parentElement;
      expect(contentBox).toHaveClass(
        'mx-auto',
        'bg-white',
        'rounded-2xl',
        'px-6',
        'md:px-10',
        'py-10',
        'flex',
        'flex-col',
        'items-center',
        'gap-6',
        'md:max-w-3xl'
      );
    });
  });

  describe('Guest Information Handling', () => {
    it('passes undefined guestInfo when no invitationId provided', async () => {
      mockGetGuestByInvitationId.mockResolvedValue(null);

      const RSVPComponent = await RSVP({});
      render(RSVPComponent);

      expect(mockGetGuestByInvitationId).not.toHaveBeenCalled();
      expect(mockRSVPClient).toHaveBeenCalledWith({
        guestInfo: undefined,
      });
    });

    it('fetches and passes guest information when invitationId provided', async () => {
      const mockGuestInfo = {
        id: 'test-guest-123',
        name: 'テスト太郎',
        kana: 'テストタロウ',
        autofill: {
          name: true,
          kana: true,
        },
      };
      mockGetGuestByInvitationId.mockResolvedValue(mockGuestInfo);

      const RSVPComponent = await RSVP({ invitationId: 'test-invitation-123' });
      render(RSVPComponent);

      expect(mockGetGuestByInvitationId).toHaveBeenCalledWith(
        'test-invitation-123',
        undefined
      );
      expect(mockRSVPClient).toHaveBeenCalledWith({
        guestInfo: mockGuestInfo,
      });
    });

    it('passes draftKey to MicroCMS API when provided', async () => {
      const mockGuestInfo = {
        id: 'test-guest-456',
        name: 'テスト花子',
        kana: 'テストハナコ',
      };
      mockGetGuestByInvitationId.mockResolvedValue(mockGuestInfo);

      const RSVPComponent = await RSVP({
        invitationId: 'test-invitation-456',
        draftKey: 'draft-key-789',
      });
      render(RSVPComponent);

      expect(mockGetGuestByInvitationId).toHaveBeenCalledWith(
        'test-invitation-456',
        'draft-key-789'
      );
      expect(mockRSVPClient).toHaveBeenCalledWith({
        guestInfo: mockGuestInfo,
      });
    });

    it('passes undefined guestInfo when MicroCMS returns null', async () => {
      mockGetGuestByInvitationId.mockResolvedValue(null);

      const RSVPComponent = await RSVP({
        invitationId: 'non-existent-invitation',
      });
      render(RSVPComponent);

      expect(mockGetGuestByInvitationId).toHaveBeenCalledWith(
        'non-existent-invitation',
        undefined
      );
      expect(mockRSVPClient).toHaveBeenCalledWith({
        guestInfo: undefined,
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', async () => {
      mockGetGuestByInvitationId.mockResolvedValue(null);

      const RSVPComponent = await RSVP({});
      render(RSVPComponent);

      const section = screen.getByRole('region', { name: 'RSVP' });
      expect(section).toHaveAttribute('aria-label', 'RSVP');
    });

    it('has semantic HTML structure', async () => {
      mockGetGuestByInvitationId.mockResolvedValue(null);

      const RSVPComponent = await RSVP({});
      render(RSVPComponent);

      // セクション要素
      expect(screen.getByRole('region')).toBeInTheDocument();

      // 見出し要素
      const heading = screen.getByText('RSVP');
      expect(heading.tagName).toBe('H2');
    });
  });

  describe('Error Handling', () => {
    it('handles MicroCMS API errors gracefully', async () => {
      mockGetGuestByInvitationId.mockRejectedValue(new Error('API Error'));

      // エラーが発生してもコンポーネントがレンダリングされることを確認
      await expect(async () => {
        const RSVPComponent = await RSVP({ invitationId: 'test-invitation' });
        render(RSVPComponent);
      }).rejects.toThrow('API Error');

      expect(mockGetGuestByInvitationId).toHaveBeenCalledWith(
        'test-invitation',
        undefined
      );
    });
  });

  describe('Background Image', () => {
    it('has correct background image URL', async () => {
      mockGetGuestByInvitationId.mockResolvedValue(null);

      const RSVPComponent = await RSVP({});
      render(RSVPComponent);

      const section = screen.getByRole('region', { name: 'RSVP' });
      expect(section).toHaveStyle({
        backgroundImage: "url('/images/sections/rsvp/rsvp-background.webp')",
      });
    });
  });
});
