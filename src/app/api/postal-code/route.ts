import { NextRequest, NextResponse } from 'next/server';
import { ZipcloudResponse } from '@/app/lib/api/postal-code';

/**
 * 郵便番号APIのプロキシエンドポイント（zipcloud使用）
 * @description クライアントサイドからのCORS問題を回避するため、サーバーサイドでAPIリクエストを実行
 */

// zipcloud APIのベースURL
const ZIPCLOUD_API_URL = 'https://zipcloud.ibsnet.co.jp/api/search';

/**
 * 郵便番号を正規化
 * @description 郵便番号からハイフンを除去して正規化する
 * @param postalCode - 入力された郵便番号
 * @returns string 正規化された郵便番号
 */
function normalizePostalCode(postalCode: string): string {
  return postalCode.replace(/-/g, '');
}

/**
 * 郵便番号の形式を検証
 * @description 郵便番号が7桁の数字形式かどうかを検証する
 * @param postalCode - 検証する郵便番号
 * @returns boolean 有効な郵便番号形式の場合true
 */
function validatePostalCode(postalCode: string): boolean {
  const normalized = normalizePostalCode(postalCode);
  return /^\d{7}$/.test(normalized);
}

/**
 * 郵便番号検索API
 * @description 郵便番号から住所情報を検索するGETエンドポイント
 * @param request - NextRequestオブジェクト
 * @returns Promise<NextResponse> 検索結果またはエラーレスポンス
 * @example
 * ```typescript
 * // GET /api/postal-code?postalCode=1234567
 * const response = await fetch('/api/postal-code?postalCode=1234567');
 * const data = await response.json();
 * ```
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postalCode = searchParams.get('postalCode');

    if (!postalCode) {
      return NextResponse.json(
        { error: '郵便番号が指定されていません' },
        { status: 400 }
      );
    }

    // 郵便番号の形式を検証
    if (!validatePostalCode(postalCode)) {
      return NextResponse.json(
        { error: '郵便番号は7桁の数字で入力してください' },
        { status: 400 }
      );
    }

    const normalizedPostalCode = normalizePostalCode(postalCode);
    const url = new URL(ZIPCLOUD_API_URL);
    url.searchParams.set('zipcode', normalizedPostalCode);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: '郵便番号検索APIへのリクエストに失敗しました',
          status: response.status,
        },
        { status: 500 }
      );
    }

    const data: ZipcloudResponse = await response.json();

    // zipcloud APIのステータスをチェック
    if (data.status !== 200) {
      return NextResponse.json(
        {
          error: data.message || '住所が見つかりませんでした',
          status: data.status,
        },
        { status: 404 }
      );
    }

    // 結果がない場合
    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        {
          error: '該当する住所が見つかりませんでした',
          status: 404,
        },
        { status: 404 }
      );
    }

    // 結果を整形して返す
    const result = data.results[0];
    const formattedResult = {
      addresses: [
        {
          zip_code: parseInt(result.zipcode),
          pref_code: result.prefcode,
          pref_name: result.address1,
          pref_kana: result.kana1,
          city_name: result.address2,
          city_kana: result.kana2,
          town_name: result.address3,
          town_kana: result.kana3,
          address: `${result.address1}${result.address2}${result.address3}`,
          // 以下のフィールドはzipcloudにはないため、nullまたは空文字で設定
          dgacode: null,
          pref_roma: null,
          city_code: 0,
          city_roma: null,
          town_roma: null,
          biz_name: null,
          biz_kana: null,
          biz_roma: null,
          block_name: null,
          other_name: null,
          longitude: null,
          latitude: null,
        },
      ],
      searchtype: 'postal_code',
      limit: 1,
      count: 1,
      page: 1,
    };

    return NextResponse.json(formattedResult);
  } catch (error) {
    console.error('Postal code search error:', error);
    return NextResponse.json(
      {
        error: '郵便番号検索に失敗しました',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * 住所検索API（zipcloudでは対応していないため、エラーを返す）
 * @description 住所から郵便番号を検索するPOSTエンドポイント
 * @returns Promise<NextResponse> エラーレスポンス
 */
export async function POST() {
  return NextResponse.json(
    {
      error: '住所からの郵便番号検索は現在サポートされていません',
      message: 'zipcloud APIでは住所からの郵便番号検索機能が提供されていません',
    },
    { status: 501 }
  );
}
