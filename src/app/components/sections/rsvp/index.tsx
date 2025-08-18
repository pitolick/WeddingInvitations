/**
 * @description RSVPセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import RSVPClient from './RSVPClient';
import { getGuestByInvitationId } from '@/app/lib/api/microcms';

/**
 * @description RSVPセクションのプロパティ
 * @example
 * const props: RSVPProps = { invitationId: "abc123", draftKey: "previewKey" };
 */
interface RSVPProps {
  /** 招待状ID */
  invitationId?: string;
  /** プレビュー用ドラフトキー */
  draftKey?: string;
}

const RSVP: React.FC<RSVPProps> = async ({ invitationId, draftKey }) => {
  // ゲスト情報を取得
  let guestInfo = null;
  if (invitationId) {
    guestInfo = await getGuestByInvitationId(invitationId, draftKey);
  }

  return (
    <section
      id='rsvp'
      role='region'
      aria-label='RSVP'
      className='flex justify-center items-start bg-cover bg-center bg-no-repeat py-16 px-5'
      style={{
        backgroundImage: "url('/images/sections/rsvp/rsvp-background.webp')",
      }}
    >
      <div className='container space-y-8'>
        {/* タイトル */}
        <h2 className='font-berkshire text-4xl text-center'>RSVP</h2>

        <div className='mx-auto bg-white rounded-2xl px-6 md:px-10 py-10 flex flex-col items-center gap-6 md:max-w-3xl'>
          <RSVPClient guestInfo={guestInfo || undefined} />
        </div>
      </div>
    </section>
  );
};

export default RSVP;
