/**
 * @description フォームエラーメッセージ表示コンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { cn } from '@/app/lib/utils';

/**
 * @description エラーメッセージの表示スタイル
 */
export type ErrorMessageVariant = 'default' | 'inline' | 'toast';

/**
 * @description エラーメッセージコンポーネントのプロパティ
 */
export interface ErrorMessageProps {
  /** エラーメッセージ */
  message?: string;
  /** エラーメッセージの表示スタイル */
  variant?: ErrorMessageVariant;
  /** 追加のCSSクラス */
  className?: string;
  /** アイコンを表示するかどうか */
  showIcon?: boolean;
  /** エラーが発生しているかどうか */
  hasError?: boolean;
  /** 子要素 */
  children?: React.ReactNode;
}

/**
 * @description フォームエラーメッセージを表示するコンポーネント
 * @param props - ErrorMessageProps
 * @returns JSX.Element | null
 * @example
 * ```tsx
 * <ErrorMessage
 *   message="この項目は必須です"
 *   variant="inline"
 *   hasError={true}
 * />
 * ```
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  variant = 'default',
  className,
  showIcon = true,
  hasError = false,
  children,
}) => {
  // エラーがない場合は何も表示しない
  if (!hasError && !message) {
    return null;
  }

  const baseClasses = 'text-red-600 text-sm font-medium';

  const variantClasses = {
    default: 'block mt-1 p-2 bg-red-50 border border-red-200 rounded-md',
    inline: 'inline-block ml-2',
    toast:
      'fixed top-4 right-4 z-50 p-4 bg-red-100 border border-red-300 rounded-lg shadow-lg',
  };

  const iconClasses = 'inline-block w-4 h-4 mr-1';

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      role='alert'
      aria-live='polite'
    >
      {showIcon && (
        <svg
          className={iconClasses}
          fill='currentColor'
          viewBox='0 0 20 20'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
            clipRule='evenodd'
          />
        </svg>
      )}
      {message || children}
    </div>
  );
};

/**
 * @description エラーメッセージコンポーネントのデフォルトエクスポート
 */
export default ErrorMessage;
