/**
 * @description microCMS APIレスポンスの型定義
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { MicroCMSObjectContent } from 'microcms-js-sdk';

/**
 * @description 招待種別の型定義
 * @type InviteType
 * @since 1.0.0
 */
export type InviteType = '挙式' | '披露宴' | '二次会';

/**
 * @description 招待者情報の基本型定義
 * @interface GuestBase
 * @since 1.0.0
 */
export interface GuestBase {
  /** 招待者名 */
  name: string;
  /** Dear（敬称付き名前）- 任意項目 */
  dear?: string;
  /** メッセージ（HTML形式）- 任意項目 */
  message?: TrustedHTML;
  /** 招待種別 */
  invite: InviteType[];
}

/**
 * @description 招待者情報の型定義
 * @interface GuestContent
 * @since 1.0.0
 */
export interface GuestContent extends MicroCMSObjectContent, GuestBase {
  /** 家族情報（参照コンテンツ） */
  family: GuestContentReference[];
}

/**
 * @description 招待者情報の参照型定義
 * @interface GuestContentReference
 * @since 1.0.0
 */
export interface GuestContentReference
  extends MicroCMSObjectContent,
    GuestBase {
  /** 家族情報（参照コンテンツ） */
  family: GuestContentReference[];
}

/**
 * @description DearBlockで使用するデータの型定義
 * @interface DearBlockData
 * @since 1.0.0
 */
export interface DearBlockData {
  /** 招待者名 */
  guestName: string;
  /** Dear（敬称付き名前） */
  dear: string;
  /** メッセージ（HTML形式） */
  message: TrustedHTML;
  /** 招待種別 */
  inviteTypes: InviteType[];
  /** 家族情報 */
  familyMembers: DearBlockData[];
}

/**
 * @description microCMS APIレスポンスの型定義
 * @type MicroCMSResponse
 * @since 1.0.0
 */
export type MicroCMSResponse = GuestContent;

/**
 * @description microCMSからDearBlockDataへの変換関数
 * @param guestContent - microCMSの招待者コンテンツ
 * @returns DearBlockData
 * @throws {Error} guestContentが無効な場合
 * @example
 * const dearBlockData = convertToDearBlockData(guestContent);
 */
export function convertToDearBlockData(
  guestContent: GuestContent
): DearBlockData {
  return {
    guestName: guestContent.name,
    dear: guestContent.dear || guestContent.name, // dearが未設定の場合は名前を使用
    message: guestContent.message || trustedHTMLPolicy.createHTML(''), // messageが未設定の場合は空文字を使用
    inviteTypes: guestContent.invite as InviteType[],
    familyMembers: guestContent.family.map(familyMember => ({
      guestName: familyMember.name,
      dear: familyMember.dear || familyMember.name, // dearが未設定の場合は名前を使用
      message: familyMember.message || trustedHTMLPolicy.createHTML(''), // messageが未設定の場合は空文字を使用
      inviteTypes: familyMember.invite as InviteType[],
      familyMembers: [], // ネストした家族情報は必要に応じて実装
    })),
  };
}
