/**
 * @description RSVP（出欠回答）API Route
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';

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
  try {
    // Google Apps Script URLの取得
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    // 環境変数の検証
    if (!scriptUrl) {
      return NextResponse.json(
        { error: 'Google Apps Script URLが設定されていません' },
        { status: 500 }
      );
    }

    // リクエストボディの解析
    const body = await req.json();

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
      return NextResponse.json({ error: data }, { status: response.status });
    }

    // 成功レスポンスの返却
    return NextResponse.json(data);
  } catch (error: any) {
    // 予期しないエラーの処理
    return NextResponse.json(
      { error: error.message || 'サーバーエラー' },
      { status: 500 }
    );
  }
}
