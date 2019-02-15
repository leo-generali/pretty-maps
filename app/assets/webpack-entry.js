import Pjax from 'pjax';
import NProgress from 'nprogress';

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

pjax._handleResponse = pjax.handleResponse;

pjax.handleResponse = (responseText, request, href, options) => {
  if (options.triggerElement.href.includes('logout')) {
    window.setTimeout(() => {
      pjax._handleResponse(responseText, request, href, options);
    }, 1200);
  } else {
    pjax._handleResponse(responseText, request, href, options);
  }
};

NProgress.configure({ showSpinner: false });

document.addEventListener('pjax:send', () => {
  NProgress.start();
});
document.addEventListener('pjax:complete', () => {
  NProgress.done();
});
