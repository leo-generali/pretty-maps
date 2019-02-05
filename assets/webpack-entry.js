import './stylesheets/style.scss';
import store from './javascript/store/index';

import Output from './javascript/components/output.js';

const outputInstance = new Output();

const inputElem = document.querySelector('.js-input');
inputElem.value = store.state.message;

inputElem.addEventListener('input', () => {
  store.dispatch('updateInput', inputElem.value);
});

outputInstance.render();
