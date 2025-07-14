/**
 * @description Figmaデザイン準拠のナビゲーションセクション（3カラム）
 * @example
 * <Navigation />
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import Sun from '@/app/components/common/icon/Sun';

/**
 * @description ナビゲーション項目の型
 */
const NAV_ITEMS = [
  {
    key: 'message',
    en: 'Message',
    ja: 'ご挨拶',
  },
  {
    key: 'event',
    en: 'Event',
    ja: '日時・会場',
  },
  {
    key: 'rsvp',
    en: 'RSVP',
    ja: 'ご出欠',
  },
];

/**
 * @description ナビゲーションセクション（3カラム）
 * @returns JSX.Element - ナビゲーション要素
 * @example
 * <Navigation />
 */
const Navigation = () => {
  return (
    <nav
      id='navigation'
      className='w-full bg-lavender-600 py-4'
      data-testid='navigation-section'
    >
      <div className='flex items-center justify-center gap-2'>
        {NAV_ITEMS.map(item => (
          <a
            key={item.key}
            href={`#${item.key}`}
            className='flex flex-col items-center gap-0.5 w-28 hover:opacity-80 transition-opacity duration-200'
            aria-label={`${item.ja}セクションへ移動`}
          >
            <Sun size={50} className='text-yellow-500' />
            <p className='font-berkshire text-white text-xl'>{item.en}</p>
            <p className='font-noto font-bold text-white text-sm'>{item.ja}</p>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
