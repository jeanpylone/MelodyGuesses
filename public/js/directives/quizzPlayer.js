angular.module('main')
    .directive('quizzPlayer', ['quizzdata', '$compile', 'soundService', function(_data, $compile, sound) {
        return {
            restrict:'E',
            replace: true,
            templateUrl: 'templates/soundEditor.html',
            link: function(scope, element, attrs){
                scope.$watch('d.current', function(data){
                    scope.current = sound.switchSound(null, scope);
                    if (data){
                        scope.current = sound.switchSound(data, scope);
                    }
                });
            }
        };
    }]);
