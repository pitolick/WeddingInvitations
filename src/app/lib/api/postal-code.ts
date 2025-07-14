/**
 * 郵便番号APIの型定義（zipcloud対応）
 */

// zipcloud APIのレスポンス型定義
export interface ZipcloudResponse {
  message: null | string;
  results: null | Array<{
    address1: string; // 都道府県名
    address2: string; // 市区町村名
    address3: string; // 町域名
    kana1: string; // 都道府県名カナ
    kana2: string; // 市区町村名カナ
    kana3: string; // 町域名カナ
    prefcode: string; // 都道府県コード
    zipcode: string; // 郵便番号
  }>;
  status: number;
}

// 郵便番号検索レスポンスの型定義（アプリケーション用に整形）
export interface PostalCodeSearchResponse {
  addresses: PostalCodeAddress[];
  searchtype: string;
  limit: number;
  count: number;
  page: number;
}

// 住所情報の型定義（アプリケーション用）
export interface PostalCodeAddress {
  zip_code: number;
  pref_code: string;
  pref_name: string;
  pref_kana: string | null;
  city_name: string;
  city_kana: string | null;
  town_name: string;
  town_kana: string | null;
  address: string | null;
  // 以下のフィールドはzipcloudにはないため、nullまたはデフォルト値で設定
  dgacode: string | null;
  pref_roma: string | null;
  city_code: number;
  city_roma: string | null;
  town_roma: string | null;
  biz_name: string | null;
  biz_kana: string | null;
  biz_roma: string | null;
  block_name: string | null;
  other_name: string | null;
  longitude: number | null;
  latitude: number | null;
}

// エラーレスポンスの型定義
export interface ApiError {
  error: string;
  message?: string;
  status?: number;
  timestamp?: string;
}

/**
 * 郵便番号APIクライアント（zipcloud対応）
 * @description zipcloud APIとの通信を管理
 */
export class PostalCodeApiClient {
  /**
   * 郵便番号から住所を検索
   * @description 指定された郵便番号に対応する住所情報を取得する
   * @param postalCode - 郵便番号（7桁）
   * @returns Promise<PostalCodeSearchResponse> 住所検索結果
   * @throws {Error} API呼び出しに失敗した場合
   * @example
   * ```typescript
   * const result = await postalCodeApi.searchByPostalCode('1234567');
   * console.log(result.addresses[0].pref_name); // "東京都"
   * ```
   */
  async searchByPostalCode(
    postalCode: string
  ): Promise<PostalCodeSearchResponse> {
    const url = new URL('/api/postal-code', window.location.origin);
    url.searchParams.set('postalCode', postalCode);

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(`郵便番号検索エラー: ${errorData.error}`);
    }

    return response.json();
  }

  /**
   * 郵便番号を正規化（ハイフンを除去）
   * @description 郵便番号からハイフンを除去して正規化する
   * @param postalCode - 入力された郵便番号
   * @returns string 正規化された郵便番号
   * @example
   * ```typescript
   * const normalized = postalCodeApi.normalizePostalCode('123-4567');
   * console.log(normalized); // "1234567"
   * ```
   */
  normalizePostalCode(postalCode: string): string {
    return postalCode.replace(/-/g, '');
  }

  /**
   * 郵便番号の形式を検証
   * @description 郵便番号が7桁の数字形式かどうかを検証する
   * @param postalCode - 検証する郵便番号
   * @returns boolean 有効な郵便番号形式の場合true
   * @example
   * ```typescript
   * const isValid = postalCodeApi.validatePostalCode('1234567');
   * console.log(isValid); // true
   *
   * const isInvalid = postalCodeApi.validatePostalCode('123-456');
   * console.log(isInvalid); // false
   * ```
   */
  validatePostalCode(postalCode: string): boolean {
    const normalized = this.normalizePostalCode(postalCode);
    return /^\d{7}$/.test(normalized);
  }
}

// シングルトンインスタンス
export const postalCodeApi = new PostalCodeApiClient();
