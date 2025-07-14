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
import { DEFAULT_EVENTS_DATA } from '@/app/lib/constants/events';

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
  /**
   * @description イベントデータをEventItem形式に変換する関数
   * @param data - イベントデータ
   * @returns EventItem
   */
  const convertToEventItem = (
    data: (typeof DEFAULT_EVENTS_DATA)[0]
  ): EventItemType => {
    const venue = data.venue.map(item => {
      if (item.key === '会場') {
        return {
          key: item.key,
          value: (
            <span className='font-noto font-bold text-base'>{item.value}</span>
          ),
        };
      } else if (item.url) {
        return {
          key: item.key,
          value: (
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              {item.value}
            </a>
          ),
        };
      } else if (item.lines) {
        return {
          key: item.key,
          value: (
            <>
              {item.lines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < item.lines!.length - 1 && <br />}
                </React.Fragment>
              ))}
            </>
          ),
        };
      } else {
        return {
          key: item.key,
          value: item.value,
        };
      }
    });

    return {
      type: data.type,
      title: data.title,
      subtitle: data.subtitle,
      date: data.date,
      time: data.time,
      receptionTime: data.receptionTime,
      venue,
      message: data.message,
      mapUrl: data.mapUrl,
      googleCalendar: data.googleCalendar,
    };
  };

  // 全イベントデータ（定数ファイルから取得）
  const allEvents: EventItemType[] =
    DEFAULT_EVENTS_DATA.map(convertToEventItem);

  // microCMSから招待者情報を取得
  let filteredEvents = allEvents;

  // デフォルトのフィルタリング関数
  const filterDefaultEvents = (events: EventItemType[]) => {
    return events.filter(event => {
      const eventInviteType = EVENT_TYPE_MAPPING[event.type];
      return eventInviteType === '披露宴' || eventInviteType === '二次会';
    });
  };

  if (invitationId) {
    try {
      const guestData = await getGuestByInvitationId(invitationId, draftKey);

      if (guestData && Array.isArray(guestData.invite)) {
        if (guestData.invite.length === 0) {
          filteredEvents = filterDefaultEvents(allEvents);
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
      filteredEvents = filterDefaultEvents(allEvents);
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
