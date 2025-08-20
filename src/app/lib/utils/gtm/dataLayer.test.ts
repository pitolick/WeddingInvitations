import { pushDataLayer, DataLayerType } from './dataLayer';
describe('pushDataLayer', () => {
  afterEach(() => {
    window.dataLayer = [];
  });

  it('PageViewEvent', () => {
    const data: DataLayerType = {
      event: 'NextRoute',
      pagePath: '/test',
    };
    pushDataLayer(data);
    expect(window.dataLayer).toEqual([data]);
  });

  it('InViewEvent', () => {
    const data: DataLayerType = {
      event: 'NextInView',
      label: 'test',
    };
    pushDataLayer(data);
    expect(window.dataLayer).toEqual([data]);
  });

  it('ClickEvent', () => {
    const data: DataLayerType = {
      event: 'NextClick',
      label: 'test',
    };
    pushDataLayer(data);
    expect(window.dataLayer).toEqual([data]);
  });
});
