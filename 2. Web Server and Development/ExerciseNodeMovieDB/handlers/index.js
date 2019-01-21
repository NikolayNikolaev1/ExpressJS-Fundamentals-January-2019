const staticHandler = require('./static-files');
const homeHandler = require('./home');
const movieHandler = require('./movie');

module.exports = [ staticHandler, homeHandler ];