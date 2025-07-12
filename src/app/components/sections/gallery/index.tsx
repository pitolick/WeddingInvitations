/**
 * @description ギャラリーセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
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
  return (
    <section
      id='gallery'
      className='w-full py-0 sm:py-10 bg-gradient-to-t from-lavender-400 via-lavender-300 to-pink-300'
    >
      <div className='container m-auto'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full grid grid-cols-3 grid-rows-4 gap-0 sm:grid-cols-4 md:grid-cols-6 sm:grid-rows-3 md:grid-rows-2 relative'>
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
