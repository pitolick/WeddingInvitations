/**
 * 郵便番号APIの型定義
 */

// 郵便番号検索レスポンスの型定義
export interface PostalCodeSearchResponse {
  addresses: PostalCodeAddress[];
  searchtype: string;
  limit: number;
  count: number;
  page: number;
}

// 住所情報の型定義
export interface PostalCodeAddress {
  dgacode: string | null;
  zip_code: number;
  pref_code: string;
  pref_name: string;
  pref_kana: string | null;
  pref_roma: string | null;
  city_code: number;
  city_name: string;
  city_kana: string | null;
  city_roma: string | null;
  town_name: string;
  town_kana: string | null;
  town_roma: string | null;
  biz_name: string | null;
  biz_kana: string | null;
  biz_roma: string | null;
  block_name: string | null;
  other_name: string | null;
  address: string | null;
  longitude: number | null;
  latitude: number | null;
}

// 住所検索リクエストの型定義
export interface AddressSearchRequest {
  pref_code?: string;
  pref_name?: string;
  pref_kana?: string;
  pref_roma?: string;
  city_code?: string;
  city_name?: string;
  city_kana?: string;
  city_roma?: string;
  town_name?: string;
  town_kana?: string;
  town_roma?: string;
  freeword?: string;
  flg_getcity?: number;
  flg_getpref?: number;
  page?: number;
  limit?: number;
}

// 住所検索レスポンスの型定義
export interface AddressSearchResponse {
  addresses: PostalCodeAddress[][];
  level: number;
  limit: number;
  count: number;
  page: number;
}

// トークンリクエストの型定義
export interface TokenRequest {
  grant_type: 'client_credentials';
  client_id: string;
  secret_key: string;
}

// トークンレスポンスの型定義
export interface TokenResponse {
  token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

// エラーレスポンスの型定義
export interface ApiError {
  request_id: string;
  error_code: string;
  message: string;
}

/**
 * 郵便番号APIクライアント
 * @description 郵便番号・デジタルアドレスAPIとの通信を管理
 */
export class PostalCodeApiClient {
  constructor() {
    // クライアントサイドでは環境変数にアクセスできないため、
    // Next.jsのAPI Routesを使用してサーバーサイドでAPIリクエストを実行
  }

  /**
   * 郵便番号から住所を検索
   * @param postalCode - 郵便番号（3桁以上）
   * @param page - ページ番号（デフォルト: 1）
   * @param limit - 取得件数（デフォルト: 10、最大: 1000）
   */
  async searchByPostalCode(
    postalCode: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PostalCodeSearchResponse> {
    const url = new URL('/api/postal-code', window.location.origin);
    url.searchParams.set('postalCode', postalCode);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', limit.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(`郵便番号検索エラー: ${errorData.message}`);
    }

    return response.json();
  }

  /**
   * 住所から郵便番号を検索
   * @param request - 住所検索リクエスト
   */
  async searchByAddress(
    request: AddressSearchRequest
  ): Promise<AddressSearchResponse> {
    const response = await fetch('/api/postal-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(`住所検索エラー: ${errorData.message}`);
    }

    return response.json();
  }

  /**
   * 郵便番号を正規化（ハイフンを除去）
   * @param postalCode - 入力された郵便番号
   */
  normalizePostalCode(postalCode: string): string {
    return postalCode.replace(/-/g, '');
  }

  /**
   * 郵便番号の形式を検証
   * @param postalCode - 検証する郵便番号
   */
  validatePostalCode(postalCode: string): boolean {
    const normalized = this.normalizePostalCode(postalCode);
    return /^\d{7}$/.test(normalized);
  }
}

// シングルトンインスタンス
export const postalCodeApi = new PostalCodeApiClient();
