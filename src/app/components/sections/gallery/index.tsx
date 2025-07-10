/**
 * @description ギャラリーセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';

/**
 * @description ギャラリーセクションのProps型定義
 * @interface GalleryProps
 * @since 1.0.0
 */
interface GalleryProps {
  /** セクションのID */
  id?: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * @description ギャラリーセクションコンポーネント
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Gallery id="gallery" className="section-gallery" />
 */
const Gallery: React.FC<GalleryProps> = ({
  id = 'gallery',
  className = '',
}) => {
  return (
    <section id={id} className={`gallery-section ${className}`}>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center'>ギャラリーセクション</h2>
        <p className='text-center mt-4'>写真ギャラリーセクション</p>
      </div>
    </section>
  );
};

export default Gallery;
