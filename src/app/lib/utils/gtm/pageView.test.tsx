import { render } from '@testing-library/react';
import { TrackPageView } from './pageView';

// モックの設定
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('./dataLayer', () => ({
  pushDataLayer: jest.fn(),
}));

import { useSearchParams, usePathname } from 'next/navigation';
import { pushDataLayer } from './dataLayer';

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockPushDataLayer = pushDataLayer as jest.MockedFunction<
  typeof pushDataLayer
>;

describe('TrackPageView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('コンポーネントが正しくレンダリングされること', () => {
    // モックの戻り値を設定
    mockUseSearchParams.mockReturnValue(new URLSearchParams('?foo=bar') as any);
    mockUsePathname.mockReturnValue('/');

    render(<TrackPageView />);

    // pushDataLayerが呼び出されること
    expect(mockPushDataLayer).toHaveBeenCalledWith({
      event: 'NextRoute',
      pagePath: '?foo=bar',
    });
  });

  it('検索パラメータなしの場合の処理', () => {
    // モックの戻り値を設定
    mockUseSearchParams.mockReturnValue(new URLSearchParams('') as any);
    mockUsePathname.mockReturnValue('/');

    render(<TrackPageView />);

    expect(mockPushDataLayer).toHaveBeenCalledWith({
      event: 'NextRoute',
      pagePath: '',
    });
  });

  it('パス名が変更された場合の処理', () => {
    // モックの戻り値を設定
    mockUseSearchParams.mockReturnValue(new URLSearchParams('') as any);
    mockUsePathname.mockReturnValue('/about');

    render(<TrackPageView />);

    expect(mockPushDataLayer).toHaveBeenCalledWith({
      event: 'NextRoute',
      pagePath: '/about',
    });
  });
});
