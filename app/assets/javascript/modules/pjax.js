import Pjax from 'pjax';

const pjax = new Pjax({
  elements: ['a.js-pjax-link'],
  selectors: [
    'title',
    'meta[name=description]',
    '.flash-message-wrapper',
    '.js-pjax-scripts',
    '.navbar',
    '.main'
  ],
  cacheBust: false
});

pjax.timeout = 200000;
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

export default pjax;
