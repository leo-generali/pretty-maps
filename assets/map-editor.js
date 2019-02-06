import { $ } from './javascript/modules/bling';
import { secondsToHHMMSS } from './javascript/modules/helpers';
import { run } from './javascript/activity';
import MapForm from './javascript/components/map-option-form';
import store from './javascript/store/index';

const unitSelectElem = $('.js-unit-select');
unitSelectElem.addEventListener('change', function() {
  store.dispatch('updateUnit', this.value);
});

const form = new MapForm(
  $('.map-container__map').getAttribute('data-distance')
);

form.render();

run();
