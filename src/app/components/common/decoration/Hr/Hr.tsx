/**
 * @description Hr装飾コンポーネント（水平線装飾）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from "react";
import HrLeft from "../../icon/HrLeft/HrLeft";
import HrRight from "../../icon/HrRight/HrRight";

/**
 * @description Hr装飾コンポーネントのProps型定義
 * @interface HrProps
 * @since 1.0.0
 */
interface HrProps {
  /** コンポーネントの幅（指定しない場合は親要素の幅に合わせる） */
  width?: number;
  /** 装飾アイコンのサイズ */
  iconSize?: number;
  /** アイコンの色 */
  color?: string;
  /** 追加のCSSクラス */
  className?: string;
  /** 水平線の高さ（Tailwindクラス） */
  lineHeight?: "h-px" | "h-0.5" | "h-1" | "h-2" | "h-3" | "h-4";
  /** 水平線の色（Tailwindクラス） */
  lineColor?: string;
  /** コンポーネントの高さ（Tailwindクラス） */
  containerHeight?: "h-8" | "h-10" | "h-12" | "h-16" | "h-20" | "h-24" | "h-32";
}

/**
 * @description Hr装飾コンポーネント（水平線装飾）
 * Figmaから取得したhrコンポーネントを再現
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Hr iconSize={38} color="text-lavender-600" containerHeight="h-12" />
 */
const Hr: React.FC<HrProps> = ({
  width,
  iconSize = 38,
  color = "text-lavender-600",
  className = "",
  lineHeight = "h-px",
  lineColor = "bg-lavender-600",
  containerHeight = "h-12",
}) => {
  return (
    <div
      className={`relative flex items-center ${containerHeight} ${className}`}
      style={width ? { width: `${width}px` } : undefined}
    >
      {/* 中央の水平線（背景） */}
      <div className={`flex-1 bg-lavender-600 ${lineHeight} ${lineColor}`} />

      {/* 左側の装飾アイコン（絶対位置で線の上に配置） */}
      <div className="absolute left-0 -translate-y-1/2">
        <HrLeft size={iconSize} className={`${color}`} />
      </div>

      {/* 右側の装飾アイコン（絶対位置で線の上に配置） */}
      <div className="absolute right-0 -translate-y-1/2">
        <HrRight size={iconSize} className={`${color}`} />
      </div>
    </div>
  );
};

export default Hr;
