import { NextRequest, NextResponse } from 'next/server';

/**
 * @description microCMSプレビューモード用API Route
 * @param req - Next.js APIリクエスト
 * @returns NextResponse
 * @example
 * /api/preview?invitationId=xxx&draftKey=yyy
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const invitationId = searchParams.get('invitationId');
  const draftKey = searchParams.get('draftKey');

  if (!invitationId || !draftKey) {
    return NextResponse.json(
      { message: 'invitationIdとdraftKeyが必要です' },
      { status: 400 }
    );
  }

  // プレビューモードを有効化してリダイレクト
  const response = NextResponse.redirect(
    new URL(`/${invitationId}?draftKey=${draftKey}`, req.url)
  );

  // プレビューモード用のCookieを設定
  response.cookies.set('__prv_draftKey', draftKey, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return response;
}
