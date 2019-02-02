import { $ } from '../modules/bling';
import { MAPBOX_ACCESS_KEY } from '../modules/secrets';
import { mapConfig } from './config';

const run = () => {
  const bounds = JSON.parse($('#map-container').dataset.bounds);

  const coords = JSON.parse($('#map-container').dataset.coords);

  const avgX = (bounds.maxX + bounds.minX) / 2;
  const avgY = (bounds.maxY + bounds.minY) / 2;
  const center = [avgX, avgY];

  mapboxgl.accessToken = MAPBOX_ACCESS_KEY;

  if (typeof mapboxgl !== 'undefined') {
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/leogenerali/cjrmbdavm16fr2srwjg66llb1',
      center: center,
      interactive: false,
      zoom: 12,
      preserveDrawingBuffer: true
    });

    map.on('load', () => {
      map.addLayer(mapConfig(coords));
      map.fitBounds([[bounds.minX, bounds.minY], [bounds.maxX, bounds.maxY]], {
        padding: { top: 50, bottom: 50, left: 50, right: 50 }
      });
    });

    map.once('idle', () => {
      const imageURI = map.getCanvas().toDataURL('image/png');
      $('.map-loading-state').parentNode.removeChild($('.map-loading-state'));
      $('#map-image').setAttribute('src', imageURI);
    });

    $('#downloadLink').addEventListener('click', function() {
      var img = map.getCanvas().toDataURL('image/png');
      this.href = img;
    });
  }
};

export { run };
