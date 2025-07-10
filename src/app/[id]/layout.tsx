/**
 * @description 招待ページ用レイアウトコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import type { Metadata } from 'next';

/**
 * @description 招待ページのメタデータ
 */
export const metadata: Metadata = {
  title: 'Wedding Invitation - 結婚式招待状',
  description: 'ディズニーテーマの特別な結婚式招待状です。',
  keywords: ['wedding', 'invitation', 'disney', '結婚式', '招待状'],
  authors: [{ name: 'WeddingInvitations' }],
  openGraph: {
    title: 'Wedding Invitation - 結婚式招待状',
    description: 'ディズニーテーマの特別な結婚式招待状です。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Invitation - 結婚式招待状',
    description: 'ディズニーテーマの特別な結婚式招待状です。',
  },
};

/**
 * @description 招待ページ用レイアウトコンポーネント
 * @param props - レイアウトのProps
 * @returns JSX.Element
 * @example
 * <InvitationLayout>
 *   <InvitationPage />
 * </InvitationLayout>
 */
export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50'>
      <main className='relative'>{children}</main>
    </div>
  );
}
