/**
 * @description スケールインアニメーションコンポーネント（Motion for React使用）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { motion } from 'motion/react';

/**
 * @description スケールインアニメーションコンポーネントのProps型定義
 * @interface ScaleInProps
 * @since 1.0.0
 */
interface ScaleInProps {
  /** アニメーション対象の子要素 */
  children: React.ReactNode;
  /** アニメーションの遅延時間（秒） */
  delay?: number;
  /** アニメーションの持続時間（秒） */
  duration?: number;
  /** 追加のCSSクラス */
  className?: string;
  /** 初期スケール */
  initialScale?: number;
  /** 最終スケール */
  finalScale?: number;
  /** アニメーションのイージング */
  ease?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}

/**
 * @description スケールインアニメーションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <ScaleIn delay={0.1} duration={0.5} initialScale={0.8}>
 *   <div>スケールインするコンテンツ</div>
 * </ScaleIn>
 */
const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  initialScale = 0.8,
  finalScale = 1,
  ease = 'easeOut' as const,
}) => {
  return (
    <motion.div
      initial={{ scale: initialScale, opacity: 0 }}
      animate={{ scale: finalScale, opacity: 1 }}
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

export default ScaleIn;
