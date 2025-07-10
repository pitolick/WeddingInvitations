'use client';

/**
 * @description 招待ページ用のClient Component
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import MainVisual from '@/app/components/sections/mv';
import Navigation from '@/app/components/sections/navigation';
import { clientDevLogger } from '@/app/lib/logger/client';

/**
 * @description 招待ページClient ComponentのProps
 */
interface InvitationPageClientProps {
  invitationId: string;
}

/**
 * @description 招待情報セクションコンポーネント
 * @param invitationId - 招待ID
 * @returns JSX.Element
 */
function InvitationInfoSection({ invitationId }: { invitationId: string }) {
  return (
    <section id='invitation' className='py-16 px-8 bg-white'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='font-great-vibes text-4xl md:text-5xl text-gray-800 mb-8'>
          ご招待
        </h2>
        <p className='text-lg text-gray-600 mb-8'>
          この度、私たちの結婚式にご招待させていただきます。
          <br />
          特別な一日を皆様と共に過ごさせていただければ幸いです。
        </p>
        <div className='bg-gradient-to-r from-lavender-300 to-pink-300 p-8 rounded-lg'>
          <p className='text-xl font-semibold text-gray-800 mb-4'>
            招待ID: {invitationId}
          </p>
          <p className='text-gray-700'>このIDは招待状の識別に使用されます。</p>
        </div>
      </div>
    </section>
  );
}

/**
 * @description イベント詳細セクションコンポーネント
 * @returns JSX.Element
 */
function EventSection() {
  return (
    <section
      id='event'
      className='py-16 px-8 bg-gradient-to-br from-lavender-50 to-pink-50'
    >
      <div className='max-w-4xl mx-auto text-center'>
        <h3 className='font-great-vibes text-3xl text-gray-800 mb-8'>
          イベント詳細
        </h3>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h4 className='font-semibold text-xl mb-4'>結婚式</h4>
          <p className='text-gray-600 mb-4'>2024年12月25日（水）</p>
          <p className='text-gray-600 mb-4'>18:00 開場 / 18:30 開宴</p>
          <p className='text-gray-600'>東京ガーデンパレス</p>
        </div>
      </div>
    </section>
  );
}

/**
 * @description RSVPセクションコンポーネント
 * @returns JSX.Element
 */
function RsvpSection() {
  return (
    <section id='rsvp' className='py-16 px-8 bg-white'>
      <div className='max-w-4xl mx-auto text-center'>
        <h3 className='font-great-vibes text-3xl text-gray-800 mb-8'>
          出欠のご回答
        </h3>
        <div className='bg-gradient-to-r from-lavender-300 to-pink-300 p-8 rounded-lg'>
          <p className='text-lg text-gray-800 mb-4'>
            ご出席・ご欠席をお知らせください
          </p>
          <p className='text-gray-700'>RSVPフォームは準備中です</p>
        </div>
      </div>
    </section>
  );
}

/**
 * @description ギャラリーセクションコンポーネント
 * @returns JSX.Element
 */
function GallerySection() {
  return (
    <section
      id='gallery'
      className='py-16 px-8 bg-gradient-to-br from-lavender-50 to-pink-50'
    >
      <div className='max-w-4xl mx-auto text-center'>
        <h3 className='font-great-vibes text-3xl text-gray-800 mb-8'>
          思い出の写真
        </h3>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <p className='text-gray-600'>ギャラリーは準備中です</p>
        </div>
      </div>
    </section>
  );
}

/**
 * @description 招待ページ用のClient Component
 * @param props - コンポーネントのProps
 * @returns JSX.Element
 * @example
 * // Used in Server Component to render client-side features
 * <InvitationPageClient invitationId="wedding-123" />
 */
export default function InvitationPageClient({
  invitationId,
}: InvitationPageClientProps) {
  clientDevLogger.info(
    'InvitationPageClient',
    `Client Componentを表示中: ${invitationId}`,
    {
      context: 'InvitationPageClient',
      humanNote: 'Client Component表示',
      aiTodo: 'MainVisualコンポーネントの表示',
    }
  );

  return (
    <div className='min-h-screen'>
      {/* メインビジュアル（MV）セクション */}
      <MainVisual />

      {/* ナビゲーションセクション */}
      <Navigation />

      {/* 招待情報セクション */}
      <InvitationInfoSection invitationId={invitationId} />

      {/* イベント詳細セクション */}
      <EventSection />

      {/* RSVPセクション */}
      <RsvpSection />

      {/* ギャラリーセクション */}
      <GallerySection />
    </div>
  );
}
