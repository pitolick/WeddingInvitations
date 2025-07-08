/**
 * @description ボタンコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from "react";

/**
 * @description ボタンコンポーネントのProps型定義
 * @interface ButtonProps
 * @since 1.0.0
 */
interface ButtonProps {
  /** ボタンのテキスト */
  children: React.ReactNode;
  /** ボタンのタイプ */
  type?: "button" | "submit" | "reset";
  /** ボタンのバリアント */
  variant?: "primary" | "secondary" | "outline";
  /** ボタンのサイズ */
  size?: "sm" | "md" | "lg";
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
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8",
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
