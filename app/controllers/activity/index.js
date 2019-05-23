const indexAction = require('./index-action');
const readAction = require('./read-action');

module.exports = { ...indexAction, ...readAction };
