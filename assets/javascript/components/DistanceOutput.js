import { roundToTwo } from '../modules/helpers';
import Component from '../modules/component';
import store from '../store/index';

class DistanceOutput extends Component {
  constructor(meters) {
    super({
      store,
      element: '.js-unit-type'
    });

    this.meters = meters;
    this.canvas = document.querySelector('.map-container__canvas-layer');
    this.canvasContext = this.canvas.getContext('2d');
  }

  render() {
    const self = this;
    const { isMetric } = store.state;
    const outputDistance = isMetric
      ? self.meters * 0.001
      : self.meters * 0.000621371;

    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.font = '30px serif';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(roundToTwo(outputDistance), 10, 50);
  }
}

export default DistanceOutput;
