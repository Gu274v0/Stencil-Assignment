
import { Component, h, Prop, State } from '@stencil/core';

interface Validator<A> {
  validate: (x: A) => boolean;
  errorMessage?: string;
}

interface GoogleMapsResponse {
  address_components: { long_name: string }[];
  url: string;
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

  @State() showMap: boolean = false;
  @State() showIcon: boolean = false;
  @State() mapUrl: string;

  constructor() {
    var rootElement: any = document.querySelector('address-autocomplete');
    rootElement.style.setProperty('--au-primary', this.color);
    rootElement.style.setProperty('--au-hint', this.hint);
  }

  handleSvgButton(e) {
    e.preventDefault();

    this.showMap = !this.showMap;
  }

  handleSubmit(e) {
    e.preventDefault();
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

      this.street = `${place.address_components[0]?.long_name}, ${place.address_components[1]?.long_name}`;
      this.city = place.address_components[3]?.long_name;
      this.country = place.address_components[5]?.long_name;

      this.mapUrl = place.url.substring(place.url.indexOf("q="), place.url.indexOf("&ftid"));
      this.showIcon = true;
    });
  }

  connectedCallback() {
    var rootElement: any = document.querySelector('address-autocomplete');

    var mapsApi = document.createElement('script');
    mapsApi.type = 'text/javascript';
    mapsApi.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=places`;
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
            {this.showMap ? <iframe class="animation" width="100%" height="400" id="gmap_canvas" src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAP_API_KEY}&${this.mapUrl}`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe> : null}

            <label class="mt relative" htmlFor="street">
              Street
              <input class='input' id="street" type="text" value={this.street} placeholder="Enter a location" onInput={(event: any) => this.street = event.target.value} autocomplete="on" />

              {this.showIcon ? <div class="input-svg-button" onClick={(e) => this.handleSvgButton(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z" />
                </svg>
              </div> : null}

              {!this._validator.validate(this.street) ? <span class="hint">{this._validator.errorMessage}</span> : null}
            </label>

            <div class="row">
              <label class="mt me w-50" htmlFor="zipcode">
                Zip code
                <input class='input' id="zipcode" type="text" value={this.zipcode} onInput={(event: any) => this.zipcode = event.target.value} placeholder="Enter a location" />
                {!this._validator.validate(this.zipcode) ? <span class="hint">{this._validator.errorMessage}</span> : null}
              </label>

              <label class="mt w-100" htmlFor="city">
                City
                <input class='input' id="city" type="text" value={this.city} onInput={(event: any) => this.city = event.target.value} placeholder="Enter a location" />
                {!this._validator.validate(this.city) ? <span class="hint">{this._validator.errorMessage}</span> : null}
              </label>
            </div>

            <label class="mt" htmlFor="country">
              Country
              <input class='input' id="country" type="text" value={this.country} onInput={(event: any) => this.country = event.target.value} placeholder="Enter a location" />
              {!this._validator.validate(this.country) ? <span class="hint">{this._validator.errorMessage}</span> : null}
            </label>
          </div>

          <button class="mt btn" type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}