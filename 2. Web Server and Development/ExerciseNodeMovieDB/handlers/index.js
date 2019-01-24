const homeHandler = require('./home');
const staticHandler = require('./static-files');
const displayMoviesHandler = require('./all-movies');
const addMovieHandler = require('./add-movie');
const ditailsMovieHandler = require('./details-movie');
const statusHandler = require('./status');

module.exports = [ homeHandler, staticHandler, displayMoviesHandler, addMovieHandler, ditailsMovieHandler, statusHandler ];