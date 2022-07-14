import { newSpecPage } from '@stencil/core/testing';
import { SwipeSelect } from './swipe-select';

describe('swipe-select', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SwipeSelect],
      html: '<swipe-select></swipe-select>',
    });
    expect(root).toEqualHtml(`
      <swipe-select>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </swipe-select>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [SwipeSelect],
      html: `<swipe-select first="Stencil" last="'Don't call me a framework' JS"></swipe-select>`,
    });
    expect(root).toEqualHtml(`
      <swipe-select first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </swipe-select>
    `);
  });
});
