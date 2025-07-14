/**
 * @description 招待ページのメインページコンポーネント（Server Component）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  MainVisual,
  Navigation,
  Countdown,
  Host,
  Message,
  Gallery,
  Event,
  RSVP, // 追加
  Footer, // 追加
} from '../components/sections';
import { BackToTopButton } from '../components/common/button';
import { getMicroCMSClient } from '@/app/lib/api/microcms';

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
  const { id: invitationId, draftKey } = await params;

  // microCMSからゲスト情報を取得
  let dear = '';
  let title = '栗原 誠・森下 紗伎 結婚式のご案内';
  const description =
    '人生の門出に際し、栗原 誠と森下 紗伎の結婚式にご招待申し上げます。Web招待状で詳細をご確認の上、ご返信をお願いいたします。';

  try {
    const client = await getMicroCMSClient();
    const guestData = await client.get({
      endpoint: 'guests',
      contentId: invitationId,
      ...(draftKey && { draftKey }),
    });

    // dearフィールドが存在する場合は取得
    if (guestData.dear) {
      dear = guestData.dear;
      title = `Dear ${dear} | ${title}`;
    }
  } catch (error) {
    // エラーが発生した場合はデフォルト値を維持
    console.error('メタデータ生成時にゲスト情報の取得に失敗しました:', error);
  }

  return {
    title,
    description,
    robots: 'noindex',
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
      title,
      description,
      type: 'website',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

  // microCMSからゲスト情報を取得して存在確認
  try {
    const client = await getMicroCMSClient();
    await client.get({
      endpoint: 'guests',
      contentId: invitationId,
    });
  } catch {
    // ゲストが存在しない場合は404エラーを返す
    notFound();
  }

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

      {/* フッターセクション */}
      <Footer />

      {/* ナビゲーションに戻るボタン */}
      <BackToTopButton />
    </div>
  );
}

// 静的パスを生成
/**
 * @description MicroCMSから全てのゲストIDを取得して静的パスを生成
 * @returns Promise<{ id: string }[]> 静的パス生成用のパラメータ配列
 * @example
 * // Next.jsが自動的に呼び出す
 * const params = await generateStaticParams();
 */
export async function generateStaticParams() {
  const client = await getMicroCMSClient();
  const data = await client.getAllContentIds({
    endpoint: 'guests',
  });

  return data.map(contentId => ({
    id: contentId,
  }));
}
