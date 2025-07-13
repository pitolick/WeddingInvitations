/**
 * @description 招待ページのメインページコンポーネント（Server Component）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import type { Metadata } from 'next';
import {
  MainVisual,
  Navigation,
  Countdown,
  Host,
  Message,
  Gallery,
  Event,
  RSVP, // 追加
} from '../components/sections';

/**
 * @description 動的メタデータ生成
 * @param params - ページパラメータ
 * @returns Promise<Metadata>
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; draftKey?: string }>;
}): Promise<Metadata> {
  const { id: invitationId } = await params;

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
 * @description 招待ページのメインページコンポーネント（Server Component）
 * @param props - ページのProps
 * @returns Promise<JSX.Element>
 * @example
 * <InvitationPage params={{ id: "wedding-123" }} />
 */
export default async function InvitationPage({
  params,
}: {
  params: Promise<{ id: string; draftKey?: string }>;
}) {
  const { id: invitationId, draftKey } = await params;

  return (
    <div className='min-h-screen'>
      {/* メインビジュアル（MV）セクション */}
      <MainVisual />

      {/* カウントダウンセクション */}
      <Countdown />

      {/* ナビゲーションセクション */}
      <Navigation />

      {/* ホストセクション */}
      <Host />

      {/* メッセージセクション */}
      <Message invitationId={invitationId} draftKey={draftKey} />

      {/* ギャラリーセクション */}
      <Gallery />

      {/* イベント詳細セクション */}
      <Event invitationId={invitationId} draftKey={draftKey} />

      {/* RSVPセクション */}
      <RSVP invitationId={invitationId} draftKey={draftKey} />

      {/* ギャラリーセクション */}
      {/* <GallerySection /> */}
    </div>
  );
}
