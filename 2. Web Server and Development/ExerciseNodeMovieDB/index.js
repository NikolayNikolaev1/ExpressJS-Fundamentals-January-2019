const http = require('http');
const port = 3000;
const url = require('url');
const handlers = require('./handlers/index');

http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname;

    for (let handler of handlers) {
        handler(req, res);
    }
}).listen(port);