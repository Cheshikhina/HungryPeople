import 'svgxuse';
import 'lazysizes';
import './modules/sliders';
// import './modules/gallery';
import common from './modules/common';
import gallery from './modules/gallery';
import parallax from './modules/parallax';
import search from './modules/search';
import animationSections from './modules/animationSections';
import scroll from './modules/scroll';
import tab from './modules/tab';
import map from './modules/map';
import label from './modules/label';

window.addEventListener('DOMContentLoaded', () => {
  common();
  parallax('.header');
  search();
  animationSections();
  scroll();
  tab('menu');
  map();
  gallery();
  label();
});
