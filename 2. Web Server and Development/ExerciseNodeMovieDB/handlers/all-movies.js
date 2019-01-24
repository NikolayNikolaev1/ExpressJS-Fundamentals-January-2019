const fs = require('fs');
const path = require('path');
const database = require('../config/dataBase');

module.exports = (req, res) => {
    if (req.path === '/viewAllMovies' && req.method === 'GET') {
        fs.readFile(path.join(__dirname,'../views/viewAll.html'), (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let result = '';
            result += '<ul>';

            for (let movie of database) {
               result += `<a href="/movies/details/${movie.id}"><img class="moviePoster" src="${movie.moviePoster}"></a>`;
            }

            result += '</ul>';
           
            data = data.toString().replace('{{content}}', result);
            
            res.writeHead(200, {
                'Content-Type':'text/html'
            });
            
            res.write(data);
            res.end();
        });
    }
}