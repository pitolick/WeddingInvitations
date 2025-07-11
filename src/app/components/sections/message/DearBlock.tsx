/**
 * @description Dearブロックコンポーネント（microCMS連携用・Server Component）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { DearBlockProps } from './Message.types';
import { getDearBlockData } from '@/app/lib/api';
import { FadeIn } from '@/app/components/common/animation';
import Hr from '@/app/components/common/decoration/Hr';
import { draftMode } from 'next/headers';
import { cookies } from 'next/headers';

/**
 * @description Dearブロックコンポーネント（Server Component, microCMSプレビューモード対応）
 * @param props - コンポーネントのProps（invitationId, draftKey）
 * draftKeyが未指定の場合はCookieから取得
 * @returns Promise<JSX.Element>
 * @example
 * <DearBlock invitationId="test" draftKey="xxxx" />
 */
async function DearBlock({ invitationId, draftKey }: DearBlockProps) {
  const { isEnabled } = await draftMode();
  const cookieStore = await cookies();
  const effectiveDraftKey = isEnabled
    ? draftKey || cookieStore.get('__prv_draftKey')?.value
    : undefined;
  /**
   * @description microCMSからデータを取得（draftKey対応）
   */
  const dearBlockData = await getDearBlockData(invitationId, effectiveDraftKey);

  // データが取得できない場合
  if (!dearBlockData || !dearBlockData.message) {
    return <></>;
  }

  return (
    <>
      {/* 装飾hr */}
      <div className='relative z-10 w-full'>
        <FadeIn delay={0.6} duration={0.6} direction='up' className='w-full'>
          <Hr />
        </FadeIn>
      </div>

      {/* Dearブロック */}
      <div className={`flex flex-col items-center w-full px-0 gap-8`}>
        {/* Dear タイトル */}
        <div className='flex flex-col items-center px-0 gap-8 w-full'>
          <h3 className='font-berkshire font-normal text-2xl text-center text-gray-900'>
            Dear {dearBlockData.dear}
          </h3>

          {/* メッセージ本文 */}
          <div className='flex flex-col justify-center items-center px-0 gap-2 w-full'>
            <div
              className='w-full font-inter font-normal text-base text-center text-gray-900 whitespace-pre-line'
              dangerouslySetInnerHTML={{ __html: dearBlockData.message }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DearBlock;
export type { DearBlockProps };
