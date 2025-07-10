'use client';

import { useState, useRef, useEffect } from 'react';
import { Modal } from './common/modal';

/**
 * @description 画像拡大表示用Modalコンポーネントのサンプルページ
 * @returns 画像拡大表示ModalサンプルのJSX要素
 */
export function ImageModalSample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageAlt, setSelectedImageAlt] = useState<string>('');
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // サンプル画像データ
  const sampleImages = [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      alt: '結婚式のメイン写真',
      title: 'メイン写真',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
      alt: '新郎新婦の写真',
      title: '新郎新婦',
    },
    {
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
      alt: '結婚式の会場',
      title: '会場',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
      alt: 'ケーキカットの瞬間',
      title: 'ケーキカット',
    },
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      alt: 'ドレス姿の新婦',
      title: 'ドレス',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
      alt: '結婚指輪',
      title: '指輪',
    },
  ];

  const handleImageClick = (image: (typeof sampleImages)[0]) => {
    setSelectedImage(image.src);
    setSelectedImageAlt(image.alt);
    setImageSize(null); // リセット
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedImageAlt('');
    setImageSize(null);
  };

  // 画像のサイズを取得
  useEffect(() => {
    if (selectedImage && imageRef.current) {
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        console.warn('画像の読み込みに失敗しました:', selectedImage);
        setImageSize(null);
      };
      img.src = selectedImage;
    }
  }, [selectedImage]);

  // 画像の表示サイズを計算（元サイズを超えない）
  const getImageDisplayStyle = () => {
    if (!imageSize || typeof window === 'undefined') return {};

    const maxWidth = Math.min(imageSize.width, window.innerWidth * 0.9);
    const maxHeight = Math.min(imageSize.height, window.innerHeight * 0.9);

    // アスペクト比を保持しながら、元サイズを超えないように調整
    const aspectRatio = imageSize.width / imageSize.height;

    let displayWidth = maxWidth;
    let displayHeight = maxWidth / aspectRatio;

    if (displayHeight > maxHeight) {
      displayHeight = maxHeight;
      displayWidth = maxHeight * aspectRatio;
    }

    return {
      width: `${displayWidth}px`,
      height: `${displayHeight}px`,
      maxWidth: '90vw',
      maxHeight: '90vh',
    };
  };

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
        画像拡大表示 Modal サンプル（元サイズ制限版）
      </h2>

      {/* 画像ギャラリー */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>
          画像をクリックして拡大表示
        </h3>
        <p className='font-noto text-gray-600'>
          以下の画像をクリックすると、元サイズを超えない範囲で拡大表示されます。
        </p>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {sampleImages.map((image, index) => (
            <div
              key={index}
              className='group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105'
              onClick={() => handleImageClick(image)}
            >
              <div className='relative aspect-square'>
                <img
                  src={image.src}
                  alt={image.alt}
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='p-3 bg-white'>
                <p className='font-noto text-sm font-medium text-gray-800'>
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 画像拡大表示モーダル */}
      <Modal
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
        showCloseButton={false}
        size='fullscreen'
        className='p-0 bg-transparent'
      >
        <div className='relative w-full h-full flex items-center justify-center'>
          {/* 画像表示エリア */}
          <div className='relative'>
            <img
              ref={imageRef}
              src={selectedImage || ''}
              alt={selectedImageAlt}
              style={getImageDisplayStyle()}
              className='object-contain'
            />

            {/* 閉じるボタン（画像の右上） */}
            <button
              onClick={handleCloseModal}
              className='absolute -top-3 -right-3 z-10 p-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white shadow-lg'
              aria-label='画像を閉じる'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </Modal>

      {/* 使用方法説明 */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>
          画像拡大表示モーダルの特徴
        </h3>
        <div className='bg-gray-50 p-6 rounded-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h4 className='font-noto font-semibold text-gray-800 mb-3'>
                実装ポイント
              </h4>
              <ul className='font-noto text-gray-700 space-y-2'>
                <li>• 元サイズを超えない表示制限</li>
                <li>• アスペクト比の保持</li>
                <li>• 画面サイズに応じた調整</li>
                <li>• タイトルバーなし（showCloseButton: false）</li>
                <li>• 右上に閉じるボタンを配置</li>
                <li>• レスポンシブ対応</li>
              </ul>
            </div>
            <div>
              <h4 className='font-noto font-semibold text-gray-800 mb-3'>
                使用例
              </h4>
              <ul className='font-noto text-gray-700 space-y-2'>
                <li>• 写真ギャラリー</li>
                <li>• 商品画像拡大</li>
                <li>• ポートフォリオ表示</li>
                <li>• プレビュー機能</li>
                <li>• 画像詳細表示</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* カスタマイズ例 */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>カスタマイズ例</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-lavender-50 p-4 rounded-lg'>
            <h4 className='font-noto font-semibold text-lavender-800 mb-2'>
              元サイズ制限版（現在の実装）
            </h4>
            <p className='font-noto text-lavender-700 text-sm'>
              画像の元サイズを超えない範囲で表示し、画質を保持
            </p>
          </div>
          <div className='bg-rose-50 p-4 rounded-lg'>
            <h4 className='font-noto font-semibold text-rose-800 mb-2'>
              フルスクリーン版
            </h4>
            <p className='font-noto text-rose-700 text-sm'>
              画面全体に表示するが、アスペクト比は保持
            </p>
          </div>
        </div>
      </section>

      {/* 技術詳細 */}
      <section className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-700'>技術詳細</h3>
        <div className='bg-blue-50 p-6 rounded-lg'>
          <h4 className='font-noto font-semibold text-blue-800 mb-3'>
            実装のポイント
          </h4>
          <div className='font-noto text-blue-700 space-y-2'>
            <p>• 画像の自然サイズ（naturalWidth/Height）を取得</p>
            <p>• 画面サイズの90%を最大値として設定</p>
            <p>• アスペクト比を保持しながらサイズ調整</p>
            <p>• 元サイズを超えないよう制限</p>
            <p>• 中央配置で表示</p>
          </div>
        </div>
      </section>
    </div>
  );
}
