/**
 * @description ボタンコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description ボタンコンポーネントのProps型定義
 * @interface ButtonProps
 * @since 1.0.0
 */
interface ButtonProps {
  /** ボタンのテキスト */
  children: React.ReactNode;
  /** ボタンのタイプ */
  type?: 'button' | 'submit' | 'reset';
  /** ボタンのバリアント */
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  /** ボタンのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** 無効状態 */
  disabled?: boolean;
  /** クリックハンドラー */
  onClick?: () => void;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description ボタンコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   ボタンテキスト
 * </Button>
 */
const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg font-noto font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';

  const variantClasses = {
    primary:
      'bg-lavender-600 text-white hover:bg-lavender-700 focus:ring-lavender-500',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300',
    outline:
      'border-2 border-lavender-600 text-lavender-600 bg-transparent hover:bg-lavender-600 hover:text-white focus:ring-lavender-500',
    danger: 'bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2 text-base',
    lg: 'h-12 px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
