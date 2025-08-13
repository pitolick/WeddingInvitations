/**
 * @description メインビジュアル（MV）セクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

/**
 * @description メインビジュアル（MV）セクションコンポーネント
 * @returns JSX.Element
 * @example
 * <MainVisual />
 */
const MainVisual: React.FC = () => {
  return (
    <section
      id='main-visual'
      className='relative w-full h-screen min-h-[650px]'
      data-testid='main-visual-section'
    >
      {/* 背景画像（レスポンシブ対応） */}
      <picture>
        <source
          srcSet='/images/sections/mv/mv-hero-mobile.webp'
          media='(max-width: 767px)'
          type='image/webp'
        />
        <source
          srcSet='/images/sections/mv/mv-hero-desktop.webp'
          media='(min-width: 768px)'
          type='image/webp'
        />
        <Image
          src='/images/sections/mv/mv-hero-desktop.webp'
          alt='背景画像'
          fill
          className='object-cover z-10'
          priority
          sizes='100vw'
        />
      </picture>

      {/* コンテンツコンテナ - FigmaMCPのレイアウト情報に基づく */}
      <div
        className='absolute inset-0 flex items-center justify-center z-30'
        data-testid='main-visual-content'
      >
        {/* メインタイトル - スクロールベースのアニメーション */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className='w-full'
        >
          <h1
            className='font-great-vibes text-7xl md:text-9xl font-normal text-white leading-tight text-center drop-shadow-lg px-4 md:px-8 lg:px-12'
            data-testid='main-visual-title'
          >
            Wedding Celebration
          </h1>
        </motion.div>
      </div>

      {/* パフォーマンス最適化のためのプリロード */}
      <link
        rel='preload'
        as='image'
        href='/images/sections/mv/mv-hero-desktop.webp'
      />
      <link
        rel='preload'
        as='image'
        href='/images/sections/mv/mv-hero-mobile.webp'
      />
    </section>
  );
};

export default MainVisual;
