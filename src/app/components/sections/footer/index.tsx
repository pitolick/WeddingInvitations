/**
 * @description フッターセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import Link from 'next/link';

/**
 * @description フッターセクション（propsなし・Tailwind CSSのみでデザイン再現）
 * @returns JSX.Element
 * @example <Footer />
 */
const Footer: React.FC = () => {
  return (
    <footer className='flex flex-col items-center justify-center w-full bg-white'>
      <div className='flex flex-col items-center justify-center py-8 gap-2'>
        <span className='text-4xl font-bold text-center font-rock text-gray-900'>
          Thank You !
        </span>
      </div>
      <div className='flex flex-col items-center justify-center w-full bg-lavender-600 py-1'>
        <span className='text-xs text-center  text-white'>
          © 2025{' '}
          <Link
            href='https://www.pitolick.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            ぴいてっく
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
