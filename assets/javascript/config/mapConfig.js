import colors from './colors';

const lineOptions = {
  blur: {
    paint: {
      'line-color': colors.accent,
      'line-width': 10,
      'line-blur': 8
    }
  },
  regular: {
    paint: {
      'line-color': colors.accent,
      'line-width': 2,
      'line-opacity': 1
    }
  }
};

const mapConfig = (coordinates, name) => {
  console.log();
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
