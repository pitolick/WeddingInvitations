/**
 * @description メッセージコンテンツコンポーネント（Client Component・アニメーション付き）
 * @author WeddingInvitations
 * @since 1.0.0
 */

'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageProps } from './Message.types';
import DearBlock from './DearBlock';

/**
 * @description メッセージコンテンツコンポーネント（Client Component）
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <MessageContent invitationId="test" draftKey="xxxx" />
 */
export const MessageContent: React.FC<MessageProps> = ({
  invitationId,
  draftKey,
}) => {
  return (
    <>
      {/* タイトル・本文ブロック */}
      <div className='flex flex-col items-center gap-8 w-full md:w-auto z-10'>
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='w-full'
        >
          <h2 className='font-berkshire text-2xl md:text-5xl text-center text-gray-900 md:text-black mb-0'>
            Message
          </h2>
        </motion.div>
        {/* 本文 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='w-full'
        >
          <div className='prose prose-p:my-3 text-base md:text-base  text-center text-gray-900 md:text-black whitespace-pre-line'>
            <p>
              立冬とは申せ今年はオラフも
              <br className='block md:hidden' />
              溶けてしまいそうな晩秋でございます
            </p>
            <p>
              皆様にはお健やかにお過ごしのことと
              <br className='block md:hidden' />
              お慶び申し上げます
            </p>
            <p>
              このたび私たちは <span className='line-through'>戴冠式</span>{' '}
              結婚式 を
              <br className='block md:hidden' />
              挙げることとなりました
            </p>
            <p>
              つきましては親しい皆様への
              <br className='block md:hidden' />
              ご挨拶をかねて
              <br />
              心ばかりのパーティーを
              <br className='block md:hidden' />
              催したいと思います
            </p>
            <p>
              おいそがしいところ誠に恐縮ですが
              <br />
              ふたりの門出を
              <br className='block md:hidden' />
              共に祝っていただけましたら
              <br />
              幸いです
            </p>
            <p>
              ぜひ夢と魔法の会場へ
              <br className='block md:hidden' />
              ご出席くださいますよう
              <br className='block md:hidden' />
              ご案内申し上げます
            </p>
          </div>
        </motion.div>
      </div>

      {/* Dearブロック */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='relative z-10 w-full'
      >
        <DearBlock invitationId={invitationId} draftKey={draftKey} />
      </motion.div>
    </>
  );
};
