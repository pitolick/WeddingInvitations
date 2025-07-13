/**
 * @description RSVPセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import RSVPClient from './RSVPClient';

const RSVP: React.FC = () => {
  return (
    <section
      id='rsvp'
      className='flex justify-center items-start bg-cover bg-center bg-no-repeat py-16 px-5'
      style={{
        backgroundImage: "url('/images/sections/rsvp/rsvp-background.webp')",
      }}
    >
      <div className='container space-y-8'>
        {/* タイトル */}
        <h2 className='font-berkshire text-4xl text-center'>RSVP</h2>

        <div className='mx-auto bg-white rounded-2xl px-6 md:px-10 py-10 flex flex-col items-center gap-6 md:max-w-3xl'>
          {/* サブテキスト */}
          <div className='flex flex-col items-center gap-2'>
            <p className='text-center'>
              お手数ではございますが
              <br className='sm:hidden' />
              下記お日にち迄に
              <br />
              出欠のお返事賜りますよう
              <br className='sm:hidden' />
              お願い申し上げます
            </p>
            <p className='font-noto font-bold text-2xl text-pink-600'>
              2025/09/17
            </p>
          </div>

          <RSVPClient />
        </div>
      </div>
    </section>
  );
};

export default RSVP;
