import 'svgxuse';
import 'lazysizes';
import './modules/sliders';
import './modules/gallery';
// import './forIE/polyfills';
import common from './modules/common';
import parallax from './modules/parallax';
import search from './modules/search';
import animationSections from './modules/animationSections';
import scroll from './modules/scroll';
import tab from './modules/tab';
import map from './modules/map';

window.addEventListener('DOMContentLoaded', () => {
  common();
  parallax('.header');
  search();
  animationSections('');
  scroll();
  tab('menu');
  map();
  // modal('[data-modal="open_popup"]', '#popup');
  // modal('.trigger', '#popup');
  // modal('.page_slider');

  // if (document.querySelectorAll('form').length) {
  //   document.querySelectorAll('form').forEach((item) => {
  //     form(item);
  //   });
  // }
  // document.addEventListener('click', function (evt) {
  //   console.log(evt.target);
  // })
});
