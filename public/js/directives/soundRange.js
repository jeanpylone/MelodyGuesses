angular.module('main')
    .directive('soundRange', ['titledata', 'soundService', function(_data, sound) {
        var capitalizeFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        return {
            restrict:'E',
            replace: true,
            scope: {part : '@'},
            templateUrl: 'templates/soundRange.html',
            link: function(scope, element, attrs){
                scope.$parent.$watch('current', function(data){
                    if (data) {
                        scope.current =data[attrs.part];
                    }   else {
                        scope.current = null;
                    }
                });
                scope.$parent.$watch('current.'+attrs.part+'.status', function(data){
                    scope.status = data;
                });
                element.addClass(attrs.part);
                element.draggable({
                    containment: "parent",
                    axis:"x",
                    distance: 10,
                    start: function(){
                        scope.current.stop();
                    },
                    stop: function(){
                        var t = _data.current;
                        var w = capitalizeFirstLetter(scope.part);
                        var duration = t['end'+w] - t['start'+w];
                        scope.current.start = t['start'+w] = ( element.position().left / element.parent().width() ) * t.id3info.format.duration;
                        scope.current.end = t['end'+w] = t['start'+w] + duration;
                        scope.current.stop();
                    }
                });
                element.resizable({
                    handles : "e",
                    containment:"parent",
                    start: function(){
                        scope.current.stop();
                    },
                    stop: function(){
                        var t = _data.current;
                        var w = capitalizeFirstLetter(scope.part);
                        scope.current.end = t['end'+w] =
                            ( (element.position().left + element.width()) / element.parent().width() ) * t.id3info.format.duration;
                        scope.current.stop();
                    }
                });
                element.on('click', function(){
                    sound['switch' +capitalizeFirstLetter(scope.part)]();
                });
                scope.getStyle = function() {
                    var t = _data.current;
                    var w = capitalizeFirstLetter(scope.part);
                    if (t) {
                        var start = t['start'+w] / t.id3info.format.duration*100;
                        var length = (t['end'+w] - t['start'+w] )/ t.id3info.format.duration*100;
                        return {
                            left : '' + start + '%',
                            width: '' + length + '%'
                        };
                    }
                    else {
                        return { left:0,width:0};
                    }
                };
                scope.stop = function(event){
                    event.stopPropagation();
                    scope.current.stop();
                };

                scope.$parent.$watch(attrs.part + 'Timing', function(data){
                    var t = _data.current;
                    var w = capitalizeFirstLetter(scope.part);
                    if (t) {
                        var position = (data - t['start'+w])/( t['end'+w] - t['start'+w]) * 100;
                        console.log("range", {scope: scope, time: position});
                        element.find(".playBar").css({left : '' + position+ '%'});
                    }
                    else {
                        element.find(".playBar").css({ left:"-1px"});
                    }
                });



            }
        };
    }]);