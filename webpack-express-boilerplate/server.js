var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
var app = express();

app.set('port', (process.env.PORT || 3001));

var isProduction = process.env.NODE_ENV === 'production';
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

app.all('/db/*', function (req, res) {
  proxy.web(req, res, {
    target: 'https://webpack-express.firebaseio.com'
  });
});

if (!isProduction) {
    var bundle = require('./server/bundle.js');
    bundle();

    app.all('/build/*', function(req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });
    app.all('/socket.io/*', function(req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });
}

proxy.on('error', function(e){
  console.log('Could not connect to proxy, please try again...');
});

app.listen(app.get('port'), function() {
    console.log(app.get('port'));
});