import Component from '../modules/component';
import store from '../store/index';

export default class Count extends Component {
  constructor() {
    super({
      store,
      element: '.js-count'
    });
  }

  render() {
    let suffix = store.state.items.length !== 1 ? 's' : '';
    let emoji = store.state.items.length > 0 ? '&#x1f64c;' : '&#x1f622;';

    this.element.innerHTML = `
      <small>You've done</small>
        ${store.state.items.length}
      <small>thing${suffix} today ${emoji}</small>
    `;
  }
}
