import { Metadata } from 'next';
import { HomeClient } from './components/HomeClient';
import { Hr } from './components/common/decoration';

export const metadata: Metadata = {
  title: '結婚式招待状 - 共通コンポーネントサンプル',
  description:
    '美しい結婚式招待状のWebサイト - 共通コンポーネントのサンプルページ',
};

/**
 * @description 結婚式招待状のメインページ（サーバーコンポーネント）
 * @returns メインページのJSX要素
 */
export default function Home() {
  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-8'>
          結婚式招待状 - 共通コンポーネントサンプル
        </h1>

        {/* Hrコンポーネント（デフォルト） */}
        <Hr />
        {/* Hrコンポーネント（カスタム例） */}
        <Hr
          width={800}
          iconSize={24}
          color='#73357a'
          lineColor='#73357a'
          className='my-8'
        />

        <HomeClient />
      </div>
    </main>
  );
}
