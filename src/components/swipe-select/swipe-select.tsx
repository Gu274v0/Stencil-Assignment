import { Component, h, State, Prop } from '@stencil/core';

interface Swiper {
  slideTo: Function;
  activeIndex: number;
}

interface SwiperEvent {
  target: { id: string };
}

enum KeyCode {
  ENTER = 13
}

@Component({
  tag: 'swipe-select',
  styleUrl: 'swipe-select.css',
  shadow: false,
  scoped: true,
})
export class SwipeSelect {
  obj: number[] = Array.apply(null, { length: 10 }).map((_: any, index: number) => index + 1);

  @Prop({ mutable: true }) value: number = 1;
  @Prop() data: string = undefined;
  @Prop() color: string = '#00817a';
  @Prop() fontFamily: string = 'Montserrat';
  @State() isToggled: boolean = false;

  constructor() {
    if (this.data != undefined)
      this.obj = JSON.parse(this.data)

    var rootElement: any = document.querySelector(':root');
    rootElement.style.setProperty('--ss-primary', this.color);
  }

  toggle = () => {
    this.isToggled = !this.isToggled;
  }

  transitionEnd = (swiper: Swiper, _: SwiperEvent) => {
    var activeIndex = swiper.activeIndex;

    if (activeIndex == this.obj.indexOf(this.value)) {
      document.getElementById("visible").classList.remove("invisible")
      document.getElementById(this.value.toString()).classList.remove("swipe-selector")
    } else {
      document.getElementById("visible").classList.add("invisible")
    }
  }

  init = (swiper: Swiper) => {
    swiper.slideTo(this.obj.indexOf(this.value), 0)
  }

  tap = (swiper: Swiper, event: SwiperEvent) => {
    swiper.slideTo(this.obj.indexOf(Number.parseInt(event.target.id)), 500)
  }

  doubleTap = (_: Swiper, event: SwiperEvent) => {
    this.value = Number.parseInt(event.target.id);
    this.toggle();
  }

  keyPress = (swiper: Swiper, keyCode: KeyCode) => {
    if (keyCode == KeyCode.ENTER) {
      this.value = this.obj[swiper.activeIndex];
      this.toggle();
    }
  }

  connectedCallback() {
    var rootElement: any = document.querySelector(':root');

    var swipeCss = document.createElement('link');
    swipeCss.rel = 'stylesheet';
    swipeCss.href = 'https://unpkg.com/swiper/swiper-bundle.min.css';
    document.head.appendChild(swipeCss);

    var swipeJs = document.createElement('script');
    swipeJs.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
    document.body.appendChild(swipeJs);

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

    rootElement.style.setProperty('--ss-font-family', `${this.fontFamily}, sans-serif`);
  }

  componentDidUpdate() {
    new (window as any).Swiper(".mySwiper", {
      centeredSlides: true,
      keyboard: {
        enabled: true,
      },
      speed: 500,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        transitionEnd: this.transitionEnd,
        init: this.init,
        tap: this.tap,
        doubleTap: this.doubleTap,
        keyPress: this.keyPress
      },
      breakpoints: {
        320: {
          slidesPerView: 3,
        },
        480: {
          slidesPerView: 5,
        },
        640: {
          slidesPerView: 7,
        }
      },
    });
  }

  render() {
    return (
      <div class="compose pointer">
        {this.isToggled ?
          <div>
            <div id='visible' class="justify-center invisible">
              <small class="primary">Current choice</small>
            </div>
            <div class="swipe-select mySwiper">
              <div class="swiper-wrapper">
                {this.obj.map((value: number) =>
                  <div id={value.toString()} class="swiper-slide subTitle swipe-selector">
                    {value}
                  </div>
                )}
              </div>
              <div class="justify-center">
                <span>€/Month</span>
              </div>
            </div>
          </div>
          :
          <div class="container" onClick={this.toggle}>
            <div class="col">
              <span class="title">{this.value}</span>
              <div class="row">
                <span>€/Month</span>
                <small class="primary">EDIT</small>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}