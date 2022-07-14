import { newSpecPage } from '@stencil/core/testing';
import { AddressAutocomplete } from './address-autocomplete';

describe('address-autocomplete', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AddressAutocomplete],
      html: '<address-autocomplete></address-autocomplete>',
    });

    (expect(page.root) as any).toEqualHtml(`
      <address-autocomplete style="--au-primary:#00817a; --au-hint:red; --au-font-family:Montserrat, sans-serif;">
        <div class="compose">
          <form>
            <div class="mt col">
              <label class="mt relative" htmlFor="street">Street
                <input class="input" id="street" type="text" placeholder="Enter a location" autocomplete="on">
              </label>
              <div class="row">
                <label class="mt me w-50" htmlFor="zipcode">Zip code
                  <input class="input" id="zipcode" type="text" placeholder="Enter a location">
                </label>
                <label class="mt w-100" htmlFor="city">City
                  <input class="input" id="city" type="text" placeholder="Enter a location">
                </label>
              </div>
              <label class="mt" htmlFor="country">Country
                <input class="input" id="country" type="text" placeholder="Enter a location">
              </label>
            </div>
            <button class="btn mt" type="submit">Submit</button>
          </form>
        </div>
      </address-autocomplete>`);
  })

  it('renders with values', async () => {
    const page = await newSpecPage({
      components: [AddressAutocomplete],
      html: '<address-autocomplete color="#00817a" hint="red" font-family="Montserrat"></address-autocomplete>',
    });

    (expect(page.root) as any).toEqualHtml(`
      <address-autocomplete color="#00817a" hint="red" font-family="Montserrat" style="--au-primary:#00817a; --au-hint:red; --au-font-family:Montserrat, sans-serif;">
        <div class="compose">
          <form>
            <div class="mt col">
              <label class="mt relative" htmlFor="street">Street
                <input class="input" id="street" type="text" placeholder="Enter a location" autocomplete="on">
              </label>
              <div class="row">
                <label class="mt me w-50" htmlFor="zipcode">Zip code
                  <input class="input" id="zipcode" type="text" placeholder="Enter a location">
                </label>
                <label class="mt w-100" htmlFor="city">City
                  <input class="input" id="city" type="text" placeholder="Enter a location">
                </label>
              </div>
              <label class="mt" htmlFor="country">Country
                <input class="input" id="country" type="text" placeholder="Enter a location">
              </label>
            </div>
            <button class="btn mt" type="submit">Submit</button>
          </form>
        </div>
      </address-autocomplete>`);
  })
});
