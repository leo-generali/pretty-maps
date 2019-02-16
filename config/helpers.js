const { readFileSync } = require('fs');
const mapboxKey = process.env.MAPBOX_ACCESS_KEY;
const path = require('path');

exports.dump = (obj) => JSON.stringify(obj, null, 2);
exports.svg = (name) => readFileSync(`./public/svg/${name}.svg`);
exports.onCurrentNav = (currentPath, path, text) => {
  const currentNavItem = currentPath.split('/')[1];
  const isOnHome = currentNavItem === '' && text === 'Home';
  const modifier =
    path.indexOf(currentNavItem) > 0 || isOnHome ? 'navbar__link--active' : '';
  return modifier;
};
exports.mapbox = () => mapboxKey;

const assetPath = path.resolve(__dirname, 'webpack-assets.json');
const assetJSON = JSON.parse(readFileSync(assetPath, 'utf8'));

exports.assetFor = (string) => {
  const [file, type] = string.split('.');
  return `/dist/${assetJSON[file][type]}`;
};
