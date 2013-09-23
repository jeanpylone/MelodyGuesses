exports.configure = function(app){
    app.get('/', exports.index);
    app.get('/control', exports.index);
};
exports.index = function(req, res){
  res.render('layout', { title: 'Melody guesses', ngapp: 'main' });
};

