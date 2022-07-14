import { newSpecPage } from '@stencil/core/testing';
import { SwipeSelect } from './swipe-select';

describe('swipe-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SwipeSelect],
      html: '<swipe-select></swipe-select>',
    });

    (expect(page.root) as any).toEqualHtml(`
      <swipe-select style="--ss-primary:#00817a; --ss-font-family:Montserrat, sans-serif;">
        <div class="compose pointer">
          <div class="container">
            <div class="col">
              <span class="title">1</span>
                <div class="row">
                  <span>€/Month</span>
                  <small class="primary">EDIT</small>
                </div>
            </div>
          </div>
        </div>
      </swipe-select>`);
  })

  it('renders with values', async () => {
    const page = await newSpecPage({
      components: [SwipeSelect],
      html: '<swipe-select value="55" data="[36, 40, 45, 50, 55, 60, 70, 75, 80, 434]" color="#00817a" font-family="Montserrat"></swipe-select>',
    });

    (expect(page.root) as any).toEqualHtml(`
      <swipe-select value="55" data="[36, 40, 45, 50, 55, 60, 70, 75, 80, 434]" color="#00817a" font-family="Montserrat" style="--ss-primary:#00817a; --ss-font-family:Montserrat, sans-serif;">
        <div class="compose pointer">
          <div class="container">
            <div class="col">
              <span class="title">55</span>
                <div class="row">
                  <span>€/Month</span>
                  <small class="primary">EDIT</small>
                </div>
            </div>
          </div>
        </div>
      </swipe-select>`);
  })
});
