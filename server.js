let http = require('http')

let fs = require('fs')

let server = http.createServer()

server.on('request', (req, res) => {
    if (req.url == "/") {
        fs.readFile("index.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    } else if (req.url.match("\.css$")) {
        var fileStream = fs.createReadStream('styles.css', "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);
    } else if (req.url.match("\.png$")) {
        var fileStream = fs.createReadStream('logo.png');
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    } else if (req.url.match("\.js$")) {
        var fileStream = fs.createReadStream('scripts.js');
        res.writeHead(200, {"Content-Type": "text/javascript"});
        fileStream.pipe(res);
    }
})

server.listen(8080)