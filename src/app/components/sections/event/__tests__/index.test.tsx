/**
 * @description イベントセクションの構造テスト（テキスト内容非依存）
 * @author WeddingInvitations
 * @since 1.0.0
 */

import { render } from '@testing-library/react';
import Event from '../index';
import '@testing-library/jest-dom';

jest.mock('@/app/lib/api/microcms', () => ({
  getGuestByInvitationId: jest.fn(),
}));
jest.mock('@/app/lib/logger', () => ({
  devLogger: { error: jest.fn() },
}));

describe('Event Component (structure only)', () => {
  it('section要素が存在し、id="event"が付与されている', async () => {
    const { container } = render(await Event({}));
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'event');
  });

  it('containerクラスのdivが存在する', async () => {
    const { container } = render(await Event({}));
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('mx-auto', 'px-5');
  });

  it('gridレイアウトのdivが存在し、grid-cols-1クラスが付与されている', async () => {
    const { container } = render(await Event({}));
    const gridDiv = container.querySelector('.grid');
    expect(gridDiv).toBeInTheDocument();
    expect(gridDiv).toHaveClass('grid-cols-1');
  });

  it('iframe（地図）が1つ以上存在し、title="会場の地図"が付与されている', async () => {
    const { container } = render(await Event({}));
    const iframes = container.querySelectorAll('iframe[title="会場の地図"]');
    expect(iframes.length).toBeGreaterThan(0);
  });

  it('h2要素が1つ以上存在する', async () => {
    const { container } = render(await Event({}));
    const h2s = container.querySelectorAll('h2');
    expect(h2s.length).toBeGreaterThan(0);
  });
});
