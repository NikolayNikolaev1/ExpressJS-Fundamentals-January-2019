let http = require('http');
let port = 3000;
let url = require('url');
let handlers = require('./handlers/index');

http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname;

    for (let handler of handlers) {
        handler(req, res);
    }
}).listen(port);