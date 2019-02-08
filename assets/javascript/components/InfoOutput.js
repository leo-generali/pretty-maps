import { roundToTwo, secondsToHHMMSS } from '../modules/helpers';
import Component from '../modules/component';
import store from '../store/index';

class InfoOutput extends Component {
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
    this.clearRect();
    this.renderBackgroundLayer();
    this.renderDistance();
    this.renderTime();
  }

  clearRect() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderBackgroundLayer() {
    this.canvasContext.fillStyle = 'rgba(225,225,225,0.5)';
    this.canvasContext.fillRect(0, 800, 1000, 200);
  }

  renderDistance() {
    const { isMetric } = store.state;
    const outputDistance = isMetric
      ? this.meters * 0.001
      : this.meters * 0.000621371;
    const outputUnit = isMetric ? 'km' : 'mi';
    const output = roundToTwo(outputDistance) + outputUnit;

    this.canvasContext.font = '60px sans-serif';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(output, 20, 900);
    this.canvasContext.font = '40px sans-serif';
    this.canvasContext.fillStyle = 'blue';
    this.canvasContext.fillText('distance', 20, 950);
  }

  renderTime() {
    const { seconds } = store.state;
    const time = secondsToHHMMSS(seconds);

    this.canvasContext.font = '60px sans-serif';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(time, 450, 900);
    this.canvasContext.font = '40px sans-serif';
    this.canvasContext.fillStyle = 'blue';
    this.canvasContext.fillText('time', 450, 950);
  }
}

export default InfoOutput;
