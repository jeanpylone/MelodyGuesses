angular.module('main')
    .controller('navController', ['$scope', '$route', function($scope, $route) {
        $scope.$route = $route;
        $scope.routes = Enumerable
            .From($route.routes)
            .Where(function(kv){return !!kv.Value.title;})
            .Select(function(kv){return {path : kv.Key, id : kv.Value.id, title :kv.Value.title};})
            .ToArray();
    }]);
        