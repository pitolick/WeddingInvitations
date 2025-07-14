'use client';

import React from 'react';
import {
  generateGoogleCalendarUrl,
  GoogleCalendarEvent,
} from '@/app/lib/utils/calendar';
import Button from '@/app/components/common/button';

/**
 * GoogleカレンダーボタンのProps型定義
 */
interface GoogleCalendarButtonProps {
  /** Googleカレンダー情報 */
  googleCalendar?: GoogleCalendarEvent;
  /** メッセージ */
  message?: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
  /** 無効化フラグ */
  disabled?: boolean;
}

/**
 * Googleカレンダーに登録するボタンコンポーネント
 * @description イベント情報をGoogleカレンダーに追加するためのボタン
 * @param props - ボタンの設定
 * @returns JSX.Element
 */
const GoogleCalendarButton: React.FC<GoogleCalendarButtonProps> = ({
  googleCalendar,
  className = '',
  disabled = false,
}) => {
  /**
   * Googleカレンダーにイベントを追加
   * @description 新しいタブでGoogleカレンダーを開く
   */
  const handleAddToCalendar = () => {
    try {
      if (!googleCalendar) {
        throw new Error('GoogleCalendarEvent is required');
      }
      const calendarUrl = generateGoogleCalendarUrl(googleCalendar);

      // 新しいタブでGoogleカレンダーを開く
      window.open(calendarUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening Google Calendar:', error);
    }
  };

  return (
    <Button
      onClick={handleAddToCalendar}
      disabled={disabled}
      variant='outline'
      className={`
        inline-flex items-center justify-center gap-2 text-sm
        ${className}
      `}
    >
      {/* Googleカレンダーアイコン */}
      <svg
        className='w-4 h-4'
        fill='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z' />
      </svg>

      {/* ボタンテキスト */}
      <span>Googleカレンダーに登録</span>
    </Button>
  );
};

export default GoogleCalendarButton;
