import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - ページが見つかりません',
  description: 'お探しのページが見つかりませんでした',
  robots: 'noindex',
};

/**
 * @description 404エラーページ（ディズニーテーマ）
 * @returns JSX.Element
 * @example <NotFound />
 */
export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4'>
      <div className='max-w-md w-full text-center'>
        {/* 404アイコン */}
        <div className='mb-8'>
          <div className='text-8xl font-bold text-gray-400 mb-4'>404</div>
          <div className='w-24 h-24 mx-auto mb-6'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='w-full h-full text-pink-500'
              strokeWidth='1.5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
              />
            </svg>
          </div>
        </div>

        {/* メッセージ */}
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          お探しのページが見つかりません
        </h1>
        <div className='text-gray-600 space-y-4 mb-8'>
          <p>
            申し訳ございませんが、お探しのページは存在しないか、移動された可能性があります。
          </p>
          <p>招待状のURLをご確認ください</p>
        </div>

        {/* 装飾要素 */}
        <div className='mt-12 opacity-30'>
          <div className='flex justify-center space-x-2'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='w-2 h-2 bg-purple-400 rounded-full animate-pulse'
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
