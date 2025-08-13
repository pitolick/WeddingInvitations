import React from 'react';
import type { EventItem as EventItemType } from './types';
import GoogleCalendarButton from '@/app/components/common/button/GoogleCalendarButton';

/**
 * @description 単一イベント（挙式・披露宴・二次会など）表示コンポーネント
 * @param event - イベント情報
 * @returns JSX.Element
 */
const EventItem: React.FC<{ event: EventItemType }> = ({ event }) => {
  return (
    <section className='w-full grid grid-rows-subgrid row-span-6 gap-6'>
      {/* タイトルブロック */}
      <div className='w-full bg-lavender-600 py-4 grid grid-cols-1 gap-2'>
        <span className='font-berkshire text-2xl text-white text-center'>
          {event.title}
        </span>
        <span className='font-noto text-lg text-white text-center'>
          {event.subtitle}
        </span>
      </div>

      {/* 日時セクション */}
      <div className='grid grid-cols-1 gap-1 justify-items-center'>
        <span className='font-noto font-bold text-lg text-center'>
          {event.date}
        </span>
        <div className='grid grid-cols-1 justify-items-center'>
          <span className='font-noto font-bold text-2xl text-center'>
            {event.time}
          </span>
          {event.receptionTime && (
            <span className='font-noto text-sm text-center'>
              {event.receptionTime}
            </span>
          )}
        </div>
      </div>

      {/* 会場情報テーブル */}
      <div className='inline-grid grid-cols-1 gap-2 justify-items-center'>
        <dl className='inline-grid grid-cols-1 gap-2'>
          {event.venue.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-[auto_1fr] gap-3 items-start'
            >
              <dt className='bg-gray-600 text-white text-xs font-noto rounded px-2 py-1 w-10 text-center'>
                {item.key}
              </dt>
              <dd className='font-noto text-sm break-words'>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Googleカレンダーボタン */}
      <div className='flex justify-center'>
        <GoogleCalendarButton googleCalendar={event.googleCalendar} />
      </div>

      {/* メッセージセクション */}
      <div className='relative flex flex-col items-center justify-stretch w-full max-w-full p-6 md:p-8 gap-12 bg-white/40 rounded-2xl overflow-hidden'>
        <div className='inline-grid grid-cols-1 gap-2 justify-items-center flex-1'>
          <span className='font-berkshire text-lg text-center'>Message</span>
          <div className='font-noto text-sm text-center whitespace-pre-line space-y-4'>
            {event.message}
          </div>
        </div>
      </div>

      {/* Google Map or 画像 */}
      <div className='grid grid-cols-1 justify-items-center'>
        <iframe
          src={event.mapUrl}
          width='100%'
          height='300'
          className='border-0 w-full h-[300px]'
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title='会場の地図'
        />
      </div>
    </section>
  );
};

export default EventItem;
