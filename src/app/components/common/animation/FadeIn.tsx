/**
 * @description フェードインアニメーションコンポーネント（Motion for React使用）
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';
import React, { useEffect, useState } from 'react';

/**
 * @description フェードインアニメーションコンポーネントのProps型定義
 * @interface FadeInProps
 * @since 1.0.0
 */
interface FadeInProps {
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
}

/**
 * @description フェードインアニメーションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <FadeIn delay={0.2} duration={0.5} direction="up">
 *   <div>フェードインするコンテンツ</div>
 * </FadeIn>
 */
const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  direction = 'up',
  distance = 20,
}) => {
  const [MotionComponent, setMotionComponent] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadMotion = async () => {
      try {
        const { motion } = await import('motion/react');
        setMotionComponent(() => motion.div);
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load motion library:', error);
        setIsLoaded(true);
      }
    };

    loadMotion();
  }, []);

  const getInitialPosition = () => {
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

  const getAnimatePosition = () => {
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

  // motionライブラリが読み込まれていない場合は、通常のdivを返す
  if (!isLoaded || !MotionComponent) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionComponent
      initial={getInitialPosition()}
      animate={getAnimatePosition()}
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

export default FadeIn;
