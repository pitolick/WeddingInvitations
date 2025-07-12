'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/app/components/common/modal';

/**
 * @description ギャラリー画像1枚分の表示コンポーネント
 * @param props サムネイル画像・元画像パス・alt・説明・サイズ(px)
 * @returns JSX.Element
 * @example
 * <GalleryImage thumbnail="/images/sections/gallery/gallery-1-thumbnail.webp" image="/images/sections/gallery/gallery-1.webp" alt="思い出の写真" size={125} />
 */
interface GalleryImageProps {
  /** サムネイル画像パス */
  thumbnail: string;
  /** 元画像パス（拡大用） */
  image: string;
  /** 画像のaltテキスト */
  alt: string;
  /** 画像サイズ(px) */
  size: number;
}

const GalleryImage: React.FC<GalleryImageProps> = ({
  thumbnail,
  image,
  alt,
  size,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type='button'
        className='flex flex-col justify-center items-center size-full'
        onClick={() => setIsOpen(true)}
        aria-label={alt}
      >
        <Image
          src={thumbnail}
          alt={alt}
          width={size}
          height={size}
          className='object-cover w-full h-auto'
          priority={false}
        />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size='fullscreen'
        showCloseButton
      >
        <Image
          src={image}
          alt={alt}
          width={800}
          height={800}
          className='max-h-[90vh] w-auto'
          priority={false}
        />
      </Modal>
    </>
  );
};

export default GalleryImage;
