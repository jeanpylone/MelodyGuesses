angular.module('main')
    .controller('quizzController', ['$scope', '$http', 'quizzdata', function($scope, $http, _data) {
        $scope.d = _data;
        $scope.titles = [];
        $http.get("/quizz/list").success(function(data){
            _data.list.splice.apply(_data.list, [].concat([0, _data.list.length],data));
        });

        $http.get("/titles/list").success(function(data){
            $scope.titles.splice.apply($scope.titles, [].concat([$scope.titles.length,0],data));
        });

        $scope.$watch('d.current', function(data){
            $scope.title = data;
            $scope.original = JSON.stringify(data);
            $scope.displayed = data != null;
            if (data){
                Enumerable.From($scope.titles)
                    .ForEach(function(t){t.selected = $scope.title.titles.indexOf(t._id)>=0;});
            }
        });

        $scope.filterSelected = function(title){
            return title.selected;
        };

        $scope.filterNotSelected = function(title){
            return !title.selected;
        };

        $scope.modified = false;
        $scope.$watch('d.current.name', function(data){
            var curr = JSON.stringify(_data.current);
            $scope.modified = _data.current != null && curr != $scope.original;
        });
        $scope.$watchCollection('d.current.titles', function(data){
            var curr = JSON.stringify(_data.current);
            $scope.modified = _data.current != null && curr != $scope.original;
        });
        $scope.add = function() {
            var newElement = {name:"", titles:[], _new: true};
            _data.current = newElement;
            _data.list.push(newElement);
        };

        $scope.select = function(title){
            $scope.d.current = title;
        }

        $scope.delete = function(title){
            if (_data.current == title) {
                _data.current = null;
            }
            _data.list.splice(_data.list.indexOf(title), 1);
            $http.post('/quizz/delete', {id : title._id});
        };

        $scope.doSave= function(){
            $scope._form.trigger('submit');
        };
        $scope.save = function() {
            $http.post('/quizz/save', _data.current).success(function(data){
                if (data != null){
                    _data.current._id = data._id;
                    if (_data.current._new) {delete _data.current._new;}
                    $scope.modified = false;
                    $scope.original = JSON.stringify(data);
                }
            });
        };

        $scope.close = function() {
            _data.current.locked = true;
            $scope.doSave();
        };
    }]);