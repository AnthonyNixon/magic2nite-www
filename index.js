angular.module("Magic2Nite", ['ngRoute', 'ngAnimate', 'ngMaterial'])
    .config(function($routeProvider, $locationProvider, $mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('red');

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

    .controller("createPodCtrl", function($scope, $http, $location) {
        $scope.backendHost = "http://magic2nite.com:3000";

        $scope.makePod = function () {
            $http.post($scope.backendHost + "/pod", $scope.podData).then(function(response) {
                $location.path('/' + response.data.short_code);
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
            console.log($scope.pod);

            var offset = new Date().getTimezoneOffset();

            $scope.pod.start_time = new Date($scope.pod.start_time);
            $scope.pod.start_time = new Date($scope.pod.start_time.getTime() - offset * 60000);

            $scope.pod.cutoff_time = new Date($scope.pod.cutoff_time);
            $scope.pod.cutoff_time = new Date($scope.pod.cutoff_time.getTime() - offset * 60000);

            $http.get($scope.backendHost + "/pod/" + $scope.podCode + "/players").then(function (response) {
                $scope.players = response.data.result;
            })
        });
        // }).catch(function(){
        //     console.log("Caught error, going back to home...");
        //     $location.path('/');
        // });


    });
