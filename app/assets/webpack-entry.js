import Pjax from 'pjax';

import './stylesheets/style.scss';

const pjax = new Pjax({
  elements: ['a.navbar__link'],
  selectors: [
    'title',
    'meta[name=description]',
    '.flash-message-wrapper',
    '.navbar',
    '.main'
  ],
  cacheBust: false
});
