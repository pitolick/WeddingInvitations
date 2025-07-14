import { NextRequest, NextResponse } from 'next/server';
import { ipAddress } from '@vercel/functions';

/**
 * 郵便番号APIのプロキシエンドポイント
 * @description クライアントサイドからのCORS問題を回避するため、サーバーサイドでAPIリクエストを実行
 */

// 環境変数から設定を取得
const API_BASE_URL =
  process.env.POSTAL_CODE_API_BASE_URL || 'https://api.da.pf.japanpost.jp';
const CLIENT_ID = process.env.POSTAL_CODE_API_CLIENT_ID || '';
const SECRET_KEY = process.env.POSTAL_CODE_API_SECRET_KEY || '';

// トークンキャッシュ
let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

/**
 * アクセストークンを取得
 * @description 郵便番号APIのアクセストークンを取得・キャッシュする
 * @returns Promise<string> アクセストークン
 * @throws {Error} トークン取得に失敗した場合
 * @example
 * ```typescript
 * const token = await getToken();
 * // キャッシュされたトークンまたは新規取得したトークンを返す
 * ```
 */
async function getToken(): Promise<string> {
  // キャッシュされたトークンが有効な場合は返す
  if (cachedToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  try {
    // 環境変数からIPアドレスを取得、またはデフォルト値を使用
    const clientIP = process.env.VERCEL_IP || '127.0.0.1';

    const response = await fetch(`${API_BASE_URL}/api/v1/j/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': clientIP,
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        secret_key: SECRET_KEY,
      }),
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status}`);
    }

    const data = await response.json();
    cachedToken = data.token as string;
    // 有効期限を設定（5分前倒しで設定）
    tokenExpiresAt = Date.now() + ((data.expires_in as number) - 300) * 1000;

    return cachedToken;
  } catch (error) {
    console.error('Failed to get token:', error);
    const clientIP = process.env.VERCEL_IP || '127.0.0.1';
    const errorMessage = `トークンの取得に失敗しました (IP: ${clientIP})`;
    throw new Error(errorMessage);
  }
}

/**
 * 郵便番号検索API
 * @description 郵便番号から住所情報を検索するGETエンドポイント
 * @param request - NextRequestオブジェクト
 * @returns Promise<NextResponse> 検索結果またはエラーレスポンス
 * @example
 * ```typescript
 * // GET /api/postal-code?postalCode=1234567&page=1&limit=10
 * const response = await fetch('/api/postal-code?postalCode=1234567');
 * const data = await response.json();
 * ```
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postalCode = searchParams.get('postalCode');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    if (!postalCode) {
      return NextResponse.json(
        { error: '郵便番号が指定されていません' },
        { status: 400 }
      );
    }

    const token = await getToken();
    const clientIP = ipAddress(request) || '127.0.0.1';
    const url = new URL(`${API_BASE_URL}/api/v1/searchcode/${postalCode}`);
    url.searchParams.set('page', page);
    url.searchParams.set('limit', limit);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-forwarded-for': clientIP,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: `郵便番号検索エラー: ${errorData.message}`,
          clientIP: clientIP,
          timestamp: new Date().toISOString(),
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Postal code search error:', error);
    const clientIP = ipAddress(request) || '127.0.0.1';
    return NextResponse.json(
      {
        error: '郵便番号検索に失敗しました',
        clientIP: clientIP,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * 住所検索API
 * @description 住所から郵便番号を検索するPOSTエンドポイント
 * @param request - NextRequestオブジェクト
 * @returns Promise<NextResponse> 検索結果またはエラーレスポンス
 * @example
 * ```typescript
 * // POST /api/postal-code
 * const response = await fetch('/api/postal-code', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ pref_name: '東京都', city_name: '渋谷区' })
 * });
 * const data = await response.json();
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = await getToken();
    const clientIP = ipAddress(request) || '127.0.0.1';

    const response = await fetch(`${API_BASE_URL}/api/v1/addresszip`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-forwarded-for': clientIP,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: `住所検索エラー: ${errorData.message}`,
          clientIP: clientIP,
          timestamp: new Date().toISOString(),
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Address search error:', error);
    const clientIP = ipAddress(request) || '127.0.0.1';
    return NextResponse.json(
      {
        error: '住所検索に失敗しました',
        clientIP: clientIP,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
