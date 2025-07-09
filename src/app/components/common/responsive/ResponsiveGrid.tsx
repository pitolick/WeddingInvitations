/**
 * @description レスポンシブ対応グリッドコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from "react";

/**
 * @description レスポンシブ対応グリッドコンポーネントのProps型定義
 * @interface ResponsiveGridProps
 * @since 1.0.0
 */
interface ResponsiveGridProps {
  /** グリッド内の子要素 */
  children: React.ReactNode;
  /** モバイルでのカラム数 */
  mobileCols?: 1 | 2;
  /** タブレットでのカラム数 */
  tabletCols?: 1 | 2 | 3 | 4;
  /** デスクトップでのカラム数 */
  desktopCols?: 1 | 2 | 3 | 4 | 5 | 6;
  /** グリッドアイテム間のギャップ */
  gap?: "sm" | "md" | "lg" | "xl";
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description レスポンシブ対応グリッドコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <ResponsiveGrid mobileCols={1} tabletCols={2} desktopCols={3} gap="md">
 *   <div>グリッドアイテム1</div>
 *   <div>グリッドアイテム2</div>
 * </ResponsiveGrid>
 */
const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  mobileCols = 1,
  tabletCols = 2,
  desktopCols = 3,
  gap = "md",
  className = "",
}) => {
  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  const gridClasses = [
    "grid",
    `grid-cols-${mobileCols}`,
    `md:grid-cols-${tabletCols}`,
    `lg:grid-cols-${desktopCols}`,
    gapClasses[gap],
    className,
  ].join(" ");

  return <div className={gridClasses}>{children}</div>;
};

export default ResponsiveGrid;
