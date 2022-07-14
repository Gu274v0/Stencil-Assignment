import { newE2EPage } from '@stencil/core/testing';

describe('swipe-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<swipe-select></swipe-select>');
    const element = await page.find('swipe-select');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<swipe-select></swipe-select>');
    const component = await page.find('swipe-select');
    const element = await page.find('swipe-select >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
