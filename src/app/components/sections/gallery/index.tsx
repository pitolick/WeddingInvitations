/**
 * @description ギャラリーセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */
'use client';

import React, { useState } from 'react';
import GalleryImage from './GalleryImage';

/**
 * @description ギャラリー画像データ配列
 */
const galleryImages = [
  {
    thumbnail: '/images/sections/gallery/gallery-1-thumbnail.webp',
    image: '/images/sections/gallery/gallery-1.webp',
    alt: 'ギャラリー画像1',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-2-thumbnail.webp',
    image: '/images/sections/gallery/gallery-2.webp',
    alt: 'ギャラリー画像2',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-3-thumbnail.webp',
    image: '/images/sections/gallery/gallery-3.webp',
    alt: 'ギャラリー画像3',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-4-thumbnail.webp',
    image: '/images/sections/gallery/gallery-4.webp',
    alt: 'ギャラリー画像4',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-5-thumbnail.webp',
    image: '/images/sections/gallery/gallery-5.webp',
    alt: 'ギャラリー画像5',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-6-thumbnail.webp',
    image: '/images/sections/gallery/gallery-6.webp',
    alt: 'ギャラリー画像6',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-7-thumbnail.webp',
    image: '/images/sections/gallery/gallery-7.webp',
    alt: 'ギャラリー画像7',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-8-thumbnail.webp',
    image: '/images/sections/gallery/gallery-8.webp',
    alt: 'ギャラリー画像8',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-9-thumbnail.webp',
    image: '/images/sections/gallery/gallery-9.webp',
    alt: 'ギャラリー画像9',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-10-thumbnail.webp',
    image: '/images/sections/gallery/gallery-10.webp',
    alt: 'ギャラリー画像10',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-11-thumbnail.webp',
    image: '/images/sections/gallery/gallery-11.webp',
    alt: 'ギャラリー画像11',
  },
  {
    thumbnail: '/images/sections/gallery/gallery-12-thumbnail.webp',
    image: '/images/sections/gallery/gallery-12.webp',
    alt: 'ギャラリー画像12',
  },
];

/**
 * @description ギャラリーセクションコンポーネント
 * @returns JSX.Element
 * @example
 * <Gallery id="gallery" className="section-gallery" />
 */
const Gallery: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <section
      id='gallery'
      role='region'
      aria-label='ギャラリー'
      className='w-full py-0 sm:py-10 bg-gradient-to-t from-lavender-400 via-lavender-300 to-pink-300'
    >
      <div className='container m-auto'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full grid grid-cols-3 grid-rows-4 gap-0 sm:grid-cols-4 md:grid-cols-6 sm:grid-rows-3 md:grid-rows-2 relative'>
            {/* 初期状態のオーバーレイ */}
            {!isRevealed && (
              <div
                className='absolute inset-0 z-20 bg-black/20 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-black/50 group'
                onClick={handleReveal}
              >
                <div className='text-center space-y-4 p-8'>
                  {/* メインアイコン */}
                  <div className='mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <svg
                      className='w-12 h-12 text-lavender-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                  </div>

                  {/* メインテキスト */}
                  <div className='space-y-2'>
                    <h3 className='text-2xl md:text-3xl font-bold text-white font-berkshire'>
                      Gallery
                    </h3>
                    <p className='text-sm text-white'>
                      画像をクリックまたはタップして拡大表示
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 画像グリッド */}
            {galleryImages.map(img => (
              <GalleryImage
                key={img.image}
                thumbnail={img.thumbnail}
                image={img.image}
                alt={img.alt}
                size={300}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
