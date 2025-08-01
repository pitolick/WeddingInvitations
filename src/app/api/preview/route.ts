import { NextRequest, NextResponse } from 'next/server';
import {
  createApiError,
  createErrorResponse,
  generateRequestId,
} from '@/app/lib/errors/api';
import { ErrorSeverity } from '@/app/lib/types/errors';

/**
 * @description microCMSプレビューモード用API Route
 * @param req - Next.js APIリクエスト
 * @returns NextResponse
 * @example
 * /api/preview?invitationId=xxx&draftKey=yyy
 */
export async function GET(req: NextRequest) {
  const requestId = generateRequestId();
  const endpoint = '/api/preview';

  const { searchParams } = new URL(req.url);
  const invitationId = searchParams.get('invitationId');
  const draftKey = searchParams.get('draftKey');

  if (!invitationId || !draftKey) {
    const apiError = createApiError({
      message: 'invitationIdとdraftKeyが必要です',
      statusCode: 400,
      endpoint,
      requestId,
      severity: ErrorSeverity.MEDIUM,
      userMessage: 'プレビューに必要なパラメータが不足しています',
      code: 'MISSING_PREVIEW_PARAMS',
      details: { invitationId, draftKey },
    });

    return NextResponse.json(createErrorResponse(apiError, requestId), {
      status: 400,
    });
  }

  try {
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
  } catch (error) {
    const apiError = createApiError({
      message:
        error instanceof Error
          ? error.message
          : 'プレビューモードの設定に失敗しました',
      statusCode: 500,
      endpoint,
      requestId,
      severity: ErrorSeverity.HIGH,
      userMessage: 'プレビューモードの設定中にエラーが発生しました',
      code: 'PREVIEW_SETUP_ERROR',
      details: { originalError: error },
    });

    return NextResponse.json(createErrorResponse(apiError, requestId), {
      status: 500,
    });
  }
}
