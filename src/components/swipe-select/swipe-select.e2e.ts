import { newE2EPage } from '@stencil/core/testing';

describe('swipe-select', () => {
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  }

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<swipe-select></swipe-select>');
    const element = await page.find('swipe-select');
    (expect(element) as any).toHaveClass('hydrated');
  });

  it('renders changing color', async () => {
    const page = await newE2EPage();
    await page.setContent('<swipe-select color="red"></swipe-select>');
    const element = await page.find('small');
    expect((await element.getComputedStyle()).color).toEqual(hexToRgb(`#ff0000`));
  });

  it('renders changing value', async () => {
    const page = await newE2EPage();
    await page.setContent('<swipe-select value="10"></swipe-select>');
    const element = await page.find('span');
    expect((await element.innerHTML)).toEqual('10');
  });
});
