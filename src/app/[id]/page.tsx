/**
 * @description 招待ページのメインページコンポーネント（Server Component）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InvitationPageClient from './InvitationPageClient';
import { devLogger } from '@/app/lib/logger';

/**
 * @description 動的メタデータ生成
 * @param params - ページパラメータ
 * @returns Promise<Metadata>
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: invitationId } = await params;

  devLogger.info(
    'InvitationPage',
    `招待ページのメタデータを生成中: ${invitationId}`,
    {
      context: 'InvitationPage',
      humanNote: '動的メタデータ生成',
      aiTodo: '招待IDに基づくメタデータの生成',
    }
  );

  return {
    title: `Wedding Invitation - ${invitationId}`,
    description: `ディズニーテーマの特別な結婚式招待状です。招待ID: ${invitationId}`,
    keywords: [
      'wedding',
      'invitation',
      'disney',
      '結婚式',
      '招待状',
      invitationId,
    ],
    authors: [{ name: 'WeddingInvitations' }],
    openGraph: {
      title: `Wedding Invitation - ${invitationId}`,
      description: `ディズニーテーマの特別な結婚式招待状です。招待ID: ${invitationId}`,
      type: 'website',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Wedding Invitation - ${invitationId}`,
      description: `ディズニーテーマの特別な結婚式招待状です。招待ID: ${invitationId}`,
    },
  };
}

/**
 * @description 招待ページのメインページコンポーネント
 * @param props - ページのProps
 * @returns JSX.Element
 * @example
 * <InvitationPage params={{ id: "wedding-123" }} />
 */
export default async function InvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: invitationId } = await params;

  /**
   * @description 招待IDの検証
   */
  if (!invitationId || invitationId.length < 3) {
    devLogger.error('InvitationPage', `無効な招待ID: ${invitationId}`, {
      context: 'InvitationPage',
      humanNote: '招待ID検証エラー',
      aiTodo: '404ページへのリダイレクト',
    });
    notFound();
  }

  devLogger.info('InvitationPage', `招待ページを表示中: ${invitationId}`, {
    context: 'InvitationPage',
    humanNote: '招待ページ表示',
    aiTodo: 'Client Componentの表示',
  });

  return <InvitationPageClient invitationId={invitationId} />;
}
