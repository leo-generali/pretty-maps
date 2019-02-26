import colors from './colors';

const lineOptions = {
  one: {
    paint: {
      'line-color': colors.primary,
      'line-width': 10,
      'line-translate': [1, 2],
      'line-opacity': 0.6,
      'line-blur': 6
    }
  },
  two: {
    paint: {
      'line-color': colors.primary,
      'line-width': 4,
      'line-opacity': 0.4,
      'line-blur': 4
    }
  },
  three: {
    paint: {
      'line-color': colors.primary,
      'line-width': 2.5,
      'line-opacity': 0.9
    }
  }
};

const mapConfig = (coordinates, name) => {
  return {
    id: name,
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
    ...lineOptions[name]
  };
};

export default mapConfig;
