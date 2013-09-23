angular.module('main')
    .directive('titleEdit', ['$http', function($http) {
        return {
            restrict:'E',
            replace: true,
            templateUrl: 'templates/titleEdit.html',
            link: function(scope, element, attrs){
                scope.safeApply = function(fn) {
                    var phase = this.$root.$$phase;
                    if(phase == '$apply' || phase == '$digest') {
                        if(fn && (typeof(fn) === 'function')) {
                            fn();
                        }
                    } else {
                        this.$apply(fn);
                    }
                };

            }
        };
    }]);