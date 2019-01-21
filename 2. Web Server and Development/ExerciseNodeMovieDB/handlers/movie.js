const fs = require('fs');
const qs = require('querystring');
const db = require('../config/dataBase');

function readHtml(res, replacementHtml) {
    fs.readFile('');
}

module.exports = (req, res) => {
    if (req.path === '/viewAllMovies' && req.method === 'GET') {
        fs.readFile('./views/viewsAll.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let allMoviesHtml = '';

            for (let movie of db) {
                let movieHtml = `<div class="movie">`;
                movieHtml += `<img class="moviePoster" src="${movie.moviePoster}" />`;
                movieHtml += `</div>`;
                allMoviesHtml += movieHtml;
            }

            let responseHtml = data.toString()
                .replace(`<div id="replaceMe">{{replaceMe}}</div>`, allMoviesHtml);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(responseHtml);
            res.end();
        });
    } else  if (req.path === '/addMovie' && req.method === 'GET') {
        fs.readFile('.views/addMovie.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'test/html'
            });

            res.write(data);
            res.end();
        })
    }
}