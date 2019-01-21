const http = require('http');
const url = require('url');
const handlers = require('./handlers/index');
const port = 3000;

http.createServer((req, res) => {
  for (let handler of handlers) {
      if (!handler(req, res)) {
          break;
      }
  }
}).listen(port);
