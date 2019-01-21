const staticHandler = require('./static-files');
const homeHandler = require('./home');

module.exports = [ staticHandler, homeHandler ];