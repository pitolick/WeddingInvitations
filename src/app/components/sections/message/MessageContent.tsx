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
          transition={{ duration: 0.8, delay: 0.4 }}
          className='w-full'
        >
          <div className='text-base md:text-base  text-center text-gray-900 md:text-black whitespace-pre-line'>
            <p>皆様いかがお過ごしでしょうか</p>
            <br />
            <p>このたび、結婚式を執り行うこととなりました</p>
            <br />
            <p>
              日頃お世話になっております皆様に
              <br />
              私どもの門出をお見守りいただきたく
              <br />
              ささやかながら小宴を催したく存じます
            </p>
            <br />
            <p>ご多用中、誠に恐縮ではございますが</p>
            <p>ぜひご出席いただきたく、ご案内申し上げます</p>
          </div>
        </motion.div>
      </div>

      {/* Dearブロック */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className='relative z-10 w-full'
      >
        <DearBlock invitationId={invitationId} draftKey={draftKey} />
      </motion.div>
    </>
  );
};
