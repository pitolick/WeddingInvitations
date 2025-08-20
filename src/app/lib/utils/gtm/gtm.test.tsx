import { render } from '@testing-library/react';

// 環境変数をモック
const mockGTM_ID = 'GTM-TEST123';
process.env.NEXT_PUBLIC_GTM_ID = mockGTM_ID;

// モックの設定
jest.mock('next/script', () => ({
  __esModule: true,
  default: jest.fn(() => <></>),
}));

jest.mock('./pageView', () => ({
  __esModule: true,
  TrackPageView: jest.fn(() => <></>),
}));

import { GoogleTagManagerHead, GoogleTagManagerBody } from './gtm';

describe('GoogleTagManagerHead', () => {
  it('コンポーネントが正しくレンダリングされること', () => {
    const { container } = render(<GoogleTagManagerHead />);
    expect(container).toMatchSnapshot();
  });
});

describe('GoogleTagManagerBody', () => {
  it('コンポーネントが正しくレンダリングされること', () => {
    const { container } = render(<GoogleTagManagerBody />);
    expect(container).toMatchSnapshot();
  });
});
