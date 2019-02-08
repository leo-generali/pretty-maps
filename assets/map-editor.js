import { $ } from './javascript/modules/bling';
import { run } from './javascript/activity';

import InfoOutput from './javascript/components/InfoOutput';
import store from './javascript/store/index';

const data = {
  time: $('.mapbox-hidden__map').getAttribute('data-time'),
  distance: $('.mapbox-hidden__map').getAttribute('data-distance')
};

store.dispatch('updateTime', data.time);
store.dispatch('updatePace', data.distance / data.time);

$('.js-unit-select').addEventListener('change', function() {
  store.dispatch('updateUnit', this.value);
});

const infoOutputInstance = new InfoOutput(data.distance);

infoOutputInstance.render();

run();
