/**
 * クリックイベントをトラッキングしてGTMに送信
 * @see https://qiita.com/cheez921/items/a9e8d257684098db55c3
 */
import React, { FC, ReactNode, useCallback } from 'react';
import { pushDataLayer } from './dataLayer';

type Props = {
  children: ReactNode;
  label: string;
};

export const TrackOnClick: FC<Props> = ({ children, label }) => {
  const handleClick = useCallback(() => {
    pushDataLayer({
      event: 'NextClick',
      label,
    });
  }, [label]);

  return <div onClick={handleClick}>{children}</div>;
};
