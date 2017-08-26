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

    .controller("createPodCtrl", function($scope, $http) {
        $scope.backendHost = "http://magic2nite.com:3000";

        $scope.makePod = function () {
            $http.post($scope.backendHost + "/pod", $scope.podData).then(function(response) {
                console.log(response)
            })
        };

    })

    .controller("podCtrl", function($scope, $http, $location, $routeParams) {
        $scope.backendHost = "http://magic2nite.com:3000";
        $scope.podCode = $routeParams.shortCode;
        $scope.pod = {};
        $scope.players = [];
        $scope.player = {};

        $scope.addPlayer = function () {
          $http.post($scope.backendHost + "/pod/" + $scope.podCode + "/player", {"name": $scope.player.name, "email": $scope.player.email}).then(function() {
              $http.get($scope.backendHost + "/pod/" + $scope.podCode + "/players").then(function (response) {
                  $scope.players = response.data.result;
              })
          })
        };

        $http.get($scope.backendHost + "/pod/" + $scope.podCode).then(function (response) {
            $scope.pod = response.data;
            $http.get($scope.backendHost + "/pod/" + $scope.podCode + "/players").then(function (response) {
                $scope.players = response.data.result;
            })
        }).catch(function(){
            $location.path('/');
        });


    });
