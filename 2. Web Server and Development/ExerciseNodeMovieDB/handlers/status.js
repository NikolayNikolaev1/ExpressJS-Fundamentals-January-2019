const fs = require('fs');
const path = require('path');
const db = require('../config/dataBase');


module.exports = (req, res) => {
    if (req.path === '/status' && req.method === 'GET') {
        let fileToLoad = path.join(__dirname, '../views/status.html');
        fs.readFile(fileToLoad, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            
            data = data.toString().replace('{{content}}',`Total number of movies -> ${db.length}`);
            res.write(data);
            res.end();
        });
    }
};