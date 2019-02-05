import Component from '../modules/component';
import store from '../store/index';

class Output extends Component {
  constructor() {
    super({
      store,
      element: '.js-output'
    });
  }

  render() {
    let self = this;
    self.element.innerHTML = `
      <p>${store.state.message}</p>
    `;
  }
}

export default Output;
