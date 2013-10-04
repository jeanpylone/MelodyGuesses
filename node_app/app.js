var fs = require('fs'),
    path = require('path'),
    config = require('./config'),
    db = config.getDb(),
    __m = config.requireDir(__dirname, 'models'),
    __r = config.requireDir(__dirname, 'routes'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('./config/io');

var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// all environments
app.set('ipaddr', ipaddr);
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname +'/public/images/favicon.js'));
app.use(express.logger('dev'));
app.use(express.bodyParser({uploadDir:'./tmp'}));
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/titles', express.static(path.join(__dirname, '../uploads')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

config.routing(app, __r);

server.listen(app.get('port'), app.get('ipaddr'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
io.config(server);