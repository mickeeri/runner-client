angular
    .module("raceApp", ['ngRoute', 'LocalStorageModule'])
    .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          templateUrl: '/partials/index.html'
        }).
        when('/races', {
          templateUrl: '/partials/race-list.html',
          controller: 'RaceListController',
          controllerAs: 'races' 
        }).
        otherwise({
          redirectTo: '/'
        });
      $locationProvider.html5Mode(true); // This removes the hash-bang and use the Session history management >= IE10
    }]);