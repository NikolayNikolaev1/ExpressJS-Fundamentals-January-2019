const fs = require('fs');
const path = require('path');

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

    return 'text/plain';
}

module.exports = (req, res) => {
    if (req.path.startsWith('/public') && req.method === 'GET') {
        fs.readFile(path.join(__dirname, `../${req.path}`), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': getContentType(req.path)
                });

                res.write('404 The page is not Found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.path)
            });


            res.write(data);
            res.end();
        });
    }
};