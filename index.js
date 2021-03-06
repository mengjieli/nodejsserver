var app = require('express')();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./xiaoxxgame.com/Nginx/2_xiaoxxgame.com.key', 'utf8');
var certificate = fs.readFileSync('./xiaoxxgame.com/Nginx/1_xiaoxxgame.com_bundle.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 3000;
var SSLPORT = 3001;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// Welcome
app.get('/auth', function(req, res) {
    if(req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }
});