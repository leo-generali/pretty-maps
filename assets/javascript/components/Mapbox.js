import { $ } from '../modules/bling';
import { mapConfig } from '../config';
import { MAPBOX_ACCESS_KEY } from '../modules/secrets';

class Maxbox {
  constructor(bounds, coords, container) {
    this.bounds = bounds;
    this.coords = coords;

    const avgX = (this.bounds.maxX + this.bounds.minX) / 2;
    const avgY = (this.bounds.maxY + this.bounds.minY) / 2;
    this.center = [avgX, avgY];

    mapboxgl.accessToken = MAPBOX_ACCESS_KEY;
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
      this.map.addLayer(mapConfig(this.coords));
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
      $('.map-loading-state').parentNode.removeChild($('.map-loading-state'));
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

export default Maxbox;
