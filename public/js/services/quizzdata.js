angular.module('main')
    .factory('quizzdata', [function(){
        var service = {
            list : [],
            current : null
        };

        return service;
    }]);