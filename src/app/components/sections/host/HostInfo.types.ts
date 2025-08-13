/**
 * @description ホスト情報（新郎新婦）型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

/**
 * @description ホストプロフィール情報の型定義
 * @interface HostProfile
 * @property {string} nameJa - 日本語名（例: "栗原 誠"）
 * @property {string} nameEn - 英語名（例: "Makoto Kurihara"）
 * @property {React.ReactNode} messages - プロフィールメッセージ（JSX要素として表示）
 * @property {string} image - プロフィール画像のパス（WebP形式推奨）
 * @property {string} [frameLeft] - 左側の花装飾画像パス（新郎用）
 * @property {string} [frameRight] - 右側の花装飾画像パス（新婦用）
 * @example
 * ```typescript
 * const groomProfile: HostProfile = {
 *   nameJa: '栗原 誠',
 *   nameEn: 'Makoto Kurihara',
 *   messages: (
 *     <>
 *       <p>新郎のプロフィールメッセージ1行目</p>
 *       <p>新郎のプロフィールメッセージ2行目</p>
 *     </>
 *   ),
 *   image: '/images/sections/host/host-groom.webp',
 *   frameLeft: '/images/sections/host/host-frame-left.webp',
 * };
 * ```
 */
export interface HostProfile {
  /** 日本語名 */
  nameJa: string;
  /** 英語名 */
  nameEn: string;
  /** プロフィールメッセージ配列 */
  messages: string[][];
  /** 画像パス */
  image: string;
  /** 花装飾画像パス（左） */
  frameLeft?: string;
  /** 花装飾画像パス（右） */
  frameRight?: string;
}

/**
 * @description ホストセクションProps型
 * @interface HostInfoSectionProps
 * @property {HostProfile} groom - 新郎のプロフィール情報
 * @property {HostProfile} bride - 新婦のプロフィール情報
 * @example
 * ```typescript
 * const hostSectionProps: HostInfoSectionProps = {
 *   groom: {
 *     nameJa: '栗原 誠',
 *     nameEn: 'Makoto Kurihara',
 *     messages: <p>新郎のメッセージ</p>,
 *     image: '/images/sections/host/host-groom.webp',
 *     frameLeft: '/images/sections/host/host-frame-left.webp',
 *   },
 *   bride: {
 *     nameJa: '森下 紗伎',
 *     nameEn: 'Saki Morishita',
 *     messages: <p>新婦のメッセージ</p>,
 *     image: '/images/sections/host/host-bride.webp',
 *     frameRight: '/images/sections/host/host-frame-right.webp',
 *   },
 * };
 * ```
 */
export interface HostInfoSectionProps {
  groom: HostProfile;
  bride: HostProfile;
}
