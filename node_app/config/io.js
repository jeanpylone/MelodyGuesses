exports.config = function(server){
    var io = require('socket.io').listen(server),
        __id = 0;

    io.sockets.on('connection', function(socket){
        var id = 'client_'+(++__id);
        socket.emit('self_registered', {id : id});
        socket.broadcast.emit('registered', {id : id});

        socket.on('list', function(data){
            socket.broadcast.emit('list', data);
        });
        socket.on('answer', function(data){
            socket.broadcast.emit('answer', data);
        });
        socket.on('click', function(data){
            socket.broadcast.emit('click', data);
        });
        socket.on('disconnect', function(){
            socket.broadcast.emit('unregistered', {id: id});
        });
});
};