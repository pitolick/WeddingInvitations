// Buttonのモックはimportより前に
jest.mock('@/app/components/common/button', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <button data-testid='button' {...props}>
      {children}
    </button>
  ),
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleCalendarButton from '../GoogleCalendarButton';

/**
 * Googleカレンダーイベントの型定義
 */
interface GoogleCalendarEvent {
  /** イベントタイトル */
  text: string;
  /** 開始日時 */
  dates: string;
  /** 詳細 */
  details?: string;
  /** 場所 */
  location?: string;
  /** 時間帯 */
  ctz?: string;
}

// window.openをモック
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true,
});

describe('GoogleCalendarButton', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  const defaultGoogleCalendar: GoogleCalendarEvent = {
    text: '【挙式】栗原 誠・森下 紗伎 結婚式',
    dates: '20251108T100000/20251108T143000',
    details:
      '私たちを見守ってくださる皆様と共に結婚式を挙げられることを心から嬉しく思っています。\n親族集合：10:00\n当日お召し替えが必要な場合は、更衣室をご利用ください。\n会場前には駐車場もございますので、お車の方もご安心ください。\nURL: https://www.grantria.jp\nTEL: 0776-33-2345',
    location: '〒918-8112 福井県福井市下馬2丁目1608',
    ctz: 'Asia/Tokyo',
  };

  it('ボタンが正しくレンダリングされる', () => {
    render(<GoogleCalendarButton googleCalendar={defaultGoogleCalendar} />);

    expect(screen.getByText('Googleカレンダーに登録')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('ボタンクリック時にGoogleカレンダーが開く', () => {
    render(<GoogleCalendarButton googleCalendar={defaultGoogleCalendar} />);

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://calendar.google.com/calendar/render'),
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('無効化されたボタンはクリックできない', () => {
    render(
      <GoogleCalendarButton
        googleCalendar={defaultGoogleCalendar}
        disabled={true}
      />
    );

    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('カスタムクラスが適用される', () => {
    render(
      <GoogleCalendarButton
        googleCalendar={defaultGoogleCalendar}
        className='custom-class'
      />
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('custom-class');
  });

  it('googleCalendarが未定義の場合、エラーが発生する', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<GoogleCalendarButton googleCalendar={undefined} />);

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error opening Google Calendar:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('GoogleカレンダーURLが正しく生成される', () => {
    render(<GoogleCalendarButton googleCalendar={defaultGoogleCalendar} />);

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('action=TEMPLATE'),
      '_blank',
      'noopener,noreferrer'
    );
  });
});
