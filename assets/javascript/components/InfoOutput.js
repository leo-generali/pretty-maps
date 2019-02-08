import { roundToTwo, secondsToHHMMSS } from '../modules/helpers';
import { colors } from '../config';
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

    this.renderDistance();
    this.renderLabel('Distance', 20, 950);

    this.renderTime();
    this.renderLabel('Time', 366, 950);
  }

  clearRect() {
    this.canvasContext.clearRect(0, 0, 1000, 1000);
  }

  renderDistance() {
    const { isMetric } = store.state;
    const outputDistance = isMetric
      ? this.meters * 0.001
      : this.meters * 0.000621371;
    const outputUnit = isMetric ? 'km' : 'mi';
    const output = roundToTwo(outputDistance) + outputUnit;

    this.canvasContext.shadowOffsetX = 2.5;
    this.canvasContext.shadowOffsetY = 2.5;
    this.canvasContext.shadowColor = 'rgba(0,0,0,1)';

    this.canvasContext.font = '60px sans-serif';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(output, 20, 900);
  }

  renderLabel(text, posX, posY) {
    const TEXT_SIZE = 40;
    this.canvasContext.font = `${TEXT_SIZE}px sans-serif`;
    const textWidth = this.canvasContext.measureText(text).width;

    const gradient = this.canvasContext.createLinearGradient(
      posX,
      posY,
      posX + textWidth,
      posY + TEXT_SIZE
    );
    gradient.addColorStop(0, 'rgb(255, 0, 128)');
    gradient.addColorStop(1, 'rgb(255, 153, 51)');

    this.canvasContext.shadowOffsetX = 1.5;
    this.canvasContext.shadowOffsetY = 1.5;
    this.canvasContext.shadowColor = 'rgba(0,0,0,1)';

    this.canvasContext.fillStyle = gradient;
    this.canvasContext.fillText(text, posX, posY);
  }

  renderTime() {
    const { seconds } = store.state;
    const time = secondsToHHMMSS(seconds);

    this.canvasContext.shadowOffsetX = 2.5;
    this.canvasContext.shadowOffsetY = 2.5;
    this.canvasContext.shadowColor = 'rgba(0,0,0,1)';

    this.canvasContext.font = '60px sans-serif';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(time, 366, 900);
  }
}

export default InfoOutput;
