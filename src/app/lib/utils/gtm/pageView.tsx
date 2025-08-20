/**
 * ページビューをトラッキングしてGTMに送信
 * @see https://qiita.com/cheez921/items/a9e8d257684098db55c3
 * @todo テストコード作る（return null のFCをどのように取得し動作確認したらいいか不明のため断念）
 */
'use client';
import { FC, useEffect, useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { pushDataLayer } from './dataLayer';

export const TrackPageView: FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // NextRouteイベントを送信
  const pushPageView = useCallback((url: string) => {
    pushDataLayer({
      event: 'NextRoute',
      pagePath: url,
    });
  }, []);

  // 初期ロード時の処理
  useEffect(() => {
    // routeChangeCompleteが返すurlと同じ形になるよう整形
    const url =
      `${pathname}${searchParams.toString() && '?' + searchParams.toString()}`.replace(
        /\/$|\/\?/,
        matched => {
          return matched === '/?' ? '?' : '';
        }
      );
    pushPageView(url);
  }, [pushPageView, pathname, searchParams]);

  return null;
};
