import { $ } from './javascript/modules/bling';
import { run } from './javascript/activity';

import InfoOutput from './javascript/components/InfoOutput';
import PaceOutput from './javascript/components/PaceOutput';
import store from './javascript/store/index';

store.dispatch(
  'updateTime',
  $('.mapbox-hidden__map').getAttribute('data-time')
);

$('.js-unit-select').addEventListener('change', function() {
  store.dispatch('updateUnit', this.value);
});

const infoOutputInstance = new InfoOutput(
  $('.mapbox-hidden__map').getAttribute('data-distance')
);

const paceOutputInstance = new PaceOutput(
  $('.mapbox-hidden__map').getAttribute('data-time')
);

infoOutputInstance.render();
paceOutputInstance.render();

run();
