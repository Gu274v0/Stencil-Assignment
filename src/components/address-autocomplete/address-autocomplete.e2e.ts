import { newE2EPage } from '@stencil/core/testing';

describe('address-autocomplete', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<address-autocomplete></address-autocomplete>');
    const element = await page.find('address-autocomplete');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<address-autocomplete></address-autocomplete>');
    const component = await page.find('address-autocomplete');
    const element = await page.find('address-autocomplete >>> div');
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
