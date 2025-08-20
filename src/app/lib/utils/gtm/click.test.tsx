import { render, fireEvent } from '@testing-library/react';
import { TrackOnClick } from './click';
import { pushDataLayer } from './dataLayer';

jest.mock('./dataLayer');

describe('TrackOnClick', () => {
  it('クリックされた時に、正しい引数でpushDataLayerが呼ばれる', () => {
    const label = 'テストラベル';
    const { getByText } = render(
      <TrackOnClick label={label}>クリック</TrackOnClick>
    );
    const button = getByText('クリック');
    const pushDataLayerMock = pushDataLayer as jest.MockedFunction<
      typeof pushDataLayer
    >;
    pushDataLayerMock.mockImplementation(() => {});
    fireEvent.click(button);
    expect(pushDataLayerMock).toHaveBeenCalledWith({
      event: 'NextClick',
      label,
    });
  });
});
