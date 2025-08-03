/**
 * @description スライドインアニメーションコンポーネント（Motion for React使用）
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';
import React, { useEffect, useState } from 'react';

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
  direction?: 'up' | 'down' | 'left' | 'right';
  /** アニメーションの距離 */
  distance?: number;
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
 * @description スライドインアニメーションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <SlideIn delay={0.2} duration={0.5} direction="left">
 *   <div>スライドインするコンテンツ</div>
 * </SlideIn>
 */
const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  direction = 'left',
  distance = 50,
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

  const getInitialPosition = (): Record<string, number> => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  const getAnimatePosition = (): Record<string, number> => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { opacity: 1 };
    }
  };

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
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
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

export default SlideIn;
