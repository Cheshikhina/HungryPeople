import Swiper from 'swiper';
// import common from './common';

if (document.querySelector('.slider_specialties')) {
  const mainSlider = new Swiper('.slider_specialties', {
    slidesPerView: 1,
    autoHeight: true,
    speed: 700,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    initialSlide: 1,
    centeredSlides: true,
    pagination: {
      el: '.slider_specialties__pagination',
      bulletClass: 'slider_specialties__bullet',
      bulletActiveClass: 'slider_specialties__bullet--active',
      clickable: true,
    },
    a11y: {
      notificationClass: 'visually_hidden'
    }
  });


  const MOBILE_MEDIA = '(max-width: 767px)',
    breakpointMobile = window.matchMedia(MOBILE_MEDIA);

  let tabsSlider;

  function tabsSliderInit() {
    tabsSlider = new Swiper('.tab_links', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      pagination: {
        clickable: true,
      }
    });
  }

  function breakpointMobileChecker() {
    if (breakpointMobile.matches === false) {
      if (tabsSlider !== undefined) {
        tabsSlider.destroy(true, true);
      }
      return;
    } else if (breakpointMobile.matches === true) {
      return tabsSliderInit();
    }
  }

  breakpointMobile.addListener(breakpointMobileChecker);
  breakpointMobileChecker();
}
