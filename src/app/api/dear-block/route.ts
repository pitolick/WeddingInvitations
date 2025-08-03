/**
 * @description DearBlock用APIルート（microCMS連携）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDearBlockData } from '@/app/lib/api';
import { draftMode } from 'next/headers';
import { cookies } from 'next/headers';

/**
 * @description DearBlockデータを取得するAPIエンドポイント
 * @param request - NextRequest
 * @returns Promise<NextResponse>
 * @example
 * GET /api/dear-block?invitationId=test&draftKey=xxxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const invitationId = searchParams.get('invitationId');
    const draftKey = searchParams.get('draftKey');

    if (!invitationId) {
      return NextResponse.json(
        { error: 'invitationId is required' },
        { status: 400 }
      );
    }

    // プレビューモードの確認
    const { isEnabled } = await draftMode();
    const cookieStore = await cookies();
    const effectiveDraftKey = isEnabled
      ? draftKey || cookieStore.get('__prv_draftKey')?.value
      : undefined;

    // microCMSからデータを取得
    const dearBlockData = await getDearBlockData(
      invitationId,
      effectiveDraftKey
    );

    // microCMSのデータが取得できない場合は、404エラーを返す
    if (!dearBlockData || !dearBlockData.message) {
      return NextResponse.json(
        { error: 'Dear block data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(dearBlockData);
  } catch {
    // エラーが発生した場合も、500エラーを返す
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
