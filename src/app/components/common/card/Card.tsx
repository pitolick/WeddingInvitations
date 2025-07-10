/**
 * @description カードコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description CardコンポーネントのProps型定義
 * @interface CardProps
 * @since 1.0.0
 */
interface CardProps {
  /** カードの内容 */
  children: React.ReactNode;
  /** カードのバリアント */
  variant?: 'default' | 'elevated' | 'outlined';
  /** カードのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** ホバー効果 */
  hover?: boolean;
  /** 追加のCSSクラス */
  className?: string;
  /** クリックハンドラー */
  onClick?: () => void;
  /** カードのID */
  id?: string;
}

/**
 * @description Cardコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Card variant="elevated" size="md" hover>
 *   <CardHeader>
 *     <h3>カードタイトル</h3>
 *   </CardHeader>
 *   <CardContent>
 *     <p>カードの内容</p>
 *   </CardContent>
 * </Card>
 */
const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  hover = false,
  className = '',
  onClick,
  id,
}) => {
  const baseClasses = 'bg-white rounded-lg transition-all duration-200';

  const variantClasses = {
    default: 'border border-gray-200',
    elevated: 'shadow-md',
    outlined: 'border-2 border-lavender-200',
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover
    ? 'hover:shadow-lg hover:transform hover:scale-105 cursor-pointer'
    : '';

  return (
    <div
      id={id}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
