import { secondsToHHMMSS } from '../modules/helpers';
import Component from '../modules/component';
import store from '../store/index';

class PaceOutput extends Component {
  constructor(time) {
    super({
      store,
      element: '.js-pace'
    });

    this.time = time;
  }

  render() {
    const self = this;
    self.element.innerHTML = `${secondsToHHMMSS(this.time)}`;
  }
}

export default PaceOutput;
