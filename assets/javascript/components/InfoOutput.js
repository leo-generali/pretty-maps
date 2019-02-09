import { roundToTwo, secondsToHHMMSS } from '../modules/helpers';
import { colors } from '../config';
import Component from '../modules/component';
import store from '../store/index';

class InfoOutput extends Component {
  constructor() {
    super({
      store,
      element: '.js-map-canvas-layer'
    });

    this.canvas = this.element;
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.canvasContext = this.canvas.getContext('2d');
  }

  render() {
    this.clearRect();

    this.canvasContext.textAlign = 'left';
    this.renderDistance();
    this.renderLabel('Distance', 50, 950);

    this.canvasContext.textAlign = 'center';
    this.renderTime();
    this.renderLabel('Time', 500, 950);

    this.canvasContext.textAlign = 'right';
    this.renderPace();
    this.renderLabel('Pace', 950, 950);
  }

  clearRect() {
    this.canvasContext.clearRect(0, 0, 1000, 1000);
  }

  renderLabel(text, posX, posY) {
    const TEXT_SIZE = 40;
    this.canvasContext.font = `${TEXT_SIZE}px sans-serif`;
    const textWidth = this.canvasContext.measureText(text).width;

    const gradient = this.canvasContext.createLinearGradient(
      posX,
      posY - TEXT_SIZE - 40,
      posX + textWidth,
      posY
    );
    gradient.addColorStop(0, 'rgb(255, 0, 128)');
    gradient.addColorStop(1, 'rgb(255, 153, 51)');

    this.canvasContext.shadowOffsetX = 1.5;
    this.canvasContext.shadowOffsetY = 1.5;
    this.canvasContext.shadowColor = 'rgba(0,0,0,1)';

    this.canvasContext.fillStyle = gradient;
    this.canvasContext.fillText(text, posX, posY);
  }

  renderDistance() {
    const { isMetric } = store.state;
    const outputDistance = isMetric
      ? store.state.distance * 0.001
      : store.state.distance * 0.000621371;
    const outputUnit = isMetric ? 'km' : 'mi';
    const output = roundToTwo(outputDistance) + outputUnit;

    this.canvasContext.shadowOffsetX = 2.5;
    this.canvasContext.shadowOffsetY = 2.5;
    this.canvasContext.shadowColor = 'rgba(0,0,0,1)';

    this.canvasContext.font = '60px sans-serif';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(output, 50, 900);
  }

  renderTime() {
    const { seconds } = store.state;
    const time = secondsToHHMMSS(seconds);

    this.canvasContext.shadowOffsetX = 2.5;
    this.canvasContext.shadowOffsetY = 2.5;
    this.canvasContext.shadowColor = 'rgba(0,0,0,1)';

    this.canvasContext.font = '60px sans-serif';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(time, 500, 900);
  }

  renderPace() {
    const { isMetric, meterPerSecond } = store.state;
    const conversion = isMetric ? 16.666666667 : 26.8224;
    const unit = isMetric ? 'km' : 'mi';

    const minutePerDistance = conversion / meterPerSecond;
    const secondsPercent = minutePerDistance - Math.floor(minutePerDistance);

    const minutes = Math.floor(minutePerDistance);
    const seconds = Math.floor(secondsPercent * 60);

    const sOutput = seconds > 10 ? seconds : `0${seconds}`;
    const pace = `${minutes}:${sOutput}/${unit}`;

    this.canvasContext.font = '60px sans-serif';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(pace, 950, 900);
  }
}

export default InfoOutput;
