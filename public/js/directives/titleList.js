angular.module('main')
    .directive('titleList', [function() {
        return {
            restrict:'E',
            replace: true,
            templateUrl: 'templates/titleList.html',
            link: function(scope, element, attrs){
            }
        };
    }]);