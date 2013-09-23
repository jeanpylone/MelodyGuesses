angular.module('main')
    .directive('glyph', [function() {
        return {
            restrict:'E',
            replace: true,
            template: '<span></span>',
            link: function(scope, element, attrs){
                element.addClass('glyphicon');
                element.addClass('glyphicon-' + attrs.icon);
            }
        };
    }]);