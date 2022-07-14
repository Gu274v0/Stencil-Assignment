
import { Component, h, Prop, State } from '@stencil/core';

interface Validator<A> {
  validate: (x: A) => boolean;
  errorMessage?: string;
}

interface GoogleMapsResponse {
  address_components: { long_name: string }[]
}

@Component({
  tag: 'address-autocomplete',
  styleUrl: 'address-autocomplete.css',
  shadow: false,
  scoped: true,
})
export class AddressAutocomplete {
  @State() submited: boolean = false;

  defaultValidator: Validator<string> = {
    validate: (value: string) => value != undefined && value.length > 0 || !this.submited,
    errorMessage: "Required value"
  }

  isValidForm() {
    var streetValid = this._validator.validate(this.street);
    if (!streetValid)
      return false;

    var zipcodeValid = this._validator.validate(this.zipcode);
    if (!zipcodeValid)
      return false;

    var cityValid = this._validator.validate(this.city);
    if (!cityValid)
      return false;

    var countryValid = this._validator.validate(this.country);
    if (!countryValid)
      return false;

    return true;
  }

  _validator: Validator<string> = this.defaultValidator;

  @Prop() color: string = '#00817a';
  @Prop() hint: string = 'red';
  @Prop() fontFamily: string = 'Montserrat';

  @State() street: string;
  @State() zipcode: string;
  @State() city: string;
  @State() country: string;

  constructor() {
    var rootElement: any = document.querySelector(':root');
    rootElement.style.setProperty('--au-primary', this.color);
    rootElement.style.setProperty('--au-hint', this.hint);
  }

  handleSubmit(e) {
    e.preventDefault()
    this.submited = true;

    if (this.isValidForm())
      console.log({
        'street': this.street,
        'zipcode': this.zipcode,
        'city': this.city,
        'country': this.country
      });
  }

  googleInitialize = () => {
    var input = document.getElementById('street');
    var autocomplete = new (window as any).google.maps.places.Autocomplete(input);

    (window as any).google.maps.event.addListener(autocomplete, 'place_changed', () => {
      var place: GoogleMapsResponse = autocomplete.getPlace();

      this.street = `${place.address_components[0].long_name}, ${place.address_components[1].long_name}`;
      this.city = place.address_components[3].long_name;
      this.country = place.address_components[5].long_name;
    });
  }

  connectedCallback() {
    var rootElement: any = document.querySelector(':root');

    var mapsApi = document.createElement('script');
    mapsApi.type = 'text/javascript';
    mapsApi.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDR3E0Ko3uYrfQaqX9964woDyJ8NoDn4tg&libraries=places';
    document.head.appendChild(mapsApi);

    var fontApi = document.createElement('link');
    fontApi.rel = 'preconnect';
    fontApi.href = 'https://fonts.googleapis.com';
    document.head.appendChild(fontApi);

    var fontStatic = document.createElement('link');
    fontStatic.rel = 'https://fonts.gstatic.com';
    document.head.appendChild(fontStatic);

    var fontFamily = document.createElement('link');
    fontFamily.rel = 'stylesheet';
    fontFamily.href = `https://fonts.googleapis.com/css2?family=${this.fontFamily}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`;
    document.head.appendChild(fontFamily);

    rootElement.style.setProperty('--au-font-family', `${this.fontFamily}, sans-serif`);
  }

  componentDidLoad() {
    window.addEventListener('load', this.googleInitialize);
  }

  render() {
    return (
      <div class="compose">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div class="mt col">
            <label class="mt" htmlFor="street">
              Street
              <input class='input' id="street" type="text" value={this.street} placeholder="Enter a location" onInput={(event: any) => this.street = event.target.value} autocomplete="on" />
              {!this._validator.validate(this.street) ? <span class="hint">{this._validator.errorMessage}</span> : null}
            </label>

            <div class="row">
              <label class="mt me w-50" htmlFor="zipcode">
                Zip code
                <input class='input' id="zipcode" type="text" value={this.zipcode} onInput={(event: any) => this.zipcode = event.target.value} />
                {!this._validator.validate(this.zipcode) ? <span class="hint">{this._validator.errorMessage}</span> : null}
              </label>

              <label class="mt w-100" htmlFor="city">
                City
                <input class='input' id="city" type="text" value={this.city} onInput={(event: any) => this.city = event.target.value} />
                {!this._validator.validate(this.city) ? <span class="hint">{this._validator.errorMessage}</span> : null}
              </label>
            </div>

            <label class="mt" htmlFor="country">
              Country
              <input class='input' id="country" type="text" value={this.country} onInput={(event: any) => this.country = event.target.value} />
              {!this._validator.validate(this.country) ? <span class="hint">{this._validator.errorMessage}</span> : null}
            </label>
          </div>
          <input class="mt btn" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}