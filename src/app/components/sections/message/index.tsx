/**
 * @description メッセージセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import { MessageProps } from './Message.types';
// import Castle from '@/app/components/common/icon/Castle';
import Image from 'next/image';
import { MessageContent } from './MessageContent';

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
      <div className='flex flex-col items-center w-full px-6 container'>
        {/* Frame 1（半透明白・角丸） */}
        <div className='relative flex flex-col items-center w-full max-w-full p-6 md:p-8 bg-white/40 rounded-2xl overflow-hidden'>
          {/* アニメーション付きコンテンツ */}
          <MessageContent invitationId={invitationId} draftKey={draftKey} />

          {/* 背景Castleイラスト */}
          <Image
            src='/images/sections/message/castle.webp'
            alt=''
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
