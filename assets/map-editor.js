import { $ } from './javascript/modules/bling';
import { secondsToHHMMSS } from './javascript/modules/helpers';
import { run } from './javascript/activity';
import DistanceOutput from './javascript/components/DistanceOutput';
import PaceOutput from './javascript/components/PaceOutput';
import store from './javascript/store/index';

const unitSelectElem = $('.js-unit-select');
unitSelectElem.addEventListener('change', function() {
  store.dispatch('updateUnit', this.value);
});

const distanceOutputInstance = new DistanceOutput(
  $('.mapbox-hidden__map').getAttribute('data-distance')
);

const paceOutputInstance = new PaceOutput(
  $('.mapbox-hidden__map').getAttribute('data-time')
);

distanceOutputInstance.render();
paceOutputInstance.render();

run();
