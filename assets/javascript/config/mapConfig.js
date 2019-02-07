import colors from './colors';

const mapConfig = (coordinates) => {
  return {
    id: 'running_route',
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      }
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': colors.main,
      'line-width': 3
    }
  };
};

export default mapConfig;
