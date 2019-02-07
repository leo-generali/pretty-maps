import { $ } from '../modules/bling';
import Mapbox from '../components/Mapbox';

const run = () => {
  const bounds = JSON.parse($('#map-container').dataset.bounds);
  const coords = JSON.parse($('#map-container').dataset.coords);
  const map = new Mapbox(bounds, coords, 'map-container');
  map.render();

  $('#downloadLink').addEventListener('click', function() {
    this.href = map.createMapImage();
  });
};

export { run };
