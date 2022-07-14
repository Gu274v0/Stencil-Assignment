import { newE2EPage } from '@stencil/core/testing';

describe('address-autocomplete', () => {
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  }

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<address-autocomplete></address-autocomplete>');
    const element = await page.find('address-autocomplete');
    (expect(element) as any).toHaveClass('hydrated');
  });

  it('renders changing color', async () => {
    const page = await newE2EPage();
    await page.setContent('<address-autocomplete color="red"></address-autocomplete>');
    const element = await page.find('button');
    expect((await element.getComputedStyle()).backgroundColor).toEqual(hexToRgb(`#ff0000`));
  });
});
