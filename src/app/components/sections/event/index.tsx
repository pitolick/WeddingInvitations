/**
 * @description イベントセクションコンポーネント
 * @author WeddingInvitations
 * @since 1.0.0
 */

import React from 'react';
import type { EventItem as EventItemType } from './types';
import EventItem from './EventItem';
import { getGuestByInvitationId } from '@/app/lib/api/microcms';
import type { InviteType } from '@/app/lib/types/microcms';
import { devLogger } from '@/app/lib/logger';

/**
 * @description イベントセクションコンポーネントのProps型
 */
interface EventProps {
  /** 招待ID */
  invitationId?: string;
  /** プレビューモード用ドラフトキー */
  draftKey?: string;
}

/**
 * @description イベント種別とmicroCMSの招待種別のマッピング
 */
const EVENT_TYPE_MAPPING: Record<string, InviteType> = {
  ceremony: '挙式',
  reception: '披露宴',
  afterparty: '二次会',
} as const;

/**
 * @description イベントセクションコンポーネント
 * @param invitationId - 招待ID
 * @param draftKey - プレビューモード用ドラフトキー
 * @returns JSX.Element
 * @example
 * <Event invitationId="test" draftKey="xxxx" />
 */
const Event: React.FC<EventProps> = async ({ invitationId, draftKey }) => {
  // 全イベントデータ（将来的にAPIやmicroCMS連携）
  const allEvents: EventItemType[] = [
    {
      type: 'ceremony',
      title: 'Wedding Ceremony',
      subtitle: '挙式',
      date: '2025.11.08 Sat',
      time: '11:30 - 14:30',
      receptionTime: '親族集合 / 10:00',
      venue: [
        {
          key: '会場',
          value: (
            <span className='font-noto font-bold text-base'>グラントリア</span>
          ),
        },
        {
          key: 'URL',
          value: (
            <a
              href='https://www.grantria.jp'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              https://www.grantria.jp
            </a>
          ),
        },
        {
          key: '住所',
          value: (
            <>
              〒918-8112
              <br />
              福井県福井市下馬2丁目1608
            </>
          ),
        },
        {
          key: 'TEL',
          value: '0776-33-2345',
        },
      ],
      message: (
        <>
          いつも私たちを
          <br className='block md:hidden' />
          温かく見守ってくれて本当にありがとう
          <br />
          この度みなさまに見守られながら
          <br />
          結婚式を挙げられること
          <br className='block md:hidden' />
          心から嬉しく思っています
          <br />
          <br />
          ささやかではございますが
          <br />
          挙式前に10時00分に
          <br className='block md:hidden' />
          お集まりいただけたら幸いです
          <br />
          皆様とご一緒にリハーサルを行い
          <br />
          最高の瞬間を迎えたいと思っております
          <br />
          <br />
          当日もしお召し替えが必要でしたら
          <br />
          更衣室をご用意していますので
          <br className='block md:hidden' />
          どうぞお気軽にご利用ください
          <br />
          <br />
          お車で来てくださる方は
          <br />
          会場前に00台停められる駐車場がありますので
          <br />
          どうぞ安心してご利用ください
        </>
      ),
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.1618796348916!2d136.23535797646164!3d36.04075497247342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8bc1089571675%3A0x88037966578e0a8f!2z44Kw44Op44Oz44OI44Oq44Ki!5e0!3m2!1sja!2sjp!4v1752288869695!5m2!1sja!2sjp',
    },
    {
      type: 'reception',
      title: 'Wedding Reception',
      subtitle: '披露宴',
      date: '2025.11.08 Sat',
      time: '16:30 - 19:00',
      receptionTime: '受付時間 / 15:30',
      venue: [
        {
          key: '会場',
          value: (
            <span className='font-noto font-bold text-base'>グラントリア</span>
          ),
        },
        {
          key: 'URL',
          value: (
            <a
              href='https://www.grantria.jp'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              https://www.grantria.jp
            </a>
          ),
        },
        {
          key: '住所',
          value: (
            <>
              〒918-8112
              <br />
              福井県福井市下馬2丁目1608
            </>
          ),
        },
        {
          key: 'TEL',
          value: '0776-33-2345',
        },
      ],
      message: (
        <>
          当日は
          <br className='block md:hidden' />
          お召し替えいただける
          <br className='block md:hidden' />
          更衣室がございます
          <br />
          <br />
          クロークは
          <br className='block md:hidden' />
          受付手前にございますので
          <br />
          先にお荷物をお預けいただき
          <br className='block md:hidden' />
          受付にお進みください
          <br />
          <br />
          お子様連れの場合は
          <br />
          披露宴会場内のキッズスペースを
          <br className='block md:hidden' />
          ご利用いただけます
          <br />
          <br />
          お車でお越しの場合は
          <br />
          会場前に00台収容可能な駐車場が
          <br className='block md:hidden' />
          ございますのでご利用ください
        </>
      ),
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.1618796348916!2d136.23535797646164!3d36.04075497247342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8bc1089571675%3A0x88037966578e0a8f!2z44Kw44Op44Oz44OI44Oq44Ki!5e0!3m2!1sja!2sjp!4v1752288869695!5m2!1sja!2sjp',
    },
    {
      type: 'afterparty',
      title: 'After Party',
      subtitle: '2次会',
      date: '2025.11.08 Sat',
      time: '20:00 - 23:00（仮）',
      receptionTime: '受付時間 / 19:30',
      venue: [
        {
          key: '会場',
          value: (
            <span className='font-noto font-bold text-base'>Three8（仮）</span>
          ),
        },
        {
          key: 'URL',
          value: (
            <a
              href='http://eight-inc-fukui.com'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              http://eight-inc-fukui.com
            </a>
          ),
        },
        {
          key: '住所',
          value: (
            <>
              〒918-8112
              <br />
              福井県福井市下馬3丁目1302
              <br /> 福井パークサイドヴィレッジ敷地内
            </>
          ),
        },
        {
          key: 'TEL',
          value: '0776-97-5969',
        },
        {
          key: '会費',
          value: '0,000円',
        },
      ],
      message: (
        <>
          二次会は会費制にさせていただきます
          <br />
          <br />
          披露宴会場から徒歩10分の距離にございます
          <br />
          <br />
          お車でお越しの場合は
          <br />
          会場前に25台収容可能な駐車場が
          <br className='block md:hidden' />
          ございますのでご利用ください
        </>
      ),
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.15786039839!2d136.2306522764615!3d36.04085307247343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8bd2e338fcd73%3A0x3e335579dd30ccb0!2sThree8%EF%BC%8FYOLUCAFE!5e0!3m2!1sja!2sjp!4v1752288955859!5m2!1sja!2sjp',
    },
  ];

  // microCMSから招待者情報を取得
  let filteredEvents = allEvents;

  if (invitationId) {
    try {
      const guestData = await getGuestByInvitationId(invitationId, draftKey);

      if (guestData && Array.isArray(guestData.invite)) {
        if (guestData.invite.length === 0) {
          // inviteが空の場合は披露宴・二次会のみ表示
          filteredEvents = allEvents.filter(event => {
            const eventInviteType = EVENT_TYPE_MAPPING[event.type];
            return eventInviteType === '披露宴' || eventInviteType === '二次会';
          });
        } else {
          // inviteに含まれるものだけ表示
          filteredEvents = allEvents.filter(event => {
            const eventInviteType = EVENT_TYPE_MAPPING[event.type];
            return guestData.invite.includes(eventInviteType);
          });
        }
      }
    } catch (error) {
      devLogger.error('microCMS API error', '招待者情報の取得に失敗しました', {
        context: 'Event component',
        humanNote: '招待者情報の取得に失敗しました',
        aiTodo: 'エラーハンドリングを改善し、フォールバック処理を実装する',
        error: error instanceof Error ? error.message : String(error),
      });
      // エラーの場合は披露宴・二次会のみ表示
      filteredEvents = allEvents.filter(event => {
        const eventInviteType = EVENT_TYPE_MAPPING[event.type];
        return eventInviteType === '披露宴' || eventInviteType === '二次会';
      });
    }
  }

  // イベント数に基づいてgrid-colsを動的に設定
  const gridColsClass =
    filteredEvents.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

  return (
    <section
      id='event'
      className="w-full py-16 bg-[url('/images/sections/event/event-background.webp')] bg-cover bg-center"
    >
      <div className='w-full flex flex-col gap-8 mx-auto'>
        <h2 className='font-berkshire text-4xl md:text-5xl text-center text-gray-900 mb-8'>
          Event
        </h2>

        <div className='container mx-auto px-5'>
          <div className={`grid ${gridColsClass} gap-8`}>
            {filteredEvents.map((event, idx) => (
              <EventItem key={event.type + idx} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;
