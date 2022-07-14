import { newSpecPage } from '@stencil/core/testing';
import { AddressAutocomplete } from './address-autocomplete';

describe('address-autocomplete', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [AddressAutocomplete],
      html: '<address-autocomplete></address-autocomplete>',
    });
    expect(root).toEqualHtml(`
      <address-autocomplete>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </address-autocomplete>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [AddressAutocomplete],
      html: `<address-autocomplete first="Stencil" last="'Don't call me a framework' JS"></address-autocomplete>`,
    });
    expect(root).toEqualHtml(`
      <address-autocomplete first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </address-autocomplete>
    `);
  });
});
