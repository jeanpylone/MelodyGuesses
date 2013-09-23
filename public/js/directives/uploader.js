angular.module('main')
    .directive('uploader', ['$http', '$compile', 'titledata', function($http, $compile, _data) {
        return {
            restrict:'E',
            replace: true,
            template: '<div>' +
                '<button ng-click="chooseFile()" ng-disabled="doing">Load</button>' +
                '</div>',
            link: function(scope, element, attrs){
                scope.doing = false;
                scope.inc = 0;
                scope.done = 0;
                scope.pgss={};
                scope.chooseFile = function(){
                    scope.doing = true;
                    var id = "id_" + scope.inc++;
                    var p = scope.pgss[id] = {
                        input : $('<input class="nodisplay" type="file" accept="audio/*" multiple />')
                    }
                    var register = function(cnt, total, input){
                        var fd = new FormData(),
                            xhr = new XMLHttpRequest(),
                            progress = $compile('<progress percent="pgss.'+id+'.pct'+cnt+'"></progress>')(scope);
                        element.append(progress);
                        fd.append("file", input.files[cnt]);
                        xhr.open("POST", "/titles/upload");

                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == 4) {
                                var resp = JSON.parse(xhr.responseText);
                                _data.list.push(resp);
                            }
                        }
                        xhr.upload.onprogress = function(data){
                            p['pct'+cnt] = Math.floor(data.loaded / data.total * 100);
                            scope.$apply();
                        };
                        xhr.onload = function(){
                            p['pct'+cnt] = 100;
                            progress.remove();
                            scope.done++;
                            if (scope.done == total) {
                                scope.done = 0;
                                scope.doing = false;
                                $(input).remove();
                                scope.$apply();
                            }
                        };
                        xhr.send(fd);
                    };
                    p.input.on("change", function() {
                        var total = p.input[0].files.length;
                        for(var i= 0; i< total; i++){
                            register(i, total, p.input[0]);
                        }
                    });
                    element.append(p.input);
                    p.input.trigger("click");
                };
            }
        };
    }]);