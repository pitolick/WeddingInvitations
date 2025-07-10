/**
 * @description レスポンシブ対応コンテナコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description レスポンシブ対応コンテナコンポーネントのProps型定義
 * @interface ResponsiveContainerProps
 * @since 1.0.0
 */
interface ResponsiveContainerProps {
  /** コンテナ内の子要素 */
  children: React.ReactNode;
  /** 最大幅 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** パディング */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 中央寄せ */
  center?: boolean;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description レスポンシブ対応コンテナコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <ResponsiveContainer maxWidth="lg" padding="md" center>
 *   <div>コンテンツ</div>
 * </ResponsiveContainer>
 */
const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'md',
  center = true,
  className = '',
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6',
    xl: 'px-12 py-8',
  };

  const containerClasses = [
    'w-full',
    maxWidthClasses[maxWidth],
    paddingClasses[padding],
    center ? 'mx-auto' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={containerClasses}>{children}</div>;
};

export default ResponsiveContainer;
