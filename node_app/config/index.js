var fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose');

var db_config = {
//    host : 'localhost',
//    port : '27017',
//    user : '',
//    pass : '',
    db : 'up'
};

exports.getDb = function(){
    var options = {};
    if (db_config.user) {options.user = db_config.user};
    if (db_config.pass) {options.pass = db_config.pass};
    return mongoose.connect(
        'mongodb://'
            + (db_config.host || 'localhost')
            + (db_config.port ? ':' + db_config.port :  '')
            + '/' + (db_config.db || 'db'),
        options
    )
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

exports.requireDir = function(base, dir){
    var p = path.join(base, dir);
    var result = {};
    fs.readdirSync(p).forEach(function (file) {
        var rName = file;
        if (rName.endsWith('.js')){
            rName = rName.substr(0, rName.length - 3);
        }
        result[rName] = require(p+'/'+file);
    });
    return result;
};

exports.routing = function(app, routes){
    for (var route in routes){
        if (routes[route].configure) routes[route].configure(app);
    };
}