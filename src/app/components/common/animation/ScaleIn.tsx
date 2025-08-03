/**
 * @description スケールインアニメーションコンポーネント（Motion for React使用）
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';
import React, { useEffect, useState } from 'react';

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
  /** 初期スケール値 */
  initialScale?: number;
  /** 最終スケール値 */
  finalScale?: number;
  /** 一度表示されたら再度アニメーションするかどうか */
  triggerOnce?: boolean;
  /** 即座に表示するかどうか（MVセクションなど用） */
  immediateDisplay?: boolean;
  /** viewportのマージン */
  viewportMargin?: string;
}

/**
 * @description Motion for Reactのmotion.divの型定義
 * @interface MotionDivProps
 * @since 1.0.0
 */
interface MotionDivProps {
  initial: Record<string, number>;
  whileInView: Record<string, number>;
  viewport: {
    once: boolean;
    margin: string;
  };
  transition: {
    duration: number;
    delay: number;
    ease: string;
  };
  className: string;
  children: React.ReactNode;
}

/**
 * @description スケールインアニメーションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <ScaleIn delay={0.2} duration={0.5} initialScale={0.5}>
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
  triggerOnce = true,
  immediateDisplay = false,
  viewportMargin = '0px',
}) => {
  const [MotionComponent, setMotionComponent] =
    useState<React.ComponentType<MotionDivProps> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadMotion = async () => {
      try {
        const { motion } = await import('motion/react');
        setMotionComponent(
          () => motion.div as React.ComponentType<MotionDivProps>
        );
        setIsLoaded(true);
      } catch {
        // Motion library failed to load, falling back to CSS transitions
        setIsLoaded(true);
      }
    };

    loadMotion();
  }, []);

  // immediateDisplayがtrueの場合は、即座に表示状態にする
  if (immediateDisplay) {
    return <div className={className}>{children}</div>;
  }

  // motionライブラリが読み込まれていない場合は、通常のdivを返す
  if (!isLoaded || !MotionComponent) {
    return (
      <div
        className={`transition-all duration-${Math.round(
          duration * 1000
        )} ease-out opacity-100 ${className}`}
        style={{
          // 初期状態では非表示にして、Motionライブラリの準備が整ってから表示
          visibility: isLoaded ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <MotionComponent
      initial={{ scale: initialScale, opacity: 0 }}
      whileInView={{ scale: finalScale, opacity: 1 }}
      viewport={{ once: triggerOnce, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default ScaleIn;
