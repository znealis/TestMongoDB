var http = require('http');
var fs = require('fs');
var url = require('url');
const port = 8080;

http.createServer(function (req, res) {
  fs.readFile('./src/pages/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(port);
console.log("serving on: localhost:", port);