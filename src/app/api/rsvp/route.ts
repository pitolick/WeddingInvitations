/**
 * @description RSVP（出欠回答）API Route
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createApiError,
  createSuccessResponse,
  createErrorResponse,
  generateRequestId,
} from '@/app/lib/errors/api';
import { ErrorSeverity } from '@/app/lib/types/errors';

/**
 * @description RSVPデータをGoogle Apps Scriptに送信するPOSTハンドラー
 * @param req - Next.jsのリクエストオブジェクト
 * @returns NextResponse - 成功時はデータ、エラー時はエラーメッセージを含むレスポンス
 * @throws {Error} Google Apps Script URLが未設定の場合
 * @throws {Error} リクエストボディの解析に失敗した場合
 * @throws {Error} Google Apps Scriptへの送信に失敗した場合
 * @example
 * // RSVPデータを送信
 * const response = await fetch('/api/rsvp', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(rsvpData)
 * });
 */
export async function POST(req: NextRequest) {
  const requestId = generateRequestId();
  const endpoint = '/api/rsvp';

  try {
    // Google Apps Script URLの取得
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    // 環境変数の検証
    if (!scriptUrl) {
      const apiError = createApiError({
        message: 'Google Apps Script URLが設定されていません',
        statusCode: 500,
        endpoint,
        requestId,
        severity: ErrorSeverity.HIGH,
        userMessage: 'システム設定エラーが発生しました',
        code: 'MISSING_ENV_VAR',
      });

      return NextResponse.json(createErrorResponse(apiError, requestId), {
        status: 500,
      });
    }

    // リクエストボディの解析
    let body;
    try {
      body = await req.json();
    } catch {
      const apiError = createApiError({
        message: 'リクエストボディの解析に失敗しました',
        statusCode: 400,
        endpoint,
        requestId,
        severity: ErrorSeverity.MEDIUM,
        userMessage: '送信データの形式が正しくありません',
        code: 'INVALID_REQUEST_BODY',
        details: { parseError: 'JSON parse error' },
      });

      return NextResponse.json(createErrorResponse(apiError, requestId), {
        status: 400,
      });
    }

    // Google Apps Scriptへのデータ送信
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // レスポンスの解析
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // JSON解析に失敗した場合はテキストとして扱う
      data = text;
    }

    // エラーレスポンスの処理
    if (!response.ok) {
      const apiError = createApiError({
        message: `Google Apps Script API呼び出しに失敗しました (${response.status})`,
        statusCode: response.status,
        endpoint,
        requestId,
        severity: ErrorSeverity.HIGH,
        userMessage:
          'データの送信に失敗しました。しばらく時間をおいてから再度お試しください。',
        code: 'GOOGLE_APPS_SCRIPT_ERROR',
        responseData: data,
      });

      return NextResponse.json(createErrorResponse(apiError, requestId), {
        status: response.status,
      });
    }

    // 成功レスポンスの返却
    return NextResponse.json(createSuccessResponse(data, requestId), {
      status: 200,
    });
  } catch (error) {
    // 予期しないエラーの処理
    const apiError = createApiError({
      message:
        error instanceof Error
          ? error.message
          : '予期しないエラーが発生しました',
      statusCode: 500,
      endpoint,
      requestId,
      severity: ErrorSeverity.CRITICAL,
      userMessage:
        'システムエラーが発生しました。しばらく時間をおいてから再度お試しください。',
      code: 'UNEXPECTED_ERROR',
      details: { originalError: error },
    });

    return NextResponse.json(createErrorResponse(apiError, requestId), {
      status: 500,
    });
  }
}
