/**
 * @description メッセージセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import FadeIn from '@/app/components/common/animation/FadeIn';
import { MessageProps } from './Message.types';
// import Castle from '@/app/components/common/icon/Castle';
import DearBlock from './DearBlock';
import Image from 'next/image';
/**
 * @description メッセージセクションコンポーネント（Server Component）
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * <Message invitationId="test" />
 */
const Message: React.FC<MessageProps> = ({ invitationId, draftKey }) => {
  return (
    <section
      id='message'
      aria-label='メッセージセクション'
      className={`relative flex flex-col items-center py-16 md:py-16 bg-gradient-to-b from-lavender-400 via-lavender-300 to-pink-300`}
    >
      {/* container */}
      <div className='flex flex-col items-center w-full px-6 md:px-0 container'>
        {/* Frame 1（半透明白・角丸） */}
        <div className='relative flex flex-col items-center w-full max-w-full p-6 md:p-8 gap-12 bg-white/40 rounded-2xl overflow-hidden'>
          {/* タイトル・本文ブロック */}
          <div className='flex flex-col items-center gap-8 w-full md:w-auto z-10'>
            {/* タイトル */}
            <FadeIn delay={0.2} duration={0.8} direction='up'>
              <h2 className='font-berkshire text-2xl md:text-5xl text-center text-gray-900 md:text-black mb-0'>
                Message
              </h2>
            </FadeIn>
            {/* 本文 */}
            <FadeIn delay={0.4} duration={0.8} direction='up'>
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
            </FadeIn>
          </div>

          {/* Dearブロック */}
          <div className='relative z-10 w-full'>
            <FadeIn delay={0.8} duration={0.8} direction='up'>
              <DearBlock invitationId={invitationId} draftKey={draftKey} />
            </FadeIn>
          </div>

          {/* 背景Castleイラスト */}
          <Image
            src='/images/sections/message/castle.webp'
            alt='message-bg'
            width={608}
            height={608}
            className='pointer-events-none select-none absolute right-0 bottom-0 z-0 md:size-[480px] size-[320px] mix-blend-overlay text-black'
          />
        </div>
      </div>
    </section>
  );
};

export default Message;
