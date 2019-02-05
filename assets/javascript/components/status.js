import Component from '../modules/component';
import store from '../store/index';

export default class Status extends Component {
  constructor() {
    super({
      store,
      element: '.js-status'
    });
  }

  render() {
    let self = this;
    let suffix = store.state.items.length !== 1 ? 's' : '';

    self.element.innerHTML = `${store.state.items.length} item${suffix}`;
  }
}
