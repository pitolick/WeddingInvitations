/**
 * @description カードコンテンツコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description CardContentコンポーネントのProps型定義
 * @interface CardContentProps
 * @since 1.0.0
 */
interface CardContentProps {
  /** コンテンツの内容 */
  children: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description CardContentコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <CardContent>
 *   <p className="font-noto text-gray-700">カードの内容</p>
 * </CardContent>
 */
const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return <div className={`pt-4 ${className}`}>{children}</div>;
};

export default CardContent;
