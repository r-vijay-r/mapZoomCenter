import { MapBoundZoomTestPage } from './app.po';

describe('map-bound-zoom-test App', () => {
  let page: MapBoundZoomTestPage;

  beforeEach(() => {
    page = new MapBoundZoomTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
