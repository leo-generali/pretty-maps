import { roundToTwo } from '../modules/helpers';
import Component from '../modules/component';
import store from '../store/index';

class DistanceOutput extends Component {
  constructor(meters) {
    super({
      store,
      element: '.map-container__canvas-layer'
    });

    this.meters = meters;
    this.canvas = this.element;
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.canvasContext = this.canvas.getContext('2d');
  }

  render() {
    const self = this;
    const { isMetric } = store.state;
    const outputDistance = isMetric
      ? self.meters * 0.001
      : self.meters * 0.000621371;

    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.font = '60px sans-serif';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(roundToTwo(outputDistance), 20, 100);
  }
}

export default DistanceOutput;
