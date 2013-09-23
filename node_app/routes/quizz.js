var fs = require('fs'),
    mongoose = require('mongoose'),
    Quizz = mongoose.model('Quizz');

exports.configure = function(app){
    app.get('/quizz', require('./index').index);
    app.get('/quizz/list', exports.list);
    app.get('/quizz/listfull', exports.listfull);
    app.post('/quizz/save', exports.save);
    app.post('/quizz/delete', exports.delete);
};

exports.list = function(req, res){
    Quizz.find().exec(function(err, quizz) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(quizz);
        }
    });
};

exports.listfull = function(req, res){
    Quizz.find().populate('titles').exec(function(err, quizz) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(quizz);
        }
    });
};

exports.save = function(req, res) {
    var quizz = req.body;
    var id = quizz._id;
    delete quizz._id;
    quizz.titles = quizz.titles.map(function(title) {
        return mongoose.Types.ObjectId(title);
    });
    if (id) {
        Quizz.findByIdAndUpdate(id, {$set : quizz}, function(err, resquizz) {
            if (err) {
                res.jsonp(null);
            }
            res.jsonp(resquizz);
        });
    } else {
        new Quizz(quizz).save(function(err, resquizz) {
            if (err) {
                res.jsonp(null);
            }
            res.jsonp(resquizz);
        });
    }

};

exports.delete = function(req, res) {
    Quizz.findById(req.body.id, function(err, quizz){
        quizz.remove(function(err){
            res.jsonp({err: err});
        });
    });
};