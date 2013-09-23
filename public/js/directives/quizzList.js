angular.module('main')
    .directive('quizzList', ['quizzdata', function(_data) {
        return {
            restrict:'E',
            replace: true,
            templateUrl: 'templates/quizzList.html',
            link: function(scope, element, attrs){

            }
        };
    }]);