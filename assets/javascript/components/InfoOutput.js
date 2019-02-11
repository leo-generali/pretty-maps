import { roundToTwo, secondsToHHMMSS } from '../modules/helpers';
import { spacer } from '../helpers/infoOutputHelper';
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

    if (store.state.isShowingOnMap.distance) {
      this.canvasContext.textAlign = 'left';
      this.renderDistance();
      this.renderLabel('DISTANCE', 50, 890);
    }

    if (store.state.isShowingOnMap.time) {
      this.canvasContext.textAlign = 'center';
      this.renderTime();
      this.renderLabel('TIME', 500, 890);
    }
    if (store.state.isShowingOnMap.pace) {
      this.canvasContext.textAlign = 'right';
      this.renderPace();
      this.renderLabel('PACE', 950, 890);
    }
  }

  clearRect() {
    this.canvasContext.shadowOffsetX = 0;
    this.canvasContext.shadowOffsetY = 0;
    this.canvasContext.shadowColor = '';
    this.canvasContext.clearRect(0, 0, 1000, 1000);
  }

  setLabelShadow() {
    this.canvasContext.shadowOffsetX = 1.5;
    this.canvasContext.shadowOffsetY = 1.5;
    this.canvasContext.shadowColor = 'rgba(0,0,0,1)';
  }

  setInfoShadow() {
    this.canvasContext.shadowOffsetX = 2.5;
    this.canvasContext.shadowOffsetY = 2.5;
    this.canvasContext.shadowColor = 'rgba(0,0,0,1)';
  }

  renderLabel(text, posX, posY) {
    const TEXT_SIZE = 36;
    this.canvasContext.font = `${TEXT_SIZE}px Karla`;

    this.setInfoShadow();
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(spacer(text), posX, posY);
  }

  renderDistance() {
    const { isMetric } = store.state;
    const outputDistance = isMetric
      ? store.state.distance * 0.001
      : store.state.distance * 0.000621371;
    const outputUnit = isMetric ? 'km' : 'mi';
    const output = roundToTwo(outputDistance) + outputUnit;

    this.setInfoShadow();
    this.renderInfo(output, 50, 950);
  }

  renderTime() {
    const { seconds } = store.state;
    const time = secondsToHHMMSS(seconds);

    this.setInfoShadow();
    this.renderInfo(time, 500, 950);
  }

  renderPace() {
    const { isMetric, meterPerSecond } = store.state;
    const conversion = isMetric ? 16.666666667 : 26.8224;
    const unit = isMetric ? 'km' : 'mi';

    const minutePerDistance = conversion / meterPerSecond;
    const secondsPercent = minutePerDistance - Math.floor(minutePerDistance);

    const minutes = Math.floor(minutePerDistance);
    const seconds = Math.floor(secondsPercent * 60);

    const sOutput = seconds > 9 ? seconds : `0${seconds}`;
    const pace = `${minutes}:${sOutput}/${unit}`;

    this.setInfoShadow();
    this.renderInfo(pace, 950, 950);
  }

  renderInfo(output, x, y) {
    this.canvasContext.font = '60px Karla';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(output, x, y);
  }
}

export default InfoOutput;
