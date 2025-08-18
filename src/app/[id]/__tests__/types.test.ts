/**
 * @description 招待ページの型定義のテスト
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  InvitationPageParams,
  InvitationInfo,
  InvitationPageProps,
  InvitationMetadata,
} from '../types';

describe('Invitation Page Types', () => {
  describe('InvitationPageParams', () => {
    it('正しい構造を持つInvitationPageParamsオブジェクトを作成できる', () => {
      const params: InvitationPageParams = {
        id: 'wedding-123',
      };

      expect(params.id).toBe('wedding-123');
      expect(typeof params.id).toBe('string');
    });
  });

  describe('InvitationInfo', () => {
    it('正しい構造を持つInvitationInfoオブジェクトを作成できる', () => {
      const invitation: InvitationInfo = {
        id: 'wedding-123',
        title: 'Wedding Celebration',
        subtitle: 'ディズニーテーマの特別な日',
        date: '2024年12月25日',
        location: 'ディズニーリゾート',
        description: '特別な一日を皆様と共に過ごさせていただければ幸いです。',
        hostNames: ['田中太郎', '田中花子'],
        guestName: 'ゲスト太郎',
        rsvpStatus: 'attending',
      };

      expect(invitation.id).toBe('wedding-123');
      expect(invitation.title).toBe('Wedding Celebration');
      expect(invitation.subtitle).toBe('ディズニーテーマの特別な日');
      expect(invitation.date).toBe('2024年12月25日');
      expect(invitation.location).toBe('ディズニーリゾート');
      expect(invitation.description).toBe(
        '特別な一日を皆様と共に過ごさせていただければ幸いです。'
      );
      expect(invitation.hostNames).toEqual(['田中太郎', '田中花子']);
      expect(invitation.guestName).toBe('ゲスト太郎');
      expect(invitation.rsvpStatus).toBe('attending');
    });

    it('オプショナルフィールドなしでInvitationInfoオブジェクトを作成できる', () => {
      const invitation: InvitationInfo = {
        id: 'wedding-123',
        title: 'Wedding Celebration',
        subtitle: 'ディズニーテーマの特別な日',
        date: '2024年12月25日',
        location: 'ディズニーリゾート',
        description: '特別な一日を皆様と共に過ごさせていただければ幸いです。',
        hostNames: ['田中太郎'],
      };

      expect(invitation.id).toBe('wedding-123');
      expect(invitation.hostNames).toEqual(['田中太郎']);
      expect(invitation.guestName).toBeUndefined();
      expect(invitation.rsvpStatus).toBeUndefined();
    });

    it('異なるRSVPステータスでInvitationInfoオブジェクトを作成できる', () => {
      const pendingInvitation: InvitationInfo = {
        id: 'wedding-123',
        title: 'Wedding Celebration',
        subtitle: 'ディズニーテーマの特別な日',
        date: '2024年12月25日',
        location: 'ディズニーリゾート',
        description: '特別な一日を皆様と共に過ごさせていただければ幸いです。',
        hostNames: ['田中太郎'],
        rsvpStatus: 'pending',
      };

      const declinedInvitation: InvitationInfo = {
        id: 'wedding-123',
        title: 'Wedding Celebration',
        subtitle: 'ディズニーテーマの特別な日',
        date: '2024年12月25日',
        location: 'ディズニーリゾート',
        description: '特別な一日を皆様と共に過ごさせていただければ幸いです。',
        hostNames: ['田中太郎'],
        rsvpStatus: 'declined',
      };

      expect(pendingInvitation.rsvpStatus).toBe('pending');
      expect(declinedInvitation.rsvpStatus).toBe('declined');
    });
  });

  describe('InvitationPageProps', () => {
    it('正しい構造を持つInvitationPagePropsオブジェクトを作成できる', () => {
      const props: InvitationPageProps = {
        params: {
          id: 'wedding-123',
        },
        searchParams: {
          draft: 'true',
          theme: 'disney',
        },
      };

      expect(props.params.id).toBe('wedding-123');
      expect(props.searchParams?.draft).toBe('true');
      expect(props.searchParams?.theme).toBe('disney');
    });

    it('searchParamsなしでInvitationPagePropsオブジェクトを作成できる', () => {
      const props: InvitationPageProps = {
        params: {
          id: 'wedding-123',
        },
      };

      expect(props.params.id).toBe('wedding-123');
      expect(props.searchParams).toBeUndefined();
    });
  });

  describe('InvitationMetadata', () => {
    it('正しい構造を持つInvitationMetadataオブジェクトを作成できる', () => {
      const metadata: InvitationMetadata = {
        title: 'Wedding Celebration - wedding-123',
        description:
          'ディズニーテーマの特別な日 - 特別な一日を皆様と共に過ごさせていただければ幸いです。',
        keywords: [
          'wedding',
          'invitation',
          'disney',
          '結婚式',
          '招待状',
          'wedding-123',
        ],
        openGraph: {
          title: 'Wedding Celebration - wedding-123',
          description:
            'ディズニーテーマの特別な日 - 特別な一日を皆様と共に過ごさせていただければ幸いです。',
          type: 'website',
          locale: 'ja_JP',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Wedding Celebration - wedding-123',
          description:
            'ディズニーテーマの特別な日 - 特別な一日を皆様と共に過ごさせていただければ幸いです。',
        },
      };

      expect(metadata.title).toBe('Wedding Celebration - wedding-123');
      expect(metadata.description).toBe(
        'ディズニーテーマの特別な日 - 特別な一日を皆様と共に過ごさせていただければ幸いです。'
      );
      expect(metadata.keywords).toEqual([
        'wedding',
        'invitation',
        'disney',
        '結婚式',
        '招待状',
        'wedding-123',
      ]);
      expect(metadata.openGraph.title).toBe(
        'Wedding Celebration - wedding-123'
      );
      expect(metadata.openGraph.type).toBe('website');
      expect(metadata.openGraph.locale).toBe('ja_JP');
      expect(metadata.twitter.card).toBe('summary_large_image');
    });
  });

  describe('型の整合性', () => {
    it('InvitationInfoとInvitationMetadataの整合性', () => {
      const invitation: InvitationInfo = {
        id: 'wedding-123',
        title: 'Wedding Celebration',
        subtitle: 'ディズニーテーマの特別な日',
        date: '2024年12月25日',
        location: 'ディズニーリゾート',
        description: '特別な一日を皆様と共に過ごさせていただければ幸いです。',
        hostNames: ['田中太郎', '田中花子'],
      };

      const metadata: InvitationMetadata = {
        title: `${invitation.title} - ${invitation.id}`,
        description: `${invitation.subtitle} - ${invitation.description}`,
        keywords: [
          'wedding',
          'invitation',
          'disney',
          '結婚式',
          '招待状',
          invitation.id,
        ],
        openGraph: {
          title: `${invitation.title} - ${invitation.id}`,
          description: `${invitation.subtitle} - ${invitation.description}`,
          type: 'website',
          locale: 'ja_JP',
        },
        twitter: {
          card: 'summary_large_image',
          title: `${invitation.title} - ${invitation.id}`,
          description: `${invitation.subtitle} - ${invitation.description}`,
        },
      };

      expect(metadata.title).toBe('Wedding Celebration - wedding-123');
      expect(metadata.description).toBe(
        'ディズニーテーマの特別な日 - 特別な一日を皆様と共に過ごさせていただければ幸いです。'
      );
      expect(metadata.keywords).toContain(invitation.id);
    });

    it('RSVPステータスの型安全性', () => {
      const validStatuses: Array<'pending' | 'attending' | 'declined'> = [
        'pending',
        'attending',
        'declined',
      ];

      validStatuses.forEach(status => {
        const invitation: InvitationInfo = {
          id: 'wedding-123',
          title: 'Wedding Celebration',
          subtitle: 'ディズニーテーマの特別な日',
          date: '2024年12月25日',
          location: 'ディズニーリゾート',
          description: '特別な一日を皆様と共に過ごさせていただければ幸いです。',
          hostNames: ['田中太郎'],
          rsvpStatus: status,
        };

        expect(invitation.rsvpStatus).toBe(status);
      });
    });
  });
});
