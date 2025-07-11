/**
 * @description メッセージセクションの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { DearBlockData } from '@/app/lib/types/microcms';

/**
 * @description 招待者情報の型定義
 * @interface DearBlockProps
 * @since 1.0.0
 */
export interface DearBlockProps {
  /** 招待者ID */
  invitationId: string;
}

/**
 * @description メッセージセクションのProps型定義
 * @interface MessageProps
 * @since 1.0.0
 */
export type MessageProps = DearBlockProps;

/**
 * @description DearBlockで使用するデータの型定義（再エクスポート）
 * @interface DearBlockData
 * @since 1.0.0
 */
export type { DearBlockData };
