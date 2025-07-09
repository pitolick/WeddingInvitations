/**
 * @description スライドインアニメーションコンポーネント（Motion for React使用）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from "react";
import { motion } from "motion/react";

/**
 * @description スライドインアニメーションコンポーネントのProps型定義
 * @interface SlideInProps
 * @since 1.0.0
 */
interface SlideInProps {
  /** アニメーション対象の子要素 */
  children: React.ReactNode;
  /** アニメーションの遅延時間（秒） */
  delay?: number;
  /** アニメーションの持続時間（秒） */
  duration?: number;
  /** 追加のCSSクラス */
  className?: string;
  /** アニメーションの方向 */
  direction?: "up" | "down" | "left" | "right";
  /** アニメーションの距離 */
  distance?: number;
  /** アニメーションのイージング */
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut";
}

/**
 * @description スライドインアニメーションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <SlideIn delay={0.2} duration={0.6} direction="left" distance={50}>
 *   <div>スライドインするコンテンツ</div>
 * </SlideIn>
 */
const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  direction = "left",
  distance = 50,
  ease = "easeOut" as const,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      default:
        return { x: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    return { x: 0, y: 0, opacity: 1 };
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={getAnimatePosition()}
      transition={{
        duration,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
