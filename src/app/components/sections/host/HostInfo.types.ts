/**
 * @description ホスト情報（新郎新婦）型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

export interface HostProfile {
  /** 日本語名 */
  nameJa: string;
  /** 英語名 */
  nameEn: string;
  /** プロフィールメッセージ配列 */
  messages: React.ReactNode;
  /** 画像パス */
  image: string;
  /** 花装飾画像パス（左） */
  frameLeft?: string;
  /** 花装飾画像パス（右） */
  frameRight?: string;
}

/**
 * @description ホストセクションProps型
 */
export interface HostInfoSectionProps {
  groom: HostProfile;
  bride: HostProfile;
}
