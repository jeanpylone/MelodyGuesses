angular.module('main', ['ui.bootstrap'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/home.html',
                controller:  'homeController',
                title: 'Home',
                id: 3
            })
            .when('/control', {
                templateUrl: '/partials/control.html',
                controller: 'controlController',
                title: 'Remote controller',
                id: 4
            })
            .when('/titles', {
                templateUrl: '/partials/title.html',
                controller: 'titleController',
                title: 'Titles management',
                id: 1
            })
            .when('/quizz', {
                templateUrl: '/partials/quizz.html',
                controller:  'quizzController',
                title: 'Quizz definition',
                id: 2
            })
            .otherwise({ redirectTo: '/' });
    }]);
$(function(){
    setTimeout(function() { window.scrollTo(0, 1); }, 1);
});