const fs = require('fs');
const path = require('path');
const database = require('../config/dataBase');

module.exports = (req, res) => {
    if (req.path.startsWith('/movies/details')) {
        let idMovie = +req.path.split('/')[3];
    
        for (let movie of database) {
            if (idMovie === movie.id) {
                fs.readFile(path.join(__dirname, '../views/details.html'), (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    let result = '';

                    result += 
                    `<div class="content">
                        <img src="${movie.moviePoster}> alt="picture"/>
                        <h3>Title ${movie.movieTitle}</h3>
                        <h3>Year ${movie.movieYear}</h3>
                        <p>${movie.movieDescription}</p>
                    </div>`;

                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    
                    data = data.toString().replace('{{content}}', result);
                    res.write(data);
                    res.end();
                });
            }
        }
    }
    else {
        return true;
    }
};