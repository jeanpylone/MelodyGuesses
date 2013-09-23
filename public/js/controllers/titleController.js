angular.module('main')
    .controller('titleController', ['$scope', '$http', 'titledata', function($scope, $http, _data) {
        $scope.d = _data;
        $http.get("/titles/list").success(function(data){
             _data.list.splice.apply(_data.list, [].concat([_data.list.length,0],Enumerable.From(data).OrderBy('$.id3info.metadata.artist').ToArray()));
         });
        $scope.select = function(title){
            $scope.d.current = title;
        }

        $scope.delete = function(title){
            if (_data.current == title) {
                _data.current = null;
            }
            _data.list.splice(_data.list.indexOf(title), 1);
            $http.post('/titles/delete', {id : title._id});
        };

        $scope.save = function() {
            $http.post('/titles/save', _data.current);
        };

        $scope.saveAndClose = function() {
            _data.current.locked = true;
            $http.post('/titles/save', _data.current);
        };
    }]) ;