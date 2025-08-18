/**
 * @description ローディング状態管理コンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { cn } from '@/app/lib/utils';

/**
 * @description ローディングスピナーのサイズ
 */
export type LoadingSpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * @description ローディングスピナーの色
 */
export type LoadingSpinnerColor = 'primary' | 'secondary' | 'white' | 'gray';

/**
 * @description ローディングスピナーコンポーネントのプロパティ
 */
export interface LoadingSpinnerProps {
  /** スピナーのサイズ */
  size?: LoadingSpinnerSize;
  /** スピナーの色 */
  color?: LoadingSpinnerColor;
  /** 追加のCSSクラス */
  className?: string;
  /** アクセシビリティ用のラベル */
  'aria-label'?: string;
}

/**
 * @description ローディングスピナーコンポーネント
 * @param props - LoadingSpinnerProps
 * @returns JSX.Element
 * @example
 * ```tsx
 * <LoadingSpinner size="md" color="primary" aria-label="読み込み中" />
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className,
  'aria-label': ariaLabel = '読み込み中',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    gray: 'text-gray-400',
  };

  return (
    <div
      data-testid='loading-spinner'
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role='status'
      aria-label={ariaLabel}
    >
      <span className='sr-only'>{ariaLabel}</span>
    </div>
  );
};

/**
 * @description ローディングオーバーレイのプロパティ
 */
export interface LoadingOverlayProps {
  /** ローディング状態 */
  isLoading: boolean;
  /** オーバーレイの背景色 */
  backgroundColor?: string;
  /** スピナーのサイズ */
  spinnerSize?: LoadingSpinnerSize;
  /** スピナーの色 */
  spinnerColor?: LoadingSpinnerColor;
  /** ローディングメッセージ */
  message?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** 子要素 */
  children?: React.ReactNode;
}

/**
 * @description ローディングオーバーレイコンポーネント
 * @param props - LoadingOverlayProps
 * @returns JSX.Element
 * @example
 * ```tsx
 * <LoadingOverlay isLoading={true} message="データを読み込み中...">
 *   <div>コンテンツ</div>
 * </LoadingOverlay>
 * ```
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  backgroundColor = 'bg-white bg-opacity-75',
  spinnerSize = 'lg',
  spinnerColor = 'primary',
  message,
  className,
  children,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className={cn('relative', className)}>
      {children}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center',
          backgroundColor
        )}
        role='status'
        aria-live='polite'
      >
        <LoadingSpinner
          size={spinnerSize}
          color={spinnerColor}
          aria-label='読み込み中'
        />
        {message && <p className='mt-2 text-sm text-gray-600'>{message}</p>}
      </div>
    </div>
  );
};

/**
 * @description ローディングボタンのプロパティ
 */
export interface LoadingButtonProps {
  /** ローディング状態 */
  isLoading: boolean;
  /** ボタンのテキスト */
  children: React.ReactNode;
  /** ローディング時のテキスト */
  loadingText?: string;
  /** スピナーのサイズ */
  spinnerSize?: LoadingSpinnerSize;
  /** スピナーの色 */
  spinnerColor?: LoadingSpinnerColor;
  /** 追加のCSSクラス */
  className?: string;
  /** ボタンの種類 */
  variant?: 'primary' | 'secondary' | 'outline';
  /** ボタンのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** 無効状態 */
  disabled?: boolean;
  /** クリックハンドラー */
  onClick?: () => void;
  /** ボタンのタイプ */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * @description ローディングボタンコンポーネント
 * @param props - LoadingButtonProps
 * @returns JSX.Element
 * @example
 * ```tsx
 * <LoadingButton
 *   isLoading={isSubmitting}
 *   loadingText="送信中..."
 *   onClick={handleSubmit}
 * >
 *   送信
 * </LoadingButton>
 * ```
 */
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  loadingText,
  spinnerSize = 'sm',
  spinnerColor = 'white',
  className,
  variant = 'primary',
  size = 'md',
  disabled,
  onClick,
  type = 'button',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading && (
        <LoadingSpinner
          size={spinnerSize}
          color={spinnerColor}
          className='mr-2'
          aria-label='処理中'
        />
      )}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
};

/**
 * @description ローディング状態管理コンポーネントのデフォルトエクスポート
 */
export default LoadingSpinner;
