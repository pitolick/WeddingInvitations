/**
 * @description ページトップに戻る追従ボタンコンポーネント（Server Component）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description 戻るボタンのProps型
 */
interface BackToTopButtonProps {
  /** ボタンのクラス名 */
  className?: string;
}

/**
 * @description 戻るボタンコンポーネント（Server Component）
 * @param className - ボタンのクラス名
 * @returns JSX.Element
 * @example
 * <BackToTopButton />
 */
const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  className = '',
}) => {
  return (
    <a
      href='#navigation'
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-2 md:p-3 bg-lavender-600/80 hover:bg-lavender-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:ring-offset-2 ${className}`}
      aria-label='ナビゲーションセクションに戻る'
      data-testid='back-to-top-button'
    >
      <svg
        className='w-5 h-5 md:w-6 md:h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 10l7-7m0 0l7 7m-7-7v18'
        />
      </svg>
    </a>
  );
};

export default BackToTopButton;
