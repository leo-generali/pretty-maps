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
      'line-color': '#0892CB',
      'line-width': 3
    }
  };
};

export { mapConfig };
