const fs = require('fs');

exports.svg = (name) => fs.readFileSync(`./public/svg/${name}.svg`);
exports.dump = (obj) => JSON.stringify(obj, null, 2);
