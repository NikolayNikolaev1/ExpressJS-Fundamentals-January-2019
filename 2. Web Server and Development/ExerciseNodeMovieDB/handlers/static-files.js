const fs = require('fs');
const path = require('path');
const url = require('url');

function getContentType(path) {
    if (path.endsWith('.css')) {
        return 'text/css';
    } else if (path.endsWith('.ico')) {
        return 'image/x-icon';
    } else if (path.endsWith('.png')) {
        return 'image/png';
    } else if (path.endsWith('.jpg')) {
        return 'image/jpeg';
    }
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname.startsWith('/public/') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, `..${req.pathname}`));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('Resource not found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            });

            res.write(data);
            res.end;
            return;
        });
    } else {
        return true;
    }
}