import './stylesheets/style.scss';
import store from './javascript/store/index';

import Count from './javascript/components/count.js';
import List from './javascript/components/list.js';
import Status from './javascript/components/status.js';

const formElement = document.querySelector('.js-form');
const inputElement = document.querySelector('#new-item-field');

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  let value = inputElement.value.trim();

  if (value.length) {
    store.dispatch('addItem', value);
    inputElement.value = '';
    inputElement.focus();
  }
});

const countInstance = new Count();
const listInstance = new List();
const statusInstance = new Status();

countInstance.render();
listInstance.render();
statusInstance.render();
