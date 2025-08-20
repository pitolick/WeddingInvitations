/**
 * dataLayerPushの処理を定義する
 * @see https://qiita.com/cheez921/items/a9e8d257684098db55c3
 */
type PageViewEvent = {
  event: 'NextRoute';
  pagePath: string;
};

type InViewEvent = {
  event: 'NextInView';
  label: string;
};

type ClickEvent = {
  event: 'NextClick';
  label: string;
};

// windowを拡張
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export type DataLayerType = PageViewEvent | InViewEvent | ClickEvent;

export const pushDataLayer = (data: DataLayerType): void => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};
