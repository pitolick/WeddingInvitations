/**
 * @description microCMS APIクライアント
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use server';

import { createClient } from 'microcms-js-sdk';
import {
  GuestContent,
  convertToDearBlockData,
  DearBlockData,
} from '../types/microcms';

/**
 * @description microCMS API設定
 * @constant MICROCMS_CONFIG
 * @since 1.0.0
 */
const MICROCMS_CONFIG = {
  SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN || '',
  API_KEY: process.env.MICROCMS_API_KEY || '',
} as const;

/**
 * @description microCMSクライアントの作成
 * @returns Promise<microCMSClient>
 * @throws {Error} 環境変数が設定されていない場合
 * @since 1.0.0
 */
export async function getMicroCMSClient() {
  return createClient({
    serviceDomain: MICROCMS_CONFIG.SERVICE_DOMAIN,
    apiKey: MICROCMS_CONFIG.API_KEY,
  });
}

/**
 * @description 招待者情報を取得（プレビューモード対応）
 * @param invitationId - 招待ID
 * @param draftKey - microCMSプレビューモード用ドラフトキー（任意）
 * @returns Promise<GuestContent | null>
 * @example
 * const guest = await getGuestByInvitationId('test', 'xxxx');
 */
export async function getGuestByInvitationId(
  invitationId: string,
  draftKey?: string
): Promise<GuestContent | null> {
  try {
    const client = await getMicroCMSClient();
    const data = await client.get<GuestContent>({
      endpoint: 'guests',
      contentId: invitationId,
      queries: draftKey ? { draftKey } : undefined,
    });
    return data;
  } catch (error) {
    console.error('microCMS API error:', error);
    return null;
  }
}

/**
 * @description 招待者情報をDearBlockData形式で取得（プレビューモード対応）
 * @param invitationId - 招待ID
 * @param draftKey - microCMSプレビューモード用ドラフトキー（任意）
 * @returns Promise<DearBlockData | null>
 * @example
 * const dearBlockData = await getDearBlockData('test', 'xxxx');
 */
export async function getDearBlockData(
  invitationId: string,
  draftKey?: string
): Promise<DearBlockData | null> {
  try {
    console.log('getDearBlockData', invitationId, draftKey);
    const guestContent = await getGuestByInvitationId(invitationId, draftKey);

    if (!guestContent) {
      console.log('getDearBlockData undefined');
      return null;
    }

    return convertToDearBlockData(guestContent);
  } catch (error) {
    console.error('microCMS API error:', error);
    return null;
  }
}

/**
 * @description 複数の招待者情報を取得
 * @param filters - フィルター条件（オプション）
 * @returns Promise<GuestContent[]>
 * @example
 * const guests = await getGuests({ invite: '挙式' });
 */
export async function getGuests(
  filters?: Record<string, string>
): Promise<GuestContent[]> {
  try {
    const client = await getMicroCMSClient();
    const data = await client.getList<GuestContent>({
      endpoint: 'guests',
      queries: filters,
    });
    return data.contents;
  } catch (error) {
    console.error('microCMS API error:', error);
    return [];
  }
}

/**
 * @description 招待種別で招待者を検索
 * @param inviteType - 招待種別（'挙式' | '披露宴' | '二次会'）
 * @returns Promise<GuestContent[]>
 * @example
 * const ceremonyGuests = await getGuestsByInviteType('挙式');
 */
export async function getGuestsByInviteType(
  inviteType: string
): Promise<GuestContent[]> {
  try {
    const client = await getMicroCMSClient();
    const data = await client.getList<GuestContent>({
      endpoint: 'guests',
      queries: {
        filters: `invite[contains]${inviteType}`,
      },
    });
    return data.contents;
  } catch (error) {
    console.error('microCMS API error:', error);
    return [];
  }
}
