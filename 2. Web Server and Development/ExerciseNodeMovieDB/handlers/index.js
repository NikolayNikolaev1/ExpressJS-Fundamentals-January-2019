const homeHandler = require('./home');
const staticHandler = require('./static-files');
const moviesHandler = require('./all-movies');

module.exports = [ homeHandler, staticHandler, moviesHandler ];