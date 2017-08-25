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
    })

    .controller("podCtrl", function($scope, $http, $location, $routeParams) {
        $scope.backendHost = "http://localhost:3000";
        $scope.podCode = $routeParams.shortCode;
        $scope.pod = {};

        $http.get($scope.backendHost + "/pod/" + $scope.podCode).then(function (response) {
            $scope.pod = response.data;
        });
    });
