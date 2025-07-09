/**
 * @description カードヘッダーコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from "react";

/**
 * @description CardHeaderコンポーネントのProps型定義
 * @interface CardHeaderProps
 * @since 1.0.0
 */
interface CardHeaderProps {
  /** ヘッダーの内容 */
  children: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description CardHeaderコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <CardHeader>
 *   <h3 className="font-noto text-lg font-semibold text-gray-900">カードタイトル</h3>
 * </CardHeader>
 */
const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`pb-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default CardHeader;
