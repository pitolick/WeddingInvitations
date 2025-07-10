/**
 * @description 招待ページ用の型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description 招待ページのパラメータ型
 */
export interface InvitationPageParams {
  id: string;
}

/**
 * @description 招待情報の型
 */
export interface InvitationInfo {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  hostNames: string[];
  guestName?: string;
  rsvpStatus?: 'pending' | 'attending' | 'declined';
}

/**
 * @description 招待ページのProps型
 */
export interface InvitationPageProps {
  params: InvitationPageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

/**
 * @description 招待ページのメタデータ型
 */
export interface InvitationMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    type: string;
    locale: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
  };
}
