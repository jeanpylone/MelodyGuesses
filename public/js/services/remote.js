angular.module('main')
    .factory('remoteService', [function(){
        return {
            create : function(fn, scope){
                var socket = io.connect('http://'+window.location.hostname + ":3000/");
                socket.on('self_registered', function(data){
                    scope.remoteReady = true;
                    console.log('Successfully registered : ' + data.id);
                });
                socket.on('registered', function(data){
                    console.log('Registered client : ' + data.id);
                });
                fn(socket);
                return socket;
            }
        };
    }]);

