var fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    Title = mongoose.model('Title'),
    probe = require('node-ffprobe');

exports.configure = function(app){
    app.get('/titles', require('./index').index);
    app.get('/titles/list', exports.list);
    app.post('/titles/save', exports.save);
    app.post('/titles/delete', exports.delete);
    app.post('/titles/upload', exports.upload);
};

exports.list = function(req, res){
    Title.find().exec(function(err, titles) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            for (var i= 0; i<titles.length;i++){
                titles[i]._doc.fileexists = fs.existsSync(titles[i]._doc.file);
            }
            res.jsonp(titles);
        }
    });
};

exports.save = function(req, res) {
    var title = req.body;
    var id = title._id;
    delete title._id;
    Title.findByIdAndUpdate(id, {$set : title}, function(err, restitle) {
        res.jsonp(restitle);
    })
};

exports.delete = function(req, res) {
    Title.findById(req.body.id, function(err, title){
        fs.unlink(title._doc.file, function(err){
            if (!err) {
                title.remove(function(er){
                    res.jsonp({err: er});
                });
            }
        });
    });
};

exports.upload = function(req, res) {
    var f = req.files.file;
    var from = path.join(__dirname, '../..') + '/' + f.path;
    var to = path.join(__dirname, '../../uploads') + '/' + f.name;
    fs.rename(from, to, function(err) {
        var title = new Title();
        title.file = to;
        probe(to, function(err, probeData) {
            title.id3info = probeData;
            title.save();
            res.jsonp(title);
        });
    });
}