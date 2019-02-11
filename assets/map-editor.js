import FontFaceObserver from 'fontfaceobserver';

import { $, $$ } from './javascript/modules/bling';
import { run } from './javascript/activity';

import InfoOutput from './javascript/components/InfoOutput';
import store from './javascript/store/index';

const data = {
  time: $('.mapbox-hidden__map').getAttribute('data-time'),
  distance: $('.mapbox-hidden__map').getAttribute('data-distance')
};

store.dispatch('updateDistance', data.distance);
store.dispatch('updateTime', data.time);
store.dispatch('updatePace', data.distance / data.time);

$('.js-unit-select').addEventListener('change', function() {
  store.dispatch('updateUnit', this.value);
});

$$('.js-map-display-checkbox').forEach((element) => {
  element.addEventListener('click', function() {
    const { name, checked } = this;
    store.dispatch('updateIsShowingOnMap', { name, checked });
  });
});

const font = new FontFaceObserver('Karla');
font.load().then(() => {
  const infoOutputInstance = new InfoOutput();
  infoOutputInstance.render();
  run();
});
