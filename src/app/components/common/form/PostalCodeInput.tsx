'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from './index';
import { postalCodeApi } from '@/app/lib/api/postal-code';

/**
 * 郵便番号入力コンポーネントのProps型定義
 * @description 郵便番号入力と住所自動補完機能の設定
 * @interface PostalCodeInputProps
 * @since 1.0.0
 */
interface PostalCodeInputProps {
  /** ラベルテキスト */
  label?: string;
  /** プレースホルダーテキスト */
  placeholder?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** 入力値 */
  value?: string;
  /** 値変更時のコールバック関数 */
  onChange?: (value: string) => void;
  /** 住所変更時のコールバック関数 */
  onAddressChange?: (address: { prefecture: string; address: string }) => void;
  /** エラーメッセージ */
  error?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** 無効化フラグ */
  disabled?: boolean;
}

/**
 * 郵便番号入力コンポーネント
 * @description 郵便番号入力時に住所を自動補完する機能付きの入力フィールド（zipcloud対応）
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * ```tsx
 * <PostalCodeInput
 *   label="郵便番号"
 *   value={postalCode}
 *   onChange={setPostalCode}
 *   onAddressChange={handleAddressChange}
 *   required
 * />
 * ```
 * @since 1.0.0
 */
const PostalCodeInput: React.FC<PostalCodeInputProps> = ({
  label = '郵便番号',
  placeholder = '1234567',
  required = false,
  value = '',
  onChange,
  onAddressChange,
  error,
  className = '',
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // 入力値が変更されたときの処理
  const handleInputChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
      onChange?.(newValue);
      setSearchError(null);

      // 7桁の郵便番号が入力されたら住所検索を実行
      const normalized = newValue.replace(/-/g, '');
      if (normalized.length === 7 && /^\d{7}$/.test(normalized)) {
        searchAddressByPostalCode(normalized);
      }
    },
    [onChange]
  );

  // 郵便番号から住所を検索
  const searchAddressByPostalCode = useCallback(
    async (postalCode: string) => {
      if (!postalCodeApi.validatePostalCode(postalCode)) {
        return;
      }

      setIsLoading(true);
      setSearchError(null);

      try {
        const response = await postalCodeApi.searchByPostalCode(postalCode);

        if (response.addresses.length > 0) {
          const address = response.addresses[0];
          const fullAddress = `${address.pref_name}${address.city_name}${address.town_name}`;

          onAddressChange?.({
            prefecture: address.pref_name,
            address: fullAddress,
          });
        }
      } catch (error) {
        console.error('郵便番号検索エラー:', error);
        setSearchError('住所の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    },
    [onAddressChange]
  );

  // 外部からの値変更に対応
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <Input
        label={label}
        placeholder={placeholder}
        required={required}
        value={inputValue}
        onChange={handleInputChange}
        error={error || searchError || undefined}
        maxLength={8}
        disabled={disabled || isLoading}
        className={isLoading ? 'opacity-75' : ''}
      />

      {/* ローディングインジケーター */}
      {isLoading && (
        <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500'></div>
        </div>
      )}

      {/* ヘルプテキスト */}
      <p className='mt-1 text-xs text-gray-500'>
        7桁の郵便番号を入力すると住所が自動で入力されます
      </p>
    </div>
  );
};

export default PostalCodeInput;
