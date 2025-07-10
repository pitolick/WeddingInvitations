/**
 * @description 招待ページ用のユーティリティ関数
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { devLogger } from '@/app/lib/logger';
import type { InvitationInfo } from './types';

/**
 * @description 招待IDの検証
 * @param id - 検証する招待ID
 * @returns boolean - 有効な招待IDの場合はtrue、無効な場合はfalse
 * @example
 * const isValid = validateInvitationId("wedding-123"); // true
 * const isInvalid = validateInvitationId("ab"); // false
 */
export function validateInvitationId(id: string): boolean {
  return Boolean(id && id.length >= 3);
}

/**
 * @description 招待情報の取得（将来的にAPIから取得）
 * @param id - 招待ID
 * @returns Promise<InvitationInfo | null>
 * @example
 * const invitation = await getInvitationInfo('wedding-123');
 */
export async function getInvitationInfo(
  id: string
): Promise<InvitationInfo | null> {
  try {
    devLogger.info('InvitationUtils', `招待情報を取得中: ${id}`, {
      context: 'InvitationUtils',
      humanNote: '招待情報取得',
      aiTodo: 'APIからの招待情報取得',
    });

    // 将来的にAPIから取得する実装
    // 現在はモックデータを返す
    const mockInvitation: InvitationInfo = {
      id,
      title: 'Wedding Celebration',
      subtitle: 'ディズニーテーマの特別な日',
      date: '2024年12月25日',
      location: 'ディズニーリゾート',
      description: '特別な一日を皆様と共に過ごさせていただければ幸いです。',
      hostNames: ['田中太郎', '田中花子'],
      guestName: undefined,
      rsvpStatus: 'pending',
    };

    return mockInvitation;
  } catch (error) {
    devLogger.error('InvitationUtils', `招待情報の取得に失敗: ${error}`, {
      context: 'InvitationUtils',
      humanNote: '招待情報取得エラー',
      aiTodo: 'エラーハンドリング',
    });
    return null;
  }
}

/**
 * @description 招待URLの生成
 * @param id - 招待ID
 * @returns string
 * @example
 * const url = generateInvitationUrl('wedding-123');
 */
export function generateInvitationUrl(id: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${baseUrl}/${id}`;
}

/**
 * @description 招待IDの正規化
 * @param id - 招待ID
 * @returns string
 * @example
 * const normalizedId = normalizeInvitationId('WEDDING-123');
 */
export function normalizeInvitationId(id: string): string {
  return id.toLowerCase().trim();
}

/**
 * @description 招待ページのSEO用メタデータ生成
 * @param invitation - 招待情報
 * @returns object
 * @example
 * const metadata = generateInvitationMetadata(invitation);
 */
export function generateInvitationMetadata(invitation: InvitationInfo) {
  return {
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
}
