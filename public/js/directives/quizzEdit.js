angular.module('main')
    .directive('quizzEdit', ['$http', 'quizzdata', function($http, _data) {
        return {
            restrict:'E',
            replace: true,
            templateUrl: 'templates/quizzEdit.html',
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
                scope._form = element.find('form');

                scope.selectTitle = function(title){
                    var titles = scope.title.titles;
                    var idx=titles.indexOf(title._id);
                    title.selected = idx<0;
                    if (idx<0) {
                        titles.push(title._id);
                    }
                    else {
                        titles.splice(idx, 1);
                    }
                }
            }
        };
    }]);