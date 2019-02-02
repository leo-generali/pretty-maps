import { mapConfig } from './config';
import 'dotenv';

const run = () => {
  const center = JSON.parse(
    document.querySelector('#map-container').dataset.center
  );

  const coords = JSON.parse(
    document.querySelector('#map-container').dataset.coords
  );

  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_KEY;

  const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/leogenerali/cjrmbdavm16fr2srwjg66llb1',
    center: center,
    zoom: 12,
    preserveDrawingBuffer: true
  });

  map.on('load', () => {
    map.addLayer(mapConfig(coords));
  });

  document.querySelector('#downloadLink').addEventListener('click', function() {
    var img = map.getCanvas().toDataURL('image/png');
    this.href = img;
  });
};

export { run };
