/**
 * @description Dearブロックコンポーネント（microCMS連携用・Client Component）
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React, { useEffect, useState } from 'react';
import { DearBlockProps } from './Message.types';
import Hr from '@/app/components/common/decoration/Hr';

interface DearBlockData {
  dear: string;
  message: string;
}

/**
 * @description Dearブロックコンポーネント（Client Component, microCMSプレビューモード対応）
 * @param props - コンポーネントのProps（invitationId, draftKey）
 * @returns JSX.Element
 * @example
 * <DearBlock invitationId="test" draftKey="xxxx" />
 */
const DearBlock: React.FC<DearBlockProps> = ({ invitationId, draftKey }) => {
  const [dearBlockData, setDearBlockData] = useState<DearBlockData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const fetchDearBlockData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // APIルートを使用してデータを取得
        const response = await fetch(
          `/api/dear-block?invitationId=${invitationId}${draftKey ? `&draftKey=${draftKey}` : ''}`
        );

        if (response.status === 404) {
          // データが見つからない場合は、何も表示しない
          setShouldShow(false);
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch dear block data');
        }

        const data = await response.json();
        setDearBlockData(data);
        setShouldShow(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setShouldShow(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDearBlockData();
  }, [invitationId, draftKey]);

  // ローディング中
  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  // エラー時またはデータが表示されない場合
  if (error || !shouldShow) {
    return null;
  }

  // データが取得できない場合
  if (!dearBlockData || !dearBlockData.message) {
    return null;
  }

  return (
    <>
      {/* 装飾hr */}
      <div className='relative z-10 w-full mt-6'>
        <Hr />
      </div>

      {/* Dearブロック */}
      <div className={`flex flex-col items-center w-full px-0 gap-8 mt-6`}>
        {/* Dear タイトル */}
        <div className='flex flex-col items-center px-0 gap-8 w-full'>
          <h3 className='text-2xl font-bold text-center text-gray-900'>
            <span className='font-berkshire'>Dear</span>{' '}
            <span className='font-noto'>{dearBlockData.dear}</span>
          </h3>

          {/* メッセージ本文 */}
          <div className='flex flex-col justify-center items-center px-0 gap-2 w-full'>
            <div
              className='prose prose-p:!text-center prose-p:my-3 prose-p:py-0.5 w-full font-normal text-base !text-center text-gray-900 whitespace-pre-line'
              dangerouslySetInnerHTML={{ __html: dearBlockData.message }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DearBlock;
export type { DearBlockProps };
