import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

document.addEventListener('pjax:send', () => {
  NProgress.start();
});

document.addEventListener('pjax:complete', () => {
  NProgress.done();
});

export default NProgress;
