import Swiper from 'swiper';
// import common from './common';

if (document.querySelector('.slider_specialties')) {
  const mainSlider = new Swiper('.slider_specialties', {
    slidesPerView: 1,
    // spaceBetween: 100,
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
}
if (document.querySelector('.slider_page')) {
        const pageSwiper = new Swiper('.slider_page', {
          direction: 'vertical',
          slidesPerView: 1,
          spaceBetween: 30,
          mousewheel: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
}
