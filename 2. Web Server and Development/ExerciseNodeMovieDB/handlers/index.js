const homeHandler = require('./home');
const staticHandler = require('./static-files');
const displayMoviesHandler = require('./all-movies');
const addMovieHandler = require('./add-movie');

module.exports = [ homeHandler, staticHandler, displayMoviesHandler, addMovieHandler ];