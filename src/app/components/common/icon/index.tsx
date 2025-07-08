/**
 * @description アイコンコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from "react";

/**
 * @description アイコンコンポーネントのProps型定義
 * @interface IconProps
 * @since 1.0.0
 */
interface IconProps {
  /** アイコンのサイズ */
  size?: "sm" | "md" | "lg" | "xl";
  /** アイコンの色 */
  color?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description アイコンコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Icon size="md" color="text-gray-600" className="icon" />
 */
const Icon: React.FC<IconProps> = ({
  size = "md",
  color = "text-gray-600",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div className={`${sizeClasses[size]} ${color} ${className}`}>
      {/* アイコンSVGがここに配置される */}
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </div>
  );
};

export default Icon;
