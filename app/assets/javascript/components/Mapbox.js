import { $ } from '../modules/bling';
import { mapConfig } from '../config';

const token = $('.js-hidden-map').getAttribute('data-mapbox-url');

class Mapbox {
  constructor(bounds, coords, container) {
    this.bounds = bounds;
    this.coords = coords;

    const avgX = (this.bounds.maxX + this.bounds.minX) / 2;
    const avgY = (this.bounds.maxY + this.bounds.minY) / 2;
    this.center = [avgX, avgY];

    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: container,
      style: 'mapbox://styles/leogenerali/cjrmbdavm16fr2srwjg66llb1',
      center: this.center,
      interactive: false,
      zoom: 12,
      preserveDrawingBuffer: true
    });
  }

  render() {
    this.map.on('load', () => {
      this.map.addLayer(mapConfig(this.coords, 'one'));
      this.map.addLayer(mapConfig(this.coords, 'two'));
      this.map.addLayer(mapConfig(this.coords, 'three'));

      this.map.fitBounds(
        [
          [this.bounds.minX, this.bounds.minY],
          [this.bounds.maxX, this.bounds.maxY]
        ],
        {
          padding: { top: 50, bottom: 50, left: 50, right: 50 }
        }
      );
    });

    this.map.once('idle', () => {
      const imageURI = this.map.getCanvas().toDataURL('image/png');
      $('.js-map-loading').parentNode.removeChild($('.js-map-loading'));
      $('.js-map-container').style.display = 'block';
      $('.js-map-img').setAttribute('src', imageURI);
    });
  }

  createMapImage() {
    const infoImage = $('.map-container__canvas-layer');
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 1000;
    finalCanvas.height = 1000;
    const finalContext = finalCanvas.getContext('2d');
    finalContext.drawImage(this.map.getCanvas(), 0, 0);
    finalContext.drawImage(infoImage, 0, 0);
    return finalCanvas.toDataURL('image/png');
  }
}

export default Mapbox;
