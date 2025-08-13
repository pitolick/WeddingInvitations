/**
 * @description フッターセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

/**
 * @description フッターセクション（propsなし・Tailwind CSSのみでデザイン再現）
 * @returns JSX.Element
 * @example <Footer />
 */
const Footer: React.FC = () => {
  return (
    <footer className='flex flex-col items-center justify-center w-full bg-white'>
      <div className='flex flex-col items-center justify-center py-8 gap-2'>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-4xl font-bold text-center font-rock text-gray-900'
        >
          Thank You !
        </motion.span>
      </div>
      <div className='flex flex-col items-center justify-center w-full bg-lavender-600 py-3'>
        <span className='text-sm text-center  text-white'>
          © 2025{' '}
          <Link
            href='https://www.pitolick.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            ぴいてっく
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
