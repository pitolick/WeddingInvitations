/**
 * @description 左から右に流れる魔法のエフェクトを表示するコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface MagicEffectProps {
  /** エフェクトを表示するかどうか */
  isActive: boolean;
  /** エフェクトの位置（left） */
  left?: string;
  /** エフェクトの位置（top） */
  top?: string;
  /** エフェクトのサイズ */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * @description 流れる魔法のエフェクトコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <MagicEffect isActive={true} left="50%" top="50%" size="md" />
 */
export const MagicEffect: React.FC<MagicEffectProps> = ({
  isActive,
  left = '50%',
  top = '50%',
  size = 'md',
}) => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; speed: number }>
  >([]);

  // パーティクルの生成
  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 400 - 200, // より広い範囲
        y: Math.random() * 200 - 100, // 縦方向もより広く
        delay: Math.random() * 0.4, // 遅延時間を短縮
        speed: 0.8 + Math.random() * 0.8, // 速度範囲を調整
      }));
      setParticles(newParticles);
    }
  }, [isActive]);

  if (!isActive) return null;

  const sizeClasses = {
    sm: 'w-32 h-28',
    md: 'w-48 h-36',
    lg: 'w-64 h-48',
  };

  return (
    <div
      data-testid='magic-effect'
      className={`absolute pointer-events-none ${sizeClasses[size]}`}
      style={{ left, top, transform: 'translate(-50%, -50%)' }}
    >
      {/* 左から右に流れる魔法の光の帯 */}
      <motion.div
        initial={{ x: '-150%', opacity: 0 }}
        animate={{ x: '150%', opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        className='absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full blur-sm'
      />

      {/* 流れるキラキラパーティクル */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{
            x: -500,
            y: particle.y,
            opacity: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x: 0,
            y: particle.y + Math.sin(particle.id * 0.5) * 40, // 波打つ動きをより大きく
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 1.8 / particle.speed,
            delay: particle.delay * 0.5, // 遅延時間を短縮
            ease: 'easeInOut',
          }}
          className='absolute w-3 h-3 bg-yellow-300 rounded-full shadow-lg' // パーティクルサイズも大きく
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* 流れる魔法の星 */}
      <motion.div
        initial={{ x: '-150%', opacity: 0, rotate: 0 }}
        animate={{ x: '150%', opacity: [0, 1, 0], rotate: [0, 720] }}
        transition={{ duration: 1.6, delay: 0.1, ease: 'easeInOut' }}
        className='absolute inset-0 text-yellow-300 text-2xl flex items-center justify-center' // 星のサイズも大きく
      >
        ✨
      </motion.div>

      {/* 追加の魔法の星（異なるタイミング） */}
      <motion.div
        initial={{ x: '-150%', opacity: 0, rotate: 0 }}
        animate={{ x: '150%', opacity: [0, 1, 0], rotate: [0, -360] }}
        transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
        className='absolute inset-0 text-pink-300 text-xl flex items-center justify-center' // 星のサイズも大きく
        style={{ top: '30%' }}
      >
        ✨
      </motion.div>

      {/* 流れる波紋エフェクト */}
      <motion.div
        initial={{ x: '-150%', scale: 0, opacity: 0.8 }}
        animate={{ x: '150%', scale: 1.5, opacity: 0 }}
        transition={{ duration: 2.0, ease: 'easeInOut' }}
        className='absolute inset-0 border border-yellow-300 rounded-full'
      />

      {/* 追加の光の帯（異なる速度） */}
      <motion.div
        initial={{ x: '-150%', opacity: 0 }}
        animate={{ x: '150%', opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
        className='absolute inset-0 bg-gradient-to-r from-transparent via-pink-300 to-transparent rounded-full blur-sm'
        style={{ top: '15%' }}
      />

      {/* ラベンダーの光の帯 */}
      <motion.div
        initial={{ x: '-150%', opacity: 0 }}
        animate={{ x: '150%', opacity: [0, 0.4, 0] }}
        transition={{ duration: 1.6, delay: 0.4, ease: 'easeInOut' }}
        className='absolute inset-0 bg-gradient-to-r from-transparent via-lavender-300 to-transparent rounded-full blur-sm'
        style={{ top: '70%' }}
      />
    </div>
  );
};

export default MagicEffect;
