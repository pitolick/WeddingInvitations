/**
 * @description カウントダウンセクションコンポーネント（画像デザイン再現）
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 結婚式日時（日本時間 2025/11/08 16:30）
  const getWeddingDate = (): Date => {
    return new Date('2025-11-08T16:30:00+09:00');
  };

  const calculateCountdown = (targetDate: Date): CountdownTime => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const weddingDate = getWeddingDate();
    setCountdown(calculateCountdown(weddingDate));
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []); // getWeddingDateとcalculateCountdownは純粋関数なので依存配列は空で問題ありません

  // アニメーション用variants
  const numberVariants = {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  // 英語ラベル（レスポンシブ対応）
  const LABELS = {
    days: 'Day',
    hours: {
      mobile: 'Hours',
      desktop: 'h',
    },
    minutes: {
      mobile: 'Minutes',
      desktop: 'm',
    },
    seconds: {
      mobile: 'Seconds',
      desktop: 's',
    },
  };

  // レスポンシブレイアウト
  const isZero = Object.values(countdown).every(v => v === 0);

  return (
    <section
      id='countdown'
      className='relative flex flex-col items-center justify-center w-full py-16'
      aria-label='カウントダウンセクション'
    >
      {/* 背景画像＋黒20%オーバーレイ */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/sections/countdown/countdown-background.webp'
          alt='カウントダウン背景'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black/20' />
      </div>

      {/* コンテナ */}
      <div className='relative z-10 flex flex-col items-center gap-8 w-full container'>
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='w-full'
        >
          <h2 className='text-white text-5xl font-normal text-center select-none font-berkshire'>
            Countdown
          </h2>
        </motion.div>

        {/* コンテンツ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='w-full'
        >
          <div className='flex flex-col items-center gap-2 md:gap-4'>
            {/* 日数と時分秒 */}
            <div className='flex flex-col md:flex-row justify-center items-center md:items-end gap-2 md:gap-4'>
              {/* 日数 */}
              <div className='flex flex-row justify-center items-end'>
                <AnimatePresence mode='wait' initial={false}>
                  <motion.span
                    key={countdown.days}
                    variants={numberVariants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    className='text-white text-8xl font-bold text-center select-none font-noto'
                  >
                    {countdown.days.toString()}
                  </motion.span>
                </AnimatePresence>
                <span className='text-white text-xl md:text-2xl font-normal text-center select-none font-berkshire'>
                  {LABELS.days}
                </span>
              </div>

              {/* 時分秒 */}
              <div className='flex flex-row justify-center items-center md:items-end gap-2'>
                {/* 時間 */}
                <div className='flex flex-col items-center'>
                  <div className='flex flex-col md:flex-row justify-center items-center md:items-end gap-1 w-[73px] md:w-auto'>
                    <span className='text-white text-4xl md:text-6xl font-bold text-center select-none'>
                      {countdown.hours.toString().padStart(2, '0')}
                    </span>
                    <span className='text-white text-sm md:text-2xl font-normal text-center select-none font-berkshire'>
                      <span className='block md:hidden'>
                        {LABELS.hours.mobile}
                      </span>
                      <span className='hidden md:block'>
                        {LABELS.hours.desktop}
                      </span>
                    </span>
                  </div>
                </div>

                {/* 分 */}
                <div className='flex flex-col items-center'>
                  <div className='flex flex-col md:flex-row justify-center items-center md:items-end gap-1 w-[73px] md:w-auto'>
                    <span className='text-white text-4xl md:text-6xl font-bold text-center select-none'>
                      {countdown.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className='text-white text-sm md:text-2xl font-normal text-center select-none font-berkshire'>
                      <span className='block md:hidden'>
                        {LABELS.minutes.mobile}
                      </span>
                      <span className='hidden md:block'>
                        {LABELS.minutes.desktop}
                      </span>
                    </span>
                  </div>
                </div>

                {/* 秒 */}
                <div className='flex flex-col items-center'>
                  <div className='flex flex-col md:flex-row justify-center items-center md:items-end gap-1 w-[73px] md:w-auto'>
                    <span className='text-white text-4xl md:text-6xl font-bold text-center select-none'>
                      {countdown.seconds.toString().padStart(2, '0')}
                    </span>
                    <span className='text-white text-sm md:text-2xl font-normal text-center select-none font-berkshire'>
                      <span className='block md:hidden'>
                        {LABELS.seconds.mobile}
                      </span>
                      <span className='hidden md:block'>
                        {LABELS.seconds.desktop}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 日付表示 */}
            <div className='flex flex-row justify-center items-center gap-1'>
              <span className='text-white text-lg md:text-2xl font-normal text-center select-none font-berkshire'>
                To
              </span>
              <span className='text-white text-lg md:text-2xl font-bold text-center select-none'>
                2025.11.08
              </span>
            </div>
          </div>
        </motion.div>

        {/* 結婚式当日メッセージ */}
        {isZero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='w-full'
          >
            <div className='text-center mt-10'>
              <p className='text-2xl md:text-3xl font-bold text-white bg-lavender-600/80 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block shadow-lg'>
                Wedding Day!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Countdown;
