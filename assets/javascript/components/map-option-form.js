import { roundToTwo } from '../modules/helpers';
import Component from '../modules/component';
import store from '../store/index';

class MapForm extends Component {
  constructor(meters) {
    super({
      store,
      element: '.js-unit-type'
    });

    this.meters = meters;
  }

  render() {
    const self = this;
    const { isMetric } = store.state;
    const outputDistance = isMetric
      ? self.meters * 0.001
      : self.meters * 0.000621371;
    const outputUnit = isMetric ? 'kilometers' : 'miles';

    self.element.innerHTML = `${roundToTwo(outputDistance)} ${outputUnit}`;
  }
}

export default MapForm;
