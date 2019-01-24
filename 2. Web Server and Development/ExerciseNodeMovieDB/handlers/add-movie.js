const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const database = require('../config/dataBase');



function loadPage (res, callback) {
    fs.readFile(path.join(__dirname, '../views/addMovie.html'), (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        if (callback) {
            data = callback(data);
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.write(data);
        res.end();
    });
}


module.exports = (req, res) => {
    if (req.path === '/addMovie' && req.method === 'GET') {
        loadPage(res);
    } else if (req.path === '/addMovie' && req.method === 'POST') {
        let dataString = '';

        req.on('data', (data) => {
            dataString += data;
        });
        
        req.on('end', () => {
            let movie = qs.parse(dataString);
            console.log(movie);
            

            if (movie.movieTitle === "" || movie.moviePoster === "") {
                loadPage(res, (data) => {
                    return data = data.toString()
                        .replace('{{content}}','<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');
                });
            } else {
                loadPage(res, (data) => {
                    return data = data.toString()
                        .replace('{{content}}','<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');
                });

                console.log(movie);
                console.log('test');
                
                
                database.push(movie);
            }
        });
    }
};
