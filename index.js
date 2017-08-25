angular.module("Magic2Nite", ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html'
            })
            .when('/:shortCode', {
                templateUrl: 'templates/pod.html'
            });
        $locationProvider.html5Mode(true);
    })

    .controller("homeCtrl", function($scope, $http, $location) {
        $scope.path = $location.path();
    });
