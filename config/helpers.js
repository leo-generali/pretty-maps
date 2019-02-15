const fs = require('fs');
const mapboxKey = process.env.MAPBOX_ACCESS_KEY;

exports.dump = (obj) => JSON.stringify(obj, null, 2);
exports.svg = (name) => fs.readFileSync(`./public/svg/${name}.svg`);
exports.onCurrentNav = (currentPath, path, text) => {
  const currentNavItem = currentPath.split('/')[1];
  const isOnHome = currentNavItem === '' && text === 'Home';
  const modifier =
    path.indexOf(currentNavItem) > 0 || isOnHome ? 'navbar__link--active' : '';
  return modifier;
};
exports.mapbox = () => mapboxKey;
