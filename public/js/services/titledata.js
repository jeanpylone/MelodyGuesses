angular.module('main')
    .factory('titledata', [function(){
        var service = {
            list : [],
            current : null
        };

        return service;
    }]);